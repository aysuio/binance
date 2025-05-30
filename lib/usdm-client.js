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
exports.USDMClient = void 0;
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
const requestUtils_1 = require("./util/requestUtils");
class USDMClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}, useTestnet) {
        const clientId = useTestnet ? 'usdmtest' : 'usdm';
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
     * MARKET DATA endpoints - Rest API
     *
     **/
    testConnectivity() {
        return this.get('fapi/v1/ping');
    }
    getExchangeInfo() {
        return this.get('fapi/v1/exchangeInfo');
    }
    getOrderBook(params) {
        return this.get('fapi/v1/depth', params);
    }
    getRecentTrades(params) {
        return this.get('fapi/v1/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('fapi/v1/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('fapi/v1/aggTrades', params);
    }
    getKlines(params) {
        return this.get('fapi/v1/klines', params);
    }
    getContinuousContractKlines(params) {
        return this.get('fapi/v1/continuousKlines', params);
    }
    getIndexPriceKlines(params) {
        return this.get('fapi/v1/indexPriceKlines', params);
    }
    getMarkPriceKlines(params) {
        return this.get('fapi/v1/markPriceKlines', params);
    }
    getPremiumIndexKlines(params) {
        return this.get('fapi/v1/premiumIndexKlines', params);
    }
    getMarkPrice(params) {
        return this.get('fapi/v1/premiumIndex', params);
    }
    getFundingRateHistory(params) {
        return this.get('fapi/v1/fundingRate', params);
    }
    getFundingRates() {
        return this.get('fapi/v1/fundingInfo');
    }
    /**
     * @deprecated use get24hrChangeStatistics() instead (method without the typo)
     */
    get24hrChangeStatististics(params) {
        return this.get('fapi/v1/ticker/24hr', params);
    }
    get24hrChangeStatistics(params) {
        return this.get('fapi/v1/ticker/24hr', params);
    }
    getSymbolPriceTicker(params) {
        return this.get('fapi/v1/ticker/price', params);
    }
    getSymbolPriceTickerV2(params) {
        return this.get('fapi/v2/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        return this.get('fapi/v1/ticker/bookTicker', params);
    }
    getQuarterlyContractSettlementPrices(params) {
        return this.get('futures/data/delivery-price', params);
    }
    getOpenInterest(params) {
        return this.get('fapi/v1/openInterest', params);
    }
    getOpenInterestStatistics(params) {
        return this.get('futures/data/openInterestHist', params);
    }
    getTopTradersLongShortPositionRatio(params) {
        return this.get('futures/data/topLongShortPositionRatio', params);
    }
    getTopTradersLongShortAccountRatio(params) {
        return this.get('futures/data/topLongShortAccountRatio', params);
    }
    getGlobalLongShortAccountRatio(params) {
        return this.get('futures/data/globalLongShortAccountRatio', params);
    }
    getTakerBuySellVolume(params) {
        return this.get('futures/data/takerlongshortRatio', params);
    }
    getHistoricalBlvtNavKlines(params) {
        return this.get('fapi/v1/lvtKlines', params);
    }
    getCompositeSymbolIndex(params) {
        return this.get('fapi/v1/indexInfo', params);
    }
    getMultiAssetsModeAssetIndex(params) {
        return this.get('fapi/v1/assetIndex', params);
    }
    /**
     * Possibly @deprecated, found only in old docs
     **/
    getBasis(params) {
        return this.get('futures/data/basis', params);
    }
    getIndexPriceConstituents(params) {
        return this.get('fapi/v1/constituents', params);
    }
    getInsuranceFundBalance(params) {
        return this.get('fapi/v1/insuranceBalance', params);
    }
    /**
     *
     * TRADE endpoints - Rest API
     *
     **/
    submitNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('fapi/v1/order', params);
    }
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns
     * individual errors in the response array if any orders were rejected.
     *
     * Note: this method will automatically ensure "price" and "quantity" are sent as a
     * string, if present in the request. See #523 & #526 for more details.
     */
    submitMultipleOrders(orders) {
        const stringOrders = orders.map((order) => {
            const orderToStringify = Object.assign({}, order);
            // Known issue: `quantity` and `price` should be sent as strings, see #523, #526
            const price = orderToStringify['price'];
            if (price && typeof price == 'number') {
                orderToStringify['price'] = `${price}`;
            }
            const quantity = orderToStringify['quantity'];
            if (quantity && typeof quantity == 'number') {
                orderToStringify['quantity'] = `${quantity}`;
            }
            this.validateOrderId(orderToStringify, 'newClientOrderId');
            return JSON.stringify(orderToStringify);
        });
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.postPrivate('fapi/v1/batchOrders', requestBody);
    }
    /**
     * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
     */
    modifyOrder(params) {
        return this.putPrivate('fapi/v1/order', params);
    }
    modifyMultipleOrders(orders) {
        const stringOrders = orders.map((order) => JSON.stringify(order));
        const requestBody = {
            batchOrders: `[${stringOrders.join(',')}]`,
        };
        return this.putPrivate('fapi/v1/batchOrders', requestBody);
    }
    getOrderModifyHistory(params) {
        return this.getPrivate('fapi/v1/orderAmendment', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('fapi/v1/order', params);
    }
    cancelMultipleOrders(params) {
        const requestParams = Object.assign({}, params);
        if (params.orderIdList) {
            requestParams['orderIdList'] = JSON.stringify(params.orderIdList);
        }
        if (params.origClientOrderIdList) {
            requestParams['origClientOrderIdList'] = JSON.stringify(params.origClientOrderIdList);
        }
        return this.deletePrivate('fapi/v1/batchOrders', requestParams);
    }
    cancelAllOpenOrders(params) {
        return this.deletePrivate('fapi/v1/allOpenOrders', params);
    }
    // Auto-cancel all open orders
    setCancelOrdersOnTimeout(params) {
        return this.postPrivate('fapi/v1/countdownCancelAll', params);
    }
    getOrder(params) {
        return this.getPrivate('fapi/v1/order', params);
    }
    getAllOrders(params) {
        return this.getPrivate('fapi/v1/allOrders', params);
    }
    getAllOpenOrders(params) {
        return this.getPrivate('fapi/v1/openOrders', params);
    }
    getCurrentOpenOrder(params) {
        return this.getPrivate('fapi/v1/openOrder', params);
    }
    getForceOrders(params) {
        return this.getPrivate('fapi/v1/forceOrders', params);
    }
    getAccountTrades(params) {
        return this.getPrivate('fapi/v1/userTrades', params);
    }
    setMarginType(params) {
        return this.postPrivate('fapi/v1/marginType', params);
    }
    setPositionMode(params) {
        return this.postPrivate('fapi/v1/positionSide/dual', params);
    }
    setLeverage(params) {
        return this.postPrivate('fapi/v1/leverage', params);
    }
    setMultiAssetsMode(params) {
        return this.postPrivate('fapi/v1/multiAssetsMargin', params);
    }
    setIsolatedPositionMargin(params) {
        return this.postPrivate('fapi/v1/positionMargin', params);
    }
    /**
     * @deprecated
     * Use getPositionsV3() instead
     **/
    getPositions(params) {
        return this.getPrivate('fapi/v2/positionRisk', params);
    }
    getPositionsV3(params) {
        return this.getPrivate('fapi/v3/positionRisk', params);
    }
    getADLQuantileEstimation(params) {
        return this.getPrivate('fapi/v1/adlQuantile', params);
    }
    getPositionMarginChangeHistory(params) {
        return this.getPrivate('fapi/v1/positionMargin/history', params);
    }
    /**
     *
     * ACCOUNT endpoints - Rest API
     *
     **/
    getBalanceV3() {
        return this.getPrivate('fapi/v3/balance');
    }
    /**
     * @deprecated
     * Use getBalanceV3() instead
     **/
    getBalance() {
        return this.getPrivate('fapi/v2/balance');
    }
    getAccountInformationV3() {
        return this.getPrivate('fapi/v3/account');
    }
    /**
     * @deprecated
     * Use getAccountInformationV3() instead
     **/
    getAccountInformation() {
        return this.getPrivate('fapi/v2/account');
    }
    /**
     * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
     */
    getAccountComissionRate(params) {
        return this.getPrivate('fapi/v1/commissionRate', params);
    }
    getAccountCommissionRate(params) {
        return this.getPrivate('fapi/v1/commissionRate', params);
    }
    getFuturesAccountConfig() {
        return this.getPrivate('fapi/v1/accountConfig');
    }
    getFuturesSymbolConfig(params) {
        return this.getPrivate('fapi/v1/symbolConfig', params);
    }
    getUserForceOrders() {
        return this.getPrivate('fapi/v1/rateLimit/order');
    }
    /**
     * Contrary to what the docs say - if symbol is provided, this returns an array with length 1 (assuming the symbol exists)
     */
    getNotionalAndLeverageBrackets(params) {
        return this.getPrivate('fapi/v1/leverageBracket', params);
    }
    getMultiAssetsMode() {
        return this.getPrivate('fapi/v1/multiAssetsMargin');
    }
    getCurrentPositionMode() {
        return this.getPrivate('fapi/v1/positionSide/dual');
    }
    getIncomeHistory(params) {
        return this.getPrivate('fapi/v1/income', params);
    }
    getApiQuantitativeRulesIndicators(params) {
        return this.getPrivate('fapi/v1/apiTradingStatus', params);
    }
    getFuturesTransactionHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/income/asyn', params);
    }
    getFuturesTransactionHistoryDownloadLink(params) {
        return this.getPrivate('fapi/v1/income/asyn/id', params);
    }
    getFuturesOrderHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/order/asyn', params);
    }
    getFuturesOrderHistoryDownloadLink(params) {
        return this.getPrivate('fapi/v1/order/asyn/id', params);
    }
    getFuturesTradeHistoryDownloadId(params) {
        return this.getPrivate('fapi/v1/trade/asyn', params);
    }
    getFuturesTradeDownloadLink(params) {
        return this.getPrivate('fapi/v1/trade/asyn/id', params);
    }
    setBNBBurnEnabled(params) {
        return this.postPrivate('fapi/v1/feeBurn', params);
    }
    getBNBBurnStatus() {
        return this.getPrivate('fapi/v1/feeBurn');
    }
    testOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('fapi/v1/order/test', params);
    }
    /**
     *
     * Convert Endpoints
     *
     **/
    getAllConvertPairs(params) {
        return this.get('fapi/v1/convert/exchangeInfo', params);
    }
    submitConvertQuoteRequest(params) {
        return this.postPrivate('fapi/v1/convert/getQuote', params);
    }
    acceptConvertQuote(params) {
        return this.postPrivate('fapi/v1/convert/acceptQuote', params);
    }
    getConvertOrderStatus(params) {
        return this.getPrivate('fapi/v1/convert/orderStatus', params);
    }
    /**
     *
     * Portfolio Margin Pro Endpoints
     *
     **/
    getPortfolioMarginProAccountInfo(params) {
        return this.getPrivate('fapi/v1/pmAccountInfo', params);
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
        return this.getPrivate('fapi/v1/apiReferral/ifNewUser', {
            brokerId,
            type,
        });
    }
    /**
     * @deprecated
     **/
    setBrokerCustomIdForClient(customerId, email) {
        return this.postPrivate('fapi/v1/apiReferral/customization', {
            customerId,
            email,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerClientCustomIds(customerId, email, page, limit) {
        return this.getPrivate('fapi/v1/apiReferral/customization', {
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
        return this.getPrivate('fapi/v1/apiReferral/userCustomization', {
            brokerId,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerRebateDataOverview(type = 1) {
        return this.getPrivate('fapi/v1/apiReferral/overview', {
            type,
        });
    }
    /**
     * @deprecated
     **/
    getBrokerUserTradeVolume(type = 1, startTime, endTime, limit) {
        return this.getPrivate('fapi/v1/apiReferral/tradeVol', {
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
        return this.getPrivate('fapi/v1/apiReferral/rebateVol', {
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
        return this.getPrivate('fapi/v1/apiReferral/traderSummary', {
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
    // USD-M Futures
    getFuturesUserDataListenKey() {
        return this.post('fapi/v1/listenKey');
    }
    keepAliveFuturesUserDataListenKey() {
        return this.put('fapi/v1/listenKey');
    }
    closeFuturesUserDataListenKey() {
        return this.delete('fapi/v1/listenKey');
    }
    /**
     * Validate syntax meets requirements set by binance. Log warning if not.
     */
    validateOrderId(params, orderIdProperty) {
        return;
    }
}
exports.USDMClient = USDMClient;
//# sourceMappingURL=usdm-client.js.map