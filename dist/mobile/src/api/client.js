"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const API_URL = 'http://192.168.1.13:3000';
const apiClient = axios_1.default.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
apiClient.interceptors.request.use(async (config) => {
    const token = await async_storage_1.default.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
apiClient.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 401) {
        await async_storage_1.default.removeItem('access_token');
    }
    return Promise.reject(error);
});
exports.default = apiClient;
//# sourceMappingURL=client.js.map