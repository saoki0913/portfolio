# コンポーネント設計

## 1. ボタン

### 1.1 プライマリボタン

```tsx
// Radix UI + CVA パターン
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  // ベーススタイル
  `inline-flex items-center justify-center
   rounded-xl font-medium
   transition-all duration-300
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-r from-primary to-secondary
          text-white
          hover:shadow-lg hover:shadow-primary/25
          hover:-translate-y-0.5
          active:translate-y-0
        `,
        secondary: `
          bg-white/5 border border-white/10
          text-foreground
          hover:bg-white/10 hover:border-white/20
          backdrop-blur-sm
        `,
        ghost: `
          bg-transparent
          text-foreground
          hover:bg-white/5
        `,
        outline: `
          border border-border
          bg-transparent
          hover:bg-card hover:border-primary/50
        `,
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
```

### 1.2 マグネティックボタン（ホバー効果）

```tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // マグネット効果（最大8px移動）
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="btn-primary"
    >
      {children}
    </motion.button>
  );
};
```

---

## 2. Bento Gridカード

### 2.1 基本Bentoカード

```tsx
// サイズバリアント
type BentoSize = 'small' | 'medium' | 'large' | 'hero';

const bentoSizeClasses: Record<BentoSize, string> = {
  small: 'col-span-1 row-span-1',           // 1x1
  medium: 'col-span-1 row-span-2',          // 1x2
  large: 'col-span-2 row-span-1',           // 2x1
  hero: 'col-span-2 row-span-2',            // 2x2
};

interface BentoCardProps {
  size?: BentoSize;
  children: React.ReactNode;
  className?: string;
}

export const BentoCard = ({
  size = 'small',
  children,
  className
}: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4 }}
    className={cn(
      'glass-panel rounded-2xl p-6',
      'transition-all duration-300',
      'hover:shadow-lg hover:shadow-primary/10',
      'group',
      bentoSizeClasses[size],
      className
    )}
  >
    {children}
  </motion.div>
);
```

### 2.2 Glassmorphismカード

```tsx
// ガラス質カードのバリエーション
const glassVariants = {
  // 標準ガラス
  default: `
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    rounded-2xl
  `,
  // 強めのガラス
  frosted: `
    bg-white/10
    backdrop-blur-2xl
    border border-white/20
    rounded-2xl
  `,
  // 上部ハイライト
  glossy: `
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    border-t-white/20
    rounded-2xl
  `,
};

// 使用例
<div className="glass-panel">
  <h3 className="text-xl font-bold text-foreground">Glass Card</h3>
  <p className="text-subtle">Glassmorphism effect with backdrop blur</p>
</div>
```

### 2.3 インタラクティブBentoカード

```tsx
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const InteractiveBentoCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // 3D回転効果
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  // グラデーション光沢効果の位置
  const gradientX = useTransform(x, [0, 1], ['0%', '100%']);
  const gradientY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden"
    >
      {/* 光沢効果オーバーレイ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${gradientX} ${gradientY}, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};
```

---

## 3. フォーム要素

### 3.1 テキスト入力

```tsx
// フローティングラベル付き入力
export const FloatingInput = ({
  label,
  id,
  ...props
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <input
      id={id}
      placeholder=" "
      className="
        peer w-full
        bg-white/5 border border-border
        rounded-xl px-4 pt-6 pb-2
        text-foreground
        placeholder-transparent
        focus:outline-none focus:border-primary
        focus:ring-2 focus:ring-primary/20
        transition-all duration-200
      "
      {...props}
    />
    <label
      htmlFor={id}
      className="
        absolute left-4 top-4
        text-subtle text-base
        pointer-events-none
        transition-all duration-200
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs
      "
    >
      {label}
    </label>
  </div>
);
```

### 3.2 テキストエリア

```tsx
export const FloatingTextarea = ({
  label,
  id,
  ...props
}: { label: string; id: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="relative">
    <textarea
      id={id}
      placeholder=" "
      className="
        peer w-full min-h-[120px]
        bg-white/5 border border-border
        rounded-xl px-4 pt-8 pb-4
        text-foreground
        placeholder-transparent
        resize-none
        focus:outline-none focus:border-primary
        focus:ring-2 focus:ring-primary/20
        transition-all duration-200
      "
      {...props}
    />
    <label
      htmlFor={id}
      className="
        absolute left-4 top-4
        text-subtle text-base
        pointer-events-none
        transition-all duration-200
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs
      "
    >
      {label}
    </label>
  </div>
);
```

---

## 4. ナビゲーション

### 4.1 ヘッダー（Glassmorphism）

```tsx
'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled && 'bg-background/80 backdrop-blur-xl border-b border-border'
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-foreground">
          Portfolio
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {['About', 'Works', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="
                  text-subtle hover:text-foreground
                  transition-colors duration-200
                  relative
                  after:absolute after:bottom-0 after:left-0
                  after:w-0 after:h-0.5
                  after:bg-primary
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};
```

---

## 5. バッジ・タグ

### 5.1 ステータスバッジ

```tsx
const statusVariants = {
  online: 'bg-success/20 text-success border-success/30',
  offline: 'bg-muted/20 text-muted border-muted/30',
  busy: 'bg-warning/20 text-warning border-warning/30',
};

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy';
  label: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => (
  <span className={cn(
    'inline-flex items-center gap-2 px-3 py-1.5',
    'rounded-full border text-sm',
    statusVariants[status]
  )}>
    {status === 'online' && (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
    )}
    {label}
  </span>
);
```

### 5.2 技術タグ

```tsx
export const TechTag = ({
  name,
  color = 'primary'
}: {
  name: string;
  color?: 'primary' | 'secondary' | 'accent'
}) => {
  const colorClasses = {
    primary: 'hover:border-primary/50 hover:bg-primary/5',
    secondary: 'hover:border-secondary/50 hover:bg-secondary/5',
    accent: 'hover:border-accent/50 hover:bg-accent/5',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'px-4 py-2 text-sm text-subtle',
        'bg-card border border-border rounded-full',
        'transition-colors cursor-default',
        colorClasses[color]
      )}
    >
      {name}
    </motion.span>
  );
};
```

---

## 6. ローディング状態

### 6.1 スケルトンローダー

```tsx
export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'animate-pulse rounded-lg bg-white/5',
      className
    )}
    {...props}
  />
);

// Bentoカード用スケルトン
export const BentoSkeleton = () => (
  <div className="glass-panel rounded-2xl p-6 space-y-4">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-8 w-2/3" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  </div>
);
```

### 6.2 初回ロードアニメーション

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const InitialLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        {/* ロゴまたは名前 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-foreground mb-8"
        >
          Portfolio
        </motion.h1>

        {/* プログレスバー */}
        <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* パーセンテージ */}
        <p className="mt-4 text-sm text-subtle font-mono">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
};
```

---

## 7. アイコン統合

### 7.1 Lucide Reactアイコン

```tsx
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Brain,
  Database,
  Layers,
  Cpu,
  Zap,
} from 'lucide-react';

// アイコンマッピング（API連携用）
export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'arrow-right': ArrowRight,
  'external-link': ExternalLink,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  'map-pin': MapPin,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  code2: Code2,
  brain: Brain,
  database: Database,
  layers: Layers,
  cpu: Cpu,
  zap: Zap,
};

// 使用例
interface IconProps {
  name: keyof typeof iconMap;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};
```

---

## 8. まとめ

コンポーネント設計の核心：

1. **CVA (Class Variance Authority)** - バリアント管理の標準化
2. **Glassmorphism** - 深度と質感の表現
3. **Micro-interactions** - 磁気ボタン、3Dカード回転
4. **フローティングラベル** - モダンなフォーム体験
5. **スケルトンUI** - 知覚パフォーマンス向上
6. **Lucide React** - 一貫したアイコンシステム

### 依存関係

```json
{
  "dependencies": {
    "@radix-ui/react-*": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```
