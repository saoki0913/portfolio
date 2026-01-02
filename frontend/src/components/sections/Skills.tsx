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
        <section ref={sectionRef} id="skills" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white via-secondary/5 to-white dark:from-neutral-900 dark:via-secondary/10 dark:to-neutral-900 relative overflow-hidden transition-colors duration-300">
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
                    <h2 className="text-3xl md:text-4xl font-medium mb-6 text-neutral-900 dark:text-neutral-100">Skills</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-body-lg md:text-h4 max-w-2xl">
                        日々の学習と実践で培った技術スタック
                    </p>
                </motion.div>

                {/* スキルカテゴリグリッド */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-neutral-100 dark:border-neutral-700 relative overflow-hidden group cursor-default transition-colors duration-300"
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
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-accent-50 dark:from-brand-900/30 dark:via-transparent dark:to-accent-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* カテゴリタイトル */}
                            <motion.h3
                                className="text-h4 font-semibold text-neutral-800 dark:text-neutral-100 mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-700 relative z-10"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.4, delay: categoryIndex * 0.1 + 0.2 }}
                            >
                                {category.title}
                            </motion.h3>

                            <ul className="space-y-5 md:space-y-6 relative z-10">
                                {category.skills.map((skill, skillIndex) => {
                                    const progressColor = getProgressColor(skill.level);

                                    return (
                                        <motion.li
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.4 }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-body-md md:text-body-lg flex items-center font-semibold text-neutral-900 dark:text-neutral-100">
                                                    <TechIcon tech={skill.icon} className="w-5 h-5 inline-block mr-3" />
                                                    {skill.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {/* パーセント表示 */}
                                                    <motion.span
                                                        className="text-body-sm font-bold text-neutral-500 dark:text-neutral-400 min-w-[40px] text-right"
                                                        initial={{ opacity: 0 }}
                                                        animate={isInView ? { opacity: 1 } : {}}
                                                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 1 }}
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                </div>
                                            </div>
                                            {/* プログレスバー */}
                                            <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden relative">
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
