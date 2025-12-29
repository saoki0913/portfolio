import { supabase } from '../supabase/client';
import { Work } from '@/lib/types/work';

export interface WorkListResponse {
    works: Work[];
}

export const getAllWorks = async (
    params?: { featured?: boolean; category?: string }
): Promise<Work[]> => {
    let query = supabase.from('works').select('*');

    if (params?.featured !== undefined) {
        query = query.eq('featured', params.featured);
    }

    if (params?.category) {
        query = query.eq('category', params.category);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching works:', error);
        return [];
    }

    // データベースのスキーマをWork型に変換
    return (data || []).map(work => ({
        id: work.id,
        title: work.title,
        description: work.description,
        thumbnail: work.thumbnail,
        category: work.category,
        featured: work.featured,
        technologies: work.technologies || [],
        github_link: work.github_link || null,
        demo_link: work.demo_link || null,
        blog_link: work.blog_link || null,
        screenshots: work.screenshots || null,
        duration: work.duration || null,
        role: work.role || null,
        learnings: work.learnings || null,
    }));
};

export const getWorkById = async (id: string): Promise<Work> => {
    const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching work:', error);
        throw error;
    }

    // データベースのスキーマをWork型に変換
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        category: data.category,
        featured: data.featured,
        technologies: data.technologies || [],
        github_link: data.github_link || null,
        demo_link: data.demo_link || null,
        blog_link: data.blog_link || null,
        screenshots: data.screenshots || null,
        duration: data.duration || null,
        role: data.role || null,
        learnings: data.learnings || null,
    };
}; 
