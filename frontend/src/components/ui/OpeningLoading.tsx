'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OpeningLoadingProps {
    finishLoading: () => void
}

// テキストスクランブルコンポーネント
const ScrambleText = ({ text, delay = 0, className }: { text: string, delay?: number, className?: string }) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const [displayText, setDisplayText] = useState('')
    const [started, setStarted] = useState(false)
    
    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(startTimer)
    }, [delay])

    useEffect(() => {
        if (!started) return

        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index]
                        if (char === ' ') return ' '
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join('')
            )

            if (iteration >= text.length) {
                clearInterval(interval)
            }

            iteration += 1 / 3
        }, 50)

        return () => clearInterval(interval)
    }, [started, text])

    return <span className={className}>{displayText}</span>
}

export const OpeningLoading = ({ finishLoading }: OpeningLoadingProps) => {
    const [counter, setCounter] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    
    // カウンターのアニメーション
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    const increment = Math.floor(Math.random() * 3) + 1
                    return Math.min(prev + increment, 100)
                }
                clearInterval(interval)
                setIsComplete(true)
                return 100
            })
        }, 60)

        return () => clearInterval(interval)
    }, [])

    // 完了時の処理
    useEffect(() => {
        if (isComplete) {
            const timer = setTimeout(() => {
                finishLoading()
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [isComplete, finishLoading])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            {/* 背景グラデーション - 他のページと統一 */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
            
            {/* 動くグラデーションblob - Hero/Works/Aboutセクションと統一 */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-brand-200/40 to-accent-200/40 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-accent-200/30 to-brand-200/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -60, 0],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* 中央コンテンツ */}
            <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center">
                
                {/* 名前表示エリア */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-4"
                    >
                        <div className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                            <ScrambleText 
                                text="SHUNSUKE" 
                                delay={500} 
                                className="text-neutral-900 drop-shadow-sm" 
                            />
                            <ScrambleText 
                                text="AOKI" 
                                delay={1200} 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm pb-1" 
                            />
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 2.0, duration: 0.8 }}
                        className="h-[2px] w-48 md:w-64 bg-gradient-to-r from-transparent via-brand-400 to-transparent mx-auto mb-4"
                    />

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.6 }}
                        className="text-sm md:text-base text-neutral-500 tracking-widest uppercase"
                    >
                        AI Robotics & Web Development
                    </motion.p>
                </div>

                {/* プログレスエリア */}
                <motion.div 
                    className="w-full max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    {/* プログレスバー */}
                    <div className="relative h-1.5 w-full bg-neutral-100 border border-neutral-200 rounded-full overflow-hidden mb-4">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
                            style={{ width: `${counter}%` }}
                        />
                        {/* 光る先端 */}
                        <motion.div 
                            className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                            style={{ left: `${Math.max(0, counter - 5)}%` }}
                        />
                    </div>

                    {/* ステータス表示 */}
                    <div className="flex justify-between items-center text-sm font-medium">
                        <motion.span 
                            className="text-neutral-500"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {counter < 100 ? 'Loading...' : 'Ready'}
                        </motion.span>
                        <span className="text-neutral-800 font-bold tabular-nums">
                            {counter}%
                        </span>
                    </div>
                </motion.div>

                {/* 完了時のチェックマーク */}
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                            <motion.svg 
                                className="w-6 h-6 text-white" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* 四隅の装飾 - より控えめに */}
            <div className="absolute inset-0 pointer-events-none p-8 md:p-16">
                <div className="relative w-full h-full">
                    {/* 左上 */}
                    <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-brand-300 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-brand-300 to-transparent"></div>
                    {/* 右上 */}
                    <div className="absolute top-0 right-0 w-12 h-[2px] bg-gradient-to-l from-accent-300 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-[2px] h-12 bg-gradient-to-b from-accent-300 to-transparent"></div>
                    {/* 左下 */}
                    <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-gradient-to-r from-accent-300 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-[2px] h-12 bg-gradient-to-t from-accent-300 to-transparent"></div>
                    {/* 右下 */}
                    <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-gradient-to-l from-brand-300 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-gradient-to-t from-brand-300 to-transparent"></div>
                </div>
            </div>
        </motion.div>
    )
}
