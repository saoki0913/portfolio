'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import 'tw-animate-css'
import { getHeroData, HeroData } from '@/lib/api/hero'

export const Hero = () => {
    const [data, setData] = useState<HeroData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Hero component: Fetching data...');
                const heroData = await getHeroData()
                console.log('Hero component: Received data:', heroData);

                if (!heroData.introduction) {
                    console.error('Hero component: Missing introduction data');
                }

                if (!heroData.timelineItems || !Array.isArray(heroData.timelineItems)) {
                    console.error('Hero component: Invalid timelineItems data', heroData.timelineItems);
                }

                setData(heroData)
                console.log('Hero component: State updated with data');
            } catch (error) {
                console.error('Hero component: Failed to fetch hero data:', error)
            } finally {
                setLoading(false)
                console.log('Hero component: Loading state set to false');
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log('Hero component: Current data state:', data);
    }, [data]);

    if (loading) {
        console.log('Hero component: Rendering loading state because loading is:', loading);
        return (
            <section id="hero" className="pt-2 md:pt-4 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start">
                <div className="container mx-auto mt-14 md:mt-16">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="w-full md:w-1/2 animate-pulse">
                            <div className="h-24 bg-gray-200 rounded mb-5 md:mb-6"></div>
                            <div className="h-72 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (!data) {
        console.log('Hero component: Rendering empty state because data is null');
        return (
            <section id="hero" className="pt-2 md:pt-4 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start">
                <div className="container mx-auto mt-14 md:mt-16">
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">データの読み込みに失敗しました</h2>
                        <p>コンソールログを確認してください</p>
                    </div>
                </div>
            </section>
        )
    }

    console.log('Hero component: Rendering with data:', data);
    return (
        <section id="hero" className="pt-2 md:pt-4 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start">
            <div className="container mx-auto mt-14 md:mt-16">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    {/* テキストエリア - 常に左側に表示 */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-5 md:mb-6">
                            <p className="text-xl md:text-2xl leading-relaxed animate-fade-in-up animate-delay-600">
                                {data.introduction?.content || 'コンテンツがありません'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-2xl font-medium mb-4 uppercase text-black animate-fade-in-up animate-delay-700 tracking-wider flex items-center">
                                経歴
                                <span className="ml-2 text-xs text-gray-500 normal-case font-normal">スクロールして詳細を見る</span>
                            </h3>
                            <div className="relative animate-fade-in-up animate-delay-800 max-h-[35vh] md:max-h-[45vh] overflow-y-auto pr-4 no-scrollbar">
                                <div className="absolute top-0 bottom-[-240px] left-[6px] w-[1px] bg-gray-800"></div>

                                {data.timelineItems && data.timelineItems.map((item) => (
                                    <div key={item.id} className="mb-4 md:mb-5 relative pl-12 group">
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
                                <div className="h-20"></div>

                                {/* スクロールインジケーター */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
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
