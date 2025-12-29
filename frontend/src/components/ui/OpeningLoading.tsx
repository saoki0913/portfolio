'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface OpeningLoadingProps {
    finishLoading: () => void
}

// テキストスクランブルコンポーネント（改善版）
const ScrambleText = ({ text, delay = 0, className }: { text: string, delay?: number, className?: string }) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    // 初期値をスペースで埋めることでレイアウトシフトを防ぐ
    const [displayText, setDisplayText] = useState(() => text.split('').map(c => c === ' ' ? ' ' : '_').join(''))
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(startTimer)
    }, [delay])

    useEffect(() => {
        if (!started) return

        let iteration = 0
        let animationFrame: number
        let lastTime = performance.now()
        const interval = 40 // ms per frame

        const animate = (currentTime: number) => {
            if (currentTime - lastTime >= interval) {
                lastTime = currentTime

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

                iteration += 0.4
            }

            if (iteration < text.length + 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [started, text])

    return <span className={className}>{displayText}</span>
}

// チェックマークSVGコンポーネント
const CheckmarkIcon = () => (
    <motion.svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
    >
        <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        />
    </motion.svg>
)

export const OpeningLoading = ({ finishLoading }: OpeningLoadingProps) => {
    const [isComplete, setIsComplete] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    // Framer Motion の motionValue でスムーズなカウンター
    const progress = useMotionValue(0)
    const progressDisplay = useTransform(progress, (val) => Math.round(val))
    const [displayProgress, setDisplayProgress] = useState(0)

    // プログレスのスムーズなアニメーション
    useEffect(() => {
        const controls = animate(progress, 100, {
            duration: 3.5,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth acceleration
            onUpdate: (latest) => {
                setDisplayProgress(Math.round(latest))
            },
            onComplete: () => {
                setIsComplete(true)
            }
        })

        return () => controls.stop()
    }, [progress])

    // 完了時の処理（メモ化）
    const handleFinish = useCallback(() => {
        finishLoading()
    }, [finishLoading])

    useEffect(() => {
        if (isComplete && !isExiting) {
            // 完了アニメーション後に少し待ってから終了
            const timer = setTimeout(() => {
                setIsExiting(true)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [isComplete, isExiting])

    useEffect(() => {
        if (isExiting) {
            // exit アニメーション完了を待つ
            const timer = setTimeout(handleFinish, 500)
            return () => clearTimeout(timer)
        }
    }, [isExiting, handleFinish])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white" />

            {/* 動くグラデーションblob - パフォーマンス最適化 */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl will-change-transform"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-purple-200/25 to-blue-200/25 rounded-full blur-3xl will-change-transform"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            {/* 中央コンテンツ */}
            <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center">

                {/* 名前表示エリア */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <div className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                            <ScrambleText
                                text="SHUNSUKE"
                                delay={300}
                                className="text-neutral-900"
                            />
                            <ScrambleText
                                text="AOKI"
                                delay={900}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
                        className="h-[2px] w-48 md:w-64 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4 origin-center"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0, duration: 0.5, ease: "easeOut" }}
                        className="text-sm md:text-base text-neutral-500 tracking-widest uppercase"
                    >
                        AI Robotics & Web Development
                    </motion.p>
                </div>

                {/* プログレスエリア */}
                <motion.div
                    className="w-full max-w-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                >
                    {/* プログレスバー */}
                    <div className="relative h-2 w-full bg-neutral-200 rounded-full overflow-hidden mb-4 shadow-inner">
                        {/* プログレスバー本体 */}
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${displayProgress}%` }}
                        />
                        {/* シマー効果 */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"
                            style={{
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s infinite linear'
                            }}
                        />
                    </div>

                    {/* ステータス表示 */}
                    <div className="flex justify-between items-center text-sm font-medium">
                        <motion.span
                            className="text-neutral-500"
                            animate={!isComplete ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                            transition={!isComplete ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : {}}
                        >
                            {isComplete ? 'Ready' : 'Loading...'}
                        </motion.span>
                        <span className="text-neutral-800 font-bold tabular-nums w-12 text-right">
                            {displayProgress}%
                        </span>
                    </div>
                </motion.div>

                {/* 完了時のチェックマーク */}
                <motion.div
                    className="mt-8 h-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isComplete ? 1 : 0,
                        scale: isComplete ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {isComplete && (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <CheckmarkIcon />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* 四隅の装飾 */}
            <motion.div
                className="absolute inset-0 pointer-events-none p-8 md:p-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className="relative w-full h-full">
                    {/* 左上 */}
                    <div className="absolute top-0 left-0 w-10 h-[1px] bg-gradient-to-r from-blue-300/60 to-transparent" />
                    <div className="absolute top-0 left-0 w-[1px] h-10 bg-gradient-to-b from-blue-300/60 to-transparent" />
                    {/* 右上 */}
                    <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-purple-300/60 to-transparent" />
                    <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-purple-300/60 to-transparent" />
                    {/* 左下 */}
                    <div className="absolute bottom-0 left-0 w-10 h-[1px] bg-gradient-to-r from-purple-300/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-10 bg-gradient-to-t from-purple-300/60 to-transparent" />
                    {/* 右下 */}
                    <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-gradient-to-l from-blue-300/60 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-gradient-to-t from-blue-300/60 to-transparent" />
                </div>
            </motion.div>
        </motion.div>
    )
}
