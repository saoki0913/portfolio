'use client'

import { TechIcon } from "@/components/works/TechIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
    name: string
    icon: string
    level: number
}

interface SkillCategory {
    title: string
    skills: Skill[]
}

const skillCategories: SkillCategory[] = [
    {
        title: 'プログラミング言語',
        skills: [
            { name: 'Python', icon: 'Python', level: 90 },
            { name: 'JavaScript', icon: 'JavaScript', level: 70 },
            { name: 'TypeScript', icon: 'TypeScript', level: 60 },
            { name: 'C言語', icon: 'C', level: 30 },
        ]
    },
    {
        title: 'フレームワーク',
        skills: [
            { name: 'PyTorch', icon: 'PyTorch', level: 80 },
            { name: 'FastAPI', icon: 'FastAPI', level: 80 },
            { name: 'React', icon: 'React', level: 70 },
            { name: 'Next.js', icon: 'Next.js', level: 60 },
        ]
    },
    {
        title: 'その他',
        skills: [
            { name: 'Git/GitHub', icon: 'GitHub', level: 80 },
            { name: 'Docker', icon: 'Docker', level: 60 },
            { name: 'Azure', icon: 'Azure', level: 80 },
            { name: 'AWS', icon: 'AWS', level: 50 },
            { name: 'Linux', icon: 'Linux', level: 70 },
            { name: 'ROS', icon: 'ROS', level: 70 },
        ]
    }
]

// 習熟度レベルを判定する関数
const getSkillLevel = (level: number): { label: string; color: string; bgColor: string } => {
    if (level >= 80) {
        return { label: 'エキスパート', color: 'text-emerald-700', bgColor: 'bg-emerald-100' };
    } else if (level >= 60) {
        return { label: '上級', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    } else if (level >= 40) {
        return { label: '中級', color: 'text-amber-700', bgColor: 'bg-amber-100' };
    } else {
        return { label: '初級', color: 'text-neutral-600', bgColor: 'bg-neutral-100' };
    }
};

// プログレスバーの色を取得する関数
const getProgressColor = (level: number): string => {
    if (level >= 80) {
        return 'from-emerald-400 to-emerald-600';
    } else if (level >= 60) {
        return 'from-blue-400 to-blue-600';
    } else if (level >= 40) {
        return 'from-amber-400 to-amber-600';
    } else {
        return 'from-neutral-400 to-neutral-500';
    }
};

export const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section ref={sectionRef} id="skills" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white via-secondary/5 to-white relative overflow-hidden">
            {/* 背景装飾 */}
            <motion.div
                className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-secondary/10 to-transparent -z-10"
                animate={{
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 7,
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
                            Skills
                        </h2>
                    </div>
                    <p className="text-neutral-600 text-body-lg md:text-h4 ml-16 max-w-2xl">
                        日々の学習と実践で培った技術スタック
                    </p>
                </motion.div>

                {/* レベル凡例 */}
                <motion.div
                    className="mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                        {[
                            { label: 'エキスパート', range: '80-100%', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                            { label: '上級', range: '60-79%', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                            { label: '中級', range: '40-59%', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                            { label: '初級', range: '0-39%', color: 'bg-neutral-100 text-neutral-600 border-neutral-200' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border ${item.color}`}
                            >
                                {item.label} ({item.range})
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* スキルカテゴリグリッド */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-neutral-100 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            whileHover={{
                                y: -4,
                                boxShadow: "0 16px 48px rgba(168, 85, 247, 0.15)",
                                borderColor: "oklch(65% 0.20 300)"
                            }}
                        >
                            {/* 背景グラデーション */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
                                <motion.div
                                    className="h-8 w-1 bg-gradient-primary rounded-full"
                                    initial={{ height: 0 }}
                                    animate={isInView ? { height: "2rem" } : {}}
                                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.3 }}
                                />
                                <h3 className="text-h4 md:text-h3 tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                                    {category.title}
                                </h3>
                            </div>
                            <ul className="space-y-5 md:space-y-6 relative z-10">
                                {category.skills.map((skill, skillIndex) => {
                                    const skillLevel = getSkillLevel(skill.level);
                                    const progressColor = getProgressColor(skill.level);

                                    return (
                                        <motion.li
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.4 }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-body-md md:text-body-lg flex items-center font-semibold text-neutral-900">
                                                    <TechIcon tech={skill.icon} className="w-5 h-5 inline-block mr-3 text-brand-500" />
                                                    {skill.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {/* 習熟度バッジ */}
                                                    <motion.span
                                                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${skillLevel.bgColor} ${skillLevel.color}`}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.8 }}
                                                    >
                                                        {skillLevel.label}
                                                    </motion.span>
                                                    {/* パーセント表示 */}
                                                    <motion.span
                                                        className="text-body-sm font-bold text-neutral-500 min-w-[40px] text-right"
                                                        initial={{ opacity: 0 }}
                                                        animate={isInView ? { opacity: 1 } : {}}
                                                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                            </div>
                                            {/* プログレスバー */}
                                            <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    className={`h-full bg-gradient-to-r ${progressColor} rounded-full shadow-sm relative`}
                                                    initial={{ width: 0 }}
                                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                                    transition={{
                                                        duration: 1,
                                                        delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5,
                                                        ease: "easeOut"
                                                    }}
                                                >
                                                    {/* プログレスバーの光沢効果 */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent" />
                                                </motion.div>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
