export interface HeroIntroduction {
  id: string;
  content: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle?: string | null;
  sort_order: number;
}
