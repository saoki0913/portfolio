import apiClient from './client';
import { Skill, SkillCategory } from '@/lib/types/skill';

export interface SkillListResponse {
    categories: SkillCategory[];
}


export const getAllSkills = async (
    params?: { category?: string }
): Promise<SkillCategory[]> => {
    const response = await apiClient.get<SkillListResponse>('/skills', { params });
    return response.data.categories;
};


export const getSkillCategories = async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/skills/categories');
    return response.data;
}; 
