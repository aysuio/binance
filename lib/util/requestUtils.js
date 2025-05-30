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
Object.defineProperty(exports, "__esModule", { value: true });
exports.asArray = exports.appendEventMarket = exports.getWsKeyWithContext = exports.getContextFromWsKey = exports.appendEventIfMissing = exports.logInvalidOrderId = exports.isWsPong = exports.isPublicEndpoint = exports.getRestBaseUrl = exports.getServerTimeEndpoint = exports.getRequestSignature = exports.serialiseParams = exports.generateNewOrderId = exports.getOrderIdPrefix = void 0;
const node_support_1 = require("./node-support");
// function throwUnhandledSwitch(x: never, msg: string): never {
//   throw new Error(msg);
// }
function getOrderIdPrefix(network) {
    switch (network) {
        case 'spot':
        case 'spot1':
        case 'spot2':
        case 'spot3':
        case 'spot4':
            return '';
        case 'usdm':
        case 'usdmtest':
        case 'coinm':
        case 'coinmtest':
        case 'papi':
            return '';
        case 'voptions':
        case 'voptionstest':
            return '';
        default:
            // throwUnhandledSwitch(network, `"${network}" unhandled`);
            return '';
    }
}
exports.getOrderIdPrefix = getOrderIdPrefix;
function generateNewOrderId(network) {
    return '';
}
exports.generateNewOrderId = generateNewOrderId;
function serialiseParams(params = {}, strict_validation = false, encodeValues = false, filterUndefinedParams = false) {
    const paramKeys = !filterUndefinedParams
        ? Object.keys(params)
        : Object.keys(params).filter((key) => typeof params[key] !== 'undefined');
    return paramKeys
        .map((key) => {
        const value = params[key];
        if (strict_validation === true && typeof value === 'undefined') {
            throw new Error('Failed to sign API request due to undefined parameter');
        }
        const encodedValue = encodeValues ? encodeURIComponent(value) : value;
        return `${key}=${encodedValue}`;
    })
        .join('&');
}
exports.serialiseParams = serialiseParams;
function getRequestSignature(data, key, secret, recvWindow, timestamp, strictParamValidation, filterUndefinedParams) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // Optional, set to 5000 by default. Increase if timestamp/recvWindow errors are seen.
        const requestRecvWindow = (_b = (_a = data === null || data === void 0 ? void 0 : data.recvWindow) !== null && _a !== void 0 ? _a : recvWindow) !== null && _b !== void 0 ? _b : 5000;
        if (key && secret) {
            const requestParams = Object.assign(Object.assign({}, data), { timestamp, recvWindow: requestRecvWindow });
            const serialisedParams = serialiseParams(requestParams, strictParamValidation, true, filterUndefinedParams);
            const signature = yield (0, node_support_1.signMessage)(serialisedParams, secret);
            requestParams.signature = signature;
            return {
                requestBody: Object.assign({}, data),
                serialisedParams,
                timestamp: timestamp,
                signature: signature,
                recvWindow: requestRecvWindow,
            };
        }
        return { requestBody: data, serialisedParams: undefined };
    });
}
exports.getRequestSignature = getRequestSignature;
const BINANCE_BASE_URLS = {
    // spot/margin/savings/mining
    spot: 'https://api.binance.com',
    spot1: 'https://api.binance.com',
    spot2: 'https://api1.binance.com',
    spot3: 'https://api2.binance.com',
    spot4: 'https://api3.binance.com',
    // USDM Futures
    usdm: 'https://fapi.binance.com',
    usdmtest: 'https://testnet.binancefuture.com',
    // COINM Futures
    coinm: 'https://dapi.binance.com',
    coinmtest: 'https://testnet.binancefuture.com',
    // Vanilla Options
    voptions: 'https://vapi.binance.com',
    voptionstest: 'https://testnet.binanceops.com',
    // Portfolio Margin
    papi: 'https://papi.binance.com',
};
function getServerTimeEndpoint(urlKey) {
    switch (urlKey) {
        case 'spot':
        case 'spot1':
        case 'spot2':
        case 'spot3':
        case 'spot4':
        default:
            return 'api/v3/time';
        case 'usdm':
        case 'usdmtest':
            return 'fapi/v1/time';
        case 'coinm':
        case 'coinmtest':
            return 'dapi/v1/time';
        case 'voptions':
        case 'voptionstest':
            return 'vapi/v1/time';
    }
}
exports.getServerTimeEndpoint = getServerTimeEndpoint;
function getRestBaseUrl(clientType, restClientOptions) {
    if (restClientOptions.baseUrl) {
        return restClientOptions.baseUrl;
    }
    if (restClientOptions.baseUrlKey) {
        return BINANCE_BASE_URLS[restClientOptions.baseUrlKey];
    }
    return BINANCE_BASE_URLS[clientType];
}
exports.getRestBaseUrl = getRestBaseUrl;
function isPublicEndpoint(endpoint) {
    if (endpoint.startsWith('v2/public')) {
        return true;
    }
    if (endpoint.startsWith('public/linear')) {
        return true;
    }
    return false;
}
exports.isPublicEndpoint = isPublicEndpoint;
function isWsPong(response) {
    return (response.request &&
        response.request.op === 'ping' &&
        response.ret_msg === 'pong' &&
        response.success === true);
}
exports.isWsPong = isWsPong;
function logInvalidOrderId(orderIdProperty, expectedOrderIdPrefix, params) {
    console.warn(`WARNING: '${orderIdProperty}' invalid - it should be prefixed with ${expectedOrderIdPrefix}. Use the 'client.generateNewOrderId()' REST client utility method to generate a fresh order ID on demand. Original request: ${JSON.stringify(params)}`);
}
exports.logInvalidOrderId = logInvalidOrderId;
function appendEventIfMissing(wsMsg, wsKey) {
    if (wsMsg.e) {
        return;
    }
    if (wsKey.indexOf('bookTicker') !== -1) {
        wsMsg.e = 'bookTicker';
        return;
    }
    if (wsKey.indexOf('diffBookDepth') !== -1) {
        wsMsg.e = 'diffBookDepth';
        return;
    }
    if (wsKey.indexOf('partialBookDepth') !== -1 ||
        wsKey.indexOf('depth') !== -1) {
        wsMsg.e = 'partialBookDepth';
        return;
    }
    // console.warn('couldnt derive event type: ', wsKey);
}
exports.appendEventIfMissing = appendEventIfMissing;
function getContextFromWsKey(wsKey) {
    const [market, streamName, symbol, listenKey, ...otherParams] = wsKey.split('_');
    return {
        symbol: symbol === 'undefined' ? undefined : symbol,
        market: market,
        isTestnet: market.includes('estnet'),
        isUserData: wsKey.includes('userData'),
        streamName,
        listenKey: listenKey === 'undefined' ? undefined : listenKey,
        otherParams,
    };
}
exports.getContextFromWsKey = getContextFromWsKey;
function getWsKeyWithContext(market, streamName, symbol = undefined, listenKey = undefined, ...otherParams) {
    return [market, streamName, symbol, listenKey, ...otherParams].join('_');
}
exports.getWsKeyWithContext = getWsKeyWithContext;
function appendEventMarket(wsMsg, wsKey) {
    const { market } = getContextFromWsKey(wsKey);
    wsMsg.wsMarket = market;
    wsMsg.wsKey = wsKey;
}
exports.appendEventMarket = appendEventMarket;
function asArray(el) {
    return Array.isArray(el) ? el : [el];
}
exports.asArray = asArray;
//# sourceMappingURL=requestUtils.js.map