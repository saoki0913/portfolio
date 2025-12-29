'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import 'tw-animate-css'
import { getHeroData, HeroData } from '@/lib/api/hero'

export const Hero = () => {
    const [data, setData] = useState<HeroData | null>(null)
    const [loading, setLoading] = useState(true)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

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
                            <div className="h-24 bg-neutral-200 rounded-lg mb-6 md:mb-8"></div>
                            <div className="h-72 bg-neutral-200 rounded-xl"></div>
                        </div>
                        <div className="w-full md:w-1/2 aspect-[4/3] bg-neutral-200 rounded-xl animate-pulse"></div>
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
                    <div className="p-6 bg-error-light/20 border border-error/30 text-error-dark rounded-xl shadow-sm">
                        <h2 className="text-h3 font-bold mb-2">データの読み込みに失敗しました</h2>
                        <p className="text-body-lg">コンソールログを確認してください</p>
                    </div>
                </div>
            </section>
        )
    }

    console.log('Hero component: Rendering with data:', data);
    return (
        <section id="hero" className="relative pt-2 md:pt-4 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start overflow-hidden">
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-hero opacity-50 -z-10" />
            <motion.div
                className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="container mx-auto mt-14 md:mt-16">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    {/* テキストエリア - 常に左側に表示 */}
                    <motion.div
                        className="w-full md:w-1/2"
                        style={{ y }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h3 className="text-h4 md:text-h3 font-semibold mb-6 uppercase text-neutral-900 tracking-wide flex items-center">
                                経歴
                                <span className="ml-3 text-label-md text-neutral-500 normal-case font-medium">スクロールして詳細を見る</span>
                            </h3>
                            <div className="relative max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
                                <div className="absolute top-0 bottom-[-240px] left-[6px] w-[1px] bg-gradient-to-b from-brand-500 via-accent-500 to-brand-500"></div>

                                {data.timelineItems && data.timelineItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="mb-6 relative pl-12 group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    >
                                        <motion.div
                                            className="absolute left-0 top-[8px] w-[14px] h-[14px] rounded-full border-2 border-brand-500 bg-white shadow-sm"
                                            whileHover={{
                                                scale: 1.3,
                                                backgroundColor: "oklch(65% 0.20 250)",
                                                borderColor: "white",
                                                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="text-label-lg tracking-wide font-semibold uppercase text-neutral-500 mb-2 group-hover:text-brand-600 transition-colors duration-300">
                                            {item.period}
                                        </div>
                                        <motion.div
                                            className="p-4 md:p-6 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-xl shadow-sm"
                                            whileHover={{
                                                y: -4,
                                                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)",
                                                borderColor: "oklch(65% 0.20 250)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h4 className="text-body-lg md:text-h4 font-semibold text-neutral-900 mb-1">{item.title}</h4>
                                            {item.subtitle && <p className="text-body-md text-neutral-600">{item.subtitle}</p>}
                                        </motion.div>
                                    </motion.div>
                                ))}
                                <div className="h-20"></div>

                                {/* スクロールインジケーター */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 画像エリア - 常に右側に表示 */}
                    <motion.div
                        className="w-full md:w-1/2"
                        style={{ opacity }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.div
                            className="aspect-[4/3] relative md:ml-auto max-h-[50vh] md:max-h-[70vh] group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <Image
                                src="/profile.jpg"
                                alt="Shunsuke Aoki"
                                fill
                                className="object-cover rounded-2xl shadow-xl relative z-10"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 via-transparent to-accent-500/20 rounded-2xl z-20"></div>
                        </motion.div>
                    </motion.div>
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
