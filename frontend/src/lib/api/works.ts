import apiClient from './client';
import { Work } from '@/lib/types/work';

export interface WorkListResponse {
    works: Work[];
}

/**
 * すべてのプロジェクト作品を取得
 */
export const getAllWorks = async (
    params?: { featured?: boolean; category?: string }
): Promise<Work[]> => {
    const response = await apiClient.get<WorkListResponse>('/works', { params });
    return response.data.works;
};

/**
 * 特定のプロジェクト作品をIDで取得
 */
export const getWorkById = async (id: string): Promise<Work> => {
    const response = await apiClient.get<Work>(`/works/${id}`);
    return response.data;
}; 
