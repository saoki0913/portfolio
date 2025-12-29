import { supabase } from '../supabase/client';
import { Skill, SkillCategory } from '@/lib/types/skill';

export interface SkillListResponse {
    categories: SkillCategory[];
}


export const getAllSkills = async (
    params?: { category?: string }
): Promise<SkillCategory[]> => {
    let query = supabase.from('skills').select('*');

    if (params?.category) {
        query = query.eq('category', params.category);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching skills:', error);
        return [];
    }

    // カテゴリごとにグループ化
    const categoryMap = new Map<string, Skill[]>();

    (data || []).forEach(skill => {
        const category = skill.category;
        if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
        }
        categoryMap.get(category)!.push({
            id: skill.id,
            name: skill.name,
            level: skill.level,
            category: skill.category,
            icon: skill.icon || null,
            description: skill.description || null,
        });
    });

    // SkillCategory[]に変換
    return Array.from(categoryMap.entries()).map(([name, skills]) => ({
        name,
        skills,
    }));
};


export const getSkillCategories = async (): Promise<string[]> => {
    const { data, error } = await supabase
        .from('skills')
        .select('category');

    if (error) {
        console.error('Error fetching skill categories:', error);
        return [];
    }

    // 重複を削除してユニークなカテゴリリストを作成
    const categories = Array.from(new Set((data || []).map(item => item.category)));
    return categories;
}; 
