'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import 'tw-animate-css'

export const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const isManualScrolling = useRef(false)
    const scrollingTimeout = useRef<NodeJS.Timeout | null>(null)

    // セクションオフセットの調整値
    const SCROLL_OFFSET = 20

    useEffect(() => {
        // スクロール時の背景変更処理とアクティブセクション検出
        const handleScroll = () => {
            const offset = window.scrollY
            if (offset > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }

            // 手動スクロール中は検出をスキップ
            if (isManualScrolling.current) return

            // 現在表示されているセクションを検出
            const sections = ['hero', 'about', 'works', 'skills', 'contact']

            // ヘッダーの高さを取得
            const header = document.getElementById('main-header')
            const headerHeight = header?.offsetHeight || 80
            const scrollPosition = window.scrollY + headerHeight + 50 // ヘッダーの高さ + オフセット

            // 現在のスクロール位置に最も近いセクションを検出
            let currentSection = ''
            let minDistance = Number.MAX_VALUE

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const sectionTop = element.offsetTop
                    const distance = Math.abs(scrollPosition - sectionTop)

                    if (distance < minDistance) {
                        minDistance = distance
                        currentSection = sectionId
                    }
                }
            }

            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection)

                // URLのハッシュを更新（履歴に追加せず）
                if (window.history && window.location.hash !== `#${currentSection}`) {
                    window.history.replaceState(null, '', `#${currentSection}`)
                }
            }
        }

        // DOMの読み込み完了を待機してスクロール処理を初期化
        const timer = setTimeout(() => {
            handleScroll() // 初期状態を設定
            window.addEventListener('scroll', handleScroll)
        }, 300)

        // コンポーネントのアンマウント時にイベントリスナーとタイマーをクリーンアップ
        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', handleScroll)
            if (scrollingTimeout.current) {
                clearTimeout(scrollingTimeout.current)
            }
        }
    }, [activeSection])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()

        const element = document.getElementById(id)
        if (!element) {
            console.warn(`Element with id "${id}" not found.`)
            return
        }

        // 手動スクロール中フラグをセット
        isManualScrolling.current = true

        // 直ちにアクティブセクションを更新
        setActiveSection(id)

        // URLのハッシュを更新
        if (window.history) {
            window.history.pushState(null, '', `#${id}`)
        }

        // ヘッダーの高さを取得
        const header = document.getElementById('main-header')
        const headerHeight = header ? header.offsetHeight : 80

        // スクロール位置を計算
        const offsetPosition = element.offsetTop - headerHeight - SCROLL_OFFSET

        // スムーズにスクロール
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

        // スクロールが完了したタイミングでフラグをリセット（1秒後が目安）
        if (scrollingTimeout.current) {
            clearTimeout(scrollingTimeout.current)
        }

        scrollingTimeout.current = setTimeout(() => {
            isManualScrolling.current = false
        }, 1000)
    }

    // ナビゲーションリンクのアクティブ状態スタイルを定義
    const navLinkStyles = (id: string) =>
        `text-base md:text-lg cursor-pointer transition-colors ${activeSection === id
            ? 'font-medium text-black border-b-2 border-black'
            : 'text-gray-700 hover:text-black'
        }`

    return (
        <header id="main-header" className={`w-full ${scrolled
            ? 'glass-effect shadow-md'
            : 'bg-white border-b border-gray-200'
            }`}>
            <div className="container mx-auto flex justify-between items-center py-4 md:py-5 px-4 md:px-6">
                <h1 className="text-2xl md:text-3xl font-medium animate-fade-in-down animate-delay-200">
                    <Link href="/" className="hover:opacity-70 transition-opacity">AOKI SHUNSUKE</Link>
                </h1>
                <nav className="animate-fade-in-down animate-delay-300">
                    <ul className="flex space-x-4 md:space-x-8">
                        <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className={navLinkStyles('hero')}>Home</a></li>
                        <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={navLinkStyles('about')}>About</a></li>
                        <li><a href="#works" onClick={(e) => scrollToSection(e, 'works')} className={navLinkStyles('works')}>Works</a></li>
                        <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={navLinkStyles('skills')}>Skills</a></li>
                        <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={navLinkStyles('contact')}>Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
} 
