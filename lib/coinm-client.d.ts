import { AxiosRequestConfig } from 'axios';
import { ClassicPortfolioMarginAccount, ClassicPortfolioMarginNotionalLimit, CoinMAccountTradeParams, CoinMOpenInterest, CoinMPositionTrade, CoinMSymbolOrderBookTicker, FundingRate, FuturesTransactionHistoryDownloadLink, GetClassicPortfolioMarginNotionalLimitParams, PositionRisk } from './types/coin';
import { AggregateFuturesTrade, CancelAllOpenOrdersResult, CancelFuturesOrderResult, CancelMultipleOrdersParams, CancelOrdersTimeoutParams, ChangeStats24hr, ContinuousContractKlinesParams, ForceOrderResult, FundingRateHistory, FuturesCoinMAccountBalance, FuturesCoinMAccountInformation, FuturesCoinMBasisParams, FuturesCoinMTakerBuySellVolumeParams, FuturesDataPaginatedParams, FuturesExchangeInfo, FuturesOrderBook, GetForceOrdersParams, GetIncomeHistoryParams, GetPositionMarginChangeHistoryParams, IncomeHistory, IndexPriceConstituents, IndexPriceKlinesParams, MarkPrice, ModeChangeResult, ModifyFuturesOrderParams, ModifyFuturesOrderResult, NewFuturesOrderParams, NewOrderError, NewOrderResult, OrderAmendment, OrderResult, PositionModeParams, PositionModeResponse, QuarterlyContractSettlementPrice, RawFuturesTrade, RebateDataOverview, SetCancelTimeoutResult, SetIsolatedMarginParams, SetIsolatedMarginResult, SetLeverageParams, SetLeverageResult, SetMarginTypeParams, SymbolKlinePaginatedParams, SymbolLeverageBracketsResult, UserCommissionRate } from './types/futures';
import { BasicSymbolPaginatedParams, CancelOrderParams, GenericCodeMsgError, GetAllOrdersParams, GetOrderModifyHistoryParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, OrderBookParams, RecentTradesParams, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class CoinMClient extends BaseRestClient {
    private clientId;
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig, useTestnet?: boolean);
    /**
     * Abstraction required by each client to aid with time sync / drift handling
     */
    getServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     **/
    testConnectivity(): Promise<object>;
    getExchangeInfo(): Promise<FuturesExchangeInfo>;
    getOrderBook(params: OrderBookParams): Promise<FuturesOrderBook>;
    getRecentTrades(params: RecentTradesParams): Promise<RawFuturesTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawFuturesTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateFuturesTrade[]>;
    /**
     * Index Price and Mark Price
     */
    getMarkPrice(params?: {
        symbol?: string;
    }): Promise<MarkPrice | MarkPrice[]>;
    getFundingRateHistory(params?: Partial<BasicSymbolPaginatedParams>): Promise<FundingRateHistory[]>;
    getFundingRate(params?: {
        symbol?: string;
    }): Promise<FundingRate[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getContinuousContractKlines(params: ContinuousContractKlinesParams): Promise<Kline[]>;
    getIndexPriceKlines(params: IndexPriceKlinesParams): Promise<Kline[]>;
    getMarkPriceKlines(params: SymbolKlinePaginatedParams): Promise<Kline[]>;
    getPremiumIndexKlines(params: KlinesParams): Promise<Kline[]>;
    /**
     * @deprecated use get24hrChangeStatistics() instead (method without the typo)
     */
    get24hrChangeStatististics(params?: {
        symbol?: string;
    }): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    get24hrChangeStatistics(params?: {
        symbol?: string;
        pair?: string;
    }): Promise<ChangeStats24hr | ChangeStats24hr[]>;
    getSymbolPriceTicker(params?: {
        symbol?: string;
        pair?: string;
    }): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolOrderBookTicker(params?: {
        symbol?: string;
        pair?: string;
    }): Promise<CoinMSymbolOrderBookTicker[]>;
    getOpenInterest(params: {
        symbol: string;
    }): Promise<CoinMOpenInterest>;
    getOpenInterestStatistics(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTopTradersLongShortPositionRatio(params: FuturesDataPaginatedParams & {
        pair?: string;
    }): Promise<any>;
    getGlobalLongShortAccountRatio(params: FuturesDataPaginatedParams): Promise<any>;
    getTakerBuySellVolume(params: FuturesCoinMTakerBuySellVolumeParams): Promise<any>;
    getCompositeSymbolIndex(params: FuturesCoinMBasisParams): Promise<any>;
    /**
     * possibly @deprecated
     * Only in old documentation, not in new one
     **/
    getIndexPriceConstituents(params: {
        symbol: string;
    }): Promise<IndexPriceConstituents>;
    /**
     * possibly @deprecated
     * Only in old documentation, not in new one
     **/
    getQuarterlyContractSettlementPrices(params: {
        pair: string;
    }): Promise<QuarterlyContractSettlementPrice[]>;
    /**
     *
     * Trade Endpoints
     *
     **/
    submitNewOrder(params: NewFuturesOrderParams): Promise<NewOrderResult>;
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
     *
     * Known issue: `quantity` and `price` should be sent as strings
     */
    submitMultipleOrders(orders: NewFuturesOrderParams<string>[]): Promise<(NewOrderResult | NewOrderError)[]>;
    /**
     * Order modify function, currently only LIMIT order modification is supported, modified orders will be reordered in the match queue
     */
    modifyOrder(params: ModifyFuturesOrderParams): Promise<ModifyFuturesOrderResult>;
    /**
     * Warning: max 5 orders at a time! This method does not throw, instead it returns individual errors in the response array if any orders were rejected.
     */
    modifyMultipleOrders(orders: ModifyFuturesOrderParams[]): Promise<(ModifyFuturesOrderResult | NewOrderError)[]>;
    getOrderModifyHistory(params: GetOrderModifyHistoryParams): Promise<OrderAmendment[]>;
    cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult>;
    cancelMultipleOrders(params: CancelMultipleOrdersParams): Promise<(CancelFuturesOrderResult | GenericCodeMsgError)[]>;
    cancelAllOpenOrders(params: {
        symbol?: string;
    }): Promise<CancelAllOpenOrdersResult>;
    setCancelOrdersOnTimeout(params: CancelOrdersTimeoutParams): Promise<SetCancelTimeoutResult>;
    getOrder(params: GetOrderParams): Promise<OrderResult>;
    getAllOrders(params: GetAllOrdersParams): Promise<OrderResult[]>;
    getAllOpenOrders(params?: {
        symbol?: string;
    }): Promise<OrderResult[]>;
    getCurrentOpenOrder(params: GetOrderParams): Promise<OrderResult>;
    getForceOrders(params?: GetForceOrdersParams): Promise<ForceOrderResult[]>;
    getAccountTrades(params: CoinMAccountTradeParams & {
        orderId?: number;
    }): Promise<CoinMPositionTrade[]>;
    getPositions(params?: {
        marginAsset?: string;
        pair?: string;
    }): Promise<PositionRisk[]>;
    setPositionMode(params: PositionModeParams): Promise<ModeChangeResult>;
    setMarginType(params: SetMarginTypeParams): Promise<ModeChangeResult>;
    setLeverage(params: SetLeverageParams): Promise<SetLeverageResult>;
    getADLQuantileEstimation(params?: {
        symbol?: string;
    }): Promise<any>;
    setIsolatedPositionMargin(params: SetIsolatedMarginParams): Promise<SetIsolatedMarginResult>;
    getPositionMarginChangeHistory(params: GetPositionMarginChangeHistoryParams): Promise<any>;
    /**
     *
     * Account Endpoints
     *
     **/
    getBalance(): Promise<FuturesCoinMAccountBalance[]>;
    /**
     * @deprecated Please use `getAccountCommissionRate()` instead. This will be removed in the next major release.
     */
    getAccountComissionRate(params: {
        symbol?: string;
    }): Promise<UserCommissionRate>;
    getAccountCommissionRate(params: {
        symbol?: string;
    }): Promise<UserCommissionRate>;
    getAccountInformation(): Promise<FuturesCoinMAccountInformation>;
    /**
     * Notional Bracket for Symbol (NOT "pair")
     */
    getNotionalAndLeverageBrackets(params?: {
        symbol?: string;
    }): Promise<SymbolLeverageBracketsResult[] | SymbolLeverageBracketsResult>;
    getCurrentPositionMode(): Promise<PositionModeResponse>;
    getIncomeHistory(params?: GetIncomeHistoryParams): Promise<IncomeHistory[]>;
    getDownloadIdForFuturesTransactionHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesTransactionHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    getDownloadIdForFuturesOrderHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesOrderHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    getDownloadIdForFuturesTradeHistory(params: {
        startTime: number;
        endTime: number;
    }): Promise<{
        avgCostTimestampOfLast30d: number;
        downloadId: string;
    }>;
    getFuturesTradeHistoryDownloadLink(params: {
        downloadId: string;
    }): Promise<FuturesTransactionHistoryDownloadLink>;
    /**
     *
     * Portfolio Margin Endpoints
     *
     **/
    getClassicPortfolioMarginAccount(params: {
        asset: string;
    }): Promise<ClassicPortfolioMarginAccount>;
    /**
     * @deprecated at 6th August, 2024
     **/
    getClassicPortfolioMarginNotionalLimits(params?: GetClassicPortfolioMarginNotionalLimitParams): Promise<{
        notionalLimits: ClassicPortfolioMarginNotionalLimit[];
    }>;
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
