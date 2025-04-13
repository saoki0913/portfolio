from typing import List, Dict, Any

# Works データ
works_data: List[Dict[str, Any]] = [
    {
        "id": "portfolio",
        "title": "ポートフォリオサイト",
        "description": "Next.js、TypeScript、Tailwind CSSで構築した個人ポートフォリオサイト。バックエンドにはPythonとFastAPIを使用しています。",
        "thumbnail": "/projects/portfolio.jpg",
        "category": "Web開発",
        "featured": True,
        "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI"],
        "links": {
            "github": "https://github.com/yourusername/portfolio",
            "demo": "https://yourportfolio.vercel.app"
        },
        "screenshots": [
            {"url": "/projects/portfolio-1.jpg", "caption": "ホームページ"},
            {"url": "/projects/portfolio-2.jpg", "caption": "プロジェクト一覧"}
        ],
        "duration": "2023年9月 - 現在",
        "role": "フルスタック開発者",
        "learnings": "モダンなWebフロントエンド技術とAPIの構築について深く学びました。また、デプロイメントとCI/CDパイプラインの構築も経験しました。"
    },
    {
        "id": "ai-chatbot",
        "title": "AI チャットボット",
        "description": "自然言語処理を活用した顧客サポート用チャットボット。ユーザーの質問に自動で応答し、必要に応じて人間のオペレーターにエスカレーションします。",
        "thumbnail": "/projects/chatbot.jpg",
        "category": "AI・機械学習",
        "featured": True,
        "technologies": ["Python", "TensorFlow", "Flask", "React", "Docker"],
        "links": {
            "github": "https://github.com/yourusername/ai-chatbot",
            "demo": "https://ai-chatbot-demo.herokuapp.com"
        },
        "screenshots": [
            {"url": "/projects/chatbot-1.jpg", "caption": "チャットインターフェース"},
            {"url": "/projects/chatbot-2.jpg", "caption": "管理パネル"}
        ],
        "duration": "2022年6月 - 2023年2月",
        "role": "ML エンジニア",
        "learnings": "大規模な言語モデルのファインチューニングと、それをWebアプリケーションに統合する方法について学びました。"
    },
    {
        "id": "robot-navigation",
        "title": "自律型ロボットナビゲーションシステム",
        "description": "障害物を回避しながら未知の環境を探索できる自律型ロボットのナビゲーションシステム。",
        "thumbnail": "/projects/robot.jpg",
        "category": "ロボティクス",
        "featured": False,
        "technologies": ["Python", "ROS", "TensorFlow", "OpenCV", "C++"],
        "links": {
            "github": "https://github.com/yourusername/robot-navigation"
        },
        "screenshots": [
            {"url": "/projects/robot-1.jpg", "caption": "シミュレーション環境"},
            {"url": "/projects/robot-2.jpg", "caption": "実機テスト"}
        ],
        "duration": "2021年4月 - 2021年12月",
        "role": "ロボティクスエンジニア",
        "learnings": "SLAM（同時位置推定と地図作成）アルゴリズムと強化学習を用いたロボットの行動決定について実践的に学びました。"
    }
]

# Skills データ
skills_data = {
    "categories": [
        {
            "name": "フロントエンド",
            "skills": [
                {
                    "name": "React",
                    "level": 4,
                    "category": "フロントエンド",
                    "icon": "react",
                    "description": "ReactとNext.jsを使用した複数のプロジェクト開発経験あり"
                },
                {
                    "name": "TypeScript",
                    "level": 4,
                    "category": "フロントエンド",
                    "icon": "typescript",
                    "description": "型安全なコードを書くために積極的に活用"
                },
                {
                    "name": "HTML/CSS",
                    "level": 5,
                    "category": "フロントエンド",
                    "icon": "html5",
                    "description": "セマンティックなHTMLと最新のCSSテクニックの実践"
                },
                {
                    "name": "Tailwind CSS",
                    "level": 4,
                    "category": "フロントエンド",
                    "icon": "tailwindcss",
                    "description": "効率的なUIスタイリングのために活用"
                }
            ]
        },
        {
            "name": "バックエンド",
            "skills": [
                {
                    "name": "Python",
                    "level": 5,
                    "category": "バックエンド",
                    "icon": "python",
                    "description": "メインの開発言語として長年使用"
                },
                {
                    "name": "FastAPI",
                    "level": 4,
                    "category": "バックエンド",
                    "icon": "fastapi",
                    "description": "高速なAPIの構築に活用"
                },
                {
                    "name": "SQL",
                    "level": 3,
                    "category": "バックエンド",
                    "icon": "postgresql",
                    "description": "複雑なクエリの作成とデータベース設計"
                },
                {
                    "name": "Node.js",
                    "level": 3,
                    "category": "バックエンド",
                    "icon": "nodejs",
                    "description": "JavaScriptバックエンドの開発経験あり"
                }
            ]
        },
        {
            "name": "AI・機械学習",
            "skills": [
                {
                    "name": "TensorFlow",
                    "level": 4,
                    "category": "AI・機械学習",
                    "icon": "tensorflow",
                    "description": "深層学習モデルの構築と訓練"
                },
                {
                    "name": "PyTorch",
                    "level": 3,
                    "category": "AI・機械学習",
                    "icon": "pytorch",
                    "description": "研究プロジェクトでの自然言語処理モデルの開発"
                },
                {
                    "name": "scikit-learn",
                    "level": 4,
                    "category": "AI・機械学習",
                    "icon": "scikit-learn",
                    "description": "データ分析と機械学習アルゴリズムの実装"
                }
            ]
        },
        {
            "name": "その他",
            "skills": [
                {
                    "name": "Docker",
                    "level": 3,
                    "category": "DevOps",
                    "icon": "docker",
                    "description": "アプリケーションのコンテナ化とデプロイ"
                },
                {
                    "name": "Git",
                    "level": 4,
                    "category": "DevOps",
                    "icon": "git",
                    "description": "バージョン管理とチーム開発の経験"
                },
                {
                    "name": "Linux",
                    "level": 3,
                    "category": "DevOps",
                    "icon": "linux",
                    "description": "サーバー管理とシェルスクリプト"
                }
            ]
        }
    ]
}

# About データ
about_data = {
    "name": "青木 俊輔",
    "title": "AIエンジニア / バックエンド開発者",
    "summary": "早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。",
    "profile_image": "/profile.jpg",
    "bio": "プログラミングとAIに情熱を持つエンジニアです。大学では機械学習とロボット工学を専攻し、インターンシップではWebアプリケーション開発の経験を積んでいます。常に新しい技術を学び、実践することを心がけています。",
    "education": [
        {
            "institution": "早稲田大学",
            "degree": "修士",
            "field": "創造理工学研究科 総合機械工学専攻",
            "start_date": "2025.4",
            "end_date": "現在",
            "description": "菅野研究室 認知ロボティクス研究"
        },
        {
            "institution": "早稲田大学",
            "degree": "学士",
            "field": "創造理工学部 総合機械工学科",
            "start_date": "2021.4",
            "end_date": "2024.3",
            "description": "機械学習とロボティクスを専攻"
        }
    ],
    "experience": [
        {
            "company": "株式会社インテリジェントフォース",
            "position": "AIエンジニア",
            "start_date": "2024.10",
            "end_date": "現在",
            "description": "AIソリューション事業部にてAIモデルの開発と実装を担当",
            "achievements": [
                "自然言語処理モデルの実装と改良",
                "APIの設計と開発",
                "フロントエンドとの連携"
            ]
        },
        {
            "company": "株式会社EQUES",
            "position": "バックエンドエンジニア",
            "start_date": "2025.2",
            "end_date": "現在",
            "description": "製薬業界向けSaaSのバックエンド開発",
            "achievements": [
                "FastAPIを用いたREST APIの開発",
                "データベース設計とクエリ最適化",
                "CI/CDパイプラインの構築"
            ]
        }
    ],
    "social_media": [
        {
            "platform": "GitHub",
            "url": "https://github.com/yourusername",
            "username": "yourusername"
        },
        {
            "platform": "LinkedIn",
            "url": "https://linkedin.com/in/yourusername",
            "username": "yourusername"
        },
        {
            "platform": "Twitter",
            "url": "https://twitter.com/yourusername",
            "username": "yourusername"
        }
    ]
} 
