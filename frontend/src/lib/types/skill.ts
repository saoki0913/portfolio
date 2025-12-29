export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon?: string | null;
  description?: string | null;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
