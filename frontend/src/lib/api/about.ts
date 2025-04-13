import apiClient from './client';
import { About } from '@/lib/types/about';

/**
 * プロフィール情報を取得
 */
export const getAboutInfo = async (): Promise<About> => {
    const response = await apiClient.get<About>('/about');
    return response.data;
}; 
