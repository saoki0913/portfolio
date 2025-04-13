import axios, { AxiosResponse, AxiosError } from 'axios';

// API BaseURL - プレフィックスなし
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 開発環境でのデバッグ用
console.log('API BaseURL:', baseURL);

// Axiosインスタンスの作成
const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// リクエストインターセプター（デバッグ用）
apiClient.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// レスポンスインターセプター（エラーハンドリングなど）
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient; 
