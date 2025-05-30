import { AxiosRequestConfig } from 'axios';
import { FundingRate } from './types/coin';
import { AggregateFuturesTrade, Basis, BasisParams, CancelAllOpenOrdersResult, CancelFuturesOrderResult, CancelMultipleOrdersParams, CancelOrdersTimeoutParams, ChangeStats24hr, ContinuousContractKlinesParams, ForceOrderResult, FundingRateHistory, FuturesAccountBalance, FuturesAccountConfig, FuturesAccountInformation, FuturesConvertOrderStatus, FuturesConvertPair, FuturesConvertQuote, FuturesConvertQuoteRequest, FuturesDataPaginatedParams, FuturesExchangeInfo, FuturesOrderBook, FuturesPosition, FuturesPositionTrade, FuturesPositionV3, FuturesSymbolOrderBookTicker, FuturesTradeHistoryDownloadId, FuturesTransactionDownloadLink, GetForceOrdersParams, GetFuturesOrderModifyHistoryParams, GetIncomeHistoryParams, GetPositionMarginChangeHistoryParams, HistoricOpenInterest, IncomeHistory, IndexPriceConstituents, IndexPriceKlinesParams, InsuranceFundBalance, MarkPrice, ModeChangeResult, ModifyFuturesOrderParams, ModifyFuturesOrderResult, ModifyOrderParams, MultiAssetModeResponse, MultiAssetsMode, NewFuturesOrderParams, NewOrderError, NewOrderResult, OpenInterest, OrderResult, PortfolioMarginProAccountInfo, PositionModeParams, PositionModeResponse, QuarterlyContractSettlementPrice, RawFuturesTrade, RebateDataOverview, SetCancelTimeoutResult, SetIsolatedMarginParams, SetIsolatedMarginResult, SetLeverageParams, SetLeverageResult, SetMarginTypeParams, SymbolConfig, SymbolKlinePaginatedParams, SymbolLeverageBracketsResult, UserCommissionRate, UserForceOrder } from './types/futures';
import { BasicSymbolPaginatedParams, BasicSymbolParam, CancelOrderParams, GenericCodeMsgError, GetAllOrdersParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, numberInString, OrderBookParams, RecentTradesParams, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class USDMClient extends BaseRestClient {
    private clientId;
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig, useTestnet?: boolean);
    /**
     * Abstraction required by each client to aid with time sync / drift handling
     */
    getServerTime(): Promise<number>;
    /**
     *
     * MARKET DATA endpoints - Rest API
     *
     **/
    testConnectivity(): Promise<object>;
    getExchangeInfo(): Promise<FuturesExchangeInfo>;
    getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook>;
    getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawFuturesTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateFuturesTrade[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getContinuousContractKlines(params: ContinuousContractKlinesParams): Promise<Kline[]>;
    getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]>;
    getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getPremiumIndexKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getMarkPrice(params: {
        symbol: string;
    }): Promise<MarkPrice>;
    getMarkPrice(): Promise<MarkPrice[]>;
    getFundingRateHistory(params?: Partial<BasicSymbolPaginatedParams>): Promise<FundingRateHistory[]>;
    getFundingRates(): Promise<FundingRate[]>;
    /**
     * @deprecated use get24hrChangeStatistics() instead (method without the typo)
     */
    get24hrChangeStatististics(params?: Partial<BasicSymbolParam>): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    get24hrChangeStatistics(params: {
        symbol: string;
    }): Promise<ChangeStats24hr>;
    get24hrChangeStatistics(): Promise<ChangeStats24hr[]>;
    getSymbolPriceTicker(params: {
        symbol: string;
    }): Promise<SymbolPrice>;
    getSymbolPriceTicker(): Promise<SymbolPrice[]>;
    getSymbolPriceTickerV2(params: {
        symbol: string;
    }): Promise<SymbolPrice>;
    getSymbolPriceTickerV2(): Promise<SymbolPrice[]>;
    getSymbolOrderBookTicker(params: {
        symbol: string;
    }): Promise<FuturesSymbolOrderBookTicker>;
    getSymbolOrderBookTicker(): Promise<FuturesSymbolOrderBookTicker[]>;
    getQuarterlyContractSettlementPrices(params: {
        pair: string;
    }): Promise<QuarterlyContractSettlementPrice[]>;
    getOpenInterest(params: {
        symbol: string;
    }): Promise<OpenInterest>;
    getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<HistoricOpenInterest[]>;
    getTopTradersLongShortPositionRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getGlobalLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTakerBuySellVolume(params: FuturesDataPaginatedParams): Promise<any>;
    getHistoricalBlvtNavKlines(params: SymbolKlinePaginatedParams): Promise<any>;
    getCompositeSymbolIndex(params?: {
        symbol?: string;
    }): Promise<any>;
    getMultiAssetsModeAssetIndex(params?: {
        symbol?: string;
    }): Promise<any>;
    /**
     * Possibly @deprecated, found only in old docs
     **/
    getBasis(params: BasisParams): Promise<Basis[]>;
    getIndexPriceConstituents(params: {
        symbol: string;
    }): Promise<IndexPriceConstituents>;
    getInsuranceFundBalance(params?: {
        symbol?: string;
    }): Promise<InsuranceFundBalance | InsuranceFundBalance[]>;
    /**
     *
     * TRADE endpoints - Rest API
     *
     **/
    submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult>;
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns
     * individual errors in the response array if any orders were rejected.
     *
     * Note: this method will automatically ensure "price" and "quantity" are sent as a
     * string, if present in the request. See #523 & #526 for more details.
     */
    submitMultipleOrders<TNumberType = numberInString>(orders: NewFuturesOrderParams<TNumberType>[]): Promise<(NewOrderResult | NewOrderError)[]>;
    /**
     * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
     */
    modifyOrder(params: ModifyFuturesOrderParams): Promise<ModifyFuturesOrderResult>;
    modifyMultipleOrders(orders: ModifyOrderParams[]): Promise<any>;
    getOrderModifyHistory(params: GetFuturesOrderModifyHistoryParams): Promise<any>;
    cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult>;
    cancelMultipleOrders(params: CancelMultipleOrdersParams): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]>;
    cancelAllOpenOrders(params: {
        symbol: string;
    }): Promise<CancelAllOpenOrdersResult>;
    setCancelOrdersOnTimeout(params: CancelOrdersTimeoutParams): Promise<SetCancelTimeoutResult>;
    getOrder(params: GetOrderParams): Promise<OrderResult>;
    getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]>;
    getAllOpenOrders(params?: {
        symbol?: string;
    }): Promise<OrderResult[]>;
    getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult>;
    getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]>;
    getAccountTrades(params: SymbolFromPaginatedRequestFromId & {
        orderId?: number;
    }): Promise<FuturesPositionTrade[]>;
    setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult>;
    setPositionMode(params: PositionModeParams): Promise<ModeChangeResult>;
    setLeverage(params: SetLeverageParams): Promise<SetLeverageResult>;
    setMultiAssetsMode(params: {
        multiAssetsMargin: MultiAssetsMode;
    }): Promise<ModeChangeResult>;
    setIsolatedPositionMargin(params: SetIsolatedMarginParams): Promise<SetIsolatedMarginResult>;
    /**
     * @deprecated
     * Use getPositionsV3() instead
     **/
    getPositions(params?: Partial<BasicSymbolParam>): Promise<FuturesPosition[]>;
    getPositionsV3(params?: {
        symbol?: string;
    }): Promise<FuturesPositionV3[]>;
    getADLQuantileEstimation(params?: {
        symbol?: string;
    }): Promise<any>;
    getPositionMarginChangeHistory(params: GetPositionMarginChangeHistoryParams): Promise<any>;
    /**
     *
     * ACCOUNT endpoints - Rest API
     *
     **/
    getBalanceV3(): Promise<FuturesAccountBalance[]>;
    /**
     * @deprecated
     * Use getBalanceV3() instead
     **/
    getBalance(): Promise<FuturesAccountBalance[]>;
    getAccountInformationV3(): Promise<FuturesAccountInformation>;
    /**
     * @deprecated
     * Use getAccountInformationV3() instead
     **/
    getAccountInformation(): Promise<FuturesAccountInformation>;
    /**
     * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
     */
    getAccountComissionRate(params: BasicSymbolParam): Promise<UserCommissionRate>;
    getAccountCommissionRate(params: {
        symbol: string;
    }): Promise<UserCommissionRate>;
    getFuturesAccountConfig(): Promise<FuturesAccountConfig>;
    getFuturesSymbolConfig(params: {
        symbol?: string;
    }): Promise<SymbolConfig[]>;
    getUserForceOrders(): Promise<UserForceOrder[]>;
    /**
     * Contrary to what the docs say - if symbol is provided, this returns an array with length 1 (assuming the symbol exists)
     */
    getNotionalAndLeverageBrackets(params?: {
        symbol?: string;
    }): Promise<SymbolLeverageBracketsResult[]>;
    getMultiAssetsMode(): Promise<MultiAssetModeResponse>;
    getCurrentPositionMode(): Promise<PositionModeResponse>;
    getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]>;
    getApiQuantitativeRulesIndicators(params?: {
        symbol?: string;
    }): Promise<any>;
    getFuturesTransactionHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesTransactionHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    getFuturesOrderHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesOrderHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    getFuturesTradeHistoryDownloadId(params: {
        startTime: number;
        endTime: number;
    }): Promise<FuturesTradeHistoryDownloadId>;
    getFuturesTradeDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionDownloadLink>;
    setBNBBurnEnabled(params: {
        feeBurn: 'true' | 'false';
    }): Promise<{
        code: number;
        msg: string;
    }>;
    getBNBBurnStatus(): Promise<{
        feeBurn: boolean;
    }>;
    testOrder(params: NewFuturesOrderParams): Promise<any>;
    /**
     *
     * Convert Endpoints
     *
     **/
    getAllConvertPairs(params?: {
        fromAsset?: string;
        toAsset?: string;
    }): Promise<FuturesConvertPair[]>;
    submitConvertQuoteRequest(params: FuturesConvertQuoteRequest): Promise<FuturesConvertQuote>;
    acceptConvertQuote(params: {
        quoteId: string;
    }): Promise<{
        orderId: string;
        createTime: number;
        orderStatus: 'PROCESS' | 'ACCEPT_SUCCESS' | 'SUCCESS' | 'FAIL';
    }>;
    getConvertOrderStatus(params: {
        orderId?: string;
        quoteId?: string;
    }): Promise<FuturesConvertOrderStatus>;
    /**
     *
     * Portfolio Margin Pro Endpoints
     *
     **/
    getPortfolioMarginProAccountInfo(params: {
        asset: string;
    }): Promise<PortfolioMarginProAccountInfo>;
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
    getBrokerIfNewFuturesUser(brokerId: string, type?: 1 | 2): Promise<{
        brokerId: string;
        rebateWorking: boolean;
        ifNewUser: boolean;
    }>;
    /**
     * @deprecated
     **/
    setBrokerCustomIdForClient(customerId: string, email: string): Promise<{
        customerId: string;
        email: string;
    }>;
    /**
     * @deprecated
     **/
    getBrokerClientCustomIds(customerId: string, email: string, page?: number, limit?: number): Promise<any>;
    /**
     * @deprecated
     **/
    getBrokerUserCustomId(brokerId: string): Promise<any>;
    /**
     * @deprecated
     **/
    getBrokerRebateDataOverview(type?: 1 | 2): Promise<RebateDataOverview>;
    /**
     * @deprecated
     **/
    getBrokerUserTradeVolume(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    /**
     * @deprecated
     **/
    getBrokerRebateVolume(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    /**
     * @deprecated
     **/
    getBrokerTradeDetail(type?: 1 | 2, startTime?: number, endTime?: number, limit?: number): Promise<any>;
    /**
     *
     * User Data Stream Endpoints
     *
     **/
    getFuturesUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveFuturesUserDataListenKey(): Promise<object>;
    closeFuturesUserDataListenKey(): Promise<object>;
    /**
     * Validate syntax meets requirements set by binance. Log warning if not.
     */
    private validateOrderId;
}
