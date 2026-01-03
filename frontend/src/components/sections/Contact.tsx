'use client'

import { ContactForm } from '@/components/ContactForm'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const shouldReduceMotion = useReducedMotion()

    return (
        <section ref={sectionRef} id="contact" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 ml-2 bg-white dark:bg-neutral-900 relative overflow-hidden transition-colors duration-300">
            {/* 背景装飾 */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 dark:via-primary/10 to-transparent" />
            <motion.div
                className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-brand-200/30 to-accent-200/20 rounded-full blur-3xl -z-10"
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
                className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-accent-200/20 to-brand-200/30 rounded-full blur-3xl -z-10"
                animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3]
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
                        <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-neutral-100">
                            Contact
                        </h2>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-body-lg md:text-h4 max-w-2xl">
                        お気軽にお問い合わせください
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div
                        className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-700 relative transition-colors duration-300"
                        whileHover={{
                            y: -8,
                            boxShadow: "0 16px 48px rgba(59, 130, 246, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* フォームヘッダー */}
                        <div className="relative px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 border-b border-neutral-100 dark:border-neutral-700">
                            <h3 className="text-h4 font-medium text-center text-neutral-800 dark:text-neutral-100">お問い合わせフォーム</h3>
                        </div>
                        <div className="p-8 md:p-12">
                            <ContactForm />
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
            </div>
        </section>
    )
} 
