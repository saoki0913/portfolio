# パフォーマンス最適化

## 概要
Lighthouseスコアを改善し、高速なサイトにします。

## プロンプト

```
/ralph-loop "ポートフォリオサイトのパフォーマンスを最適化して。

## タスク
Lighthouseスコアを改善し、高速なサイトにする。

## 最適化項目
1. 画像最適化（Next.js Image、WebP変換）
2. フォント最適化（サブセット化、display: swap）
3. コード分割（dynamic import）
4. 不要なJSの削除
5. CSSの最適化
6. キャッシュ戦略

## プロセス
1. npm run build を実行
2. Lighthouseでスコア確認
3. 最もスコアが低い項目を特定
4. 修正を実施
5. 再度ビルド＆確認
6. 繰り返し

## 成功基準
- [ ] Performance: 90以上
- [ ] Accessibility: 90以上
- [ ] Best Practices: 90以上
- [ ] SEO: 90以上
- [ ] ビルドエラーがない

## 15イテレーション後も90未達の場合
- 現在のスコアを記録
- ボトルネックを特定
- 追加で必要な作業をリストアップ

完了したら <promise>PERFORMANCE_OPTIMIZED</promise> と出力。" --max-iterations 20 --completion-promise "PERFORMANCE_OPTIMIZED"
```

## 期待される成果物
- 最適化された画像設定
- フォント読み込みの改善
- バンドルサイズの削減
