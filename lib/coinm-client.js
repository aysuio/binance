"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinMClient = void 0;
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
const requestUtils_1 = require("./util/requestUtils");
class CoinMClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}, useTestnet) {
        const clientId = useTestnet ? 'coinmtest' : 'coinm';
        super(clientId, restClientOptions, requestOptions);
        this.clientId = clientId;
        return this;
    }
    /**
     * Abstraction required by each client to aid with time sync / drift handling
     */
    getServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((0, requestUtils_1.getServerTimeEndpoint)(this.clientId)).then((response) => response.serverTime);
        });
    }
    /**
     *
     * Market Data Endpoints
     *
     **/
    testConnectivity() {
        return this.get('dapi/v1/ping');
    }
    getExchangeInfo() {
        return this.get('dapi/v1/exchangeInfo');
    }
    getOrderBook(params) {
        return this.get('dapi/v1/depth', params);
    }
    getRecentTrades(params) {
        return this.get('dapi/v1/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('dapi/v1/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('dapi/v1/aggTrades', params);
    }
    /**
     * Index Price and Mark Price
     */
    getMarkPrice(params) {
        return this.get('dapi/v1/premiumIndex', params);
    }
    getFundingRateHistory(params) {
        return this.get('dapi/v1/fundingRate', params);
    }
    getFundingRate(params) {
        return this.get('dapi/v1/fundingInfo', params);
    }
    getKlines(params) {
        return this.get('dapi/v1/klines', params);
    }
    getContinuousContractKlines(params) {
        return this.get('dapi/v1/continuousKlines', params);
    }
    getIndexPriceKlines(params) {
        return this.get('dapi/v1/indexPriceKlines', params);
    }
    getMarkPriceKlines(params) {
        return this.get('dapi/v1/markPriceKlines', params);
    }
    getPremiumIndexKlines(params) {
        return this.get('dapi/v1/premiumIndexKlines', params);
    }
    /**
     * @deprecated use get24hrChangeStatistics() instead (method without the typo)
     */
    get24hrChangeStatististics(params) {
        return this.get24hrChangeStatistics(params);
    }
    get24hrChangeStatistics(params) {
        return this.get('dapi/v1/ticker/24hr', params);
    }
    getSymbolPriceTicker(params) {
        return this.get('dapi/v1/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        return this.get('dapi/v1/ticker/bookTicker', params).then((e) => (0, requestUtils_1.asArray)(e));
    }
    getOpenInterest(params) {
        return this.get('dapi/v1/openInterest', params);
    }
    getOpenInterestStatistics(params) {
        return this.get('futures/data/openInterestHist', params);
    }
    getTopTradersLongShortAccountRatio(params) {
        return this.get('futures/data/topLongShortAccountRatio', params);
    }
    getTopTradersLongShortPositionRatio(params) {
        return this.get('futures/data/topLongShortPositionRatio', params);
    }
    getGlobalLongShortAccountRatio(params) {
        return this.get('futures/data/globalLongShortAccountRatio', params);
    }
    getTakerBuySellVolume(params) {
        return this.get('futures/data/takerBuySellVol', params);
    }
    getCompositeSymbolIndex(params) {
        return this.get('futures/data/basis', params);
    }
    /**
     * possibly @deprecated
     * Only in old documentation, not in new one
     **/
    getIndexPriceConstituents(params) {
        return this.get('dapi/v1/constituents', params);
    }
    /**
     * possibly @deprecated
     * Only in old documentation, not in new one
     **/
    getQuarterlyContractSettlementPrices(params) {
        return this.get('futures/data/delivery-price', params);
    }
    /**
     *
     * Trade Endpoints
     *
     **/
    submitNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('dapi/v1/order', params);
    }
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
     *
     * Known issue: `quantity` and `price` should be sent as strings
     */
    submitMultipleOrders(orders) {
        const stringOrders = orders.map((order) => {
            const orderToStringify = Object.assign({}, order);
            this.validateOrderId(orderToStringify, 'newClientOrderId');
            return JSON.stringify(orderToStringify);
        });
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.postPrivate('dapi/v1/batchOrders', requestBody);
    }
    /**
     * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
     */
    modifyOrder(params) {
        return this.putPrivate('dapi/v1/order', params);
    }
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
     */
    modifyMultipleOrders(orders) {
        const stringOrders = orders.map((order) => {
            const orderToStringify = Object.assign({}, order);
            return JSON.stringify(orderToStringify);
        });
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.putPrivate('dapi/v1/batchOrders', requestBody);
    }
    getOrderModifyHistory(params) {
        return this.getPrivate('dapi/v1/orderAmendment', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('dapi/v1/order', params);
    }
    cancelMultipleOrders(params) {
        const requestParams = Object.assign({}, params);
        if (params.orderIdList) {
            requestParams['orderIdList'] = JSON.stringify(params.orderIdList);
        }
        if (params.origClientOrderIdList) {
            requestParams['origClientOrderIdList'] = JSON.stringify(params.origClientOrderIdList);
        }
        return this.deletePrivate('dapi/v1/batchOrders', requestParams);
    }
    cancelAllOpenOrders(params) {
        return this.deletePrivate('dapi/v1/allOpenOrders', params);
    }
    // Auto-cancel all open orders
    setCancelOrdersOnTimeout(params) {
        return this.postPrivate('dapi/v1/countdownCancelAll', params);
    }
    getOrder(params) {
        return this.getPrivate('dapi/v1/order', params);
    }
    getAllOrders(params) {
        return this.getPrivate('dapi/v1/allOrders', params);
    }
    getAllOpenOrders(params) {
        return this.getPrivate('dapi/v1/openOrders', params);
    }
    getCurrentOpenOrder(params) {
        return this.getPrivate('dapi/v1/openOrder', params);
    }
    getForceOrders(params) {
        return this.getPrivate('dapi/v1/forceOrders', params);
    }
    getAccountTrades(params) {
        return this.getPrivate('dapi/v1/userTrades', params);
    }
    getPositions(params) {
        return this.getPrivate('dapi/v1/positionRisk', params);
    }
    setPositionMode(params) {
        return this.postPrivate('dapi/v1/positionSide/dual', params);
    }
    setMarginType(params) {
        return this.postPrivate('dapi/v1/marginType', params);
    }
    setLeverage(params) {
        return this.postPrivate('dapi/v1/leverage', params);
    }
    getADLQuantileEstimation(params) {
        return this.getPrivate('dapi/v1/adlQuantile', params);
    }
    setIsolatedPositionMargin(params) {
        return this.postPrivate('dapi/v1/positionMargin', params);
    }
    getPositionMarginChangeHistory(params) {
        return this.getPrivate('dapi/v1/positionMargin/history', params);
    }
    /**
     *
     * Account Endpoints
     *
     **/
    getBalance() {
        return this.getPrivate('dapi/v1/balance');
    }
    /**
     * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
     */
    getAccountComissionRate(params) {
        return this.getPrivate('dapi/v1/commissionRate', params);
    }
    getAccountCommissionRate(params) {
        return this.getPrivate('dapi/v1/commissionRate', params);
    }
    getAccountInformation() {
        return this.getPrivate('dapi/v1/account');
    }
    /**
     * Notional Bracket for Symbol (NOT "pair")
     */
    getNotionalAndLeverageBrackets(params) {
        return this.getPrivate('dapi/v2/leverageBracket', params);
    }
    // TO ADD: dapi/v1/leverageBracket
    // can use dapi/v2/leverageBracket
    getCurrentPositionMode() {
        return this.getPrivate('dapi/v1/positionSide/dual');
    }
    getIncomeHistory(params) {
        return this.getPrivate('dapi/v1/income', params);
    }
    getDownloadIdForFuturesTransactionHistory(params) {
        return this.getPrivate('dapi/v1/income/asyn', params);
    }
    getFuturesTransactionHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/income/asyn/id', params);
    }
    getDownloadIdForFuturesOrderHistory(params) {
        return this.getPrivate('dapi/v1/order/asyn', params);
    }
    getFuturesOrderHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/order/asyn/id', params);
    }
    getDownloadIdForFuturesTradeHistory(params) {
        return this.getPrivate('dapi/v1/trade/asyn', params);
    }
    getFuturesTradeHistoryDownloadLink(params) {
        return this.getPrivate('dapi/v1/trade/asyn/id', params);
    }
    /**
     *
     * Portfolio Margin Endpoints
     *
     **/
    getClassicPortfolioMarginAccount(params) {
        return this.getPrivate('dapi/v1/pmAccountInfo', params);
    }
    /**
     * @deprecated at 6th August, 2024
     **/
    getClassicPortfolioMarginNotionalLimits(params) {
        return this.getPrivate('dapi/v1/pmExchangeInfo', params);
    }
    /**
     *
     * Broker Futures Endpoints
     * Possibly @deprecated, found only in old docs
     * All broker endpoints start with /sapi/v1/broker or sapi/v2/broker or sapi/v3/broker
     *
     **/
    /**
     * @deprecated
     **/
    getBrokerIfNewFuturesUser(brokerId, type = 1) {
        return this.getPrivate('dapi/v1/apiReferral/ifNewUser', {
            brokerId,
            type,
        });
    }
    /**
     * @deprecated
     **/
    setBrokerCustomIdForClient(customerId, email) {
        return this.postPrivate('dapi/v1/apiReferral/customization', {
            customerId,
            email,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerClientCustomIds(customerId, email, page, limit) {
        return this.getPrivate('dapi/v1/apiReferral/customization', {
            customerId,
            email,
            page,
            limit,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerUserCustomId(brokerId) {
        return this.getPrivate('dapi/v1/apiReferral/userCustomization', {
            brokerId,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerRebateDataOverview(type = 1) {
        return this.getPrivate('dapi/v1/apiReferral/overview', {
            type,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerUserTradeVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/tradeVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerRebateVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/rebateVol', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerTradeDetail(type = 1, startTime, endTime, limit) {
        return this.getPrivate('dapi/v1/apiReferral/traderSummary', {
            type,
            startTime,
            endTime,
            limit,
        });
    }
    /**
     *
     * User Data Stream Endpoints
     *
     **/
    getFuturesUserDataListenKey() {
        return this.post('dapi/v1/listenKey');
    }
    keepAliveFuturesUserDataListenKey() {
        return this.put('dapi/v1/listenKey');
    }
    closeFuturesUserDataListenKey() {
        return this.delete('dapi/v1/listenKey');
    }
    /**
     * Validate syntax meets requirements set by binance. Log warning if not.
     */
    validateOrderId(params, orderIdProperty) {
        return;
    }
}
exports.CoinMClient = CoinMClient;
//# sourceMappingURL=coinm-client.js.map