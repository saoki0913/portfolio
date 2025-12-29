export interface About {
  id: number;
  name: string;
  title: string;
  summary: string;
  profile_image: string;
  bio: string;
}

export interface Education {
  id: number;
  about_id?: number | null;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
}

export interface Experience {
  id: number;
  about_id?: number | null;
  company: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
  achievements?: string[] | null;
}

export interface SocialMedia {
  id: number;
  about_id?: number | null;
  platform: string;
  url: string;
  username?: string | null;
}

export interface AboutResponse {
  about: About;
  education: Education[];
  experience: Experience[];
  social_media: SocialMedia[];
} 
