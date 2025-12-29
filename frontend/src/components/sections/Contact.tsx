'use client'

import { ContactForm } from '@/components/ContactForm'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section ref={sectionRef} id="contact" className="mt-24 md:mt-32 py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
            {/* 背景装飾 */}
            <motion.div
                className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-neutral-200/30 to-neutral-300/20 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-neutral-300/20 to-neutral-200/30 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
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
                        <h2 className="text-display-md md:text-display-lg tracking-tight text-neutral-800 font-bold px-2.5" style={{ width: '200px', height: '50px', fontSize: '32px' }}>
                            Contact
                        </h2>
                    </div>
                    <p className="text-neutral-600 text-body-lg md:text-h4 px-2.5 max-w-2xl">
                        お気軽にお問い合わせください
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-neutral-100">
                        <ContactForm />
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 
