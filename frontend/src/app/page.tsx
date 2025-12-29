'use client'

import { useState, useEffect, useLayoutEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Works } from '@/components/sections/Works'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { OpeningLoading } from '@/components/ui/OpeningLoading'
import 'tw-animate-css'

// サーバーサイドでの警告を防ぐためのIsomorphic Effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const searchParams = useSearchParams()

  useIsomorphicLayoutEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined') return

    const checkLoadingState = () => {
      const noSkip = searchParams.get('noskip') === 'true'
      
      // リロード判定
      let isReload = false
      if (window.performance) {
        const navEntries = window.performance.getEntriesByType('navigation')
        if (navEntries.length > 0) {
          const navTiming = navEntries[0] as PerformanceNavigationTiming
          if (navTiming.type === 'reload') {
            isReload = true
          }
        } else if (window.performance.navigation) {
          // Fallback for older browsers
          if (window.performance.navigation.type === 1) {
            isReload = true
          }
        }
      }

      // 内部遷移判定（Works -> Homeなど）
      // リロード時はreferrerが自分自身になることがあるが、isReload判定でカバーする
      const isInternalNavigation = document.referrer && document.referrer.includes(window.location.host)
      
      // 訪問済みフラグ
      const isVisited = sessionStorage.getItem('visited') === 'true'

      // 判定ロジック
      // 1. URLパラメータ noskip=true なら常に表示
      if (noSkip) return

      // 2. 訪問済みなら非表示（最優先）
      if (isVisited) {
        setIsLoading(false)
        setShowContent(true)
        return
      }

      // 3. リロードなら非表示（アニメーション途中でのリロード対策など）
      if (isReload) {
        setIsLoading(false)
        setShowContent(true)
        return
      }

      // 4. 内部遷移（Works -> Homeなど）なら非表示
      if (isInternalNavigation) {
        setIsLoading(false)
        setShowContent(true)
        return
      }
      
      // それ以外（真の初回訪問）は表示（初期値trueのまま）
    }

    checkLoadingState()
  }, [searchParams])

  const handleLoadingFinish = () => {
    sessionStorage.setItem('visited', 'true')
    setIsLoading(false)
    setShowContent(true)
  }

  // URLハッシュからセクションへのスクロールを処理
  useEffect(() => {
    if (!showContent) return;

    // ページ表示後にURLハッシュを確認して該当セクションにスクロール
    const hash = window.location.hash;

    // 初回レンダリングとDOM構築が確実に終わるのを待つ
    const timer = setTimeout(() => {
      if (hash) {
        const sectionId = hash.replace('#', '');
        const section = document.getElementById(sectionId);

        if (section) {
          const header = document.getElementById('main-header');
          const headerHeight = header?.offsetHeight || 80;

          // スクロール位置を計算（セクションの上端 - ヘッダー高さ - 余白）
          const offsetPosition = section.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // ハッシュがない場合はHeroセクションに自動スクロール
        // ページ遷移時の位置リセットも兼ねる
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          // すでにトップにいる場合はスクロールしない（不自然な動きを防ぐ）
          if (window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
          }
        }
      }
    }, 500); // アニメーションとの兼ね合いで少し長めに

    return () => clearTimeout(timer);
  }, [showContent])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <OpeningLoading finishLoading={handleLoadingFinish} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
            <div className="fixed-header-container">
            <Header />
            </div>
            
            <main
                className="min-h-screen bg-white text-[#1a1a1a] transition-opacity duration-1000"
                style={{
                    paddingTop: '80px',
                    opacity: showContent ? 1 : 0
                }}
            >
                <div className="animate-fade-in animate-delay-300">
                    <Hero />
                </div>
                <div className="animate-fade-in animate-delay-500">
                    <About />
                    <Works />
                    <Skills />
                    <Contact />
                </div>
            </main>
        </>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}
