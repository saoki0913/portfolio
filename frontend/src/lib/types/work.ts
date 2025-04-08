export type Work = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    period: string;
    role: string;
    technologies: string[];
    features: string[];
    images: string[];
    links?: {
        github?: string;
        demo?: string;
        article?: string;
    };
    learnings?: string;
}; 