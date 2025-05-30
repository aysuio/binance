"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEAUTIFIER_EVENT_MAP = void 0;
const rollingTickerEventMap = {
    e: 'eventType',
    E: 'eventTime',
    s: 'symbol',
    p: 'priceChange',
    P: 'priceChangePercent',
    o: 'openPrice',
    h: 'highPrice',
    l: 'lowPrice',
    c: 'lastPrice',
    w: 'weightedAveragePrice',
    v: 'totalTradedBaseAssetVolume',
    q: 'totalTradedQuoteAssetVolume',
    O: 'statisticsOpenTime',
    C: 'statisticsCloseTime',
    F: 'firstTradeId',
    L: 'lastTradeId',
    n: 'totalTrades',
};
exports.BEAUTIFIER_EVENT_MAP = {
    aggTrades: {
        a: 'aggTradeId',
        p: 'price',
        q: 'quantity',
        f: 'firstTradeId',
        l: 'lastTradeId',
        T: 'timestamp',
        m: 'maker',
        M: 'bestPriceMatch',
    },
    bookTickerEvent: {
        e: 'eventType',
        u: 'updateId',
        s: 'symbol',
        b: 'bidPrice',
        B: 'bidQty',
        a: 'askPrice',
        A: 'askQty',
    },
    klines: {
        0: 'openTime',
        1: 'open',
        2: 'high',
        3: 'low',
        4: 'close',
        5: 'volume',
        6: 'closeTime',
        7: 'quoteAssetVolume',
        8: 'trades',
        9: 'takerBaseAssetVolume',
        10: 'takerQuoteAssetVolume',
        11: 'ignored',
    },
    bids: [
        {
            0: 'price',
            1: 'quantity',
            2: 'ignored',
        },
    ],
    asks: [
        {
            0: 'price',
            1: 'quantity',
            2: 'ignored',
        },
    ],
    depthUpdateEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        U: 'firstUpdateId',
        u: 'lastUpdateId',
        b: 'bidDepthDelta',
        a: 'askDepthDelta',
    },
    bidDepthDelta: [
        {
            0: 'price',
            1: 'quantity',
            2: 'ignored',
        },
    ],
    askDepthDelta: [
        {
            0: 'price',
            1: 'quantity',
            2: 'ignored',
        },
    ],
    klineEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        k: 'kline',
    },
    continuous_klineEvent: {
        e: 'eventType',
        E: 'eventTime',
        ps: 'symbol',
        ct: 'contractType',
        k: 'kline',
    },
    indexPrice_klineEvent: {
        e: 'eventType',
        E: 'eventTime',
        ps: 'symbol',
        k: 'kline',
    },
    kline: {
        t: 'startTime',
        T: 'endTime',
        s: 'symbol',
        i: 'interval',
        f: 'firstTradeId',
        L: 'lastTradeId',
        o: 'open',
        c: 'close',
        h: 'high',
        l: 'low',
        v: 'volume',
        n: 'trades',
        x: 'final',
        q: 'quoteVolume',
        V: 'volumeActive',
        Q: 'quoteVolumeActive',
        B: 'ignored',
    },
    aggTradeEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        a: 'tradeId',
        p: 'price',
        q: 'quantity',
        f: 'firstTradeId',
        l: 'lastTradeId',
        T: 'time',
        m: 'maker',
        M: 'ignored',
    },
    outboundAccountInfoEvent: {
        e: 'eventType',
        E: 'eventTime',
        m: 'makerCommission',
        t: 'takerCommission',
        b: 'buyerCommission',
        s: 'sellerCommission',
        T: 'canTrade',
        W: 'canWithdraw',
        D: 'canDeposit',
        B: 'balances',
        u: 'lastUpdateTime',
    },
    outboundAccountPositionEvent: {
        e: 'eventType',
        E: 'eventTime',
        u: 'lastUpdateTime',
        B: 'balances',
    },
    balanceUpdateEvent: {
        e: 'eventType',
        E: 'eventTime',
        a: 'asset',
        d: 'balanceDelta',
        T: 'clearTime',
    },
    indexPriceUpdateEvent: {
        e: 'eventType',
        E: 'eventTime',
        i: 'symbol',
        p: 'indexPrice',
    },
    listStatusEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        g: 'orderListId',
        c: 'contingencyType',
        l: 'listStatusType',
        L: 'listOrderStatus',
        r: 'listRejectReason',
        C: 'listClientOrderId',
        T: 'transactionTime',
        O: 'orders',
    },
    markPriceUpdateEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        p: 'markPrice',
        i: 'indexPrice',
        P: 'settlePriceEstimate',
        r: 'fundingRate',
        T: 'nextFundingTime',
    },
    orders: [
        {
            s: 'symbol',
            i: 'orderId',
            c: 'clientOrderId',
        },
    ],
    ACCOUNT_UPDATEEvent: {
        e: 'eventType',
        E: 'eventTime',
        T: 'transactionTime',
        a: 'updateData',
    },
    MARGIN_CALLEvent: {
        e: 'eventType',
        E: 'eventTime',
        cw: 'crossWalletBalance',
        p: 'positions',
    },
    ORDER_TRADE_UPDATEEvent: {
        e: 'eventType',
        E: 'eventTime',
        T: 'transactionTime',
        o: 'order',
    },
    TRADE_LITEEvent: {
        e: 'eventType',
        E: 'eventTime',
        T: 'transactionTime',
        o: 'order',
        s: 'symbol',
        q: 'originalQuantity',
        p: 'originalPrice',
        m: 'isMakerSide',
        c: 'clientOrderId',
        S: 'side',
        L: 'lastFilledPrice',
        l: 'lastFilledQuantity',
        t: 'tradeId',
        i: 'orderId',
    },
    CONDITIONAL_ORDER_TRIGGER_REJECTEvent: {
        e: 'eventType',
        E: 'eventTime',
        T: 'transactionTime',
        or: 'order',
        s: 'symbol',
        i: 'orderId',
        r: 'reason',
    },
    order: {
        s: 'symbol',
        c: 'clientOrderId',
        S: 'orderSide',
        o: 'orderType',
        f: 'timeInForce',
        q: 'originalQuantity',
        p: 'originalPrice',
        ap: 'averagePrice',
        sp: 'stopPrice',
        x: 'executionType',
        X: 'orderStatus',
        i: 'orderId',
        l: 'lastFilledQuantity',
        z: 'orderFilledAccumulatedQuantity',
        L: 'lastFilledPrice',
        N: 'commissionAsset',
        n: 'commissionAmount',
        T: 'orderTradeTime',
        t: 'tradeId',
        b: 'bidsNotional',
        a: 'asksNotional',
        m: 'isMakerTrade',
        R: 'isReduceOnly',
        wt: 'stopPriceWorkingType',
        ot: 'originalOrderType',
        ps: 'positionSide',
        cp: 'isCloseAll',
        AP: 'trailingStopActivationPrice',
        cr: 'trailingStopCallbackRate',
        rp: 'realisedProfit',
        V: 'selfTradePrevention',
        pm: 'priceMatch',
        gtd: 'goodTillDate',
    },
    ACCOUNT_CONFIG_UPDATEEvent: {
        e: 'eventType',
        E: 'eventTime',
        T: 'transactionTime',
        ac: 'assetConfiguration',
        ai: 'accountConfiguration',
    },
    assetConfiguration: {
        s: 'symbol',
        l: 'leverage',
    },
    accountConfiguration: {
        j: 'isMultiAssetsMode',
    },
    positions: [
        {
            s: 'symbol',
            ps: 'positionSide',
            pa: 'positionAmount',
            mt: 'marginType',
            iw: 'isolatedWalletAmount',
            mp: 'markPrice',
            up: 'unrealisedPnl',
            mm: 'maintenanceMarginRequired',
        },
    ],
    listenKeyExpiredEvent: {
        e: 'eventType',
        E: 'eventTime',
    },
    updateData: {
        m: 'updateEventType',
        P: 'updatedPositions',
        B: 'updatedBalances',
    },
    updatedBalances: [
        {
            a: 'asset',
            wb: 'walletBalance',
            cw: 'crossWalletBalance',
            bc: 'balanceChange',
        },
    ],
    updatedPositions: [
        {
            s: 'symbol',
            ma: 'marginAsset',
            pa: 'positionAmount',
            ep: 'entryPrice',
            cr: 'accumulatedRealisedPreFee',
            up: 'unrealisedPnl',
            mt: 'marginType',
            iw: 'isolatedWalletAmount',
            ps: 'positionSide',
        },
    ],
    balances: [
        {
            a: 'asset',
            f: 'availableBalance',
            l: 'onOrderBalance',
        },
    ],
    executionReportEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        c: 'newClientOrderId',
        S: 'side',
        o: 'orderType',
        f: 'cancelType',
        q: 'quantity',
        p: 'price',
        P: 'stopPrice',
        F: 'icebergQuantity',
        g: 'orderListId',
        C: 'originalClientOrderId',
        x: 'executionType',
        X: 'orderStatus',
        r: 'rejectReason',
        i: 'orderId',
        l: 'lastTradeQuantity',
        z: 'accumulatedQuantity',
        L: 'lastTradePrice',
        n: 'commission',
        N: 'commissionAsset',
        T: 'tradeTime',
        t: 'tradeId',
        I: 'ignoreThis1',
        w: 'isOrderOnBook',
        m: 'isMaker',
        M: 'ignoreThis2',
        O: 'orderCreationTime',
        Z: 'cummulativeQuoteAssetTransactedQty',
        Y: 'lastQuoteAssetTransactedQty',
        Q: 'orderQuoteQty',
        W: 'workingTime',
        V: 'selfTradePreventionMode',
    },
    tradeEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        t: 'tradeId',
        p: 'price',
        q: 'quantity',
        b: 'buyerOrderId',
        a: 'sellerOrderId',
        T: 'time',
        m: 'maker',
        M: 'ignored',
    },
    '24hrTickerEvent': {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        p: 'priceChange',
        P: 'priceChangePercent',
        w: 'weightedAveragePrice',
        x: 'previousClose',
        c: 'currentClose',
        Q: 'closeQuantity',
        b: 'bestBid',
        B: 'bestBidQuantity',
        a: 'bestAskPrice',
        A: 'bestAskQuantity',
        o: 'open',
        h: 'high',
        l: 'low',
        v: 'baseAssetVolume',
        q: 'quoteAssetVolume',
        O: 'openTime',
        C: 'closeTime',
        F: 'firstTradeId',
        L: 'lastTradeId',
        n: 'trades',
    },
    '24hrMiniTickerEvent': {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        ps: 'contractSymbol',
        c: 'close',
        o: 'open',
        h: 'high',
        l: 'low',
        v: 'baseAssetVolume',
        q: 'quoteAssetVolume',
    },
    '1hTickerEvent': rollingTickerEventMap,
    '4hTickerEvent': rollingTickerEventMap,
    '1dTickerEvent': rollingTickerEventMap,
    forceOrderEvent: {
        e: 'eventType',
        E: 'eventTime',
        o: 'liquidationOrder',
    },
    liquidationOrder: {
        s: 'symbol',
        S: 'side',
        o: 'orderType',
        f: 'timeInForce',
        q: 'quantity',
        p: 'price',
        ap: 'averagePrice',
        X: 'orderStatus',
        l: 'lastFilledQuantity',
        z: 'orderFilledAccumulatedQuantity',
        T: 'orderTradeTime',
    },
    contractInfoEvent: {
        e: 'eventType',
        E: 'eventTime',
        s: 'symbol',
        ps: 'pair',
        ct: 'contractType',
        dt: 'deliveryDateTime',
        ot: 'onboardDateTime',
        cs: 'contractStatus',
        bks: 'notionalBrackets',
    },
    notionalBrackets: [
        {
            bs: 'notionalBracket',
            bnf: 'floorNotional',
            bnc: 'capNotional',
            mmr: 'maintenanceRatio',
            cf: 'auxiliaryNumber',
            mi: 'minLeverage',
            ma: 'maxLeverage', // Max leverage for this bracket
        },
    ],
    GRID_UPDATEEvent: {
        e: 'eventType',
        T: 'transactionTime',
        E: 'eventTime',
        gu: 'grid',
    },
    grid: {
        si: 'strategyId',
        st: 'strategyType',
        ss: 'strategyStatus',
        s: 'symbol',
        r: 'realizedPnl',
        up: 'unmatchedAveragePrice',
        uq: 'unmatchedQuantity',
        uf: 'unmatchedFee',
        mp: 'matchedPnl',
        ut: 'updateTime', // Update Time
    },
    STRATEGY_UPDATEEvent: {
        e: 'eventType',
        T: 'transactionTime',
        E: 'eventTime',
        su: 'strategy',
    },
    strategy: {
        si: 'strategyId',
        st: 'strategyType',
        ss: 'strategyStatus',
        s: 'symbol',
        ut: 'updateTime',
        c: 'opCode', // opCode
    },
};
//# sourceMappingURL=beautifier-maps.js.map