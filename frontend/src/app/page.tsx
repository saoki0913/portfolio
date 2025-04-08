'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Works } from '@/components/sections/Works'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import 'tw-animate-css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  const waterDropRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

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
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          // URLのハッシュを更新（履歴に追加せず）
          if (window.history) {
            window.history.replaceState(null, '', '#hero');
          }
        }
      }
    }, 800); // コンテンツ表示後に十分な時間を設ける

    return () => clearTimeout(timer);
  }, [showContent]);

  useEffect(() => {
    const noSkip = searchParams.get('noskip')
    const sessionVisited = sessionStorage.getItem('visited')
    const isInternalNavigation = document.referrer.includes(window.location.host)

    if (noSkip === 'true' || (!isInternalNavigation && !sessionVisited)) {
      sessionStorage.setItem('visited', 'true')

      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
      }, 3000)

      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, 3500)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(loadingTimer)
      }
    } else {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [searchParams])

  const skipLoading = () => {
    setShowRipple(true)
    setFadeOut(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 600)

    setTimeout(() => {
      setShowRipple(false)
    }, 800)
  }

  return (
    <div className="relative">
      {/* ヘッダーを最上位に配置（ロード画面が表示されていない時のみ表示） */}
      {!isLoading && (
        <div className="fixed-header-container">
          <Header />
        </div>
      )}

      {isLoading && (
        <div
          className="min-h-screen flex flex-col items-center justify-center fixed top-0 left-0 w-full transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, #f8f8f8 0%, #e6e6e6 100%)',
            zIndex: 'var(--z-loading)',
            opacity: fadeOut ? 0 : 1
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[800px] md:h-[800px]">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-full animate-ripple opacity-20" style={{ animationDelay: '0s' }}></div>
              <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-ripple opacity-30" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-ripple opacity-40" style={{ animationDelay: '1.6s' }}></div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center mb-20 animate-float">
            <div
              ref={waterDropRef}
              className={`w-[320px] h-[320px] md:w-[450px] md:h-[450px] water-drop clickable flex items-center justify-center mb-10 ${isHovered ? 'scale-105' : ''} relative`}
              onClick={skipLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              role="button"
              aria-label="スキップしてホーム画面へ"
            >
              {showRipple && <div className="click-ripple"></div>}
              <div className="water-drop-inner"></div>
              <div className="water-drop-shine"></div>
              <div className="water-drop-ripple"></div>
              <div className="text-center px-8 relative z-10">
                <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-3 animate-tracking-in-expand">
                  AOKI's
                </h1>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-700 animate-tracking-in-expand" style={{ animationDelay: '400ms' }}>
                  Portfolio
                </h2>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-6">
              <div className="w-4 h-4 bg-gray-600 rounded-full animate-loader-dot" style={{ animationDelay: '0ms' }}></div>
              <div className="w-4 h-4 bg-gray-600 rounded-full animate-loader-dot" style={{ animationDelay: '250ms' }}></div>
              <div className="w-4 h-4 bg-gray-600 rounded-full animate-loader-dot" style={{ animationDelay: '500ms' }}></div>
            </div>
          </div>
        </div>
      )}

      <main
        className="min-h-screen bg-white text-[#1a1a1a] transition-opacity duration-700"
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
    </div>
  )
}
