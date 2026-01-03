'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'works', label: 'Works' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
]

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/saoki0913',
        icon: Github,
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/shunsuke-aoki',
        icon: Linkedin,
    },
    {
        name: 'Email',
        href: 'mailto:contact@example.com',
        icon: Mail,
    },
]

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()

        const element = document.getElementById(id)
        if (!element) return

        const header = document.getElementById('main-header')
        const headerHeight = header ? header.offsetHeight : 80
        const offsetPosition = element.offsetTop - headerHeight - 20

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

        if (window.history) {
            window.history.pushState(null, '', `#${id}`)
        }
    }

    return (
        <footer className="relative mt-24 md:mt-32 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
            {/* 背景装飾 */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-200/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                {/* メインコンテンツ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
                    {/* ブランド・説明 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-1"
                    >
                        <Link href="/" className="inline-block mb-4">
                            <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity">
                                AOKI SHUNSUKE
                            </h2>
                        </Link>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                            AIとWebテクノロジーで新しい価値を創造するエンジニア。
                            常に学び続け、より良いソリューションを追求しています。
                        </p>
                    </motion.div>

                    {/* ナビゲーション */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={`#${link.id}`}
                                        onClick={(e) => scrollToSection(e, link.id)}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm cursor-pointer"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ソーシャルリンク */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* 区切り線 */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* コピーライト */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-neutral-500 dark:text-neutral-500 text-sm"
                        >
                            &copy; {currentYear} Shunsuke Aoki. All rights reserved.
                        </motion.p>

                        {/* Made with */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-neutral-500 dark:text-neutral-500 text-sm flex items-center gap-1.5"
                        >
                            Made with
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            using Next.js & FastAPI
                        </motion.p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
