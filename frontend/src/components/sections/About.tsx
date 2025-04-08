export const About = () => {
    return (
        <section id="about" className="mt-16 md:mt-20 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">About</h2>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <div>
                        <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 uppercase">研究活動</h3>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-lg md:text-xl font-medium">早稲田大学 菅野研究室</h4>
                            <span className="text-base md:text-lg text-gray-600">2023年4月 〜 現在</span>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                            早稲田大学創造理工学研究科の修士1年生として、菅野研究室で「人とロボットの共生」をテーマに研究を行っています。
                            深層予測学習を用いた双腕ヒューマノイドロボットの動作生成に関する研究に取り組み、限られた動作教示から柔軟な動作を生成する技術の開発に注力しています。
                        </p>
                        <p className="text-base md:text-lg leading-relaxed">
                            人間の脳の「左脳と右脳でそれぞれの視覚情報と運動情報を独立して制御し、脳梁を介して情報を共有する」という知見を参考に、
                            人間の脳構造を模した双腕用の深層学習モデルの構築、改善を行うことで、双腕ロボットでの協調動作の生成を目指しています。
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 uppercase">職務経験</h3>
                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg md:text-xl font-medium">株式会社インテリジェントフォース</h4>
                                    <span className="text-base md:text-lg text-gray-600">2024年10月 〜 現在</span>
                                </div>
                                <p className="text-base md:text-lg leading-relaxed mb-4">
                                    AIソリューション事業部のエンジニアとして、Azure を活用したWebアプリの開発に従事しています。
                                    RAG（Retrieval-Augmented Generation）を活用したAIチャットシステムの開発を担当し、
                                    フロントエンドにReact、バックエンドにFastAPIを使用したフルスタック開発を行っています。
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg md:text-xl font-medium">株式会社EQUES</h4>
                                    <span className="text-base md:text-lg text-gray-600">2025年2月 〜 現在</span>
                                </div>
                                <p className="text-base md:text-lg leading-relaxed">
                                    製薬業界向けSaaSのバックエンド開発に注力しています。クラウドサービスAWSを活用し、
                                    GitおよびGitHubを用いたチーム開発でプロジェクトを推進。また、Dockerを利用して整備した開発環境を活用し、
                                    主にバックエンドを担当しながらも、状況に応じてフロントエンド開発にも柔軟に対応し、
                                    フロントエンドにNext.js、バックエンドにFastAPIを使用し開発を行っています。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 
