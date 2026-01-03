'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Briefcase, FlaskConical } from 'lucide-react'
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
                const heroData = await getHeroData()
                setData(heroData)
            } catch (error) {
                console.error('Hero component: Failed to fetch hero data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // タイムラインアイテムのアイコンを取得
    const getTimelineIcon = (title: string) => {
        if (title.includes('大学') || title.includes('学部') || title.includes('研究科')) {
            return GraduationCap
        } else if (title.includes('研究') || title.includes('菅野研')) {
            return FlaskConical
        } else {
            return Briefcase
        }
    }

    if (loading) {
        return (
            <section id="hero" className="pt-2 md:pt-4 pb-1 md:pb-2 px-4 md:px-6 min-h-screen flex flex-col justify-start">
                <div className="container mx-auto mt-14 md:mt-16">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="w-full md:w-1/2 animate-pulse">
                            <div className="h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-6 md:mb-8"></div>
                            <div className="h-72 bg-neutral-200 dark:bg-neutral-700 rounded-xl"></div>
                        </div>
                        <div className="w-full md:w-1/2 aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (!data) {
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
                    {/* 左側: タイムライン（スクロール可能） */}
                    <motion.div
                        className="w-full md:w-1/2"
                        style={{ y }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h3 className="text-h4 md:text-h3 font-semibold mb-6 uppercase text-neutral-900 dark:text-neutral-100 tracking-wide flex items-center">
                                経歴
                                <span className="ml-3 text-label-md text-neutral-500 dark:text-neutral-400 normal-case font-medium">スクロールして詳細を見る</span>
                            </h3>
                            <div className="relative max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
                                {/* タイムラインの線 */}
                                <div className="absolute top-0 bottom-[-240px] left-[15px] w-[2px] bg-gradient-to-b from-brand-500 via-accent-500 to-brand-500"></div>

                                {data.timelineItems && data.timelineItems.map((item, index) => {
                                    const Icon = getTimelineIcon(item.title)

                                    return (
                                        <motion.div
                                            key={item.id}
                                            className="mb-6 relative pl-14 group"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        >
                                            {/* アイコン付きドットマーカー */}
                                            <div className="absolute left-0 top-[4px] w-8 h-8 rounded-full border-2 border-brand-500 dark:border-brand-400 bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                                            </div>

                                            {/* 年代ラベル */}
                                            <div className="text-label-lg tracking-wide font-semibold uppercase text-neutral-500 dark:text-neutral-400 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                                                {item.period}
                                            </div>

                                            {/* コンテンツカード */}
                                            <motion.div
                                                className="p-4 md:p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:border-blue-300/50 dark:hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)] dark:hover:border-purple-500/50"
                                                whileHover={{ y: -4 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h4 className="text-body-lg md:text-h4 font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{item.title}</h4>
                                                {item.subtitle && <p className="text-body-md text-neutral-600 dark:text-neutral-400">{item.subtitle}</p>}
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}
                                {/* 最後のアイテムがグラデーションに隠れないようにするスペーサー */}
                                <div className="h-32"></div>

                                {/* スクロールインジケーター（フェードアウト効果） */}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent pointer-events-none"></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 右側: プロフィール画像 */}
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
