'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    // マウント後にテーマを取得
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)

        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    // マウント前はプレースホルダーを表示
    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-neutral-100" />
        )
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-amber-500" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-blue-400" />
            </motion.div>
        </motion.button>
    )
}
