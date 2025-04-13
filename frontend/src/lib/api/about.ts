import apiClient from './client';
import { About } from '../types/about';

/**
 * About情報を取得する
 */
export const getAboutInfo = async (): Promise<About> => {
    try {
        console.log('Fetching about info...');
        const response = await apiClient.get<About>('/about');
        console.log('About info response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        // エラー時はデフォルトデータを返す（UXを損なわないため）
        return {
            name: "青木 俊輔",
            title: "AIエンジニア / バックエンド開発者",
            summary: "早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。",
            profile_image: "/profile.jpg",
            bio: "プログラミングとAIに情熱を持つエンジニアです。大学では機械学習とロボット工学を専攻し、インターンシップではWebアプリケーション開発の経験を積んでいます。",
            education: [
                {
                    institution: "早稲田大学",
                    degree: "修士",
                    field: "創造理工学研究科 総合機械工学専攻",
                    start_date: "2025.4",
                    end_date: "現在",
                    description: "菅野研究室 認知ロボティクス研究。早稲田大学創造理工学研究科の修士1年生として、菅野研究室で「人とロボットの共生」をテーマに研究を行っています。深層予測学習を用いた双腕ヒューマノイドロボットの動作生成に関する研究に取り組み、限られた動作教示から柔軟な動作を生成する技術の開発に注力しています。人間の脳の「左脳と右脳でそれぞれの視覚情報と運動情報を独立して制御し、脳梁を介して情報を共有する」という知見を参考に、人間の脳構造を模した双腕用の深層学習モデルの構築、改善を行うことで、双腕ロボットでの協調動作の生成を目指しています。"
                }
            ],
            experience: [
                {
                    company: "株式会社インテリジェントフォース",
                    position: "AIエンジニア",
                    start_date: "2024.10",
                    end_date: "現在",
                    description: "AIソリューション事業部のエンジニアとして、Azure を活用したWebアプリの開発に従事しています。RAG（Retrieval-Augmented Generation）を活用したAIチャットシステムの開発を担当し、フロントエンドにReact、バックエンドにFastAPIを使用したフルスタック開発を行っています。",
                    achievements: [
                        "自然言語処理モデルの実装と改良",
                        "APIの設計と開発"
                    ]
                },
                {
                    company: "株式会社EQUES",
                    position: "バックエンドエンジニア",
                    start_date: "2025.2",
                    end_date: "現在",
                    description: "製薬業界向けSaaSのバックエンド開発に注力しています。クラウドサービスAWSを活用し、GitおよびGitHubを用いたチーム開発でプロジェクトを推進。また、Dockerを利用して整備した開発環境を活用し、主にバックエンドを担当しながらも、状況に応じてフロントエンド開発にも柔軟に対応し、フロントエンドにNext.js、バックエンドにFastAPIを使用し開発を行っています。"
                }
            ],
            social_media: [
                {
                    platform: "GitHub",
                    url: "https://github.com/username",
                    username: "username"
                }
            ]
        };
    }
}; 
