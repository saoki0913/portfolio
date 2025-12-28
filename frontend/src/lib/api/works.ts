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
        links: {
            github: work.github_link || undefined,
            demo: work.demo_link || undefined,
            blog: work.blog_link || undefined,
        },
        screenshots: work.screenshots || undefined,
        duration: work.duration || undefined,
        role: work.role || undefined,
        learnings: work.learnings || undefined,
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
        links: {
            github: data.github_link || undefined,
            demo: data.demo_link || undefined,
            blog: data.blog_link || undefined,
        },
        screenshots: data.screenshots || undefined,
        duration: data.duration || undefined,
        role: data.role || undefined,
        learnings: data.learnings || undefined,
    };
}; 
