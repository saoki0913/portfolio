export interface Skill {
    name: string;
    level: number;
    category: string;
    icon?: string;
    description?: string;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
} 
