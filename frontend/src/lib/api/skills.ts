import apiClient from './client';
import { Skill, SkillCategory } from '@/lib/types/skill';

export interface SkillListResponse {
    categories: SkillCategory[];
}

/**
 * すべてのスキルを取得
 */
export const getAllSkills = async (
    params?: { category?: string }
): Promise<SkillCategory[]> => {
    const response = await apiClient.get<SkillListResponse>('/skills', { params });
    return response.data.categories;
};

/**
 * スキルカテゴリーの一覧を取得
 */
export const getSkillCategories = async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/skills/categories');
    return response.data;
}; 
