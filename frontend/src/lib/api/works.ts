import apiClient from './client';
import { Work } from '@/lib/types/work';

export interface WorkListResponse {
    works: Work[];
}

export const getAllWorks = async (
    params?: { featured?: boolean; category?: string }
): Promise<Work[]> => {
    const response = await apiClient.get<WorkListResponse>('/works', { params });
    return response.data.works;
};

export const getWorkById = async (id: string): Promise<Work> => {
    const response = await apiClient.get<Work>(`/works/${id}`);
    return response.data;
}; 
