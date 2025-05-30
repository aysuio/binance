import { AxiosRequestConfig } from 'axios';
import { AmendKeepPriorityParams, BasicAssetPaginatedParams, BasicAssetParam, BasicSymbolParam, BinanceBaseUrlKey, CancelOCOParams, CancelOrderParams, CoinStartEndLimit, ExchangeSymbol, GetAllOrdersParams, GetOrderParams, HistoricalTradesParams, Kline, KlinesParams, NewOCOParams, NewOrderListParams, OrderBookParams, OrderResponseType, OrderType, RecentTradesParams, RowsWithTotal, SymbolFromPaginatedRequestFromId, SymbolPrice } from './types/shared';
import { AcceptQuoteRequestParams, AccountInfo, AccountInformation, AddBSwapLiquidityParams, AddIpRestriction, AdjustCryptoLoanLTVParams, AdjustCryptoLoanLTVResponse, AdjustFlexibleCryptoLoanLTVParams, AdjustFlexibleCryptoLoanLTVResponse, AggregateTrade, AlgoOrder, AllCoinsInformationResponse, Allocation, AllocationsParams, ApiKeyBrokerSubAccount, APIPermissions, APITradingStatus, ApplicationStatus, AssetDetail, BasicFromPaginatedParams, BasicFuturesSubAccountParams, BasicMarginAssetParams, BasicSubAccount, BasicTimeRangeParam, BethRewardsHistory, BlvtRedemptionRecord, BlvtSubscriptionRecord, BlvtUserLimitInfo, BNBBurnResponse, BnbTransferParams, BnsolRateHistoryRecord, BnsolRewardHistoryRecord, BorrowCryptoLoanParams, BorrowCryptoLoanResponse, BorrowFlexibleLoanParams, BorrowFlexibleLoanResponse, BorrowInterestRate, BrokerCommissionRebate, BrokerSubAccount, BrokerSubAccountCoinFuturesCommission, BrokerSubAccountFuturesCommission, BrokerSubAccountHistory, BrokerUniversalTransfer, BSwapLiquidity, BSwapOperations, BSwapOperationsParams, BUSDConversionRecord, CancelAlgoOrderResponse, CancelHashrateResaleConfigParams, CancelOrderListResult, CancelSpotAlgoOrderResponse, CancelSpotOrderResult, ChangeAutoCompoundStatusParams, ChangeAutoCompoundStatusResponse, ChangePermissionApiKeyBrokerSubAccountParams, ChangePermissionApiKeyBrokerSubAccountResponse, ChangePlanStatusParams, ChangePlanStatusResponse, ChangeSubAccountCoinFuturesCommissionParams, ChangeSubAccountCommissionParams, ChangeSubAccountCommissionResponse, ChangeSubAccountFuturesCommissionParams, ChangeSubAccountFuturesCommissionResponse, CheckCollateralRepayRateParams, CheckCollateralRepayRateResponse, CheckDualInvestmentAccountsResponse, CheckVipCollateralAccountParams, CloudMining, CloudMiningHistoryParams, CoinMarginedFuturesResponse, Collateral, CollateralAssetData, CollateralRecord, CommissionRates, ConvertDustParams, ConvertibleCoinsParams, ConvertibleCoinsResponse, ConvertLimitOpenOrder, ConvertQuoteRequestParams, ConvertTransfer, ConvertTransferResponse, CreateApiKeyBrokerSubAccountParams, CreateApiKeyBrokerSubAccountResponse, CreateBrokerSubAccountParams, CreateDualTokenGiftCardParams, CreateGiftCardParams, CreateInvestmentPlanParams, CreateInvestmentPlanResponse, CreateSpecialLowLatencyKeyParams, CreateSubAccountParams, CrossMarginFeeData, CrossMarginTransferHistory, CurrentAvgPrice, CustomizeMarginCall, CustomizeMarginCallParams, DailyAccountSnapshot, DailyAccountSnapshotParams, DelegationHistory, DelegationHistoryParams, DeleteApiKeyBrokerSubAccountParams, DelistScheduleResponse, DepositAddress, DepositAddressListParams, DepositAddressParams, DepositAddressResponse, DepositHistory, DepositHistoryParams, DualInvestmentPosition, DualInvestmentProduct, DustConversion, DustInfo, DustLog, EditInvestmentPlanParams, EditInvestmentPlanResponse, EnableConvertSubAccountParams, EnableFuturesBrokerSubAccountParams, EnableFuturesBrokerSubAccountResponse, EnableMarginApiKeyBrokerSubAccountParams, EnableMarginBrokerSubAccountParams, EnableMarginBrokerSubAccountResponse, EnableOptionsForSubAccountResponse, EnableOrDisableIPRestrictionForSubAccountParams, EnableUniversalTransferApiKeyBrokerSubAccountParams, EnableUniversalTransferApiKeyBrokerSubAccountResponse, ETHRateHistory, EthRedemptionHistory, EthStakingHistory, ExchangeInfo, ExchangeInfoParams, FixedAndActivityProjectParams, FixedAndActivityProjectPositionParams, FlexibleCryptoLoanBorrowHistory, FlexibleLoanAssetData, FlexibleLoanCollateralAssetData, FlexibleLoanLiquidationHistoryRecord, FlexibleLoanLTVAdjustmentHistory, FlexibleLoanOngoingOrder, FlexibleRedemptionRecord, FlexibleRewardsHistory, FlexibleSubscriptionPreview, ForceLiquidationRecord, FundingAsset, FutureAccountTransfer, FuturesPositionRisk, GetAlgoHistoricalOrdersParams, GetAlgoSubOrdersParams, GetAlgoSubOrdersResponse, GetAllConvertPairsParams, GetApiKeyBrokerSubAccountParams, GetApplicationStatusParams, GetAssetParams, GetBethRewardsHistoryParams, GetBlvtRedemptionRecordParams, GetBlvtSubscriptionRecordParams, GetBnsolRateHistoryReq, GetBnsolRewardsHistoryReq, GetBrokerInfoResponse, GetBrokerSubAccountDepositHistoryParams, GetBrokerSubAccountHistoryParams, GetBrokerSubAccountParams, GetC2CTradeHistoryParams, GetC2CTradeHistoryResponse, GetCollateralAssetDataParams, GetCollateralRecordParams, GetConvertBUSDHistoryParams, GetConvertTradeHistoryParams, GetCrossMarginTransferHistoryParams, GetCryptoLoansIncomeHistoryParams, GetCryptoLoansIncomeHistoryResponse, GetDualInvestmentPositionsParams, GetDualInvestmentProductListParams, GetEarningsListParams, GetEarningsListResponse, GetETHRateHistoryParams, GetEthRedemptionHistoryParams, GetEthStakingAccountResponse, GetEthStakingAccountV2Response, GetEthStakingHistoryParams, GetEthStakingQuotaResponse, GetExtraBonusListParams, GetExtraBonusListResponse, GetFiatOrderHistoryParams, GetFiatOrderHistoryResponse, GetFiatPaymentsHistoryResponse, GetFlexibleCryptoLoanBorrowHistoryParams, GetFlexibleLoanLiquidationHistoryParams, GetFlexibleLoanLTVAdjustmentHistoryParams, GetFlexibleLoanOngoingOrdersParams, GetFlexibleRedemptionRecordParams, GetFlexibleRewardsHistoryParams, GetFlexibleSubscriptionPreviewParams, GetFlexibleSubscriptionRecordParams, GetFlexibleSubscriptionRecordResponse, GetForceLiquidationRecordParams, GetFutureAccountTransferHistoryParams, GetFuturesLeadTraderStatusResponse, GetFuturesLeadTradingSymbolWhitelistResponse, GetFutureTickLevelOrderbookDataLinkParams, GetHashrateResaleDetailParams, GetHashrateResaleDetailResponse, GetHashrateResaleListParams, GetHashrateResaleListResponse, GetIndexDetailsResponse, GetIndexLinkedPlanPositionDetailsResponse, GetIndexLinkedPlanRebalanceHistoryParams, GetIndexLinkedPlanRedemptionHistoryParams, GetLoanableAssetsDataParams, GetLoanBorrowHistoryParams, GetLoanCoinPaginatedHistoryParams, GetLoanLTVAdjustmentHistoryParams, GetLoanOngoingOrdersParams, GetLoanRepaymentHistoryParams, GetLockedRedemptionRecordParams, GetLockedRewardsHistory, GetLockedRewardsHistoryParams, GetLockedSubscriptionPreviewParams, GetLockedSubscriptionRecordParams, GetMarginAccountBorrowRepayRecordsParams, GetMarginCapitalFlowParams, GetMarginInterestHistoryParams, GetMarginOrderCountUsageParams, GetMinerDetailsParams, GetMinerDetailsResponse, GetMinerListParams, GetMinerListResponse, GetMiningAccountEarningParams, GetMiningAccountEarningResponse, getMiningAccountsListParams, getMiningAccountsListResponse, GetMiningAlgoListResponse, GetMiningCoinListResponse, GetNextHourlyInterestRateParams, GetNftAssetParams, GetNftDepositHistoryParams, GetNftTransactionHistoryParams, GetNftWithdrawHistoryParams, GetOCOParams, GetOneTimeTransactionStatusParams, GetOneTimeTransactionStatusResponse, GetOrderStatusParams, GetPayTradeHistoryParams, GetPlanDetailsParams, GetPortfolioMarginAssetIndexPriceResponse, GetPortfolioMarginAssetLeverageResponse, GetPortfolioMarginProAccountInfoResponse, GetPortfolioMarginProBankruptcyLoanAmountResponse, GetPortfolioMarginProCollateralRateResponse, GetPortfolioMarginProInterestHistoryParams, GetPortfolioMarginProInterestHistoryResponse, GetRateHistory, GetRateHistoryParams, GetSmallLiabilityExchangeHistoryParams, GetSolStakingHistoryReq, GetSourceAssetListParams, GetSourceAssetListResponse, GetSpotAlgoHistoricalOrdersParams, GetSpotAlgoSubOrdersParams, GetSpotAlgoSubOrdersResponse, GetSpotRebateHistoryRecordsParams, GetSpotRebateHistoryRecordsResponse, GetStatisticListParams, GetStatisticListResponse, GetSubAccountDepositHistoryParams, GetSubscriptionTransactionHistoryParams, GetTargetAssetListParams, GetTargetAssetListResponse, GetTargetAssetROIParams, GetTravelRuleDepositHistoryParams, GetTravelRuleWithdrawHistoryParams, GetTravelRuleWithdrawHistoryV2Params, GetUniversalTransferBrokerParams, GetVipLoanOngoingOrdersParams, GetVipLoanRepaymentHistoryParams, GetWbethRewardsHistoryResponse, GetWrapHistoryParams, HistoricalAlgoOrder, HistoricalDataLink, HistoricalSpotAlgoOrder, IndexLinkedPlanRedemptionRecord, IsolatedMarginAccountInfo, IsolatedMarginAccountTransferParams, IsolatedMarginFeeData, IsolatedMarginSymbol, IsolatedMarginTierData, LeftDailyPurchaseQuotaFlexibleProductResponse, LiabilityCoinLeverageBracket, LoanableAssetData, LoanBorrowHistory, LoanLTVAdjustmentHistory, LoanOngoingOrder, LoanRepaymentHistory, LockedRedemptionRecord, LockedSubscriptionPreview, LockedSubscriptionRecord, ManagedSubAccountDepositAddress, ManagedSubAccountDepositAddressParams, ManagedSubAccountFuturesAssetsResponse, ManagedSubAccountListParams, ManagedSubAccountMarginAssetsResponse, ManagedSubAccountSnapshot, ManagedSubAccountSnapshotParams, ManagedSubAccountTransferLogParams, ManagedSubAccountTransferTTLogParams, ManagerSubTransferHistoryVos, ManagerSubUserInfoVo, ManualLiquidationParams, ManualLiquidationResponse, MarginAccountLoanParams, MarginAccountRecord, MarginAvailableInventoryResponse, MarginCapitalFlow, MarginDelistSchedule, MarginInterestHistory, MarginInterestRateHistory, MarginOrderCountUsageResponse, MarginOTOCOOrder, MarginOTOOrder, MarginTransactionResponse, NewFutureAccountTransferParams, NewOrderListOTOCOParams, NewOrderListOTOCOResponse, NewOrderListOTOParams, NewOrderListOTOResponse, NewSpotOrderParams, NewSpotSOROrderParams, NextHourlyInterestRate, NftAsset, NftDeposit, NftTransaction, NftWithdraw, OrderBookResponse, OrderList, OrderListResponse, OrderRateLimitUsage, OrderResponseTypeFor, PMProBankruptcyLoanRepaymentHistory, PMProMintBFUSDParams, PMProMintBFUSDResponse, PMProRedeemBFUSDResponse, PortfolioMarginProAccountBalance, PortfolioMarginProSpanAccountInfo, PreventedMatch, PreventedMatchesParams, PurchaseFlexibleProductResponse, PurchaseRecordParams, QueryBrokerFuturesCommissionRebateParams, QueryBrokerSpotCommissionRebateParams, QueryCrossMarginAccountDetailsParams, QueryCrossMarginFeeDataParams, QueryCrossMarginPairResponse, QueryIsolatedMarginTierDataParams, QueryMarginAccountAllOCOParams, QueryMarginAccountTradeListParams, QueryMarginAssetResponse, QueryMarginInterestRateHistoryParams, QueryMarginPriceIndexResponse, QueryMarginRecordParams, QueryMaxBorrowResponse, QueryMaxTransferOutAmountResponse, QuerySubAccountCoinFuturesCommissionParams, QuerySubAccountFuturesAssetInfoParams, QuerySubAccountFuturesCommissionParams, QuerySubAccountSpotMarginAssetInfoParams, RawAccountTrade, RawTrade, RedeemBlvtParams, RedeemBlvtResponse, RedeemEthParams, RedeemEthResponse, RedeemGiftCardParams, RedeemSolResponse, RemoveBSwapLiquidityParams, RepayCryptoFlexibleLoanParams, RepayCryptoFlexibleLoanResponse, RepayCryptoLoanFlexibleWithCollateralParams, RepayCryptoLoanFlexibleWithCollateralResponse, RepayCryptoLoanParams, RepayCryptoLoanResponse, ReplaceSpotOrderParams, ReplaceSpotOrderResultSuccess, RollingWindowTickerParams, SetAutoSubscribeParams, SimpleEarnAccountResponse, SimpleEarnFlexibleProduct, SimpleEarnFlexibleProductPositionParams, SimpleEarnLockedProduct, SimpleEarnLockedProductPosition, SimpleEarnLockedProductPositionParams, SimpleEarnProductListParams, SimpleEarnRedeemFlexibleProductParams, SimpleEarnRedeemResponse, SimpleEarnSubscribeFlexibleProductResponse, SimpleEarnSubscribeLockedProductResponse, SimpleEarnSubscribeProductParams, SmallLiabilityExchangeCoin, SmallLiabilityExchangeHistory, SolBoostRewardsHistoryRecord, SolBoostRewardsHistoryReq, SolRedemptionHistoryRecord, SolStakingAccount, SolStakingHistoryRecord, SolStakingQuota, SOROrderResponseFull, SORTestOrderResponse, SpecialLowLatencyKeyInfo, SpecialLowLatencyKeyResponse, SpotAlgoOrder, SpotAmendKeepPriority, SpotOrder, StakingBasicParams, StakingHistory, StakingHistoryParams, StakingPersonalLeftQuota, StakingProduct, StakingProductPosition, StakingProductType, SubAccountAddOrDeleteIPList, SubAccountAssetDetails, SubAccountAssets, SubAccountAssetsParams, SubaccountBalances, SubAccountBrokerMarginAsset, SubaccountBrokerSpotAsset, SubAccountCOINMDetail, SubAccountCOINMPositionRisk, SubAccountCOINMSummary, SubAccountDeposit, SubAccountDepositAddress, SubAccountDepositAddressParams, SubAccountDepositHistoryList, SubAccountDepositHistoryParams, SubAccountEnableFutures, SubAccountEnableLeverageToken, SubAccountEnableMargin, SubAccountEnableOrDisableIPRestriction, SubAccountFuturesAccountDetail, SubAccountFuturesAccountSummary, SubAccountFuturesAssetTransfer, SubAccountFuturesAssetTransferHistory, SubAccountFuturesAssetTransferHistoryParams, SubAccountFuturesAssetTransferParams, SubAccountListParams, SubAccountListResponse, SubAccountMarginAccountDetail, SubAccountMovePosition, SubAccountMovePositionHistory, SubAccountMovePositionHistoryParams, SubAccountMovePositionParams, SubAccountsMarginAccountSummary, SubAccountSpotAssetsSummary, SubAccountSpotAssetsSummaryParams, SubAccountSpotAssetTransferHistory, SubAccountSpotAssetTransferHistoryParams, SubAccountStatus, SubAccountSummaryOnFuturesAccountV2Params, SubAccountTransactionStatistics, SubAccountTransfer, SubAccountTransferHistory, SubAccountTransferHistoryParams, SubAccountTransferParams, SubAccountTransferToMasterParams, SubAccountTransferToSameMasterParams, SubAccountUniversalTransfer, SubAccountUniversalTransferHistoryParams, SubAccountUniversalTransferHistoryResponse, SubAccountUniversalTransferParams, SubAccountUSDMDetail, SubAccountUSDMPositionRisk, SubAccountUSDMSummary, SubmitConvertLimitOrderParams, SubmitDepositCreditParams, SubmitDepositCreditResponse, SubmitHashrateResaleParams, SubmitIndexLinkedPlanRedemptionParams, SubmitMarginOTOCOOrderParams, SubmitMarginOTOOrderParams, SubmitOneTimeTransactionParams, SubmitOneTimeTransactionResponse, SubmitSpotTwapNewOrderParams, SubmitSpotTwapNewOrderResponse, SubmitTravelRuleDepositQuestionnaireParams, SubmitTravelRuleDepositQuestionnaireResponse, SubmitTwapNewOrderParams, SubmitTwapNewOrderResponse, SubmitVpNewOrderParams, SubmitVpNewOrderResponse, SubscribeBlvtParams, SubscribeBlvtResponse, SubscribeDualInvestmentProductParams, SubscribeDualInvestmentProductResponse, SubscribeEthStakingV2Response, SubscribeSolStakingResponse, SymbolOrderBookTicker, SymbolTradeFee, SystemStatusResponse, TargetAssetROI, Ticker24hrResponse, ToggleBNBBurnParams, TradingDayTickerArray, TradingDayTickerFull, TradingDayTickerMini, TradingDayTickerParams, TradingDayTickerSingle, TransferBrokerSubAccount, TransferBrokerSubAccountParams, TravelRuleDepositHistoryRecord, TravelRuleWithdrawHistoryRecord, UniversalTransferBrokerParams, UniversalTransferHistoryParams, UniversalTransferParams, UpdateIpRestrictionForSubApiKey, UsdtMarginedFuturesResponse, UserAsset, VASPInfo, VipCollateralAccount, VipLoanAccruedInterestParams, VipLoanAccruedInterestRecord, VipLoanBorrowParams, VipLoanBorrowResponse, VipLoanInterestRateHistoryParams, VipLoanInterestRateRecord, VipLoanRenewParams, VipLoanRenewResponse, VipLoanRepaymentHistory, VipLoanRepayParams, VipLoanRepayResponse, VipOngoingOrder, VirtualSubAccount, WalletBalance, WithdrawAddress, WithdrawAssetsFromManagedSubAccountParams, WithdrawHistory, WithdrawHistoryParams, WithdrawParams, WithdrawTravelRuleParams, WrapBethResponse, WrapHistory } from './types/spot';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';
export declare class MainClient extends BaseRestClient {
    constructor(restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig);
    /**
     * This method is used to get the latency and time sync between the client and the server.
     * This is not official API endpoint and is only used for internal testing purposes.
     * Use this method to check the latency and time sync between the client and the server.
     * Final values might vary slightly, but it should be within few ms difference.
     * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
     */
    fetchLatencySummary(): Promise<any>;
    /**
     * Abstraction required by each client to aid with time sync / drift handling
     */
    getServerTime(baseUrlKeyOverride?: BinanceBaseUrlKey): Promise<number>;
    /**
     *
     * SPOT TRADING Endpoints - General endpoints
     *
     **/
    testConnectivity(): Promise<object>;
    getExchangeInfo(params?: ExchangeInfoParams): Promise<ExchangeInfo>;
    /**
     *
     * SPOT TRADING Endpoints - Market endpoints
     *
     **/
    getOrderBook(params: OrderBookParams): Promise<OrderBookResponse>;
    getRecentTrades(params: RecentTradesParams): Promise<RawTrade[]>;
    getHistoricalTrades(params: HistoricalTradesParams): Promise<RawTrade[]>;
    getAggregateTrades(params: SymbolFromPaginatedRequestFromId): Promise<AggregateTrade[]>;
    getKlines(params: KlinesParams): Promise<Kline[]>;
    getUIKlines(params: KlinesParams): Promise<Kline[]>;
    getAvgPrice(params: {
        symbol: string;
    }): Promise<CurrentAvgPrice>;
    /**
     * @deprecated due to invalid naming
     * Use get24hrChangeStatistics instead
     */
    get24hrChangeStatististics(params?: {
        symbols?: string[];
        type?: 'FULL' | 'MINI';
    }): Promise<Ticker24hrResponse[]>;
    /**
     * @deprecated due to invalid naming
     * Use get24hrChangeStatistics instead
     */
    get24hrChangeStatististics(params: {
        symbol: string;
        type?: 'FULL' | 'MINI';
    }): Promise<Ticker24hrResponse>;
    get24hrChangeStatistics(params?: {
        symbols?: string[];
        type?: 'FULL' | 'MINI';
    }): Promise<Ticker24hrResponse[]>;
    get24hrChangeStatistics(params: {
        symbol: string;
        type?: 'FULL' | 'MINI';
    }): Promise<Ticker24hrResponse>;
    getTradingDayTicker(params: TradingDayTickerParams): Promise<TradingDayTickerSingle | TradingDayTickerArray[]>;
    getSymbolPriceTicker(params?: {
        symbol?: string;
        symbols?: string[];
    }): Promise<SymbolPrice | SymbolPrice[]>;
    getSymbolOrderBookTicker(params?: {
        symbol?: string;
        symbols?: string[];
    }): Promise<SymbolOrderBookTicker | SymbolOrderBookTicker[]>;
    getRollingWindowTicker(params: RollingWindowTickerParams): Promise<TradingDayTickerFull[] | TradingDayTickerMini[]>;
    /**
     *
     * SPOT TRADING Endpoints - Trading endpoints
     *
     **/
    submitNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>>;
    testNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<object>;
    getOrder(params: GetOrderParams): Promise<SpotOrder>;
    cancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult>;
    cancelAllSymbolOrders(params: {
        symbol: string;
    }): Promise<CancelSpotOrderResult[]>;
    replaceOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: ReplaceSpotOrderParams<T, RT>): Promise<ReplaceSpotOrderResultSuccess<T, RT>>;
    /**
     * Reduce the quantity of an existing open order while keeping its priority in the order book.
     * The new quantity must be less than the current quantity.
     * https://binance-docs.github.io/apidocs/futures/en/#order-amend-keep-priority-trade
     */
    amendOrderKeepPriority(params: AmendKeepPriorityParams): Promise<SpotAmendKeepPriority>;
    getOpenOrders(params?: {
        symbol?: string;
    }): Promise<SpotOrder[]>;
    getAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]>;
    /**
     * @deprecated
     */
    submitNewOCO(params: NewOCOParams): Promise<any>;
    submitNewOrderList<T extends OrderResponseType>(params: NewOrderListParams<T>): Promise<OrderListResponse<T>>;
    submitNewOrderListOTO(params: NewOrderListOTOParams): Promise<NewOrderListOTOResponse>;
    submitNewOrderListOTOCO(params: NewOrderListOTOCOParams): Promise<NewOrderListOTOCOResponse>;
    cancelOCO(params: CancelOCOParams): Promise<CancelOrderListResult>;
    getOCO(params?: GetOCOParams): Promise<OrderList>;
    getAllOCO(params?: BasicFromPaginatedParams): Promise<OrderList[]>;
    /**
     * Query open OCO
     */
    getAllOpenOCO(): Promise<OrderList[]>;
    /**
     * Places an order using smart order routing (SOR).
     */
    submitNewSOROrder(params: NewSpotSOROrderParams): Promise<SOROrderResponseFull>;
    /**
     * Test new order creation and signature/recvWindow using smart order routing (SOR).
     * Creates and validates a new order but does not send it into the matching engine.
     */
    testNewSOROrder(params: NewSpotSOROrderParams & {
        computeCommissionRates?: boolean;
    }): Promise<object | SORTestOrderResponse>;
    /**
     *
     * SPOT TRADING Endpoints - Account endpoints
     *
     **/
    /**
     * Get current account information
     */
    getAccountInformation(params?: {
        omitZeroBalances?: boolean;
    }): Promise<AccountInformation>;
    getAccountTradeList(params: SymbolFromPaginatedRequestFromId & {
        orderId?: number;
    }): Promise<RawAccountTrade[]>;
    getOrderRateLimit(): Promise<OrderRateLimitUsage[]>;
    getPreventedMatches(params: PreventedMatchesParams): Promise<PreventedMatch[]>;
    getAllocations(params: AllocationsParams): Promise<Allocation[]>;
    getCommissionRates(params: {
        symbol: string;
    }): Promise<CommissionRates>;
    /**
     *
     * MARGIN TRADING Endpoints - Market Data endpoints
     *
     **/
    getCrossMarginCollateralRatio(): Promise<{
        collaterals: Collateral[];
        assetNames: string[];
    }[]>;
    getAllCrossMarginPairs(): Promise<QueryCrossMarginPairResponse[]>;
    getIsolatedMarginAllSymbols(params?: {
        symbol?: string;
    }): Promise<IsolatedMarginSymbol[]>;
    getAllMarginAssets(): Promise<QueryMarginAssetResponse[]>;
    getMarginDelistSchedule(): Promise<MarginDelistSchedule[]>;
    getIsolatedMarginTierData(params: QueryIsolatedMarginTierDataParams): Promise<IsolatedMarginTierData[]>;
    queryMarginPriceIndex(params: BasicSymbolParam): Promise<QueryMarginPriceIndexResponse>;
    getMarginAvailableInventory(params: {
        type: string;
    }): Promise<MarginAvailableInventoryResponse>;
    getLeverageBracket(): Promise<LiabilityCoinLeverageBracket[]>;
    /**
     *
     * MARGIN TRADING Endpoints - Borrow and Repay endpoints
     *
     **/
    getNextHourlyInterestRate(params: GetNextHourlyInterestRateParams): Promise<NextHourlyInterestRate[]>;
    getMarginInterestHistory(params: GetMarginInterestHistoryParams): Promise<{
        rows: MarginInterestHistory[];
        total: number;
    }>;
    submitMarginAccountBorrowRepay(params: MarginAccountLoanParams): Promise<MarginTransactionResponse>;
    getMarginAccountBorrowRepayRecords(params: GetMarginAccountBorrowRepayRecordsParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    getMarginInterestRateHistory(params: QueryMarginInterestRateHistoryParams): Promise<MarginInterestRateHistory[]>;
    queryMaxBorrow(params: BasicMarginAssetParams): Promise<QueryMaxBorrowResponse>;
    /**
     *
     * MARGIN TRADING Endpoints - Trade endpoints
     *
     **/
    getMarginForceLiquidationRecord(params: GetForceLiquidationRecordParams): Promise<{
        rows: ForceLiquidationRecord[];
        total: number;
    }>;
    getSmallLiabilityExchangeCoins(): Promise<SmallLiabilityExchangeCoin[]>;
    getSmallLiabilityExchangeHistory(params: GetSmallLiabilityExchangeHistoryParams): Promise<{
        total: number;
        rows: SmallLiabilityExchangeHistory[];
    }>;
    marginAccountCancelOpenOrders(params: BasicSymbolParam): Promise<CancelSpotOrderResult[]>;
    marginAccountCancelOCO(params: CancelOCOParams): Promise<any>;
    marginAccountCancelOrder(params: CancelOrderParams): Promise<CancelSpotOrderResult>;
    marginAccountNewOCO(params: NewOCOParams): Promise<any>;
    marginAccountNewOrder<T extends OrderType, RT extends OrderResponseType | undefined = undefined>(params: NewSpotOrderParams<T, RT>): Promise<OrderResponseTypeFor<RT, T>>;
    getMarginOrderCountUsage(params: GetMarginOrderCountUsageParams): Promise<MarginOrderCountUsageResponse[]>;
    queryMarginAccountAllOCO(params: QueryMarginAccountAllOCOParams): Promise<any>;
    queryMarginAccountAllOrders(params: GetAllOrdersParams): Promise<SpotOrder[]>;
    queryMarginAccountOCO(params: GetOCOParams): Promise<any>;
    queryMarginAccountOpenOCO(params: {
        isIsolated?: 'TRUE' | 'FALSE';
        symbol?: string;
    }): Promise<any>;
    queryMarginAccountOpenOrders(params: BasicSymbolParam): Promise<SpotOrder[]>;
    queryMarginAccountOrder(params: GetOrderParams): Promise<SpotOrder>;
    queryMarginAccountTradeList(params: QueryMarginAccountTradeListParams): Promise<any>;
    submitSmallLiabilityExchange(params: {
        assetNames: string[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    submitManualLiquidation(params: ManualLiquidationParams): Promise<ManualLiquidationResponse[]>;
    /**
     * Post a new OTO order for margin account
     */
    submitMarginOTOOrder(params: SubmitMarginOTOOrderParams): Promise<MarginOTOOrder>;
    /**
     * Submit a new OTOCO order for margin account
     */
    submitMarginOTOCOOrder(params: SubmitMarginOTOCOOrderParams): Promise<MarginOTOCOOrder>;
    /**
     * Create a special key for low-latency trading (VIP 4+ only)
     */
    createMarginSpecialLowLatencyKey(params: CreateSpecialLowLatencyKeyParams): Promise<SpecialLowLatencyKeyResponse>;
    deleteMarginSpecialLowLatencyKey(params?: {
        apiKey?: string;
        apiName?: string;
        symbol?: string;
    }): Promise<any>;
    updateMarginIPForSpecialLowLatencyKey(params: {
        apiKey: string;
        symbol?: string;
        ip: string;
    }): Promise<object>;
    /**
     * Query the list of special keys for low-latency trading
     */
    getMarginSpecialLowLatencyKeys(params: {
        symbol?: string;
    }): Promise<SpecialLowLatencyKeyInfo[]>;
    /**
     * Query information for a specific special key used in low-latency trading
     */
    getMarginSpecialLowLatencyKey(params: {
        apiKey: string;
        symbol?: string;
    }): Promise<SpecialLowLatencyKeyInfo>;
    /**
     *
     * MARGIN TRADING Endpoints - Transfer endpoints
     *
     **/
    getCrossMarginTransferHistory(params: GetCrossMarginTransferHistoryParams): Promise<RowsWithTotal<CrossMarginTransferHistory>>;
    queryMaxTransferOutAmount(params: BasicMarginAssetParams): Promise<QueryMaxTransferOutAmountResponse>;
    /**
     *
     * MARGIN TRADING Endpoints - Account endpoints
     *
     **/
    updateCrossMarginMaxLeverage(params: {
        maxLeverage: number;
    }): Promise<{
        success: boolean;
    }>;
    disableIsolatedMarginAccount(params: {
        symbol: string;
    }): Promise<{
        success: boolean;
        symbol: string;
    }>;
    enableIsolatedMarginAccount(params: {
        symbols: string;
    }): Promise<{
        success: boolean;
        symbol: string;
    }>;
    getBNBBurn(): Promise<BNBBurnResponse>;
    getMarginSummary(): Promise<any>;
    queryCrossMarginAccountDetails(): Promise<QueryCrossMarginAccountDetailsParams>;
    getCrossMarginFeeData(params: QueryCrossMarginFeeDataParams): Promise<CrossMarginFeeData[]>;
    getIsolatedMarginAccountLimit(): Promise<{
        enabledAccount: number;
        maxAccount: number;
    }>;
    getIsolatedMarginAccountInfo(params?: {
        symbols?: string;
    }): Promise<IsolatedMarginAccountInfo>;
    getIsolatedMarginFeeData(params: QueryCrossMarginFeeDataParams): Promise<IsolatedMarginFeeData[]>;
    toggleBNBBurn(params: ToggleBNBBurnParams): Promise<BNBBurnResponse>;
    /**
     * Possibly @deprecated
     * Only existing in old documentation, not in new documentation
     */
    getMarginCapitalFlow(params: GetMarginCapitalFlowParams): Promise<MarginCapitalFlow[]>;
    /**
     * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
     */
    queryLoanRecord(params: QueryMarginRecordParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    /**
     * @deprecated on 2024-01-09, use getMarginAccountBorrowRepayRecords() instead
     */
    queryRepayRecord(params: QueryMarginRecordParams): Promise<{
        rows: MarginAccountRecord[];
        total: number;
    }>;
    /**
     * @deprecated on 2024-01-09, use submitUniversalTransfer() instead
     */
    isolatedMarginAccountTransfer(params: IsolatedMarginAccountTransferParams): Promise<MarginTransactionResponse>;
    /**
     *
     * WALLET Endpoints - Capital endpoints
     *
     **/
    getBalances(): Promise<AllCoinsInformationResponse[]>;
    withdraw(params: WithdrawParams): Promise<{
        id: string;
    }>;
    getWithdrawHistory(params?: WithdrawHistoryParams): Promise<WithdrawHistory[]>;
    getWithdrawAddresses(): Promise<WithdrawAddress[]>;
    getDepositHistory(params?: DepositHistoryParams): Promise<DepositHistory[]>;
    getDepositAddress(params: DepositAddressParams): Promise<DepositAddressResponse>;
    getDepositAddresses(params: DepositAddressListParams): Promise<DepositAddress[]>;
    submitDepositCredit(params: SubmitDepositCreditParams): Promise<SubmitDepositCreditResponse>;
    /**
     * @deprecated - deleted as of 2024-11-21
     */
    getAutoConvertStablecoins(): Promise<ConvertibleCoinsResponse>;
    /**
     * @deprecated - deleted as of 2024-11-21
     */
    setConvertibleCoins(params: ConvertibleCoinsParams): Promise<void>;
    /**
     *
     * WALLET Endpoints - Asset endpoints
     *
     **/
    getAssetDetail(params?: Partial<BasicAssetParam>): Promise<Record<ExchangeSymbol, AssetDetail>>;
    getWalletBalances(params?: {
        quoteAsset?: string;
    }): Promise<WalletBalance[]>;
    getUserAsset(params: GetAssetParams): Promise<UserAsset[]>;
    submitUniversalTransfer(params: UniversalTransferParams): Promise<{
        tranId: number;
    }>;
    getUniversalTransferHistory(params: UniversalTransferHistoryParams): Promise<any>;
    getDust(params: {
        accountType?: 'SPOT' | 'MARGIN';
    }): Promise<DustInfo>;
    convertDustToBnb(params: ConvertDustParams): Promise<DustConversion>;
    getDustLog(params?: BasicTimeRangeParam): Promise<DustLog>;
    getAssetDividendRecord(params?: BasicAssetPaginatedParams): Promise<any>;
    getTradeFee(params?: {
        symbol?: string;
    }): Promise<SymbolTradeFee[]>;
    getFundingAsset(params: GetAssetParams): Promise<FundingAsset[]>;
    getCloudMiningHistory(params: CloudMiningHistoryParams): Promise<{
        total: number;
        rows: CloudMining[];
    }>;
    getDelegationHistory(params: DelegationHistoryParams): Promise<RowsWithTotal<DelegationHistory>>;
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
    submitNewFutureAccountTransfer(params: NewFutureAccountTransferParams): Promise<{
        tranId: number;
    }>;
    /**
     * Possibly @deprecated, found only in old docs only
     * Use sapi/v1/asset/transfer instead
     */
    getFutureAccountTransferHistory(params: GetFutureAccountTransferHistoryParams): Promise<RowsWithTotal<FutureAccountTransfer>>;
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralBorrowHistory(params?: CoinStartEndLimit): Promise<any>;
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralRepaymentHistory(params?: CoinStartEndLimit): Promise<any>;
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralWalletV2(): Promise<any>;
    /**
     * @deprecated as of 2023-09-25
     */
    getAdjustCrossCollateralLTVHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralLiquidationHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    /**
     * @deprecated as of 2023-09-25
     */
    getCrossCollateralInterestHistory(params?: GetLoanCoinPaginatedHistoryParams): Promise<any>;
    /**
     *
     * WALLET Endpoints - Account endpoints
     *
     **/
    getAccountInfo(): Promise<AccountInfo>;
    getDailyAccountSnapshot(params: DailyAccountSnapshotParams): Promise<DailyAccountSnapshot>;
    disableFastWithdrawSwitch(): Promise<object>;
    enableFastWithdrawSwitch(): Promise<object>;
    getAccountStatus(): Promise<{
        data: string;
    }>;
    getApiTradingStatus(): Promise<APITradingStatus>;
    getApiKeyPermissions(): Promise<APIPermissions>;
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
    withdrawTravelRule(params: WithdrawTravelRuleParams): Promise<{
        trId: number;
        accpted: boolean;
        info: string;
    }>;
    /**
     * Fetch withdraw history for local entities that require travel rule
     */
    getTravelRuleWithdrawHistory(params?: GetTravelRuleWithdrawHistoryParams): Promise<TravelRuleWithdrawHistoryRecord[]>;
    /**
     * Fetch withdraw history for local entities that require travel rule
     */
    getTravelRuleWithdrawHistoryV2(params?: GetTravelRuleWithdrawHistoryV2Params): Promise<TravelRuleWithdrawHistoryRecord[]>;
    /**
     * Submit questionnaire for local entities that require travel rule
     *
     * for questionaire format, please refer to the docs:
     * https://developers.binance.com/docs/wallet/travel-rule/deposit-questionnaire
     */
    submitTravelRuleDepositQuestionnaire(params: SubmitTravelRuleDepositQuestionnaireParams): Promise<SubmitTravelRuleDepositQuestionnaireResponse>;
    /**
     * Fetch deposit history for local entities that require travel rule
     */
    getTravelRuleDepositHistory(params?: GetTravelRuleDepositHistoryParams): Promise<TravelRuleDepositHistoryRecord[]>;
    /**
     * Fetch the onboarded VASP list for local entities that require travel rule
     */
    getOnboardedVASPList(): Promise<VASPInfo[]>;
    /**
     *
     * WALLET Endpoints - Other endpoints
     *
     **/
    getSystemStatus(): Promise<SystemStatusResponse>;
    getDelistSchedule(): Promise<DelistScheduleResponse[]>;
    /**
     *
     * SUB ACCOUNT Endpoints - Account management
     *
     **/
    createVirtualSubAccount(params: CreateSubAccountParams): Promise<VirtualSubAccount>;
    getSubAccountList(params?: SubAccountListParams): Promise<SubAccountListResponse>;
    subAccountEnableFutures(email: string): Promise<SubAccountEnableFutures>;
    subAccountEnableMargin(email: string): Promise<SubAccountEnableMargin>;
    enableOptionsForSubAccount(params: {
        email: string;
    }): Promise<EnableOptionsForSubAccountResponse>;
    subAccountEnableLeverageToken(params: SubAccountEnableLeverageToken): Promise<SubAccountEnableLeverageToken>;
    getSubAccountStatusOnMarginOrFutures(params?: {
        email?: string;
    }): Promise<SubAccountStatus[]>;
    getSubAccountFuturesPositionRisk(email: string): Promise<FuturesPositionRisk[]>;
    getSubAccountFuturesPositionRiskV2(params: BasicFuturesSubAccountParams): Promise<SubAccountUSDMPositionRisk | SubAccountCOINMPositionRisk>;
    getSubAccountTransactionStatistics(params: {
        email: string;
    }): Promise<SubAccountTransactionStatistics>;
    /**
     *
     * SUB ACCOUNT Endpoints - API management
     *
     **/
    getSubAccountIPRestriction(params: BasicSubAccount): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountDeleteIPList(params: SubAccountAddOrDeleteIPList): Promise<SubAccountEnableOrDisableIPRestriction>;
    subAccountAddIPRestriction(params: AddIpRestriction): Promise<SubAccountEnableOrDisableIPRestriction>;
    /**
     * @deprecated
     * Use subAccountAddIPRestriction instead
     **/
    subAccountAddIPList(params: SubAccountEnableOrDisableIPRestriction): Promise<SubAccountAddOrDeleteIPList>;
    /**
     * @deprecated
     * Use subAccountAddIPRestriction instead, or subAccountDeleteIPList
     **/
    subAccountEnableOrDisableIPRestriction(params: EnableOrDisableIPRestrictionForSubAccountParams): Promise<SubAccountEnableOrDisableIPRestriction>;
    /**
     *
     * SUB ACCOUNT Endpoints - Asset management
     *
     **/
    subAccountFuturesTransfer(params: SubAccountTransferParams): Promise<SubAccountTransfer>;
    getSubAccountFuturesAccountDetail(email: string): Promise<SubAccountFuturesAccountDetail>;
    getSubAccountDetailOnFuturesAccountV2(params: BasicFuturesSubAccountParams): Promise<SubAccountUSDMDetail | SubAccountCOINMDetail>;
    getSubAccountDetailOnMarginAccount(email: string): Promise<SubAccountMarginAccountDetail>;
    getSubAccountDepositAddress(params: SubAccountDepositAddressParams): Promise<SubAccountDepositAddress>;
    getSubAccountDepositHistory(params: SubAccountDepositHistoryParams): Promise<DepositHistory[]>;
    getSubAccountFuturesAccountSummary(): Promise<SubAccountFuturesAccountSummary>;
    getSubAccountSummaryOnFuturesAccountV2(params: SubAccountSummaryOnFuturesAccountV2Params): Promise<SubAccountUSDMSummary | SubAccountCOINMSummary>;
    getSubAccountsSummaryOfMarginAccount(): Promise<SubAccountsMarginAccountSummary>;
    subAccountMarginTransfer(params: SubAccountTransferParams): Promise<SubAccountTransfer>;
    getSubAccountAssets(params: SubAccountAssetsParams): Promise<SubAccountAssets>;
    getSubAccountAssetsMaster(params: {
        email: string;
    }): Promise<{
        balances: SubaccountBalances[];
    }>;
    getSubAccountFuturesAssetTransferHistory(params: SubAccountFuturesAssetTransferHistoryParams): Promise<SubAccountFuturesAssetTransferHistory>;
    getSubAccountSpotAssetTransferHistory(params?: SubAccountSpotAssetTransferHistoryParams): Promise<SubAccountSpotAssetTransferHistory>;
    getSubAccountSpotAssetsSummary(params?: SubAccountSpotAssetsSummaryParams): Promise<SubAccountSpotAssetsSummary>;
    getSubAccountUniversalTransferHistory(params?: SubAccountUniversalTransferHistoryParams): Promise<SubAccountUniversalTransferHistoryResponse>;
    subAccountFuturesAssetTransfer(params: SubAccountFuturesAssetTransferParams): Promise<SubAccountFuturesAssetTransfer>;
    subAccountTransferHistory(params?: SubAccountTransferHistoryParams): Promise<SubAccountTransferHistory[]>;
    subAccountTransferToMaster(params: SubAccountTransferToMasterParams): Promise<SubAccountTransfer>;
    subAccountTransferToSameMaster(params: SubAccountTransferToSameMasterParams): Promise<SubAccountTransfer>;
    subAccountUniversalTransfer(params: SubAccountUniversalTransferParams): Promise<SubAccountUniversalTransfer>;
    subAccountMovePosition(params: SubAccountMovePositionParams): Promise<{
        movePositionOrders: SubAccountMovePosition[];
    }>;
    getSubAccountFuturesPositionMoveHistory(params: SubAccountMovePositionHistoryParams): Promise<{
        total: number;
        futureMovePositionOrderVoList: SubAccountMovePositionHistory[];
    }>;
    /**
     *
     * SUB ACCOUNT Endpoints - Managed Sub Account
     *
     **/
    depositAssetsIntoManagedSubAccount(params: SubAccountTransferToSameMasterParams): Promise<MarginTransactionResponse>;
    getManagedSubAccountDepositAddress(params: ManagedSubAccountDepositAddressParams): Promise<ManagedSubAccountDepositAddress>;
    withdrawAssetsFromManagedSubAccount(params: WithdrawAssetsFromManagedSubAccountParams): Promise<MarginTransactionResponse>;
    getManagedSubAccountTransfersParent(params: ManagedSubAccountTransferLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccountTransferLog(params: ManagedSubAccountTransferTTLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccountTransfersInvestor(params: ManagedSubAccountTransferLogParams): Promise<{
        managerSubTransferHistoryVos: ManagerSubTransferHistoryVos[];
        count: number;
    }>;
    getManagedSubAccounts(params: ManagedSubAccountListParams): Promise<{
        total: number;
        managerSubUserInfoVoList: ManagerSubUserInfoVo[];
    }>;
    getManagedSubAccountSnapshot(params: ManagedSubAccountSnapshotParams): Promise<ManagedSubAccountSnapshot>;
    getManagedSubAccountAssetDetails(email: string): Promise<SubAccountAssetDetails[]>;
    getManagedSubAccountMarginAssets(params: {
        email: string;
        accountType?: string;
    }): Promise<ManagedSubAccountMarginAssetsResponse>;
    getManagedSubAccountFuturesAssets(params: {
        email: string;
        accountType?: string;
    }): Promise<ManagedSubAccountFuturesAssetsResponse>;
    /**
     *
     * AUTO INVEST Endpoints - Market data
     *
     **/
    getAutoInvestAssets(): Promise<{
        targetAssets: string[];
        sourceAssets: string[];
    }>;
    getAutoInvestSourceAssets(params: GetSourceAssetListParams): Promise<GetSourceAssetListResponse>;
    getAutoInvestTargetAssets(params: GetTargetAssetListParams): Promise<GetTargetAssetListResponse>;
    getAutoInvestTargetAssetsROI(params: GetTargetAssetROIParams): Promise<TargetAssetROI[]>;
    getAutoInvestIndex(params: {
        indexId: number;
    }): Promise<GetIndexDetailsResponse>;
    getAutoInvestPlans(params: {
        planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
    }): Promise<any>;
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
    submitAutoInvestOneTimeTransaction(params: SubmitOneTimeTransactionParams): Promise<SubmitOneTimeTransactionResponse>;
    updateAutoInvestPlanStatus(params: ChangePlanStatusParams): Promise<ChangePlanStatusResponse>;
    /**
     *
     * @deprecated , use updateAutoInvestmentPlan instead
     *
     **/
    updateAutoInvestmentPlanOld(params: EditInvestmentPlanParams): Promise<EditInvestmentPlanResponse>;
    updateAutoInvestmentPlan(params: EditInvestmentPlanParams): Promise<EditInvestmentPlanResponse>;
    submitAutoInvestRedemption(params: SubmitIndexLinkedPlanRedemptionParams): Promise<{
        redemptionId: number;
    }>;
    getAutoInvestSubscriptionTransactions(params: GetSubscriptionTransactionHistoryParams): Promise<any>;
    getOneTimeTransactionStatus(params: GetOneTimeTransactionStatusParams): Promise<GetOneTimeTransactionStatusResponse>;
    /**
     * @deprecated , use submitAutoInvestmentPlan instead
     *
     **/
    submitAutoInvestmentPlanOld(params: CreateInvestmentPlanParams): Promise<CreateInvestmentPlanResponse>;
    submitAutoInvestmentPlan(params: CreateInvestmentPlanParams): Promise<CreateInvestmentPlanResponse>;
    getAutoInvestRedemptionHistory(params: GetIndexLinkedPlanRedemptionHistoryParams): Promise<IndexLinkedPlanRedemptionRecord[]>;
    getAutoInvestPlan(params: GetPlanDetailsParams): Promise<any>;
    getAutoInvestUserIndex(params: {
        indexId: number;
    }): Promise<GetIndexLinkedPlanPositionDetailsResponse>;
    getAutoInvestRebalanceHistory(params: GetIndexLinkedPlanRebalanceHistoryParams): Promise<GetIndexLinkedPlanRebalanceHistoryParams[]>;
    /**
     *
     * CONVERT Endpoints - Market Data
     *
     **/
    getConvertPairs(params: GetAllConvertPairsParams): Promise<any>;
    getConvertAssetInfo(): Promise<any>;
    /**
     *
     * CONVERT Endpoints - Trade
     *
     **/
    convertQuoteRequest(params: ConvertQuoteRequestParams): Promise<any>;
    acceptQuoteRequest(params: AcceptQuoteRequestParams): Promise<any>;
    getConvertTradeHistory(params: GetConvertTradeHistoryParams): Promise<any>;
    getOrderStatus(params: GetOrderStatusParams): Promise<any>;
    submitConvertLimitOrder(params: SubmitConvertLimitOrderParams): Promise<any>;
    cancelConvertLimitOrder(params: {
        orderId: number;
    }): Promise<any>;
    getConvertLimitOpenOrders(): Promise<{
        list: ConvertLimitOpenOrder[];
    }>;
    /**
     *
     * STAKING Endpoints - ETH Staking - Account
     *
     **/
    /**
     * @deprecated use getEthStakingAccountV2 instead
     **/
    getEthStakingAccount(): Promise<GetEthStakingAccountResponse>;
    getEthStakingAccountV2(): Promise<GetEthStakingAccountV2Response>;
    getEthStakingQuota(): Promise<GetEthStakingQuotaResponse>;
    /**
     *
     * STAKING Endpoints - ETH Staking- Staking
     *
     **/
    /**
     * @deprecated use subscribeEthStakingV2 instead
     **/
    subscribeEthStakingV1(params: {
        amount: number;
    }): Promise<{
        success: boolean;
    }>;
    subscribeEthStakingV2(params: {
        amount: number;
    }): Promise<SubscribeEthStakingV2Response>;
    redeemEth(params: RedeemEthParams): Promise<RedeemEthResponse>;
    wrapBeth(params: {
        amount: number;
    }): Promise<WrapBethResponse>;
    /**
     *
     * STAKING Endpoints - ETH Staking - History
     *
     **/
    getEthStakingHistory(params: GetEthStakingHistoryParams): Promise<{
        rows: EthStakingHistory[];
        total: number;
    }>;
    getEthRedemptionHistory(params: GetEthRedemptionHistoryParams): Promise<{
        rows: EthRedemptionHistory[];
        total: number;
    }>;
    getBethRewardsHistory(params: GetBethRewardsHistoryParams): Promise<{
        rows: BethRewardsHistory[];
        total: number;
    }>;
    getWbethRewardsHistory(params: GetWrapHistoryParams): Promise<GetWbethRewardsHistoryResponse>;
    getEthRateHistory(params: GetETHRateHistoryParams): Promise<{
        rows: ETHRateHistory[];
        total: string;
    }>;
    getBethWrapHistory(params: GetWrapHistoryParams): Promise<{
        rows: WrapHistory[];
        total: number;
    }>;
    getBethUnwrapHistory(params: GetWrapHistoryParams): Promise<{
        rows: WrapHistory[];
        total: number;
    }>;
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingProducts(params: StakingBasicParams & {
        asset?: string;
    }): Promise<StakingProduct[]>;
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingProductPosition(params: StakingBasicParams & {
        productId?: string;
        asset?: string;
    }): Promise<StakingProductPosition[]>;
    /**
     * @deprecated as of 2024-01-19
     */
    getStakingHistory(params: StakingHistoryParams): Promise<StakingHistory[]>;
    /**
     * @deprecated as of 2024-01-19
     */
    getPersonalLeftQuotaOfStakingProduct(params: {
        product: StakingProductType;
        productId: string;
    }): Promise<StakingPersonalLeftQuota>;
    /**
     *
     * STAKING Endpoints - SOL Staking- Account
     *
     **/
    getSolStakingAccount(): Promise<SolStakingAccount>;
    getSolStakingQuota(): Promise<SolStakingQuota>;
    /**
     *
     * STAKING Endpoints - SOL Staking - Staking
     *
     **/
    subscribeSolStaking(params: {
        amount: number;
    }): Promise<SubscribeSolStakingResponse>;
    redeemSol(params: {
        amount: number;
    }): Promise<RedeemSolResponse>;
    claimSolBoostRewards(): Promise<{
        success: boolean;
    }>;
    /**
     *
     * STAKING Endpoints - SOL Staking- History
     *
     **/
    getSolStakingHistory(params?: GetSolStakingHistoryReq): Promise<{
        rows: SolStakingHistoryRecord[];
        total: number;
    }>;
    getSolRedemptionHistory(params?: {
        rows: SolRedemptionHistoryRecord[];
        total: number;
    }): Promise<SolRedemptionHistoryRecord>;
    getBnsolRewardsHistory(params?: GetBnsolRewardsHistoryReq): Promise<{
        estRewardsInSOL: string;
        rows: BnsolRewardHistoryRecord[];
        total: number;
    }>;
    getBnsolRateHistory(params?: GetBnsolRateHistoryReq): Promise<{
        rows: BnsolRateHistoryRecord[];
        total: string;
    }>;
    getSolBoostRewardsHistory(params?: SolBoostRewardsHistoryReq): Promise<{
        rows: SolBoostRewardsHistoryRecord[];
        total: number;
    }>;
    getSolUnclaimedRewards(): Promise<{
        amount: string;
        rewardsAsset: string;
    }[]>;
    /**
     *
     * COPY TRADING Endpoints - Future copy trading
     *
     **/
    getFuturesLeadTraderStatus(): Promise<GetFuturesLeadTraderStatusResponse>;
    getFuturesLeadTradingSymbolWhitelist(): Promise<GetFuturesLeadTradingSymbolWhitelistResponse[]>;
    /**
     *
     * MINING Endpoints - rest api
     *
     **/
    getMiningAlgos(): Promise<GetMiningAlgoListResponse[]>;
    getMiningCoins(): Promise<GetMiningCoinListResponse[]>;
    getHashrateResales(params: GetHashrateResaleListParams): Promise<GetHashrateResaleListResponse>;
    getMiners(params: GetMinerListParams): Promise<GetMinerListResponse>;
    getMinerDetails(params: GetMinerDetailsParams): Promise<GetMinerDetailsResponse[]>;
    getExtraBonuses(params: GetExtraBonusListParams): Promise<GetExtraBonusListResponse>;
    getMiningEarnings(params: GetEarningsListParams): Promise<GetEarningsListResponse>;
    cancelHashrateResaleConfig(params: CancelHashrateResaleConfigParams): Promise<boolean>;
    getHashrateResale(params: GetHashrateResaleDetailParams): Promise<GetHashrateResaleDetailResponse>;
    getMiningAccountEarnings(params: GetMiningAccountEarningParams): Promise<GetMiningAccountEarningResponse>;
    getMiningStatistics(params: GetStatisticListParams): Promise<GetStatisticListResponse>;
    submitHashrateResale(params: SubmitHashrateResaleParams): Promise<number>;
    getMiningAccounts(params: getMiningAccountsListParams): Promise<getMiningAccountsListResponse>;
    /**
     *
     * ALGO TRADING Endpoints - Future algo
     *
     **/
    submitVpNewOrder(params: SubmitVpNewOrderParams): Promise<SubmitVpNewOrderResponse>;
    submitTwapNewOrder(params: SubmitTwapNewOrderParams): Promise<SubmitTwapNewOrderResponse>;
    cancelAlgoOrder(params: {
        algoId: number;
    }): Promise<CancelAlgoOrderResponse>;
    getAlgoSubOrders(params: GetAlgoSubOrdersParams): Promise<GetAlgoSubOrdersResponse>;
    getAlgoOpenOrders(): Promise<{
        total: number;
        orders: AlgoOrder[];
    }>;
    getAlgoHistoricalOrders(params: GetAlgoHistoricalOrdersParams): Promise<{
        total: number;
        orders: HistoricalAlgoOrder[];
    }>;
    /**
     *
     * ALGO TRADING Endpoints - Spot algo
     *
     **/
    submitSpotAlgoTwapOrder(params: SubmitSpotTwapNewOrderParams): Promise<SubmitSpotTwapNewOrderResponse>;
    cancelSpotAlgoOrder(params: {
        algoId: number;
    }): Promise<CancelSpotAlgoOrderResponse>;
    getSpotAlgoSubOrders(params: GetSpotAlgoSubOrdersParams): Promise<GetSpotAlgoSubOrdersResponse>;
    getSpotAlgoOpenOrders(): Promise<{
        total: number;
        orders: SpotAlgoOrder[];
    }>;
    getSpotAlgoHistoricalOrders(params: GetSpotAlgoHistoricalOrdersParams): Promise<{
        total: number;
        orders: HistoricalSpotAlgoOrder[];
    }>;
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - Market data
     *
     **/
    getCryptoLoanFlexibleCollateralAssets(params: {
        collateralCoin?: string;
    }): Promise<{
        rows: FlexibleLoanCollateralAssetData[];
        total: number;
    }>;
    getCryptoLoanFlexibleAssets(params: {
        loanCoin?: string;
    }): Promise<{
        rows: FlexibleLoanAssetData[];
        total: number;
    }>;
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - Trade
     *
     **/
    borrowCryptoLoanFlexible(params: BorrowFlexibleLoanParams): Promise<BorrowFlexibleLoanResponse>;
    repayCryptoLoanFlexible(params: RepayCryptoFlexibleLoanParams): Promise<RepayCryptoFlexibleLoanResponse>;
    repayCryptoLoanFlexibleWithCollateral(params: RepayCryptoLoanFlexibleWithCollateralParams): Promise<RepayCryptoLoanFlexibleWithCollateralResponse>;
    adjustCryptoLoanFlexibleLTV(params: AdjustFlexibleCryptoLoanLTVParams): Promise<AdjustFlexibleCryptoLoanLTVResponse>;
    /**
     *
     * CRYPTO LOAN Endpoints - Flexible rate - User info
     *
     **/
    getCryptoLoanFlexibleLTVAdjustmentHistory(params: GetFlexibleLoanLTVAdjustmentHistoryParams): Promise<{
        rows: FlexibleLoanLTVAdjustmentHistory[];
        total: number;
    }>;
    getFlexibleLoanCollateralRepayRate(params: {
        loanCoin: string;
        collateralCoin: string;
    }): Promise<{
        loanCoin: string;
        collateralCoin: string;
        rate: string;
    }>;
    getLoanFlexibleBorrowHistory(params: GetFlexibleCryptoLoanBorrowHistoryParams): Promise<{
        rows: FlexibleCryptoLoanBorrowHistory[];
        total: number;
    }>;
    getCryptoLoanFlexibleOngoingOrders(params: GetFlexibleLoanOngoingOrdersParams): Promise<{
        rows: FlexibleLoanOngoingOrder[];
        total: number;
    }>;
    getFlexibleLoanLiquidationHistory(params?: GetFlexibleLoanLiquidationHistoryParams): Promise<{
        rows: FlexibleLoanLiquidationHistoryRecord[];
        total: number;
    }>;
    getLoanFlexibleRepaymentHistory(params: GetLoanRepaymentHistoryParams): Promise<{
        rows: LoanRepaymentHistory[];
        total: number;
    }>;
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - Market data
     *
     **/
    /**
     * @deprecated
     */
    getCryptoLoanLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
        rows: LoanableAssetData[];
        total: number;
    }>;
    getCryptoLoanCollateralRepayRate(params: CheckCollateralRepayRateParams): Promise<CheckCollateralRepayRateResponse>;
    /**
     * @deprecated
     */
    getCryptoLoanCollateralAssetsData(params: GetCollateralAssetDataParams): Promise<{
        rows: CollateralAssetData[];
        total: number;
    }>;
    getCryptoLoansIncomeHistory(params: GetCryptoLoansIncomeHistoryParams): Promise<GetCryptoLoansIncomeHistoryResponse[]>;
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - Trade
     *
     **/
    /**
     * @deprecated
     */
    borrowCryptoLoan(params: BorrowCryptoLoanParams): Promise<BorrowCryptoLoanResponse>;
    /**
     * @deprecated
     */
    repayCryptoLoan(params: RepayCryptoLoanParams): Promise<RepayCryptoLoanResponse>;
    /**
     * @deprecated
     */
    adjustCryptoLoanLTV(params: AdjustCryptoLoanLTVParams): Promise<AdjustCryptoLoanLTVResponse>;
    /**
     * @deprecated
     */
    customizeCryptoLoanMarginCall(params: CustomizeMarginCallParams): Promise<{
        rows: CustomizeMarginCall[];
        total: number;
    }>;
    /**
     *
     * CRYPTO LOAN Endpoints - Stable rate - User info
     *
     **/
    /**
     * @deprecated
     */
    getCryptoLoanOngoingOrders(params: GetLoanOngoingOrdersParams): Promise<{
        rows: LoanOngoingOrder[];
        total: number;
    }>;
    getCryptoLoanBorrowHistory(params: GetLoanBorrowHistoryParams): Promise<{
        rows: LoanBorrowHistory[];
        total: number;
    }>;
    getCryptoLoanLTVAdjustmentHistory(params: GetLoanLTVAdjustmentHistoryParams): Promise<{
        rows: LoanLTVAdjustmentHistory[];
        total: number;
    }>;
    getCryptoLoanRepaymentHistory(params: GetLoanRepaymentHistoryParams): Promise<any>;
    /**
     *
     * SIMPLE EARN Endpoints - Account
     *
     **/
    getSimpleEarnAccount(): Promise<SimpleEarnAccountResponse>;
    getFlexibleSavingProducts(params?: SimpleEarnProductListParams): Promise<{
        rows: SimpleEarnFlexibleProduct[];
        total: number;
    }>;
    getSimpleEarnLockedProductList(params?: SimpleEarnProductListParams): Promise<{
        rows: SimpleEarnLockedProduct[];
        total: number;
    }>;
    getFlexibleProductPosition(params?: SimpleEarnFlexibleProductPositionParams): Promise<{
        rows: any[];
        total: number;
    }>;
    getLockedProductPosition(params?: SimpleEarnLockedProductPositionParams): Promise<{
        rows: SimpleEarnLockedProductPosition[];
        total: number;
    }>;
    getFlexiblePersonalLeftQuota(params: {
        productId: string;
    }): Promise<{
        leftPersonalQuota: string;
    }>;
    getLockedPersonalLeftQuota(params: {
        projectId: string;
    }): Promise<{
        leftPersonalQuota: string;
    }>;
    /**
     *
     * SIMPLE EARN Endpoints - Earn
     *
     **/
    purchaseFlexibleProduct(params: SimpleEarnSubscribeProductParams): Promise<SimpleEarnSubscribeFlexibleProductResponse>;
    subscribeSimpleEarnLockedProduct(params: SimpleEarnSubscribeProductParams): Promise<SimpleEarnSubscribeLockedProductResponse>;
    redeemFlexibleProduct(params: SimpleEarnRedeemFlexibleProductParams): Promise<SimpleEarnRedeemResponse>;
    redeemLockedProduct(params: {
        positionId: string;
    }): Promise<SimpleEarnRedeemResponse>;
    setFlexibleAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
        success: boolean;
    }>;
    setLockedAutoSubscribe(params: SetAutoSubscribeParams): Promise<{
        success: boolean;
    }>;
    getFlexibleSubscriptionPreview(params: GetFlexibleSubscriptionPreviewParams): Promise<FlexibleSubscriptionPreview>;
    getLockedSubscriptionPreview(params: GetLockedSubscriptionPreviewParams): Promise<LockedSubscriptionPreview[]>;
    setLockedProductRedeemOption(params: {
        positionId: string;
        redeemTo: 'SPOT' | 'FLEXIBLE';
    }): Promise<{
        success: boolean;
    }>;
    /**
     *
     * SIMPLE EARN Endpoints - History
     *
     **/
    getFlexibleSubscriptionRecord(params: GetFlexibleSubscriptionRecordParams): Promise<{
        rows: GetFlexibleSubscriptionRecordResponse[];
        total: number;
    }>;
    getLockedSubscriptionRecord(params: GetLockedSubscriptionRecordParams): Promise<{
        rows: LockedSubscriptionRecord[];
        total: number;
    }>;
    getFlexibleRedemptionRecord(params: GetFlexibleRedemptionRecordParams): Promise<{
        rows: FlexibleRedemptionRecord[];
        total: number;
    }>;
    getLockedRedemptionRecord(params: GetLockedRedemptionRecordParams): Promise<{
        rows: LockedRedemptionRecord[];
        total: number;
    }>;
    getFlexibleRewardsHistory(params: GetFlexibleRewardsHistoryParams): Promise<{
        rows: FlexibleRewardsHistory[];
        total: number;
    }>;
    getLockedRewardsHistory(params: GetLockedRewardsHistoryParams): Promise<{
        rows: GetLockedRewardsHistory[];
        total: number;
    }>;
    getCollateralRecord(params: GetCollateralRecordParams): Promise<{
        rows: CollateralRecord[];
        total: string;
    }>;
    getRateHistory(params: GetRateHistoryParams): Promise<{
        rows: GetRateHistory[];
        total: string;
    }>;
    /**
     *
     * VIP LOAN Endpoints - Market Data
     *
     **/
    getVipBorrowInterestRate(params: {
        loanCoin: string;
    }): Promise<BorrowInterestRate[]>;
    getVipLoanInterestRateHistory(params: VipLoanInterestRateHistoryParams): Promise<{
        rows: VipLoanInterestRateRecord[];
        total: number;
    }>;
    getVipLoanableAssets(params: GetLoanableAssetsDataParams): Promise<{
        rows: LoanableAssetData[];
        total: number;
    }>;
    getVipCollateralAssets(params: {
        collateralCoin?: string;
    }): Promise<{
        rows: CollateralAssetData[];
        total: number;
    }>;
    /**
     *
     * VIP LOAN Endpoints - User Info
     *
     **/
    getVipLoanOpenOrders(params: GetVipLoanOngoingOrdersParams): Promise<{
        rows: VipOngoingOrder[];
        total: number;
    }>;
    getVipLoanRepaymentHistory(params: GetVipLoanRepaymentHistoryParams): Promise<{
        rows: VipLoanRepaymentHistory[];
        total: number;
    }>;
    checkVipCollateralAccount(params: CheckVipCollateralAccountParams): Promise<{
        rows: VipCollateralAccount[];
        total: number;
    }>;
    getVipApplicationStatus(params: GetApplicationStatusParams): Promise<{
        rows: ApplicationStatus[];
        total: number;
    }>;
    /**
     *
     * VIP LOAN Endpoints - Trade
     *
     **/
    renewVipLoan(params: VipLoanRenewParams): Promise<VipLoanRenewResponse>;
    repayVipLoan(params: VipLoanRepayParams): Promise<VipLoanRepayResponse>;
    borrowVipLoan(params: VipLoanBorrowParams): Promise<VipLoanBorrowResponse>;
    /**
     *
     * DUAL INVESTMENT Endpoints - Market Data
     *
     **/
    getDualInvestmentProducts(params: GetDualInvestmentProductListParams): Promise<{
        total: number;
        list: DualInvestmentProduct[];
    }>;
    /**
     *
     * DUAL INVESTMENT Endpoints - Trade
     *
     **/
    subscribeDualInvestmentProduct(params: SubscribeDualInvestmentProductParams): Promise<SubscribeDualInvestmentProductResponse>;
    getDualInvestmentPositions(params: GetDualInvestmentPositionsParams): Promise<{
        total: number;
        list: DualInvestmentPosition[];
    }>;
    getDualInvestmentAccounts(): Promise<CheckDualInvestmentAccountsResponse>;
    getVipLoanAccruedInterest(params?: VipLoanAccruedInterestParams): Promise<{
        rows: VipLoanAccruedInterestRecord[];
        total: number;
    }>;
    updateAutoCompoundStatus(params: ChangeAutoCompoundStatusParams): Promise<ChangeAutoCompoundStatusResponse>;
    /**
     *
     * GIFT CARD Endpoints - Market Data
     *
     **/
    createGiftCard(params: CreateGiftCardParams): Promise<any>;
    createDualTokenGiftCard(params: CreateDualTokenGiftCardParams): Promise<any>;
    redeemGiftCard(params: RedeemGiftCardParams): Promise<any>;
    verifyGiftCard(params: {
        referenceNo: string;
    }): Promise<any>;
    getTokenLimit(params: {
        baseToken: string;
    }): Promise<any>;
    getRsaPublicKey(): Promise<any>;
    /**
     *
     *  NFT Endpoints - REST api
     *
     **/
    getNftTransactionHistory(params: GetNftTransactionHistoryParams): Promise<{
        total: number;
        list: NftTransaction[];
    }>;
    getNftDepositHistory(params: GetNftDepositHistoryParams): Promise<{
        total: number;
        list: NftDeposit[];
    }>;
    getNftWithdrawHistory(params: GetNftWithdrawHistoryParams): Promise<{
        total: number;
        list: NftWithdraw[];
    }>;
    getNftAsset(params: GetNftAssetParams): Promise<{
        total: number;
        list: NftAsset[];
    }>;
    /**
     *
     * C2C Endpoints
     *
     **/
    getC2CTradeHistory(params: GetC2CTradeHistoryParams): Promise<GetC2CTradeHistoryResponse>;
    /**
     *
     *  FIAT Endpoints - REST api
     *
     **/
    getFiatOrderHistory(params: GetFiatOrderHistoryParams): Promise<GetFiatOrderHistoryResponse>;
    getFiatPaymentsHistory(params: GetFiatOrderHistoryParams): Promise<GetFiatPaymentsHistoryResponse>;
    /**
     *
     * Rebate Endpoints
     *
     **/
    getSpotRebateHistoryRecords(params: GetSpotRebateHistoryRecordsParams): Promise<GetSpotRebateHistoryRecordsResponse>;
    /**
     *
     * DERIVATIVES - Portfolio Margin Pro - Market Data
     * This is in mainclient because it shares the same base url
     *
     **/
    getPortfolioMarginIndexPrice(params?: {
        asset?: string;
    }): Promise<GetPortfolioMarginAssetIndexPriceResponse[]>;
    getPortfolioMarginAssetLeverage(): Promise<GetPortfolioMarginAssetLeverageResponse[]>;
    getPortfolioMarginProCollateralRate(): Promise<GetPortfolioMarginProCollateralRateResponse[]>;
    getPortfolioMarginProTieredCollateralRate(): Promise<any[]>;
    /**
     *
     * DERIVATIVES - Portfolio Margin Pro - Account
     * This is in mainclient because it shares the same base url
     *
     **/
    getPortfolioMarginProAccountInfo(): Promise<GetPortfolioMarginProAccountInfoResponse>;
    bnbTransfer(params: BnbTransferParams): Promise<{
        tranId: number;
    }>;
    submitPortfolioMarginProFullTransfer(): Promise<{
        msg: string;
    }>;
    submitPortfolioMarginProSpecificTransfer(params: {
        asset: string;
    }): Promise<{
        msg: string;
    }>;
    repayPortfolioMarginProBankruptcyLoan(params: {
        from?: 'SPOT' | 'MARGIN';
    }): Promise<{
        tranId: number;
    }>;
    getPortfolioMarginProBankruptcyLoanAmount(): Promise<GetPortfolioMarginProBankruptcyLoanAmountResponse>;
    repayFuturesNegativeBalance(): Promise<{
        msg: string;
    }>;
    updateAutoRepayFuturesStatus(params: {
        autoRepay: string;
    }): Promise<{
        msg: string;
    }>;
    getAutoRepayFuturesStatus(): Promise<{
        autoRepay: boolean;
    }>;
    getPortfolioMarginProInterestHistory(params: GetPortfolioMarginProInterestHistoryParams): Promise<GetPortfolioMarginProInterestHistoryResponse[]>;
    getPortfolioMarginProSpanAccountInfo(): Promise<PortfolioMarginProSpanAccountInfo>;
    getPortfolioMarginProAccountBalance(params?: {
        asset?: string;
    }): Promise<PortfolioMarginProAccountBalance[]>;
    mintPortfolioMarginBFUSD(params: PMProMintBFUSDParams): Promise<PMProMintBFUSDResponse>;
    redeemPortfolioMarginBFUSD(params: {
        fromAsset: string;
        targetAsset: string;
        amount: number;
    }): Promise<PMProRedeemBFUSDResponse>;
    getPortfolioMarginBankruptcyLoanRepayHistory(params?: {
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
    }): Promise<{
        total: number;
        rows: PMProBankruptcyLoanRepaymentHistory[];
    }>;
    /**
     * Transfer LDUSDT as collateral for all types of Portfolio Margin account
     */
    transferLDUSDTPortfolioMargin(params: {
        asset: string;
        transferType: 'EARN_TO_FUTURE' | 'FUTURE_TO_EARN';
        amount: number;
    }): Promise<{
        msg: string;
    }>;
    /**
     * Get transferable earn asset balance for all types of Portfolio Margin account
     */
    getTransferableEarnAssetBalanceForPortfolioMargin(params: {
        asset: string;
        transferType: 'EARN_TO_FUTURE' | 'FUTURE_TO_EARN';
    }): Promise<{
        asset: string;
        amount: string;
    }>;
    /**
     *
     * DERIVATIVES - Futures Data - Market
     * This is in mainclient because it shares the same base url
     *
     **/
    getFuturesTickLevelOrderbookDataLink(params: GetFutureTickLevelOrderbookDataLinkParams): Promise<{
        data: HistoricalDataLink[];
    }>;
    /**
     *
     * BLVT Endpoints
     * BLVT category is possibly @deprecated, found only in old docs
     **/
    getBlvtInfo(params?: {
        tokenName?: string;
    }): Promise<any[]>;
    subscribeBlvt(params: SubscribeBlvtParams): Promise<SubscribeBlvtResponse>;
    getBlvtSubscriptionRecord(params: GetBlvtSubscriptionRecordParams): Promise<BlvtSubscriptionRecord[]>;
    redeemBlvt(params: RedeemBlvtParams): Promise<RedeemBlvtResponse>;
    getBlvtRedemptionRecord(params: GetBlvtRedemptionRecordParams): Promise<BlvtRedemptionRecord[]>;
    getBlvtUserLimitInfo(params: {
        tokenName?: string;
    }): Promise<BlvtUserLimitInfo[]>;
    /**
     *
     * Pay endpoints
     * Found only in old docs, possibly @deprecated
     **/
    getPayTransactions(params: GetPayTradeHistoryParams): Promise<any>;
    /**
     *
     * EXCHANGE LINK - Account Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    createBrokerSubAccount(params: CreateBrokerSubAccountParams): Promise<BrokerSubAccount>;
    getBrokerSubAccount(params: GetBrokerSubAccountParams): Promise<BrokerSubAccount[]>;
    enableMarginBrokerSubAccount(params: EnableMarginBrokerSubAccountParams): Promise<EnableMarginBrokerSubAccountResponse>;
    createApiKeyBrokerSubAccount(params: CreateApiKeyBrokerSubAccountParams): Promise<CreateApiKeyBrokerSubAccountResponse>;
    changePermissionApiKeyBrokerSubAccount(params: ChangePermissionApiKeyBrokerSubAccountParams): Promise<ChangePermissionApiKeyBrokerSubAccountResponse>;
    changeComissionBrokerSubAccount(params: ChangePermissionApiKeyBrokerSubAccountParams): Promise<ChangePermissionApiKeyBrokerSubAccountResponse>;
    enableUniversalTransferApiKeyBrokerSubAccount(params: EnableUniversalTransferApiKeyBrokerSubAccountParams): Promise<EnableUniversalTransferApiKeyBrokerSubAccountResponse>;
    updateIpRestrictionForSubAccountApiKey(params: UpdateIpRestrictionForSubApiKey): Promise<{
        status: string;
        ipList?: string[];
        updateTime: number;
        apiKey: string;
    }>;
    deleteIPRestrictionForSubAccountApiKey(params: {
        subAccountId: string;
        subAccountApiKey: string;
        ipAddress?: string;
    }): Promise<{
        subaccountId: string;
        apikey: string;
        ipList: string[];
        updateTime: number;
    }>;
    deleteApiKeyBrokerSubAccount(params: DeleteApiKeyBrokerSubAccountParams): Promise<object>;
    getSubAccountBrokerIpRestriction(params: {
        subAccountId: string;
        subAccountApiKey: string;
    }): Promise<{
        subaccountId: string;
        ipRestrict: boolean;
        apikey: string;
        ipList: string[];
        updateTime: number;
    }>;
    getApiKeyBrokerSubAccount(params: GetApiKeyBrokerSubAccountParams): Promise<ApiKeyBrokerSubAccount[]>;
    getBrokerInfo(): Promise<GetBrokerInfoResponse>;
    updateSubAccountBNBBurn(params: {
        subAccountId: string;
        spotBNBBurn: 'true' | 'false';
    }): Promise<{
        subAccountId: string;
        spotBNBBurn: boolean;
    }>;
    updateSubAccountMarginInterestBNBBurn(params: {
        subAccountId: string;
        interestBNBBurn: 'true' | 'false';
    }): Promise<{
        subAccountId: string;
        interestBNBBurn: boolean;
    }>;
    getSubAccountBNBBurnStatus(params: {
        subAccountId: string;
    }): Promise<{
        subAccountId: string;
        spotBNBBurn: boolean;
        interestBNBBurn: boolean;
    }>;
    /**
     * Caution:
     * The operation will delete a sub account under your brokerage master account.
     * Please transfer out all funds from the sub account and delete API key of the sub account before deleting it.
     * The deleted sub account CANNOT be reverted.
     * The daily deletion limit for a broker Master is 20 sub accounts.
     * You need to enable "trade" option for the api key which requests this endpoint.
     */
    deleteBrokerSubAccount(params: {
        subAccountId: string;
    }): Promise<any>;
    /**
     *
     * EXCHANGE LINK - Account Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    transferBrokerSubAccount(params: TransferBrokerSubAccountParams): Promise<TransferBrokerSubAccount>;
    getBrokerSubAccountHistory(params: GetBrokerSubAccountHistoryParams): Promise<BrokerSubAccountHistory[]>;
    submitBrokerSubFuturesTransfer(params: {
        fromId?: string;
        toId?: string;
        futuresType: number;
        asset: string;
        amount: number;
        clientTranId?: string;
    }): Promise<{
        success: boolean;
        txnId: string;
        clientTranId?: string;
    }>;
    getSubAccountFuturesTransferHistory(params: {
        subAccountId: string;
        futuresType: number;
        clientTranId?: string;
        startTime?: number;
        endTime?: number;
        page?: number;
        limit?: number;
    }): Promise<any>;
    getBrokerSubDepositHistory(params: GetSubAccountDepositHistoryParams): Promise<SubAccountDeposit[]>;
    getBrokerSubAccountSpotAssets(params: QuerySubAccountSpotMarginAssetInfoParams): Promise<{
        data: SubaccountBrokerSpotAsset[];
        timestamp: number;
    }>;
    getSubAccountMarginAssetInfo(params: QuerySubAccountSpotMarginAssetInfoParams): Promise<{
        data: SubAccountBrokerMarginAsset[];
        timestamp: number;
    }>;
    querySubAccountFuturesAssetInfo(params: QuerySubAccountFuturesAssetInfoParams): Promise<{
        data: (UsdtMarginedFuturesResponse | CoinMarginedFuturesResponse)[];
        timestamp: number;
    }>;
    universalTransferBroker(params: UniversalTransferBrokerParams): Promise<{
        txnId: number;
        clientTranId: string;
    }>;
    getUniversalTransferBroker(params: GetUniversalTransferBrokerParams): Promise<BrokerUniversalTransfer[]>;
    /**
     *
     * EXCHANGE LINK - Fee Endpoints
     * https://developers.binance.com/docs/binance_link
     */
    updateBrokerSubAccountCommission(params: ChangeSubAccountCommissionParams): Promise<ChangeSubAccountCommissionResponse>;
    updateBrokerSubAccountFuturesCommission(params: ChangeSubAccountFuturesCommissionParams): Promise<ChangeSubAccountFuturesCommissionResponse>;
    getBrokerSubAccountFuturesCommission(params: QuerySubAccountFuturesCommissionParams): Promise<BrokerSubAccountFuturesCommission[]>;
    updateBrokerSubAccountCoinFuturesCommission(params: ChangeSubAccountCoinFuturesCommissionParams): Promise<ChangeSubAccountFuturesCommissionResponse>;
    getBrokerSubAccountCoinFuturesCommission(params: QuerySubAccountCoinFuturesCommissionParams): Promise<BrokerSubAccountCoinFuturesCommission[]>;
    getBrokerSpotCommissionRebate(params: QueryBrokerSpotCommissionRebateParams): Promise<BrokerCommissionRebate[]>;
    getBrokerFuturesCommissionRebate(params: QueryBrokerFuturesCommissionRebateParams): Promise<BrokerCommissionRebate[]>;
    /**
     *
     * @deprecated
     */
    getBrokerSpotRebateHistory(days: 7 | 30, customerId?: string): import("./util/requestUtils").GenericAPIResponse<any> | undefined;
    /**
     * Broker Endpoints - only on old docs
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead - https://developers.binance.com/docs/binance_link
     */
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerIfNewSpotUser(): Promise<{
        rebateWorking: boolean;
        ifNewUser: boolean;
    }>;
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerSubAccountDepositHistory(params?: GetBrokerSubAccountDepositHistoryParams): Promise<SubAccountDepositHistoryList[]>;
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    getBrokerUserCustomisedId(market: 'spot' | 'futures'): import("./util/requestUtils").GenericAPIResponse<any>;
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    enableFuturesBrokerSubAccount(params: EnableFuturesBrokerSubAccountParams): Promise<EnableFuturesBrokerSubAccountResponse>;
    /**
     * @deprecated, found only in old docs
     * Use EXCHANGE LINK endpoints instead
     **/
    enableMarginApiKeyBrokerSubAccount(params: EnableMarginApiKeyBrokerSubAccountParams): Promise<BrokerSubAccount>;
    /**
     * Validate syntax meets requirements set by binance. Log warning if not.
     */
    private validateOrderId;
    /**
     *
     * User Data Stream Endpoints
     *
     **/
    getSpotUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveSpotUserDataListenKey(listenKey: string): Promise<object>;
    closeSpotUserDataListenKey(listenKey: string): Promise<object>;
    getMarginUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveMarginUserDataListenKey(listenKey: string): Promise<object>;
    closeMarginUserDataListenKey(listenKey: string): Promise<object>;
    getIsolatedMarginUserDataListenKey(params: {
        symbol: string;
    }): Promise<{
        listenKey: string;
    }>;
    keepAliveIsolatedMarginUserDataListenKey(params: {
        symbol: string;
        listenKey: string;
    }): Promise<object>;
    closeIsolatedMarginUserDataListenKey(params: {
        symbol: string;
        listenKey: string;
    }): Promise<object>;
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
    getBSwapLiquidity(params?: {
        poolId: number;
    }): Promise<BSwapLiquidity[]>;
    /**
     * @deprecated as of 2024-01-19
     **/
    addBSwapLiquidity(params: AddBSwapLiquidityParams): Promise<{
        operationId: number;
    }>;
    /**
     * @deprecated as of 2024-01-19
     **/
    removeBSwapLiquidity(params: RemoveBSwapLiquidityParams): Promise<{
        operationId: number;
    }>;
    /**
     * @deprecated as of 2024-01-19
     **/
    getBSwapOperations(params?: BSwapOperationsParams): Promise<BSwapOperations[]>;
    /**
     *
     * Savings Endpoints
     * @deprecated as of 2023-06-22, now Simple Earn
     **/
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLeftDailyPurchaseQuotaFlexibleProduct(params: {
        productId: string;
    }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLeftDailyRedemptionQuotaFlexibleProduct(params: {
        productId: string;
    }): Promise<LeftDailyPurchaseQuotaFlexibleProductResponse & {
        dailyQuota: string;
        minRedemptionAmount: string;
    }>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    purchaseFixedAndActivityProject(params: {
        projectId: string;
        lot: number;
    }): Promise<PurchaseFlexibleProductResponse>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getFixedAndActivityProjects(params: FixedAndActivityProjectParams): Promise<any[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getFixedAndActivityProductPosition(params: FixedAndActivityProjectPositionParams): Promise<any[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getLendingAccount(): Promise<StakingProduct[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getPurchaseRecord(params: PurchaseRecordParams): Promise<any[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getRedemptionRecord(params: PurchaseRecordParams): Promise<any[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    getInterestHistory(params: PurchaseRecordParams): Promise<any[]>;
    /**
     * @deprecated as of 2023-06-22, now Simple Earn
     */
    changeFixedAndActivityPositionToDailyPosition(params: {
        projectId: string;
        lot: number;
        positionId?: number;
    }): Promise<PurchaseFlexibleProductResponse>;
    /**
     *
     * Wallet Endpoints
     * @deprecated
     **/
    /**
     * @deprecated
     */
    enableConvertSubAccount(params: EnableConvertSubAccountParams): Promise<any>;
    /**
     * @deprecated - deleted as of 2024-11-21
     *
     */
    convertBUSD(params: ConvertTransfer): Promise<ConvertTransferResponse>;
    /**
     * @deprecated
     */
    getConvertBUSDHistory(params: GetConvertBUSDHistoryParams): Promise<{
        total: number;
        rows: BUSDConversionRecord[];
    }>;
}
/**
 * @deprecated use MainClient instead of SpotClient (it is the same)
 */
export declare const SpotClient: typeof MainClient;
