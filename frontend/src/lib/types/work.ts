export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  featured?: boolean;
  technologies: string[];
  github_link?: string | null;
  demo_link?: string | null;
  blog_link?: string | null;
  screenshots?: Record<string, unknown> | null;
  duration?: string | null;
  role?: string | null;
  learnings?: string | null;
}
