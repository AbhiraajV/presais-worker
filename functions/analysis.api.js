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
exports.totalAnalysis = exports.getAnalytics = exports.getSimilarSites = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.SIMWEB_API_KEY;
// Existing API calls
const getSimilarSites = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://similar-web.p.rapidapi.com/get-similar-sites',
        params: { domain },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'similar-web.p.rapidapi.com',
        },
    };
    try {
        const response = yield axios_1.default.request(options);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching similar sites for domain ${domain}:`, error);
        throw error;
    }
});
exports.getSimilarSites = getSimilarSites;
const getAnalytics = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://similar-web.p.rapidapi.com/get-analysis',
        params: { domain },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'similar-web.p.rapidapi.com',
        },
    };
    try {
        const response = yield axios_1.default.request(options);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching analytics for domain ${domain}:`, error);
        throw error;
    }
});
exports.getAnalytics = getAnalytics;
// Rate limiter function
const createRateLimiter = (limit, interval) => {
    let currentRequests = 0;
    const queue = [];
    const processQueue = () => {
        while (queue.length > 0 && currentRequests < limit) {
            currentRequests++;
            const resolve = queue.shift();
            if (resolve)
                resolve();
        }
    };
    setInterval(() => {
        currentRequests = 0; // Reset the counter every interval
        processQueue();
    }, interval);
    return () => new Promise(resolve => {
        queue.push(resolve);
        processQueue();
    });
};
// Main function
const totalAnalysis = (domains) => __awaiter(void 0, void 0, void 0, function* () {
    const RATE_LIMIT = 5;
    const TIME_INTERVAL = 1000; // 1 second
    const rateLimiter = createRateLimiter(RATE_LIMIT, TIME_INTERVAL);
    const analysis_report = [];
    const competition_report = [];
    for (const domain of domains) {
        // Respect rate limit for each request
        const [similarSites, analytics] = yield Promise.all([
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield rateLimiter();
                return (0, exports.getSimilarSites)(domain);
            }))(),
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield rateLimiter();
                return (0, exports.getAnalytics)(domain);
            }))(),
        ]);
        analysis_report.push(Object.assign(Object.assign({}, analytics), { Countries: [] }));
        competition_report.push(Object.assign(Object.assign({}, similarSites), { Countries: [] }));
    }
    return { analysis_report, competition_report };
});
exports.totalAnalysis = totalAnalysis;
