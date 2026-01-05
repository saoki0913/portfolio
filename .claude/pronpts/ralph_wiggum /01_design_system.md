# デザインシステム構築

## 概要
UI UX Pro Max Skillを活用して、一貫性のあるデザインシステムを構築します。

## プロンプト

```
/ralph-loop "ポートフォリオサイトのデザインシステムを構築して。

## タスク
UI UX Pro Max Skillを活用して、一貫性のあるデザインシステムを作成する。

## 要件
- カラーパレット（プライマリ、セカンダリ、アクセント、グレースケール）
- タイポグラフィ（見出し、本文、キャプション）
- スペーシングシステム（4px基準のスケール）
- ボーダー半径、シャドウの定義
- ダークモード対応

## 成功基準
- [ ] tailwind.config.js にデザイントークンが定義されている
- [ ] globals.css にCSS変数が設定されている
- [ ] ダークモード切り替えが動作する
- [ ] READMEにデザインシステムのドキュメントがある

## 15イテレーション後も未完了の場合
- 完了した項目をリストアップ
- ブロッキング要因を文書化
- 代替アプローチを提案

完了したら <promise>DESIGN_SYSTEM_DONE</promise> と出力。" --max-iterations 20 --completion-promise "DESIGN_SYSTEM_DONE"
```

## 期待される成果物
- `tailwind.config.js` - デザイントークン定義
- `app/globals.css` - CSS変数
- `docs/design-system.md` - ドキュメント（任意）
