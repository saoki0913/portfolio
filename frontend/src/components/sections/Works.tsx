'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WorkCard {
    href: string
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    tags: string[]
}

const works: WorkCard[] = [
    {
        href: '/works/portfolio',
        imageSrc: '/works/portfolio.png',
        imageAlt: 'Portfolio',
        title: 'ポートフォリオ',
        description: 'モダンなフルスタックポートフォリオサイト',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS']
    },
    {
        href: '/works/azure-rag',
        imageSrc: '/works/azure_rag.png',
        imageAlt: 'AI Chat System',
        title: 'Azure AIサービスを利用したRAG',
        description: 'Azure OpenAIとAI Searchを活用した高度なRAGシステム',
        tags: ['Azure OpenAI', 'React', 'FastAPI', 'Python']
    },
    {
        href: '/works/schedule-management',
        imageSrc: '/works/schedule_management.png',
        imageAlt: 'Schedule Management',
        title: 'スケジュール管理アプリ',
        description: 'Microsoft Graph APIと連携したスケジュール管理システム',
        tags: ['Next.js', 'Azure Functions', 'Cosmos DB']
    }
]

export const Works = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section ref={sectionRef} id="works" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <motion.div
                className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto">
                {/* セクションヘッダー */}
                <motion.div
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            className="h-1 w-12 bg-gradient-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "3rem" } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <h2 className="text-display-md md:text-display-lg tracking-tight bg-gradient-primary bg-clip-text text-transparent font-bold">
                            Works
                        </h2>
                    </div>
                    <p className="text-neutral-600 text-body-lg md:text-h4 ml-16 max-w-2xl">
                        これまでに手がけたプロジェクトをご紹介します
                    </p>
                </motion.div>

                {/* プロジェクトカードグリッド */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {works.map((work, index) => (
                        <motion.div
                            key={work.href}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={work.href}
                                className="group relative block"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <motion.div
                                    className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-100"
                                    whileHover={{
                                        y: -8,
                                        boxShadow: "0 16px 48px rgba(59, 130, 246, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* 画像コンテナ */}
                                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-brand-50 to-accent-50">
                                        <motion.div
                                            className="w-full h-full"
                                            whileHover={{ scale: 1.1, rotate: 1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Image
                                                src={work.imageSrc}
                                                alt={work.imageAlt}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                        {/* グラデーションオーバーレイ */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-brand-500/40 via-transparent to-accent-500/20"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* ホバー時のバッジ */}
                                        <motion.div
                                            className="absolute top-4 right-4"
                                            initial={{ opacity: 0, x: 20 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-label-lg font-semibold shadow-md">
                                                詳しく見る →
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* コンテンツエリア */}
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-h4 md:text-h3 mb-3 bg-gradient-primary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                                            {work.title}
                                        </h3>
                                        <p className="text-neutral-600 text-body-md md:text-body-lg mb-4 line-clamp-2">
                                            {work.description}
                                        </p>

                                        {/* 技術タグ */}
                                        <div className="flex flex-wrap gap-2">
                                            {work.tags.map((tag, tagIndex) => (
                                                <motion.span
                                                    key={tagIndex}
                                                    className="inline-block px-3 py-1.5 text-label-md font-semibold bg-brand-50 text-brand-600 rounded-full border border-brand-200"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={hoveredIndex === index ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, delay: tagIndex * 0.05 }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        backgroundColor: "oklch(65% 0.20 250)",
                                                        color: "white",
                                                        borderColor: "oklch(65% 0.20 250)"
                                                    }}
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 装飾的なボーダー */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                                        whileHover={{
                                            borderColor: "oklch(65% 0.20 250)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
