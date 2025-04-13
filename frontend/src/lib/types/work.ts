export interface Link {
    github?: string;
    demo?: string;
    blog?: string;
}

export interface Screenshot {
    url: string;
    caption?: string;
}

export interface Work {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    featured: boolean;
    technologies: string[];
    links?: Link;
    screenshots?: Screenshot[];
    duration?: string;
    role?: string;
    learnings?: string;
} 
