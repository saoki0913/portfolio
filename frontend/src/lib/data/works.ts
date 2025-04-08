import { Work } from '../types/work';

export const works: Work[] = [
    {
        id: 'portfolio',
        title: 'ポートフォリオサイト',
        description: '自身のスキルや経験を紹介するためのモダンなポートフォリオサイト。シンプルでありながら洗練されたデザインと、スムーズなアニメーション効果を取り入れています。Next.jsとTailwind CSSを使用し、レスポンシブデザインで様々なデバイスに対応しています。',
        thumbnail: '/works/portfolio.png',
        period: '2023年3月 - 2023年4月',
        role: 'フルスタックエンジニア',
        technologies: [
            'TypeScript',
            'Next.js',
            'React',
            'Tailwind CSS',
            'Framer Motion',
            'Vercel'
        ],
        features: [
            'スタイリッシュなローディングアニメーション',
            'レスポンシブデザイン',
            '洗練されたUIデザイン',
            'スキルセクションのビジュアル表示',
            '作品ギャラリー',
            'シームレスなページ遷移'
        ],
        images: [
            '/works/portfolio/home.png',
            '/works/portfolio/skills.png',
            '/works/portfolio/works.png'
        ],
        links: {
            github: 'https://github.com/saoki0913/portfolio',
            demo: 'https://yourportfolio.vercel.app'
        },
        learnings: 'このプロジェクトを通じて、Next.jsとTailwind CSSを使用したモダンなWebサイト開発手法を習得しました。特に、カスタムアニメーションの実装やレスポンシブデザインの最適化に注力し、ユーザー体験を向上させるための様々な技術を学びました。また、Vercelでのデプロイやパフォーマンス最適化についても理解を深めることができました。'
    },
    {
        id: 'azure-rag',
        title: 'Azure AIサービスを利用したRAG',
        description: 'AzureのAIサービスを活用し、アップロードされた画像やドキュメントからテキストを抽出して、それを検索ベースでリクエスト内容に関連する情報を返答する仕組みを構築。複雑なレイアウトのPDFファイル等も、セマンティックチャンキング法により高精度に抽出することが可能です。',
        thumbnail: '/works/azure_rag.png',
        period: '2024年1月 - 2024年3月',
        role: 'バックエンド開発、フロントエンド開発',
        technologies: [
            'Python',
            'TypeScript',
            'React',
            'Azure Functions',
            'Azure Document Intelligence',
            'Azure AI Search',
            'Azure OpenAI'
        ],
        features: [
            'Azure Document Intelligenceを使用した高精度なテキスト抽出',
            'セマンティックチャンキングによる効率的な情報分割',
            'Azure AI Searchを活用した高速な情報検索',
            'Azure OpenAIによる自然な応答生成',
            'PDFや画像ファイルなど、様々な形式のドキュメントに対応',
            '要件定義書や設計書などの技術文書に特化した検索機能'
        ],
        images: [
            '/works/ai-chat/screenshot1.png',
            '/works/ai-chat/screenshot2.png',
            '/works/ai-chat/screenshot3.png'
        ],
        links: {
            github: 'https://github.com/saoki0913/azure_rag',
            demo: 'https://your-demo-url.com'
        },
        learnings: 'このプロジェクトを通じて、Azureの各種AIサービスを効果的に連携させる方法を学びました。特にDocument IntelligenceとAI Searchの組み合わせにより、複雑なドキュメントからでも高精度な情報抽出が可能になることが分かりました。また、セマンティックチャンキング技術を活用することで、長文のコンテンツでも意味的なまとまりを保持したまま分割し、検索精度を向上させることができました。'
    },
    {
        id: 'schedule-management',
        title: 'スケジュール管理システム',
        description: '面接予定の管理と日程調整を効率化するためのWebアプリケーション。複数の面接官の空き時間を確認し、候補日時を提示、応募者が希望する日時を選択することで、面接予定の作成とTeamsミーティングの自動設定を行います。',
        thumbnail: '/works/schedule_management.png',
        period: '2023.04 - 現在',
        role: 'フルスタックエンジニア',
        technologies: [
            'Python',
            'TypeScript',
            'Azure Functions',
            'FastAPI',
            'Next.js',
            'Azure Cosmos DB',
            'Microsoft Graph API',
            'Tailwind CSS'
        ],
        features: [
            '面接担当者の予定表から空き時間の自動検出',
            '候補日時の提示と選択フォームの生成',
            '予定選択リンクのメール共有機能',
            'Teamsミーティングの自動設定',
            '予定の再調整機能',
            'メール通知機能'
        ],
        images: [
            '/works/pharma-saas/dashboard.png',
            '/works/pharma-saas/workflow.png',
            '/works/pharma-saas/files.png',
        ],
        links: {
            github: 'https://github.com/saoki0913/schedule_management',
            demo: 'https://your-demo-url.com'
        },
    },
]; 
