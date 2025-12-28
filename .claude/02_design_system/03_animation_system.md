# アニメーションシステム

## 1. アニメーション原則

### 1.1 基本方針

| 原則 | 説明 |
|------|------|
| **控えめに（Subtle）** | 過度なアニメーションは避け、コンテンツを引き立てる |
| **目的を持つ（Purposeful）** | 装飾ではなく、意味のあるフィードバックを提供 |
| **パフォーマンス（Performant）** | GPU加速プロパティ（transform/opacity）を優先 |
| **アクセシビリティ（Accessible）** | `prefers-reduced-motion` に対応 |
| **一貫性（Consistent）** | デュレーション・イージングを統一 |

### 1.2 パフォーマンス最適化

```css
/* GPU加速されるプロパティ（推奨） */
transform: translate3d(), scale(), rotate();
opacity: 0-1;

/* CPU依存のプロパティ（避ける） */
width, height;     /* → scaleX/Y を使用 */
top, left;         /* → translateX/Y を使用 */
margin, padding;   /* → transform を使用 */
```

---

## 2. イージング関数

### 2.1 標準イージング

```typescript
// animation-utils.ts
export const easings = {
  // メインイージング - スムーズな減速（推奨）
  smooth: [0.16, 1, 0.3, 1] as const,

  // 高速開始、緩やかな終了
  easeOut: [0, 0, 0.2, 1] as const,

  // 緩やかな開始、高速終了
  easeIn: [0.4, 0, 1, 1] as const,

  // バウンス効果
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;
```

### 2.2 デュレーション

```typescript
export const durations = {
  fast: 0.3,      // ホバー、マイクロインタラクション
  normal: 0.5,    // 標準トランジション
  slow: 0.8,      // ページ遷移、大きな要素
  verySlow: 1.2,  // ヒーローアニメーション
} as const;
```

---

## 3. Framer Motion パターン

### 3.1 フェードイン（Fade In）

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animation-utils';

// 下からフェードイン（最も一般的）
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>

// または事前定義のバリアントを使用
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

### 3.2 スクロール連動（Scroll-Triggered）

```tsx
import { motion } from 'framer-motion';

// whileInView を使用（推奨）
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  Scroll-triggered content
</motion.div>
```

### 3.3 スタガーアニメーション（Stagger）

```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // 子要素間の遅延
      delayChildren: 0.2,        // 最初の子要素の遅延
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// 使用例
<motion.ul
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### 3.4 ホバーエフェクト

```tsx
// リフト効果
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
>
  Hoverable card
</motion.div>

// グロウ効果
<motion.div
  initial={{ boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' }}
  whileHover={{ boxShadow: '0 0 40px 0 rgba(59, 130, 246, 0.3)' }}
  transition={{ duration: 0.3 }}
>
  Glowing card
</motion.div>
```

---

## 4. Scrollytelling（スクロール連動ストーリーテリング）

### 4.1 視差効果（Parallax）

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export const ParallaxSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 異なる速度で要素を移動
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* 背景レイヤー（遅い） */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <div className="w-full h-full bg-gradient-to-b from-primary/20 to-transparent" />
      </motion.div>

      {/* 前景レイヤー（速い） */}
      <motion.div
        className="relative z-10"
        style={{ y: y2, opacity }}
      >
        <h2>Parallax Content</h2>
      </motion.div>
    </section>
  );
};
```

### 4.2 プログレスバー連動

```tsx
import { useScroll, motion, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // スムーズなスプリングアニメーション
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
      style={{ scaleX }}
    />
  );
};
```

### 4.3 セクション固定スクロール（Scroll-Pinning）

```tsx
// GSAP ScrollTrigger を使用
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PinnedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // セクションを固定
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',   // スクロール距離
        pin: true,
        pinSpacing: true,
      });

      // コンテンツのアニメーション
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            scrub: true,  // スクロールに連動
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen">
      <div ref={contentRef}>
        Pinned Content
      </div>
    </section>
  );
};
```

### 4.4 テキスト表示アニメーション

```tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const RevealText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {words.map((word, i) => {
        // 各単語に異なるスクロール範囲を割り当て
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block text-4xl font-bold"
    >
      {children}
    </motion.span>
  );
};
```

---

## 5. マイクロインタラクション

### 5.1 ボタン押下

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### 5.2 トグルスイッチ

```tsx
<motion.div
  className="w-12 h-6 bg-border rounded-full p-1 cursor-pointer"
  onClick={() => setIsOn(!isOn)}
  animate={{ backgroundColor: isOn ? '#3B82F6' : '#374151' }}
>
  <motion.div
    className="w-4 h-4 bg-white rounded-full"
    animate={{ x: isOn ? 24 : 0 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  />
</motion.div>
```

### 5.3 数値カウントアップ

```tsx
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const AnimatedCounter = ({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // イーズアウト
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};
```

---

## 6. スプリングアニメーション

### 6.1 スプリングプリセット

```typescript
export const springs = {
  // やわらかい
  soft: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  // 標準
  medium: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  },
  // 弾む
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  },
  // 素早い
  quick: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
} as const;
```

### 6.2 マウス追従

```tsx
import { useSpring, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const MouseFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springX = useSpring(mousePos.x, { stiffness: 300, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full bg-primary/30 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: springX,
        top: springY,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
```

---

## 7. ページトランジション

### 7.1 フェード遷移

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

---

## 8. アクセシビリティ対応

### 8.1 Reduced Motion対応

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const AccessibleAnimation = ({ children }: { children: React.ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

### 8.2 useReducedMotion フック

```tsx
import { useEffect, useState } from 'react';

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};
```

### 8.3 CSS での対応

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. パフォーマンス最適化

### 9.1 will-change の適切な使用

```tsx
// アニメーション開始前に適用、終了後に解除
<motion.div
  onHoverStart={() => setWillChange('transform')}
  onHoverEnd={() => setWillChange('auto')}
  style={{ willChange }}
  whileHover={{ scale: 1.05 }}
>
  Optimized hover
</motion.div>
```

### 9.2 IntersectionObserver による遅延ロード

```tsx
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const LazyAnimation = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',  // 100px手前で発火
  });

  return (
    <div ref={ref}>
      {isInView && children}
    </div>
  );
};
```

---

## 10. まとめ

アニメーションシステムの核心：

1. **Framer Motion** - React向け宣言的アニメーション
2. **GSAP ScrollTrigger** - 高度なスクロール連動
3. **スプリング物理** - 自然な動き
4. **Scrollytelling** - ストーリーテリング
5. **GPU最適化** - transform/opacity優先
6. **アクセシビリティ** - reduced-motion対応

### 依存関係

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0"
  }
}
```

### ユーティリティファイル構成

```
src/lib/
├── animation-utils.ts      # アニメーションプリセット
└── hooks/
    ├── useReducedMotion.ts # アクセシビリティ
    ├── useParallax.ts      # 視差効果
    └── useMousePosition.ts # マウス追従
```
