import Image from 'next/image'
import 'tw-animate-css'

export const Hero = () => {
    const timelineItems = [
        {
            period: "2018.4 - 2021.3",
            title: "早稲田高等学校",
        },
        {
            period: "2021.4 - 2024.3",
            title: "早稲田大学 創造理工学部 総合機械工学科",
            subtitle: "学士課程",
        },
        {
            period: "2024.10 - 現在",
            title: "株式会社インテリジェントフォース",
            subtitle: "AIソリューション事業部 - AIエンジニア",
        },
        {
            period: "2025.2 - 現在",
            title: "株式会社EQUES",
            subtitle: "製薬業界向けSaaS - バックエンドエンジニア",
        },
        {
            period: "2025.4 - 現在",
            title: "早稲田大学 創造理工学研究科 総合機械工学専攻",
            subtitle: "修士課程 - 菅野研究室 認知ロボティクス研究",
        },
    ];

    return (
        <section id="hero" className="pt-1 md:pt-2 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start">
            <div className="container mx-auto mt-14 md:mt-16">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    {/* テキストエリア - 常に左側に表示 */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-5 md:mb-6">
                            <p className="text-xl md:text-2xl leading-relaxed animate-fade-in-up animate-delay-600">
                                早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。
                                また、長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-2xl font-medium mb-4 uppercase text-black animate-fade-in-up animate-delay-700 tracking-wider flex items-center">
                                経歴
                                <span className="ml-2 text-xs text-gray-500 normal-case font-normal">スクロールして詳細を見る</span>
                            </h3>
                            <div className="relative animate-fade-in-up animate-delay-800 max-h-[35vh] md:max-h-[45vh] overflow-y-auto pr-4 no-scrollbar">
                                <div className="absolute top-0 bottom-[-240px] left-[6px] w-[1px] bg-gray-800"></div>

                                {timelineItems.map((item, index) => (
                                    <div key={index} className="mb-4 md:mb-5 relative pl-12 group">
                                        <div className="absolute left-0 top-[8px] w-[14px] h-[14px] rounded-full border-[2px] border-black bg-white transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:border-white"></div>
                                        <div className="text-sm tracking-wider font-medium uppercase text-gray-500 mb-1 group-hover:text-black transition-colors duration-300">
                                            {item.period}
                                        </div>
                                        <div className="p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-gray-300">
                                            <h4 className="text-base md:text-lg font-medium text-black mb-1">{item.title}</h4>
                                            {item.subtitle && <p className="text-sm text-gray-600">{item.subtitle}</p>}
                                        </div>
                                    </div>
                                ))}
                                <div className="h-24"></div>

                                {/* スクロールインジケーター */}
                                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {/* 画像エリア - 常に右側に表示 */}
                    <div className="w-full md:w-1/2">
                        <div className="aspect-[4/3] relative animate-fade-in-right animate-delay-400 md:ml-auto max-h-[50vh] md:max-h-[70vh]">
                            <Image
                                src="/profile.jpg"
                                alt="Shunsuke Aoki"
                                fill
                                className="object-cover rounded-lg shadow-lg"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* スクロールバーを非表示にするスタイル */}
            <style jsx global>{`
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE, Edge 対応 */
                    scrollbar-width: none;     /* Firefox 対応 */
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;             /* Chrome, Safari, Opera 対応 */
                }
            `}</style>
        </section>
    )
}
