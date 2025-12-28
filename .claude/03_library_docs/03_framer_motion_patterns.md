# Framer Motion パターン

## 1. 基本アニメーション

### 1.1 フェードイン

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>
```

---

## 2. スクロール連動

### 2.1 useScroll

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

<motion.div style={{ opacity }}>
  Content
</motion.div>
```

---

## 3. パフォーマンス最適化

### 3.1 transform/opacity優先

```tsx
// 良い（GPU加速）
<motion.div animate={{ x: 100, opacity: 0.5 }} />

// 悪い（reflow発生）
<motion.div animate={{ width: '100px' }} />
```

### 3.2 useReducedMotion

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{ x: shouldReduceMotion ? 0 : 100 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
/>
```

---

## 4. まとめ

Framer Motionでスムーズなアニメーション。
パフォーマンスとアクセシビリティ重視。
