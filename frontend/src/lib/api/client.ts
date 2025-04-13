import axios, { AxiosResponse, AxiosError } from 'axios';

// API BaseURL
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Axiosインスタンスの作成
const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// レスポンスインターセプター（エラーハンドリングなど）
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient; 
