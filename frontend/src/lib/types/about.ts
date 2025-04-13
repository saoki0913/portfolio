export interface Education {
    institution: string;
    degree: string;
    field: string;
    start_date: string;
    end_date?: string;
    description?: string;
}

export interface Experience {
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    description?: string;
    achievements?: string[];
}

export interface SocialMedia {
    platform: string;
    url: string;
    username?: string;
}

export interface About {
    name: string;
    title: string;
    summary: string;
    profile_image: string;
    bio: string;
    education: Education[];
    experience: Experience[];
    social_media: SocialMedia[];
} 
