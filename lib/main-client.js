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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotClient = exports.MainClient = void 0;
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
const requestUtils_1 = require("./util/requestUtils");
class MainClient extends BaseRestClient_1.default {
    constructor(restClientOptions = {}, requestOptions = {}) {
        super('spot1', restClientOptions, requestOptions);
        return this;
    }
    /**
     * This method is used to get the latency and time sync between the client and the server.
     * This is not official API endpoint and is only used for internal testing purposes.
     * Use this method to check the latency and time sync between the client and the server.
     * Final values might vary slightly, but it should be within few ms difference.
     * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
     */
    fetchLatencySummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientTimeReqStart = Date.now();
            const serverTime = yield this.getServerTime();
            const clientTimeReqEnd = Date.now();
            console.log('serverTime', serverTime);
            const serverTimeMs = serverTime;
            const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
            const estimatedOneWayLatency = Math.floor(roundTripTime / 2);
            // Adjust server time by adding estimated one-way latency
            const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;
            // Calculate time difference between adjusted server time and local time
            const timeDifference = adjustedServerTime - clientTimeReqEnd;
            const result = {
                localTime: clientTimeReqEnd,
                serverTime: serverTimeMs,
                roundTripTime,
                estimatedOneWayLatency,
                adjustedServerTime,
                timeDifference,
            };
            console.log('Time synchronization results:');
            console.log(result);
            console.log(`Your approximate latency to exchange server:
    One way: ${estimatedOneWayLatency}ms.
    Round trip: ${roundTripTime}ms.
    `);
            if (Math.abs(timeDifference) > 500) {
                console.warn(`WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
      Consider adjusting your system clock to avoid unwanted clock sync errors!
      Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`);
            }
            else {
                console.log(`Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`);
            }
            return result;
        });
    }
    /**
     * Abstraction required by each client to aid with time sync / drift handling
     */
    getServerTime(baseUrlKeyOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrlKey = baseUrlKeyOverride || this.getBaseUrlKey();
            const endpoint = (0, requestUtils_1.getServerTimeEndpoint)(baseUrlKey);
            const response = yield this.getForBaseUrl(endpoint, baseUrlKey);
            return response.serverTime;
        });
    }
    /**
     *
     * SPOT TRADING Endpoints - General endpoints
     *
     **/
    testConnectivity() {
        return this.get('api/v3/ping');
    }
    getExchangeInfo(params) {
        const symbols = (params === null || params === void 0 ? void 0 : params.symbols) && JSON.stringify(params.symbols);
        const symbol = params === null || params === void 0 ? void 0 : params.symbol;
        let urlSuffix = '';
        if (symbol) {
            urlSuffix += '?symbol=' + symbol;
        }
        else if (symbols) {
            urlSuffix += '?symbols=' + symbols;
        }
        return this.get('api/v3/exchangeInfo' + urlSuffix);
    }
    /**
     *
     * SPOT TRADING Endpoints - Market endpoints
     *
     **/
    getOrderBook(params) {
        return this.get('api/v3/depth', params);
    }
    getRecentTrades(params) {
        return this.get('api/v3/trades', params);
    }
    getHistoricalTrades(params) {
        return this.get('api/v3/historicalTrades', params);
    }
    getAggregateTrades(params) {
        return this.get('api/v3/aggTrades', params);
    }
    getKlines(params) {
        return this.get('api/v3/klines', params);
    }
    getUIKlines(params) {
        return this.get('api/v3/uiKlines', params);
    }
    getAvgPrice(params) {
        return this.get('api/v3/avgPrice', params);
    }
    /**
     * @deprecated due to invalid naming
     * Use get24hrChangeStatistics instead
     */
    get24hrChangeStatististics(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/24hr?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker/24hr', params);
    }
    get24hrChangeStatistics(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/24hr?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker/24hr', params);
    }
    getTradingDayTicker(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/tradingDay?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker/tradingDay', params);
    }
    getSymbolPriceTicker(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/price?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker/price', params);
    }
    getSymbolOrderBookTicker(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker/bookTicker?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker/bookTicker', params);
    }
    getRollingWindowTicker(params) {
        if (params && params['symbols'] && Array.isArray(params['symbols'])) {
            const { symbols } = params, otherParams = __rest(params, ["symbols"]);
            const symbolsQueryParam = JSON.stringify(symbols);
            return this.get('api/v3/ticker?symbols=' + symbolsQueryParam, otherParams);
        }
        return this.get('api/v3/ticker', params);
    }
    /**
     *
     * SPOT TRADING Endpoints - Trading endpoints
     *
     **/
    submitNewOrder(params) {
        // this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/order', params);
    }
    testNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/order/test', params);
    }
    getOrder(params) {
        return this.getPrivate('api/v3/order', params);
    }
    cancelOrder(params) {
        return this.deletePrivate('api/v3/order', params);
    }
    cancelAllSymbolOrders(params) {
        return this.deletePrivate('api/v3/openOrders', params);
    }
    replaceOrder(params) {
        return this.postPrivate('api/v3/order/cancelReplace', params);
    }
    /**
     * Reduce the quantity of an existing open order while keeping its priority in the order book.
     * The new quantity must be less than the current quantity.
     * https://binance-docs.github.io/apidocs/futures/en/#order-amend-keep-priority-trade
     */
    amendOrderKeepPriority(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.putPrivate('fapi/v1/order/amend/keepPriority', params);
    }
    getOpenOrders(params) {
        return this.getPrivate('api/v3/openOrders', params);
    }
    getAllOrders(params) {
        return this.getPrivate('api/v3/allOrders', params);
    }
    /**
     * @deprecated
     */
    submitNewOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'limitClientOrderId');
        this.validateOrderId(params, 'stopClientOrderId');
        return this.postPrivate('api/v3/order/oco', params);
    }
    submitNewOrderList(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'aboveClientOrderId');
        this.validateOrderId(params, 'belowClientOrderId');
        return this.postPrivate('api/v3/orderList/oco', params);
    }
    submitNewOrderListOTO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingClientOrderId');
        return this.postPrivate('api/v3/orderList/oto', params);
    }
    submitNewOrderListOTOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingAboveClientOrderId');
        this.validateOrderId(params, 'pendingBelowClientOrderId');
        return this.postPrivate('api/v3/orderList/otoco', params);
    }
    cancelOCO(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.deletePrivate('api/v3/orderList', params);
    }
    getOCO(params) {
        return this.getPrivate('api/v3/orderList', params);
    }
    getAllOCO(params) {
        return this.getPrivate('api/v3/allOrderList', params);
    }
    /**
     * Query open OCO
     */
    getAllOpenOCO() {
        return this.getPrivate('api/v3/openOrderList');
    }
    /**
     * Places an order using smart order routing (SOR).
     */
    submitNewSOROrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/sor/order', params);
    }
    /**
     * Test new order creation and signature/recvWindow using smart order routing (SOR).
     * Creates and validates a new order but does not send it into the matching engine.
     */
    testNewSOROrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('api/v3/sor/order/test', params);
    }
    /**
     *
     * SPOT TRADING Endpoints - Account endpoints
     *
     **/
    /**
     * Get current account information
     */
    getAccountInformation(params) {
        return this.getPrivate('api/v3/account', params);
    }
    getAccountTradeList(params) {
        return this.getPrivate('api/v3/myTrades', params);
    }
    getOrderRateLimit() {
        return this.getPrivate('api/v3/rateLimit/order');
    }
    getPreventedMatches(params) {
        return this.getPrivate('api/v3/myPreventedMatches', params);
    }
    getAllocations(params) {
        return this.getPrivate('api/v3/myAllocations', params);
    }
    getCommissionRates(params) {
        return this.getPrivate('api/v3/account/commission', params);
    }
    /**
     *
     * MARGIN TRADING Endpoints - Market Data endpoints
     *
     **/
    getCrossMarginCollateralRatio() {
        return this.getPrivate('sapi/v1/margin/crossMarginCollateralRatio');
    }
    getAllCrossMarginPairs() {
        return this.get('sapi/v1/margin/allPairs');
    }
    getIsolatedMarginAllSymbols(params) {
        return this.getPrivate('sapi/v1/margin/isolated/allPairs', params);
    }
    getAllMarginAssets() {
        return this.get('sapi/v1/margin/allAssets');
    }
    getMarginDelistSchedule() {
        return this.getPrivate('sapi/v1/margin/delist-schedule');
    }
    getIsolatedMarginTierData(params) {
        return this.getPrivate('sapi/v1/margin/isolatedMarginTier', params);
    }
    queryMarginPriceIndex(params) {
        return this.get('sapi/v1/margin/priceIndex', params);
    }
    getMarginAvailableInventory(params) {
        return this.getPrivate('sapi/v1/margin/available-inventory', params);
    }
    getLeverageBracket() {
        return this.getPrivate('sapi/v1/margin/leverageBracket');
    }
    /**
     *
     * MARGIN TRADING Endpoints - Borrow and Repay endpoints
     *
     **/
    getNextHourlyInterestRate(params) {
        return this.getPrivate('sapi/v1/margin/next-hourly-interest-rate', params);
    }
    getMarginInterestHistory(params) {
        return this.getPrivate('sapi/v1/margin/interestHistory', params);
    }
    submitMarginAccountBorrowRepay(params) {
        return this.postPrivate('sapi/v1/margin/borrow-repay', params);
    }
    getMarginAccountBorrowRepayRecords(params) {
        return this.getPrivate('sapi/v1/margin/borrow-repay', params);
    }
    getMarginInterestRateHistory(params) {
        return this.getPrivate('sapi/v1/margin/interestRateHistory', params);
    }
    queryMaxBorrow(params) {
        return this.getPrivate('sapi/v1/margin/maxBorrowable', params);
    }
    /**
     *
     * MARGIN TRADING Endpoints - Trade endpoints
     *
     **/
    getMarginForceLiquidationRecord(params) {
        return this.getPrivate('sapi/v1/margin/forceLiquidationRec', params);
    }
    getSmallLiabilityExchangeCoins() {
        return this.getPrivate('sapi/v1/margin/exchange-small-liability');
    }
    getSmallLiabilityExchangeHistory(params) {
        return this.getPrivate('sapi/v1/margin/exchange-small-liability-history', params);
    }
    marginAccountCancelOpenOrders(params) {
        return this.deletePrivate('sapi/v1/margin/openOrders', params);
    }
    marginAccountCancelOCO(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.deletePrivate('sapi/v1/margin/orderList', params);
    }
    marginAccountCancelOrder(params) {
        return this.deletePrivate('sapi/v1/margin/order', params);
    }
    marginAccountNewOCO(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'limitClientOrderId');
        this.validateOrderId(params, 'stopClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/oco', params);
    }
    marginAccountNewOrder(params) {
        this.validateOrderId(params, 'newClientOrderId');
        return this.postPrivate('sapi/v1/margin/order', params);
    }
    getMarginOrderCountUsage(params) {
        return this.getPrivate('sapi/v1/margin/rateLimit/order', params);
    }
    queryMarginAccountAllOCO(params) {
        return this.getPrivate('sapi/v1/margin/allOrderList', params);
    }
    queryMarginAccountAllOrders(params) {
        return this.getPrivate('sapi/v1/margin/allOrders', params);
    }
    queryMarginAccountOCO(params) {
        return this.getPrivate('sapi/v1/margin/orderList', params);
    }
    queryMarginAccountOpenOCO(params) {
        return this.getPrivate('sapi/v1/margin/openOrderList', params);
    }
    queryMarginAccountOpenOrders(params) {
        return this.getPrivate('sapi/v1/margin/openOrders', params);
    }
    queryMarginAccountOrder(params) {
        return this.getPrivate('sapi/v1/margin/order', params);
    }
    queryMarginAccountTradeList(params) {
        return this.getPrivate('sapi/v1/margin/myTrades', params);
    }
    submitSmallLiabilityExchange(params) {
        return this.postPrivate('sapi/v1/margin/exchange-small-liability', params);
    }
    submitManualLiquidation(params) {
        return this.postPrivate('sapi/v1/margin/manual-liquidation', params);
    }
    /**
     * Post a new OTO order for margin account
     */
    submitMarginOTOOrder(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/oto', params);
    }
    /**
     * Submit a new OTOCO order for margin account
     */
    submitMarginOTOCOOrder(params) {
        this.validateOrderId(params, 'listClientOrderId');
        this.validateOrderId(params, 'workingClientOrderId');
        this.validateOrderId(params, 'pendingAboveClientOrderId');
        this.validateOrderId(params, 'pendingBelowClientOrderId');
        return this.postPrivate('sapi/v1/margin/order/otoco', params);
    }
    /**
     * Create a special key for low-latency trading (VIP 4+ only)
     */
    createMarginSpecialLowLatencyKey(params) {
        return this.postPrivate('sapi/v1/margin/apiKey', params);
    }
    deleteMarginSpecialLowLatencyKey(params) {
        return this.deletePrivate('sapi/v1/margin/apiKey', params);
    }
    updateMarginIPForSpecialLowLatencyKey(params) {
        return this.putPrivate('sapi/v1/margin/apiKey/ip', params);
    }
    /**
     * Query the list of special keys for low-latency trading
     */
    getMarginSpecialLowLatencyKeys(params) {
        return this.getPrivate('sapi/v1/margin/api-key-list', params);
    }
    /**
     * Query information for a specific special key used in low-latency trading
     */
    getMarginSpecialLowLatencyKey(params) {
        return this.getPrivate('sapi/v1/margin/apiKey', params);
    }
    /**
     *
     * MARGIN TRADING Endpoints - Transfer endpoints
     *
     **/
    getCrossMarginTransferHistory(params) {
        return this.getPrivate('sapi/v1/margin/transfer', params);
    }
    queryMaxTransferOutAmount(params) {
        return this.getPrivate('sapi/v1/margin/maxTransferable', params);
    }
    /**
     *
     * MARGIN TRADING Endpoints - Account endpoints
     *
     **/
    updateCrossMarginMaxLeverage(params) {
        return this.postPrivate('sapi/v1/margin/max-leverage', params);
    }
    disableIsolatedMarginAccount(params) {
        return this.deletePrivate('sapi/v1/margin/isolated/account', params);
    }
    enableIsolatedMarginAccount(params) {
        return this.postPrivate('sapi/v1/margin/isolated/account', params);
    }
    getBNBBurn() {
        return this.getPrivate('sapi/v1/bnbBurn');
    }
    getMarginSummary() {
        return this.getPrivate('sapi/v1/margin/tradeCoeff');
    }
    queryCrossMarginAccountDetails() {
        return this.getPrivate('sapi/v1/margin/account');
    }
    getCrossMarginFeeData(params) {
        return this.getPrivate('sapi/v1/margin/crossMarginData', params);
    }
    getIsolatedMarginAccountLimit() {
        return this.getPrivate('sapi/v1/margin/isolated/accountLimit');
    }
    getIsolatedMarginAccountInfo(params) {
        return this.getPrivate('sapi/v1/margin/isolated/account', params);
    }
    getIsolatedMarginFeeData(params) {
        return this.getPrivate('sapi/v1/margin/isolatedMarginData', params);
    }
    toggleBNBBurn(params) {
        return this.postPrivate('sapi/v1/bnbBurn', params);
    }
    /**
     * Possibly @deprecated
     * Only existing in old documentation, not in new documentation
     */
    getMarginCapitalFlow(params) {
        return this.getPrivate('sapi/v1/margin/capital-flow', params);
    }
    /**
     * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
     */
    queryLoanRecord(params) {
        return this.getPrivate('sapi/v1/margin/loan', params);
    }
    /**
     * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
     */
    queryRepayRecord(params) {
        return this.getPrivate('sapi/v1/margin/repay', params);
    }
    /**
     * @deprecated on 2024-01-09, use submitUniversalTransfer() instead
     */
    isolatedMarginAccountTransfer(params) {
        return this.postPrivate('sapi/v1/margin/isolated/transfer', params);
    }
    /**
     *
     * WALLET Endpoints - Capital endpoints
     *
     **/
    getBalances() {
        return this.getPrivate('sapi/v1/capital/config/getall');
    }
    withdraw(params) {
        return this.postPrivate('sapi/v1/capital/withdraw/apply', params);
    }
    getWithdrawHistory(params) {
        return this.getPrivate('sapi/v1/capital/withdraw/history', params);
    }
    getWithdrawAddresses() {
        return this.getPrivate('sapi/v1/capital/withdraw/address/list');
    }
    getDepositHistory(params) {
        return this.getPrivate('sapi/v1/capital/deposit/hisrec', params);
    }
    getDepositAddress(params) {
        return this.getPrivate('sapi/v1/capital/deposit/address', params);
    }
    getDepositAddresses(params) {
        return this.getPrivate('sapi/v1/capital/deposit/address/list', params);
    }
    submitDepositCredit(params) {
        return this.postPrivate('sapi/v1/capital/deposit/credit-apply', params);
    }
    /**
     * @deprecated - deleted as of 2024-11-21
     */
    getAutoConvertStablecoins() {
        return this.getPrivate('sapi/v1/capital/contract/convertible-coins');
    }
    /**
     * @deprecated - deleted as of 2024-11-21
     */
    setConvertibleCoins(params) {
        return this.postPrivate('sapi/v1/capital/contract/convertible-coins', params);
    }
    /**
     *
     * WALLET Endpoints - Asset endpoints
     *
     **/
    getAssetDetail(params) {
        return this.getPrivate('sapi/v1/asset/assetDetail', params);
    }
    getWalletBalances(params) {
        return this.getPrivate('sapi/v1/asset/wallet/balance', params);
    }
    getUserAsset(params) {
        return this.postPrivate('sapi/v3/asset/getUserAsset', params);
    }
    submitUniversalTransfer(params) {
        return this.postPrivate('sapi/v1/asset/transfer', params);
    }
    getUniversalTransferHistory(params) {
        return this.getPrivate('sapi/v1/asset/transfer', params);
    }
    getDust(params) {
        return this.postPrivate('sapi/v1/asset/dust-btc', params);
    }
    convertDustToBnb(params) {
        return this.postPrivate('sapi/v1/asset/dust', params);
    }
    getDustLog(params) {
        return this.getPrivate('sapi/v1/asset/dribblet', params);
    }
    getAssetDividendRecord(params) {
        return this.getPrivate('sapi/v1/asset/assetDividend', params);
    }
    getTradeFee(params) {
        return this.getPrivate('sapi/v1/asset/tradeFee', params);
    }
    getFundingAsset(params) {
        return this.postPrivate('sapi/v1/asset/get-funding-asset', params);
    }
    getCloudMiningHistory(params) {
        return this.getPrivate('sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage', params);
    }
    getDelegationHistory(params) {
        return this.getPrivate('sapi/v1/asset/custody/transfer-history', params);
    }
    /**
     *
     * Futures Management Endpoints:
     * https://binance-docs.github.io/apidocs/spot/en/#futures
     *
     * Note: to trade futures use the usdm-client or coinm-client.
     * MainClient only has the futures endpoints listed in the "spot" docs category, primarily used for transfers.
     *
     **/
    /**
     * Execute transfer between spot account and futures account.
     *
     * Type:
     * - 1: transfer from spot account to USDT-Ⓜ futures account.
     * - 2: transfer from USDT-Ⓜ futures account to spot account.
     * - 3: transfer from spot account to COIN-Ⓜ futures account.
     * - 4: transfer from COIN-Ⓜ futures account to spot account.
     */
    /**
     * Possibly @deprecated, found only in old docs only
     * Use sapi/v1/asset/transfer instead
     */
    submitNewFutureAccountTransfer(params) {
        return this.postPrivate('sapi/v1/futures/transfer', params);
    }
    /**
     * Possibly @deprecated, found only in old docs only
     * Use sapi/v1/asset/transfer instead
     */
    getFutureAccountTransferHistory(params) {
        return this.getPrivate('sapi/v1/futures/transfer', params);
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralBorrowHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/borrow/history', params);
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/repay/history', params);
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralWalletV2() {
        return this.getPrivate('sapi/v2/futures/loan/wallet');
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getAdjustCrossCollateralLTVHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/adjustCollateral/history', params);
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralLiquidationHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/liquidationHistory', params);
    }
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralInterestHistory(params) {
        return this.getPrivate('sapi/v1/futures/loan/interestHistory', params);
    }
    /**
     *
     * WALLET Endpoints - Account endpoints
     *
     **/
    getAccountInfo() {
        return this.getPrivate('sapi/v1/account/info');
    }
    getDailyAccountSnapshot(params) {
        return this.getPrivate('sapi/v1/accountSnapshot', params);
    }
    disableFastWithdrawSwitch() {
        return this.postPrivate('sapi/v1/account/disableFastWithdrawSwitch');
    }
    enableFastWithdrawSwitch() {
        return this.postPrivate('sapi/v1/account/enableFastWithdrawSwitch');
    }
    getAccountStatus() {
        return this.getPrivate('sapi/v1/account/status');
    }
    getApiTradingStatus() {
        return this.getPrivate('sapi/v1/account/apiTradingStatus');
    }
    getApiKeyPermissions() {
        return this.getPrivate('sapi/v1/account/apiRestrictions');
    }
    /**
     *
     * WALLET Endpoints - Travel Rule endpoints
     *
     **/
    /**
     * Submit a withdrawal request for local entities that require travel rule
     *
     * For questionaire format, please refer to the docs:
     * https://developers.binance.com/docs/wallet/travel-rule/withdraw-questionnaire
     */
    withdrawTravelRule(params) {
        return this.postPrivate('sapi/v1/localentity/withdraw/apply', params);
    }
    /**
     * Fetch withdraw history for local entities that require travel rule
     */
    getTravelRuleWithdrawHistory(params) {
        return this.getPrivate('sapi/v1/localentity/withdraw/history', params);
    }
    /**
     * Fetch withdraw history for local entities that require travel rule
     */
    getTravelRuleWithdrawHistoryV2(params) {
        return this.getPrivate('sapi/v2/localentity/withdraw/history', params);
    }
    /**
     * Submit questionnaire for local entities that require travel rule
     *
     * for questionaire format, please refer to the docs:
     * https://developers.binance.com/docs/wallet/travel-rule/deposit-questionnaire
     */
    submitTravelRuleDepositQuestionnaire(params) {
        return this.putPrivate('sapi/v1/localentity/deposit/provide-info', params);
    }
    /**
     * Fetch deposit history for local entities that require travel rule
     */
    getTravelRuleDepositHistory(params) {
        return this.getPrivate('sapi/v1/localentity/deposit/history', params);
    }
    /**
     * Fetch the onboarded VASP list for local entities that require travel rule
     */
    getOnboardedVASPList() {
        return this.getPrivate('sapi/v1/localentity/vasp');
    }
    /**
     *
     * WALLET Endpoints - Other endpoints
     *
     **/
    getSystemStatus() {
        return this.get('sapi/v1/system/status');
    }
    getDelistSchedule() {
        return this.getPrivate('sapi/v1/spot/delist-schedule');
    }
    /**
     *
     * SUB ACCOUNT Endpoints - Account management
     *
     **/
    createVirtualSubAccount(params) {
        return this.postPrivate('sapi/v1/sub-account/virtualSubAccount', params);
    }
    getSubAccountList(params) {
        return this.getPrivate('sapi/v1/sub-account/list', params);
    }
    subAccountEnableFutures(email) {
        return this.postPrivate('sapi/v1/sub-account/futures/enable', { email });
    }
    subAccountEnableMargin(email) {
        return this.postPrivate('sapi/v1/sub-account/margin/enable', { email });
    }
    enableOptionsForSubAccount(params) {
        return this.postPrivate('sapi/v1/sub-account/eoptions/enable', params);
    }
    subAccountEnableLeverageToken(params) {
        return this.postPrivate('sapi/v1/sub-account/blvt/enable', params);
    }
    getSubAccountStatusOnMarginOrFutures(params) {
        return this.getPrivate('sapi/v1/sub-account/status', params);
    }
    getSubAccountFuturesPositionRisk(email) {
        return this.getPrivate('sapi/v1/sub-account/futures/positionRisk', {
            email,
        });
    }
    getSubAccountFuturesPositionRiskV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/positionRisk', params);
    }
    getSubAccountTransactionStatistics(params) {
        return this.getPrivate('sapi/v1/sub-account/transaction-statistics', params);
    }
    /**
     *
     * SUB ACCOUNT Endpoints - API management
     *
     **/
    getSubAccountIPRestriction(params) {
        return this.getPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction', params);
    }
    subAccountDeleteIPList(params) {
        return this.deletePrivate('sapi/v1/sub-account/subAccountApi/ipRestriction/ipList', params);
    }
    subAccountAddIPRestriction(params) {
        return this.postPrivate('sapi/v2/sub-account/subAccountApi/ipRestriction', params);
    }
    /**
     * @deprecated
     * Use subAccountAddIPRestriction instead
     **/
    subAccountAddIPList(params) {
        return this.postPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction/ipList', params);
    }
    /**
     * @deprecated
     * Use subAccountAddIPRestriction instead, or subAccountDeleteIPList
     **/
    subAccountEnableOrDisableIPRestriction(params) {
        return this.postPrivate('sapi/v1/sub-account/subAccountApi/ipRestriction', params);
    }
    /**
     *
     * SUB ACCOUNT Endpoints - Asset management
     *
     **/
    subAccountFuturesTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/futures/transfer', params);
    }
    getSubAccountFuturesAccountDetail(email) {
        return this.getPrivate('sapi/v1/sub-account/futures/account', { email });
    }
    getSubAccountDetailOnFuturesAccountV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/account', params);
    }
    getSubAccountDetailOnMarginAccount(email) {
        return this.getPrivate('sapi/v1/sub-account/margin/account', { email });
    }
    getSubAccountDepositAddress(params) {
        return this.getPrivate('sapi/v1/capital/deposit/subAddress', params);
    }
    getSubAccountDepositHistory(params) {
        return this.getPrivate('sapi/v1/capital/deposit/subHisrec', params);
    }
    getSubAccountFuturesAccountSummary() {
        return this.getPrivate('sapi/v1/sub-account/futures/accountSummary');
    }
    getSubAccountSummaryOnFuturesAccountV2(params) {
        return this.getPrivate('sapi/v2/sub-account/futures/accountSummary', params);
    }
    getSubAccountsSummaryOfMarginAccount() {
        return this.getPrivate('sapi/v1/sub-account/margin/accountSummary');
    }
    subAccountMarginTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/margin/transfer', params);
    }
    getSubAccountAssets(params) {
        return this.getPrivate('sapi/v3/sub-account/assets', params);
    }
    getSubAccountAssetsMaster(params) {
        return this.getPrivate('sapi/v4/sub-account/assets', params);
    }
    getSubAccountFuturesAssetTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/futures/internalTransfer', params);
    }
    getSubAccountSpotAssetTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/sub/transfer/history', params);
    }
    getSubAccountSpotAssetsSummary(params) {
        return this.getPrivate('sapi/v1/sub-account/spotSummary', params);
    }
    getSubAccountUniversalTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/universalTransfer', params);
    }
    subAccountFuturesAssetTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/futures/internalTransfer', params);
    }
    subAccountTransferHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/transfer/subUserHistory', params);
    }
    subAccountTransferToMaster(params) {
        return this.postPrivate('sapi/v1/sub-account/transfer/subToMaster', params);
    }
    subAccountTransferToSameMaster(params) {
        return this.postPrivate('sapi/v1/sub-account/transfer/subToSub', params);
    }
    subAccountUniversalTransfer(params) {
        return this.postPrivate('sapi/v1/sub-account/universalTransfer', params);
    }
    subAccountMovePosition(params) {
        return this.postPrivate('sapi/v1/sub-account/futures/move-position', params);
    }
    getSubAccountFuturesPositionMoveHistory(params) {
        return this.getPrivate('sapi/v1/sub-account/futures/move-position', params);
    }
    /**
     *
     * SUB ACCOUNT Endpoints - Managed Sub Account
     *
     **/
    depositAssetsIntoManagedSubAccount(params) {
        return this.postPrivate('sapi/v1/managed-subaccount/deposit', params);
    }
    getManagedSubAccountDepositAddress(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/deposit/address', params);
    }
    withdrawAssetsFromManagedSubAccount(params) {
        return this.postPrivate('sapi/v1/managed-subaccount/withdraw', params);
    }
    getManagedSubAccountTransfersParent(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/queryTransLogForTradeParent', params);
    }
    getManagedSubAccountTransferLog(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/query-trans-log', params);
    }
    getManagedSubAccountTransfersInvestor(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/queryTransLogForInvestor', params);
    }
    getManagedSubAccounts(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/info', params);
    }
    getManagedSubAccountSnapshot(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/accountSnapshot', params);
    }
    getManagedSubAccountAssetDetails(email) {
        return this.getPrivate('sapi/v1/managed-subaccount/asset', { email });
    }
    getManagedSubAccountMarginAssets(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/marginAsset', params);
    }
    getManagedSubAccountFuturesAssets(params) {
        return this.getPrivate('sapi/v1/managed-subaccount/fetch-future-asset', params);
    }
    /**
     *
     * AUTO INVEST Endpoints - Market data
     *
     **/
    getAutoInvestAssets() {
        return this.getPrivate('sapi/v1/lending/auto-invest/all/asset');
    }
    getAutoInvestSourceAssets(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/source-asset/list', params);
    }
    getAutoInvestTargetAssets(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/target-asset/list', params);
    }
    getAutoInvestTargetAssetsROI(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/target-asset/roi/list', params);
    }
    getAutoInvestIndex(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/index/info', params);
    }
    getAutoInvestPlans(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/plan/list', params);
    }
    /**
     *
     * AUTO INVEST Endpoints - Trade
     *
     **/
    /**
     * https://developers.binance.com/docs/auto_invest/trade/One-Time-Transaction
     *
     * @param params
     * @returns
     */
    submitAutoInvestOneTimeTransaction(params) {
        const { details } = params, allParams = __rest(params, ["details"]);
        const requestParameters = Object.assign({}, allParams);
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/one-off', requestParameters);
    }
    updateAutoInvestPlanStatus(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit-status', params);
    }
    /**
     *
     * @deprecated , use updateAutoInvestmentPlan instead
     *
     **/
    updateAutoInvestmentPlanOld(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', params);
    }
    updateAutoInvestmentPlan(params) {
        const { details } = params, allParams = __rest(params, ["details"]);
        const requestParameters = Object.assign({}, allParams);
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/edit', requestParameters);
    }
    submitAutoInvestRedemption(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/redeem', params);
    }
    getAutoInvestSubscriptionTransactions(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/history/list', params);
    }
    getOneTimeTransactionStatus(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/one-off/status', params);
    }
    /**
     * @deprecated , use submitAutoInvestmentPlan instead
     *
     **/
    submitAutoInvestmentPlanOld(params) {
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', params);
    }
    submitAutoInvestmentPlan(params) {
        const { details } = params, allParams = __rest(params, ["details"]);
        const requestParameters = Object.assign({}, allParams);
        for (let i = 0; i < details.length; i++) {
            requestParameters[`details[${i}].targetAsset`] = details[i].targetAsset;
            requestParameters[`details[${i}].percentage`] = details[i].percentage;
        }
        return this.postPrivate('sapi/v1/lending/auto-invest/plan/add', requestParameters);
    }
    getAutoInvestRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/redeem/history', params);
    }
    getAutoInvestPlan(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/plan/id', params);
    }
    getAutoInvestUserIndex(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/index/user-summary', params);
    }
    getAutoInvestRebalanceHistory(params) {
        return this.getPrivate('sapi/v1/lending/auto-invest/rebalance/history', params);
    }
    /**
     *
     * CONVERT Endpoints - Market Data
     *
     **/
    getConvertPairs(params) {
        return this.getPrivate('sapi/v1/convert/exchangeInfo', params);
    }
    getConvertAssetInfo() {
        return this.getPrivate('sapi/v1/convert/assetInfo');
    }
    /**
     *
     * CONVERT Endpoints - Trade
     *
     **/
    convertQuoteRequest(params) {
        return this.postPrivate('sapi/v1/convert/getQuote', params);
    }
    acceptQuoteRequest(params) {
        return this.postPrivate('sapi/v1/convert/acceptQuote', params);
    }
    getConvertTradeHistory(params) {
        return this.getPrivate('sapi/v1/convert/tradeFlow', params);
    }
    getOrderStatus(params) {
        return this.getPrivate('sapi/v1/convert/orderStatus', params);
    }
    submitConvertLimitOrder(params) {
        return this.postPrivate('sapi/v1/convert/limit/placeOrder', params);
    }
    cancelConvertLimitOrder(params) {
        return this.postPrivate('sapi/v1/convert/limit/cancelOrder', params);
    }
    getConvertLimitOpenOrders() {
        return this.getPrivate('sapi/v1/convert/limit/queryOpenOrders');
    }
    /**
     *
     * STAKING Endpoints - ETH Staking - Account
     *
     **/
    /**
     * @deprecated use getEthStakingAccountV2 instead
     **/
    getEthStakingAccount() {
        return this.getPrivate('sapi/v1/eth-staking/account');
    }
    getEthStakingAccountV2() {
        return this.getPrivate('sapi/v2/eth-staking/account');
    }
    getEthStakingQuota() {
        return this.getPrivate('sapi/v1/eth-staking/eth/quota');
    }
    /**
     *
     * STAKING Endpoints - ETH Staking- Staking
     *
     **/
    /**
     * @deprecated use subscribeEthStakingV2 instead
     **/
    subscribeEthStakingV1(params) {
        return this.postPrivate('sapi/v1/eth-staking/eth/stake', params);
    }
    subscribeEthStakingV2(params) {
        return this.postPrivate('sapi/v2/eth-staking/eth/stake', params);
    }
    redeemEth(params) {
        return this.postPrivate('sapi/v1/eth-staking/eth/redeem', params);
    }
    wrapBeth(params) {
        return this.postPrivate('sapi/v1/eth-staking/wbeth/wrap', params);
    }
    /**
     *
     * STAKING Endpoints - ETH Staking - History
     *
     **/
    getEthStakingHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/stakingHistory', params);
    }
    getEthRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/redemptionHistory', params);
    }
    getBethRewardsHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/rewardsHistory', params);
    }
    getWbethRewardsHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/wbethRewardsHistory', params);
    }
    getEthRateHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/eth/history/rateHistory', params);
    }
    getBethWrapHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/wbeth/history/wrapHistory', params);
    }
    getBethUnwrapHistory(params) {
        return this.getPrivate('sapi/v1/eth-staking/wbeth/history/unwrapHistory', params);
    }
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingProducts(params) {
        return this.getPrivate('sapi/v1/staking/productList', params);
    }
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingProductPosition(params) {
        return this.getPrivate('sapi/v1/staking/position', params);
    }
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingHistory(params) {
        return this.getPrivate('sapi/v1/staking/stakingRecord', params);
    }
    /**
     * @deprecated as of 2024-01-19
     */
    getPersonalLeftQuotaOfStakingProduct(params) {
        return this.getPrivate('sapi/v1/staking/personalLeftQuota', params);
    }
    /**
     *
     * STAKING Endpoints - SOL Staking- Account
     *
     **/
    getSolStakingAccount() {
        return this.getPrivate('sapi/v1/sol-staking/account');
    }
    getSolStakingQuota() {
        return this.getPrivate('sapi/v1/sol-staking/sol/quota');
    }
    /**
     *
     * STAKING Endpoints - SOL Staking - Staking
     *
     **/
    subscribeSolStaking(params) {
        return this.postPrivate('sapi/v1/sol-staking/sol/stake', params);
    }
    redeemSol(params) {
        return this.postPrivate('sapi/v1/sol-staking/sol/redeem', params);
    }
    claimSolBoostRewards() {
        return this.postPrivate('sapi/v1/sol-staking/sol/claim');
    }
    /**
     *
     * STAKING Endpoints - SOL Staking- History
     *
     **/
    getSolStakingHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/stakingHistory', params);
    }
    getSolRedemptionHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/redemptionHistory', params);
    }
    getBnsolRewardsHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/bnsolRewardsHistory', params);
    }
    getBnsolRateHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/rateHistory', params);
    }
    getSolBoostRewardsHistory(params) {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/boostRewardsHistory', params);
    }
    getSolUnclaimedRewards() {
        return this.getPrivate('sapi/v1/sol-staking/sol/history/unclaimedRewards');
    }
    /**
     *
     * COPY TRADING Endpoints - Future copy trading
     *
     **/
    getFuturesLeadTraderStatus() {
        return this.getPrivate('sapi/v1/copyTrading/futures/userStatus');
    }
    getFuturesLeadTradingSymbolWhitelist() {
        return this.getPrivate('sapi/v1/copyTrading/futures/leadSymbol');
    }
    /**
     *
     * MINING Endpoints - rest api
     *
     **/
    getMiningAlgos() {
        return this.get('sapi/v1/mining/pub/algoList');
    }
    getMiningCoins() {
        return this.get('sapi/v1/mining/pub/coinList');
    }
    getHashrateResales(params) {
        return this.getPrivate('sapi/v1/mining/hash-transfer/config/details/list', params);
    }
    getMiners(params) {
        return this.getPrivate('sapi/v1/mining/worker/list', params);
    }
    getMinerDetails(params) {
        return this.getPrivate('sapi/v1/mining/worker/detail', params);
    }
    getExtraBonuses(params) {
        return this.getPrivate('sapi/v1/mining/payment/other', params);
    }
    getMiningEarnings(params) {
        return this.getPrivate('sapi/v1/mining/payment/list', params);
    }
    cancelHashrateResaleConfig(params) {
        return this.postPrivate('sapi/v1/mining/hash-transfer/config/cancel', params);
    }
    getHashrateResale(params) {
        return this.getPrivate('sapi/v1/mining/hash-transfer/profit/details', params);
    }
    getMiningAccountEarnings(params) {
        return this.getPrivate('sapi/v1/mining/payment/uid', params);
    }
    getMiningStatistics(params) {
        return this.getPrivate('sapi/v1/mining/statistics/user/status', params);
    }
    submitHashrateResale(params) {
        return this.postPrivate('sapi/v1/mining/hash-transfer/config', params);
    }
    getMiningAccounts(params) {
        return this.getPrivate('sapi/v1/mining/statistics/user/list', params);
    }
    /**
     *
     * ALGO TRADING Endpoints - Future algo
     *
     **/
    submitVpNewOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/futures/newOrderVp', params);
    }
    submitTwapNewOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/futures/newOrderTwap', params);
    }
    cancelAlgoOrder(params) {
        return this.deletePrivate('sapi/v1/algo/futures/order', params);
    }
    getAlgoSubOrders(params) {
        return this.getPrivate('sapi/v1/algo/futures/subOrders', params);
    }
    getAlgoOpenOrders() {
        return this.getPrivate('sapi/v1/algo/futures/openOrders');
    }
    getAlgoHistoricalOrders(params) {
        return this.getPrivate('sapi/v1/algo/futures/historicalOrders', params);
    }
    /**
     *
     * ALGO TRADING Endpoints - Spot algo
     *
     **/
    submitSpotAlgoTwapOrder(params) {
        this.validateOrderId(params, 'clientAlgoId');
        return this.postPrivate('sapi/v1/algo/spot/newOrderTwap', params);
    }
    cancelSpotAlgoOrder(params) {
        return this.deletePrivate('sapi/v1/algo/spot/order', params);
    }
    getSpotAlgoSubOrders(params) {
        return this.getPrivate('sapi/v1/algo/spot/subOrders', params);
    }
    getSpotAlgoOpenOrders() {
        return this.getPrivate('sapi/v1/algo/spot/openOrders');
    }
    getSpotAlgoHistoricalOrders(params) {
        return this.getPrivate('sapi/v1/algo/spot/historicalOrders', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - Market data
     *
     **/
    getCryptoLoanFlexibleCollateralAssets(params) {
        return this.getPrivate('sapi/v2/loan/flexible/collateral/data', params);
    }
    getCryptoLoanFlexibleAssets(params) {
        return this.getPrivate('sapi/v2/loan/flexible/loanable/data', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - Trade
     *
     **/
    borrowCryptoLoanFlexible(params) {
        return this.postPrivate('sapi/v2/loan/flexible/borrow', params);
    }
    repayCryptoLoanFlexible(params) {
        return this.postPrivate('sapi/v2/loan/flexible/repay', params);
    }
    repayCryptoLoanFlexibleWithCollateral(params) {
        return this.postPrivate('sapi/v2/loan/flexible/repay/collateral', params);
    }
    adjustCryptoLoanFlexibleLTV(params) {
        return this.postPrivate('sapi/v2/loan/flexible/adjust/ltv', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - User info
     *
     **/
    getCryptoLoanFlexibleLTVAdjustmentHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/ltv/adjustment/history', params);
    }
    getFlexibleLoanCollateralRepayRate(params) {
        return this.getPrivate('sapi/v2/loan/flexible/repay/rate', params);
    }
    getLoanFlexibleBorrowHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/borrow/history', params);
    }
    getCryptoLoanFlexibleOngoingOrders(params) {
        return this.getPrivate('sapi/v2/loan/flexible/ongoing/orders', params);
    }
    getFlexibleLoanLiquidationHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/liquidation/history', params);
    }
    getLoanFlexibleRepaymentHistory(params) {
        return this.getPrivate('sapi/v2/loan/flexible/repay/history', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - Market data
     *
     **/
    /**
     * @deprecated
     */
    getCryptoLoanLoanableAssets(params) {
        return this.getPrivate('sapi/v1/loan/loanable/data', params);
    }
    getCryptoLoanCollateralRepayRate(params) {
        return this.getPrivate('sapi/v1/loan/repay/collateral/rate', params);
    }
    /**
     * @deprecated
     */
    getCryptoLoanCollateralAssetsData(params) {
        return this.getPrivate('sapi/v1/loan/collateral/data', params);
    }
    getCryptoLoansIncomeHistory(params) {
        return this.getPrivate('sapi/v1/loan/income', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - Trade
     *
     **/
    /**
     * @deprecated
     */
    borrowCryptoLoan(params) {
        return this.postPrivate('sapi/v1/loan/borrow', params);
    }
    /**
     * @deprecated
     */
    repayCryptoLoan(params) {
        return this.postPrivate('sapi/v1/loan/repay', params);
    }
    /**
     * @deprecated
     */
    adjustCryptoLoanLTV(params) {
        return this.postPrivate('sapi/v1/loan/adjust/ltv', params);
    }
    /**
     * @deprecated
     */
    customizeCryptoLoanMarginCall(params) {
        return this.postPrivate('sapi/v1/loan/customize/margin_call', params);
    }
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - User info
     *
     **/
    /**
     * @deprecated
     */
    getCryptoLoanOngoingOrders(params) {
        return this.getPrivate('sapi/v1/loan/ongoing/orders', params);
    }
    getCryptoLoanBorrowHistory(params) {
        return this.getPrivate('sapi/v1/loan/borrow/history', params);
    }
    getCryptoLoanLTVAdjustmentHistory(params) {
        return this.getPrivate('sapi/v1/loan/ltv/adjustment/history', params);
    }
    getCryptoLoanRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/loan/repay/history', params);
    }
    /**
     *
     * SIMPLE EARN Endpoints - Account
     *
     **/
    getSimpleEarnAccount() {
        return this.getPrivate('sapi/v1/simple-earn/account');
    }
    getFlexibleSavingProducts(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/list', params);
    }
    getSimpleEarnLockedProductList(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/list', params);
    }
    getFlexibleProductPosition(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/position', params);
    }
    getLockedProductPosition(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/position', params);
    }
    getFlexiblePersonalLeftQuota(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/personalLeftQuota', params);
    }
    getLockedPersonalLeftQuota(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/personalLeftQuota', params);
    }
    /**
     *
     * SIMPLE EARN Endpoints - Earn
     *
     **/
    purchaseFlexibleProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/subscribe', params);
    }
    subscribeSimpleEarnLockedProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/subscribe', params);
    }
    redeemFlexibleProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/redeem', params);
    }
    redeemLockedProduct(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/redeem', params);
    }
    setFlexibleAutoSubscribe(params) {
        return this.postPrivate('sapi/v1/simple-earn/flexible/setAutoSubscribe', params);
    }
    setLockedAutoSubscribe(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/setAutoSubscribe', params);
    }
    getFlexibleSubscriptionPreview(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/subscriptionPreview', params);
    }
    getLockedSubscriptionPreview(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/subscriptionPreview', params);
    }
    setLockedProductRedeemOption(params) {
        return this.postPrivate('sapi/v1/simple-earn/locked/setRedeemOption', params);
    }
    /**
     *
     * SIMPLE EARN Endpoints - History
     *
     **/
    getFlexibleSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/subscriptionRecord', params);
    }
    getLockedSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/subscriptionRecord', params);
    }
    getFlexibleRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/redemptionRecord', params);
    }
    getLockedRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/redemptionRecord', params);
    }
    getFlexibleRewardsHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/rewardsRecord', params);
    }
    getLockedRewardsHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/locked/history/rewardsRecord', params);
    }
    getCollateralRecord(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/collateralRecord', params);
    }
    getRateHistory(params) {
        return this.getPrivate('sapi/v1/simple-earn/flexible/history/rateHistory', params);
    }
    /**
     *
     * VIP LOAN Endpoints - Market Data
     *
     **/
    getVipBorrowInterestRate(params) {
        return this.getPrivate('sapi/v1/loan/vip/request/interestRate', params);
    }
    getVipLoanInterestRateHistory(params) {
        return this.getPrivate('sapi/v1/loan/vip/interestRateHistory', params);
    }
    getVipLoanableAssets(params) {
        return this.getPrivate('sapi/v1/loan/vip/loanable/data', params);
    }
    getVipCollateralAssets(params) {
        return this.getPrivate('sapi/v1/loan/vip/collateral/data', params);
    }
    /**
     *
     * VIP LOAN Endpoints - User Info
     *
     **/
    getVipLoanOpenOrders(params) {
        return this.getPrivate('sapi/v1/loan/vip/ongoing/orders', params);
    }
    getVipLoanRepaymentHistory(params) {
        return this.getPrivate('sapi/v1/loan/vip/repay/history', params);
    }
    checkVipCollateralAccount(params) {
        return this.getPrivate('sapi/v1/loan/vip/collateral/account', params);
    }
    getVipApplicationStatus(params) {
        return this.getPrivate('sapi/v1/loan/vip/request/data', params);
    }
    /**
     *
     * VIP LOAN Endpoints - Trade
     *
     **/
    renewVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/renew', params);
    }
    repayVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/repay', params);
    }
    borrowVipLoan(params) {
        return this.postPrivate('sapi/v1/loan/vip/borrow', params);
    }
    /**
     *
     * DUAL INVESTMENT Endpoints - Market Data
     *
     **/
    getDualInvestmentProducts(params) {
        return this.getPrivate('sapi/v1/dci/product/list', params);
    }
    /**
     *
     * DUAL INVESTMENT Endpoints - Trade
     *
     **/
    subscribeDualInvestmentProduct(params) {
        return this.postPrivate('sapi/v1/dci/product/subscribe', params);
    }
    getDualInvestmentPositions(params) {
        return this.getPrivate('sapi/v1/dci/product/positions', params);
    }
    getDualInvestmentAccounts() {
        return this.getPrivate('sapi/v1/dci/product/accounts');
    }
    getVipLoanAccruedInterest(params) {
        return this.getPrivate('sapi/v1/loan/vip/accruedInterest', params);
    }
    updateAutoCompoundStatus(params) {
        return this.postPrivate('sapi/v1/dci/product/auto_compound/edit-status', params);
    }
    /**
     *
     * GIFT CARD Endpoints - Market Data
     *
     **/
    createGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/createCode', params);
    }
    createDualTokenGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/buyCode', params);
    }
    redeemGiftCard(params) {
        return this.postPrivate('sapi/v1/giftcard/redeemCode', params);
    }
    verifyGiftCard(params) {
        return this.getPrivate('sapi/v1/giftcard/verify', params);
    }
    getTokenLimit(params) {
        return this.getPrivate('sapi/v1/giftcard/buyCode/token-limit', params);
    }
    getRsaPublicKey() {
        return this.getPrivate('sapi/v1/giftcard/cryptography/rsa-public-key');
    }
    /**
     *
     *  NFT Endpoints - REST api
     *
     **/
    getNftTransactionHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/transactions', params);
    }
    getNftDepositHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/deposit', params);
    }
    getNftWithdrawHistory(params) {
        return this.getPrivate('sapi/v1/nft/history/withdraw', params);
    }
    getNftAsset(params) {
        return this.getPrivate('sapi/v1/nft/user/getAsset', params);
    }
    /**
     *
     * C2C Endpoints
     *
     **/
    getC2CTradeHistory(params) {
        return this.getPrivate('sapi/v1/c2c/orderMatch/listUserOrderHistory', params);
    }
    /**
     *
     *  FIAT Endpoints - REST api
     *
     **/
    getFiatOrderHistory(params) {
        return this.getPrivate('sapi/v1/fiat/orders', params);
    }
    getFiatPaymentsHistory(params) {
        return this.getPrivate('sapi/v1/fiat/payments', params);
    }
    /**
     *
     * Rebate Endpoints
     *
     **/
    getSpotRebateHistoryRecords(params) {
        return this.getPrivate('sapi/v1/rebate/taxQuery', params);
    }
    /**
     *
     * DERIVATIVES - Portfolio Margin Pro - Market Data
     * This is in mainclient because it shares the same base url
     *
     **/
    getPortfolioMarginIndexPrice(params) {
        return this.get('sapi/v1/portfolio/asset-index-price', params);
    }
    getPortfolioMarginAssetLeverage() {
        return this.getPrivate('sapi/v1/portfolio/margin-asset-leverage');
    }
    getPortfolioMarginProCollateralRate() {
        return this.get('sapi/v1/portfolio/collateralRate');
    }
    getPortfolioMarginProTieredCollateralRate() {
        return this.get('sapi/v2/portfolio/collateralRate');
    }
    /**
     *
     * DERIVATIVES - Portfolio Margin Pro - Account
     * This is in mainclient because it shares the same base url
     *
     **/
    getPortfolioMarginProAccountInfo() {
        return this.getPrivate('sapi/v1/portfolio/account');
    }
    bnbTransfer(params) {
        return this.postPrivate('sapi/v1/portfolio/bnb-transfer', params);
    }
    submitPortfolioMarginProFullTransfer() {
        return this.postPrivate('sapi/v1/portfolio/auto-collection');
    }
    submitPortfolioMarginProSpecificTransfer(params) {
        return this.postPrivate('sapi/v1/portfolio/asset-collection', params);
    }
    repayPortfolioMarginProBankruptcyLoan(params) {
        return this.postPrivate('sapi/v1/portfolio/repay', params);
    }
    getPortfolioMarginProBankruptcyLoanAmount() {
        return this.getPrivate('sapi/v1/portfolio/pmLoan');
    }
    repayFuturesNegativeBalance() {
        return this.postPrivate('sapi/v1/portfolio/repay-futures-negative-balance');
    }
    updateAutoRepayFuturesStatus(params) {
        return this.postPrivate('sapi/v1/portfolio/repay-futures-switch', params);
    }
    getAutoRepayFuturesStatus() {
        return this.getPrivate('sapi/v1/portfolio/repay-futures-switch');
    }
    getPortfolioMarginProInterestHistory(params) {
        return this.getPrivate('sapi/v1/portfolio/interest-history', params);
    }
    getPortfolioMarginProSpanAccountInfo() {
        return this.getPrivate('sapi/v2/portfolio/account');
    }
    getPortfolioMarginProAccountBalance(params) {
        return this.getPrivate('sapi/v1/portfolio/balance', params);
    }
    mintPortfolioMarginBFUSD(params) {
        return this.postPrivate('sapi/v1/portfolio/mint', params);
    }
    redeemPortfolioMarginBFUSD(params) {
        return this.postPrivate('sapi/v1/portfolio/redeem', params);
    }
    getPortfolioMarginBankruptcyLoanRepayHistory(params) {
        return this.getPrivate('sapi/v1/portfolio/pmLoan-history', params);
    }
    /**
     * Transfer LDUSDT as collateral for all types of Portfolio Margin account
     */
    transferLDUSDTPortfolioMargin(params) {
        return this.postPrivate('sapi/v1/portfolio/earn-asset-transfer', params);
    }
    /**
     * Get transferable earn asset balance for all types of Portfolio Margin account
     */
    getTransferableEarnAssetBalanceForPortfolioMargin(params) {
        return this.getPrivate('sapi/v1/portfolio/earn-asset-balance', params);
    }
    /**
     *
     * DERIVATIVES - Futures Data - Market
     * This is in mainclient because it shares the same base url
     *
     **/
    getFuturesTickLevelOrderbookDataLink(params) {
        return this.getPrivate('sapi/v1/futures/histDataLink', params);
    }
    /**
     *
     * BLVT Endpoints
     * BLVT category is possibly @deprecated, found only in old docs
     **/
    getBlvtInfo(params) {
        return this.get('sapi/v1/blvt/tokenInfo', params);
    }
    subscribeBlvt(params) {
        return this.postPrivate('sapi/v1/blvt/subscribe', params);
    }
    getBlvtSubscriptionRecord(params) {
        return this.getPrivate('sapi/v1/blvt/subscribe/record', params);
    }
    redeemBlvt(params) {
        return this.postPrivate('sapi/v1/blvt/redeem', params);
    }
    getBlvtRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/blvt/redeem/record', params);
    }
    getBlvtUserLimitInfo(params) {
        return this.getPrivate('sapi/v1/blvt/userLimit', params);
    }
    /**
     *
     * Pay endpoints
     * Found only in old docs, possibly @deprecated
     **/
    getPayTransactions(params) {
        return this.getPrivate('sapi/v1/pay/transactions', params);
    }
    /**
     *
     * EXCHANGE LINK - Account Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    createBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount', params);
    }
    getBrokerSubAccount(params) {
        return this.getPrivate('sapi/v1/broker/subAccount', params);
    }
    enableMarginBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/futures', params);
    }
    createApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi', params);
    }
    changePermissionApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
    }
    changeComissionBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission', params);
    }
    enableUniversalTransferApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/permission/universalTransfer', params);
    }
    updateIpRestrictionForSubAccountApiKey(params) {
        return this.postPrivate('sapi/v2/broker/subAccountApi/ipRestriction', params);
    }
    deleteIPRestrictionForSubAccountApiKey(params) {
        return this.deletePrivate('sapi/v1/broker/subAccountApi/ipRestriction/ipList', params);
    }
    deleteApiKeyBrokerSubAccount(params) {
        return this.deletePrivate('sapi/v1/broker/subAccountApi', params);
    }
    getSubAccountBrokerIpRestriction(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/ipRestriction', params);
    }
    getApiKeyBrokerSubAccount(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi', params);
    }
    getBrokerInfo() {
        return this.getPrivate('sapi/v1/broker/info');
    }
    updateSubAccountBNBBurn(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/bnbBurn/spot', params);
    }
    updateSubAccountMarginInterestBNBBurn(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/bnbBurn/marginInterest', params);
    }
    getSubAccountBNBBurnStatus(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/bnbBurn/status', params);
    }
    /**
     * Caution:
     * The operation will delete a sub account under your brokerage master account.
     * Please transfer out all funds from the sub account and delete API key of the sub account before deleting it.
     * The deleted sub account CANNOT be reverted.
     * The daily deletion limit for a broker Master is 20 sub accounts.
     * You need to enable "trade" option for the api key which requests this endpoint.
     */
    deleteBrokerSubAccount(params) {
        return this.deletePrivate('/sapi/v1/broker/subAccount', params);
    }
    /**
     *
     * EXCHANGE LINK - Account Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    transferBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/transfer', params);
    }
    getBrokerSubAccountHistory(params) {
        return this.getPrivate('sapi/v1/broker/transfer', params);
    }
    submitBrokerSubFuturesTransfer(params) {
        return this.postPrivate('sapi/v1/broker/transfer/futures', params);
    }
    getSubAccountFuturesTransferHistory(params) {
        return this.getPrivate('sapi/v1/broker/transfer/futures', params);
    }
    getBrokerSubDepositHistory(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/depositHist', params);
    }
    getBrokerSubAccountSpotAssets(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/spotSummary', params);
    }
    getSubAccountMarginAssetInfo(params) {
        return this.getPrivate('sapi/v1/broker/subAccount/marginSummary', params);
    }
    querySubAccountFuturesAssetInfo(params) {
        return this.getPrivate('sapi/v3/broker/subAccount/futuresSummary', params);
    }
    universalTransferBroker(params) {
        return this.postPrivate('sapi/v1/broker/universalTransfer', params);
    }
    getUniversalTransferBroker(params) {
        return this.getPrivate('sapi/v1/broker/universalTransfer', params);
    }
    /**
     *
     * EXCHANGE LINK - Fee Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    updateBrokerSubAccountCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission', params);
    }
    updateBrokerSubAccountFuturesCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission/futures', params);
    }
    getBrokerSubAccountFuturesCommission(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/commission/futures', params);
    }
    updateBrokerSubAccountCoinFuturesCommission(params) {
        return this.postPrivate('sapi/v1/broker/subAccountApi/commission/coinFutures', params);
    }
    getBrokerSubAccountCoinFuturesCommission(params) {
        return this.getPrivate('sapi/v1/broker/subAccountApi/commission/coinFutures', params);
    }
    getBrokerSpotCommissionRebate(params) {
        return this.getPrivate('sapi/v1/broker/rebate/recentRecord', params);
    }
    getBrokerFuturesCommissionRebate(params) {
        return this.getPrivate('sapi/v1/broker/rebate/futures/recentRecord', params);
    }
    /**
     *
     * @deprecated
     */
    // USD & Coin-M can be found under API getIncome() (find "API rebate" in results)
    getBrokerSpotRebateHistory(days, customerId) {
        if (days === 7) {
            return this.getPrivate('sapi/v1/apiReferral/rebate/recentRecord', {
                customerId,
            });
        }
        if (days === 30) {
            return this.getPrivate('sapi/v1/apiReferral/rebate/historicalRecord', {
                customerId,
            });
        }
    }
    /**
     * Broker Endpoints - only on old docs
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead - https://developers.binance.com/docs/binance_link
     */
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerIfNewSpotUser() {
        return this.getPrivate('sapi/v1/apiReferral/ifNewUser');
    }
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerSubAccountDepositHistory(params) {
        return this.getPrivate('sapi/v1/bv1/apiReferral/ifNewUser', params);
    }
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerUserCustomisedId(market) {
        const prefix = market === 'spot' ? 'sapi' : 'fapi';
        return this.getPrivate(prefix + '/v1/apiReferral/userCustomization');
    }
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    enableFuturesBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount', params);
    }
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    enableMarginApiKeyBrokerSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/margin', params);
    }
    /**
     * Validate syntax meets requirements set by binance. Log warning if not.
     */
    validateOrderId(params, orderIdProperty) {
        return;
    }
    /**
     *
     * User Data Stream Endpoints
     *
     **/
    // spot
    getSpotUserDataListenKey() {
        return this.post('api/v3/userDataStream');
    }
    keepAliveSpotUserDataListenKey(listenKey) {
        return this.put(`api/v3/userDataStream?listenKey=${listenKey}`);
    }
    closeSpotUserDataListenKey(listenKey) {
        return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`);
    }
    // margin
    getMarginUserDataListenKey() {
        return this.post('sapi/v1/userDataStream');
    }
    keepAliveMarginUserDataListenKey(listenKey) {
        return this.put(`sapi/v1/userDataStream?listenKey=${listenKey}`);
    }
    closeMarginUserDataListenKey(listenKey) {
        return this.delete(`sapi/v1/userDataStream?listenKey=${listenKey}`);
    }
    // isolated margin
    getIsolatedMarginUserDataListenKey(params) {
        return this.post(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    keepAliveIsolatedMarginUserDataListenKey(params) {
        return this.put(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    closeIsolatedMarginUserDataListenKey(params) {
        return this.delete(`sapi/v1/userDataStream/isolated?${(0, requestUtils_1.serialiseParams)(params)}`);
    }
    /**
     *
     * DEPRECATED ENDPOINTS
     *
     **/
    /**
     *
     * BSwap Endpoints
     * @deprecated as of 2024-01-19
     **/
    /**
     * @deprecated as of 2024-01-19
     **/
    getBSwapLiquidity(params) {
        return this.getPrivate('sapi/v1/bswap/liquidity', params);
    }
    /**
     * @deprecated as of 2024-01-19
     **/
    addBSwapLiquidity(params) {
        return this.postPrivate('sapi/v1/bswap/liquidityAdd', params);
    }
    /**
     * @deprecated as of 2024-01-19
     **/
    removeBSwapLiquidity(params) {
        return this.postPrivate('sapi/v1/bswap/liquidityRemove', params);
    }
    /**
     * @deprecated as of 2024-01-19
     **/
    getBSwapOperations(params) {
        return this.getPrivate('sapi/v1/bswap/liquidityOps', params);
    }
    /**
     *
     * Savings Endpoints
     * @deprecated as of 2023-06-22, now Simple Earn
     **/
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLeftDailyPurchaseQuotaFlexibleProduct(params) {
        return this.getPrivate('sapi/v1/lending/daily/userLeftQuota', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLeftDailyRedemptionQuotaFlexibleProduct(params) {
        return this.getPrivate('sapi/v1/lending/daily/userRedemptionQuota', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    purchaseFixedAndActivityProject(params) {
        return this.postPrivate('sapi/v1/lending/customizedFixed/purchase', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getFixedAndActivityProjects(params) {
        return this.getPrivate('sapi/v1/lending/project/list', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getFixedAndActivityProductPosition(params) {
        return this.getPrivate('sapi/v1/lending/project/position/list', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLendingAccount() {
        return this.getPrivate('sapi/v1/lending/union/account');
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getPurchaseRecord(params) {
        return this.getPrivate('sapi/v1/lending/union/purchaseRecord', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getRedemptionRecord(params) {
        return this.getPrivate('sapi/v1/lending/union/redemptionRecord', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getInterestHistory(params) {
        return this.getPrivate('sapi/v1/lending/union/interestHistory', params);
    }
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    changeFixedAndActivityPositionToDailyPosition(params) {
        return this.postPrivate('sapi/v1/lending/positionChanged', params);
    }
    /**
     *
     * Wallet Endpoints
     * @deprecated
     **/
    /**
     * @deprecated
     */
    enableConvertSubAccount(params) {
        return this.postPrivate('sapi/v1/broker/subAccount/convert', params);
    }
    /**
     * @deprecated - deleted as of 2024-11-21
     *
     */
    convertBUSD(params) {
        return this.postPrivate('sapi/v1/asset/convert-transfer', params);
    }
    /**
     * @deprecated
     */
    getConvertBUSDHistory(params) {
        return this.getPrivate('sapi/v1/asset/convert-transfer/queryByPage', params);
    }
}
exports.MainClient = MainClient;
/**
 * @deprecated use MainClient instead of SpotClient (it is the same)
 */
exports.SpotClient = MainClient;
//# sourceMappingURL=main-client.js.map