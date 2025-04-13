import apiClient from './client';

export interface TimelineItem {
    id: string;
    period: string;
    title: string;
    subtitle?: string;
    sort_order: number;
}

export interface HeroIntroduction {
    id: string;
    content: string;
}

export interface HeroData {
    introduction: HeroIntroduction;
    timelineItems: TimelineItem[];
}


export const getHeroData = async (): Promise<HeroData> => {
    try {
        // 並列でデータを取得
        console.log('Fetching hero data...');
        const [introResponse, timelineResponse] = await Promise.all([
            apiClient.get<HeroIntroduction[]>('/hero/introduction'),
            apiClient.get<TimelineItem[]>('/hero/timeline?order=sort_order.asc')
        ]);

        console.log('Hero introduction response:', introResponse);
        console.log('Timeline items response:', timelineResponse);

        // 応答データが空かどうかチェック
        if (!introResponse.data || introResponse.data.length === 0) {
            console.warn('Introduction data is empty');
        }

        if (!timelineResponse.data || timelineResponse.data.length === 0) {
            console.warn('Timeline data is empty');
        }

        const heroData = {
            introduction: introResponse.data[0], // 通常は1つのレコードのみ
            timelineItems: timelineResponse.data
        };

        console.log('Processed hero data:', heroData);

        return heroData;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        // エラー時はデフォルトデータを返す（UXを損なわないため）
        return {
            introduction: {
                id: 'default',
                content: '早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。また、長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。'
            },
            timelineItems: [
                {
                    id: 'default-1',
                    period: "2018.4 - 2021.3",
                    title: "早稲田高等学校",
                    sort_order: 1
                },
                {
                    id: 'default-2',
                    period: "2021.4 - 2024.3",
                    title: "早稲田大学 創造理工学部 総合機械工学科",
                    subtitle: "学士課程",
                    sort_order: 2
                },
                {
                    id: 'default-3',
                    period: "2024.10 - 現在",
                    title: "株式会社インテリジェントフォース",
                    subtitle: "AIソリューション事業部 - AIエンジニア",
                    sort_order: 3
                },
                {
                    id: 'default-4',
                    period: "2025.2 - 現在",
                    title: "株式会社EQUES",
                    subtitle: "製薬業界向けSaaS - バックエンドエンジニア",
                    sort_order: 4
                },
                {
                    id: 'default-5',
                    period: "2025.4 - 現在",
                    title: "早稲田大学 創造理工学研究科 総合機械工学専攻",
                    subtitle: "修士課程 - 菅野研究室 認知ロボティクス研究",
                    sort_order: 5
                }
            ]
        };
    }
}; 
