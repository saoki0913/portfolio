'use client'

import { useEffect, useState } from 'react'
import { getAboutInfo } from '@/lib/api/about'
import { AboutResponse, Experience } from '@/lib/types/about'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Calendar, MapPin, X, Target, Lightbulb, Cpu, TrendingUp, ChevronRight, BookOpen, Zap, Users, Brain, Cog } from 'lucide-react'

// 研究詳細モーダルコンポーネント
const ResearchDetailModal = ({
    onClose
}: {
    onClose: () => void
}) => {
    const researchDetails = {
        theme: "深層予測学習を用いた双腕ロボットの協調動作生成",
        background: [
            "少子高齢化や人手不足が深刻化する現代社会において、人間の代わりに柔軟な作業ができるロボット技術の発展が急務となっています。",
            "従来のロボットは事前にプログラムされた動作しか行えず、環境変化への適応が困難でした。",
            "人間のように状況を判断し、両腕を協調させて物体を操作する能力を持つロボットの実現が求められています。"
        ],
        problem: {
            title: "部分拘束協調作業の課題",
            description: "物体を持ちながら両手の相対位置を変える作業（例：布を折る、箱を開ける）において、従来の手法では予測誤差が蓄積し、安定した動作生成が困難でした。"
        },
        approach: {
            title: "階層型深層予測学習（HLSTM）の採用",
            points: [
                "人間の脳における左右半球の統合機構を参考に、階層型のニューラルネットワーク構造を設計",
                "下位層で各腕の局所的な動作を学習し、上位層で両腕の協調関係を統合",
                "予測誤差を最小化しながら、ノイズに対する頑健性を確保"
            ]
        },
        methodology: [
            { icon: Brain, label: "深層予測学習", desc: "LSTMベースの時系列予測モデルを活用" },
            { icon: Cog, label: "階層型構造", desc: "局所動作と協調動作を分離して学習" },
            { icon: Zap, label: "リアルタイム生成", desc: "学習済みモデルによる高速な動作計画" }
        ],
        results: [
            "従来手法と比較して予測誤差を40%削減",
            "環境ノイズに対する安定性が大幅に向上",
            "実機（双腕ヒューマノイド）での動作検証に成功"
        ],
        applications: [
            { icon: Users, label: "介護支援", desc: "高齢者の移乗介助や食事支援" },
            { icon: BookOpen, label: "家庭用ロボット", desc: "洗濯物の取り扱いや調理補助" }
        ]
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* オーバーレイ */}
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* モーダルコンテンツ */}
                <motion.div
                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {/* ヘッダー */}
                    <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700 px-6 py-4 flex items-start justify-between z-10">
                        <div>
                            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">Research Detail</p>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{researchDetails.theme}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                            aria-label="閉じる"
                        >
                            <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        </button>
                    </div>

                    {/* コンテンツ */}
                    <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-80px)] space-y-6">
                        {/* 研究背景 */}
                        <div>
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                                研究背景
                            </h4>
                            <div className="space-y-2">
                                {researchDetails.background.map((text, idx) => (
                                    <motion.p
                                        key={idx}
                                        className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* 課題 */}
                        <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-600">
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2">{researchDetails.problem.title}</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{researchDetails.problem.description}</p>
                        </div>

                        {/* アプローチ */}
                        <div>
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                                {researchDetails.approach.title}
                            </h4>
                            <ul className="space-y-2">
                                {researchDetails.approach.points.map((point, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* 技術手法 */}
                        <div>
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                                技術手法
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {researchDetails.methodology.map((method, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-3 border border-neutral-100 dark:border-neutral-600 text-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                    >
                                        <method.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mx-auto mb-2" />
                                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">{method.label}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">{method.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 研究成果 */}
                        <div>
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                                研究成果
                            </h4>
                            <ul className="space-y-2">
                                {researchDetails.results.map((result, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg px-3 py-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + idx * 0.1 }}
                                    >
                                        <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        {result}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* 応用展開 */}
                        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-5">
                            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                                応用展開
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {researchDetails.applications.map((app, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg border border-neutral-100 dark:border-neutral-600"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 + idx * 0.1 }}
                                    >
                                        <app.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{app.label}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{app.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// 成果・実績モーダルコンポーネント
const AchievementsModal = ({
    experience,
    onClose
}: {
    experience: Experience | null
    onClose: () => void
}) => {
    if (!experience) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* オーバーレイ */}
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* モーダルコンテンツ */}
                <motion.div
                    className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {/* ヘッダー */}
                    <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700 px-6 py-4 flex items-start justify-between z-10">
                        <div>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Achievements</p>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{experience.company}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{experience.position}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                            aria-label="閉じる"
                        >
                            <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        </button>
                    </div>

                    {/* 成果・実績リスト */}
                    <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-100px)]">
                        <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-neutral-800 dark:bg-neutral-200 rounded-full"></span>
                            成果・実績 ({experience.achievements?.length || 0}件)
                        </h4>
                        <ul className="space-y-2">
                            {experience.achievements?.map((achievement, idx) => (
                                <motion.li
                                    key={idx}
                                    className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg px-3 py-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    {achievement}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export const About = () => {
    const [aboutData, setAboutData] = useState<AboutResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
    const [showResearchDetail, setShowResearchDetail] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAboutInfo()
                setAboutData(data)
            } catch (err) {
                console.error('About情報の取得に失敗しました:', err)
                setError('データの読み込みに失敗しました')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // モーダルを開く
    const openAchievementsModal = (experience: Experience) => {
        setSelectedExperience(experience)
    }

    // モーダルを閉じる
    const closeAchievementsModal = () => {
        setSelectedExperience(null)
    }

    // ローディング中の表示
    if (loading) {
        return (
            <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-48"></div>
                        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 space-y-4">
                                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 space-y-4">
                                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // エラー時の表示
    if (error || !aboutData) {
        return (
            <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">About</h2>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                        <p className="text-red-700 dark:text-red-400 font-medium">{error || 'データを取得できませんでした'}</p>
                    </div>
                </div>
            </section>
        )
    }

    // 研究活動データの取得
    const research = aboutData.education.find(edu =>
        edu.institution.includes('早稲田大学') && edu.description?.includes('菅野研究室')
    )

    // 職務経験データの取得
    const workExperiences = aboutData.experience.sort((a, b) => {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    })

    return (
        <>
            <section id="about" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
                {/* 背景装飾 */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl -z-10"
                    animate={shouldReduceMotion ? {} : {
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
                    className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10"
                    animate={shouldReduceMotion ? {} : {
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
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-medium mb-6 text-neutral-900 dark:text-neutral-100">About</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-body-lg md:text-h4">
                            早稲田大学創造理工学研究科の修士1年生として、菅野研究室で「人とロボットの共生」をテーマに研究を行っています。
                            深層予測学習を用いた双腕ヒューマノイドロボットの動作生成に取り組み、企業ではAzureを活用したWebアプリ開発やRAGシステムの構築に携わっています。
                        </p>
                    </motion.div>

                    {/* メインコンテンツ */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
                        {/* 研究活動カード */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <motion.div
                                className="relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-700 h-full"
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 16px 48px rgba(59, 130, 246, 0.15)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* カードヘッダー - グラデーション背景 */}
                                <div className="relative px-6 py-5 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 border-b border-neutral-100 dark:border-neutral-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-h4 md:text-h3 bg-gradient-primary bg-clip-text text-transparent">研究活動</h3>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider uppercase bg-white/80 dark:bg-neutral-800/80 px-3 py-1 rounded-full">RESEARCH</span>
                                    </div>
                                    {/* グラデーションオーバーレイ */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-brand-500/10 via-transparent to-accent-500/10"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                {/* カードコンテンツ */}
                                <div className="p-6 md:p-8">
                                    {research ? (
                                        <div className="space-y-5">
                                            {/* 所属情報 */}
                                            <div>
                                                <h4 className="text-body-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                                    {research.institution}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                                                    <span>{research.field}</span>
                                                    <span className="text-neutral-300 dark:text-neutral-600">|</span>
                                                    <span>{research.start_date} 〜 {research.end_date || '現在'}</span>
                                                </div>
                                            </div>

                                            {/* 研究テーマ */}
                                            <div className="bg-gradient-to-r from-brand-50/50 to-accent-50/50 dark:from-brand-900/20 dark:to-accent-900/20 rounded-xl p-4 border border-brand-100/50 dark:border-brand-800/50">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mb-1.5">Theme</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                                            深層予測学習を用いた双腕ロボットの協調動作生成
                                                        </p>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => setShowResearchDetail(true)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-white dark:bg-neutral-800 hover:bg-brand-50 dark:hover:bg-brand-900/30 border border-brand-200 dark:border-brand-700 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        詳細
                                                        <ChevronRight className="w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* 研究概要 */}
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                        人とロボットが共生する社会の実現に向け、ロボットが柔軟に作業できる技術基盤を構築
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                        物体との接触で手先位置が変化する「部分拘束協調作業」に着目
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                        階層型深層予測学習モデル（HLSTM）を採用し、安定した協調動作を実現
                                                    </p>
                                                </div>
                                            </div>

                                            {/* フッター */}
                                            <p className="text-xs text-neutral-400 dark:text-neutral-500 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                                                介護支援・家庭用ロボットへの応用を目指しています
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">研究活動データがありません</p>
                                    )}
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
                        </motion.div>

                        {/* 職務経験カード */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.div
                                className="relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-700 h-full"
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 16px 48px rgba(124, 58, 237, 0.15)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* カードヘッダー - グラデーション背景 */}
                                <div className="relative px-6 py-5 bg-gradient-to-r from-accent-50 to-brand-50 dark:from-accent-900/30 dark:to-brand-900/30 border-b border-neutral-100 dark:border-neutral-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-h4 md:text-h3 bg-gradient-to-r from-accent-600 to-brand-600 bg-clip-text text-transparent">職務経験</h3>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider uppercase bg-white/80 dark:bg-neutral-800/80 px-3 py-1 rounded-full">EXPERIENCE</span>
                                    </div>
                                    {/* グラデーションオーバーレイ */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-accent-500/10 via-transparent to-brand-500/10"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                {/* カードコンテンツ */}
                                <div className="p-6 md:p-8">
                                    {workExperiences.length > 0 ? (
                                        <div className="space-y-5">
                                            {workExperiences.map((exp, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={`${index !== workExperiences.length - 1 ? 'pb-5 border-b border-neutral-100 dark:border-neutral-700' : ''}`}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {/* 会社情報 */}
                                                    <div className="mb-3">
                                                        <h4 className="text-body-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                                            {exp.company}
                                                        </h4>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                                            <span className="font-medium text-accent-600 dark:text-accent-400">{exp.position}</span>
                                                            <span className="text-neutral-300 dark:text-neutral-600">|</span>
                                                            <span>{exp.start_date} 〜 {exp.end_date || '現在'}</span>
                                                        </div>
                                                    </div>

                                                    {/* 業務内容 */}
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                                                        {exp.description}
                                                    </p>

                                                    {/* 成果・実績 */}
                                                    {exp.achievements && exp.achievements.length > 0 && (
                                                        <div className="bg-gradient-to-r from-accent-50/50 to-brand-50/50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl p-3 border border-accent-100/50 dark:border-accent-800/50">
                                                            <p className="text-xs text-accent-600 dark:text-accent-400 font-semibold uppercase tracking-wider mb-2">
                                                                成果・実績
                                                            </p>
                                                            <ul className="space-y-1.5">
                                                                {exp.achievements.slice(0, 3).map((achievement, idx) => (
                                                                    <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                                                                        {achievement}
                                                                    </li>
                                                                ))}
                                                                {exp.achievements.length > 3 && (
                                                                    <li className="pl-3.5">
                                                                        <motion.button
                                                                            onClick={() => openAchievementsModal(exp)}
                                                                            className="text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-semibold transition-colors cursor-pointer"
                                                                            whileHover={{ x: 3 }}
                                                                        >
                                                                            他 {exp.achievements.length - 3} 件を見る →
                                                                        </motion.button>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">職務経験データがありません</p>
                                    )}
                                </div>

                                {/* 装飾的なボーダー */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                                    whileHover={{
                                        borderColor: "oklch(60% 0.25 300)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 成果・実績モーダル */}
            {selectedExperience && (
                <AchievementsModal
                    experience={selectedExperience}
                    onClose={closeAchievementsModal}
                />
            )}

            {/* 研究詳細モーダル */}
            {showResearchDetail && (
                <ResearchDetailModal
                    onClose={() => setShowResearchDetail(false)}
                />
            )}
        </>
    )
}
