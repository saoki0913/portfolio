# Claude Code MCP サーバー設定完了ガイド

## ✅ 設定完了確認

MCPサーバーの設定が完了しました！以下の設定がされています：

### 設定済みMCPサーバー

| サービス | 状態 | 環境変数 | 説明 |
|---------|------|---------|------|
| **GitHub** | ✅ 設定済み | `GITHUB_PERSONAL_ACCESS_TOKEN` | リポジトリ操作、Issue、PR管理 |
| **Supabase** | ✅ 設定済み | `SUPABASE_ACCESS_TOKEN` | データベース、認証、ストレージ管理 |
| **Render** | ✅ 設定済み | `RENDER_API_KEY` | デプロイ、サービス管理 |
| **Vercel** | ⚠️ 要設定 | `VERCEL_TOKEN` | デプロイ、プロジェクト管理 |

## 📁 設定ファイル

### `.mcp.json`（プロジェクトルート）
```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN=${GITHUB_PERSONAL_ACCESS_TOKEN}",
        "ghcr.io/github/github-mcp-server",
        "stdio", "--read-only", "--toolsets=default"
      ]
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp-server"],
      "env": {
        "VERCEL_TOKEN": "${VERCEL_TOKEN}"
      }
    },
    "render": {
      "url": "https://mcp.render.com/mcp",
      "headers": {
        "Authorization": "Bearer ${RENDER_API_KEY}"
      }
    }
  }
}
```

### `.env`（プロジェクトルート）
```bash
GITHUB_PERSONAL_ACCESS_TOKEN=<設定済み>
SUPABASE_ACCESS_TOKEN=<設定済み>
RENDER_API_KEY=<設定済み>
# VERCEL_TOKEN=<未設定>
```

## 🚀 次のステップ

### 1. Claude Codeの再起動

設定を反映するために、Claude Codeを再起動してください：

```bash
# 現在のセッションを終了（Ctrl+D または exit）
# 再度起動
claude code
```

### 2. Vercelトークンの追加（オプション）

Vercelを使用する場合は、以下の手順でトークンを追加してください：

#### トークン取得
1. [Vercel Dashboard > Settings > Tokens](https://vercel.com/account/tokens) にアクセス
2. "Create Token" をクリック
3. トークン名を入力（例: "Claude Code MCP"）
4. "Full Access" を選択
5. トークンをコピー

#### .envに追加
```bash
echo "VERCEL_TOKEN=your_vercel_token_here" >> .env
```

#### 再起動
```bash
# Claude Codeを再起動
exit
claude code
```

### 3. MCPサーバーの動作確認

Claude Code内で以下のようなコマンドを試して、MCPサーバーが正しく動作しているか確認してください：

#### GitHub操作例
```
「このリポジトリのissueを取得して」
「新しいブランチを作成して」
```

#### Supabase操作例
```
「Supabaseのテーブル一覧を表示して」
「新しいテーブルを作成して」
```

#### Render操作例
```
「Renderのサービス一覧を表示して」
「デプロイステータスを確認して」
```

#### Vercel操作例（トークン設定後）
```
「Vercelのプロジェクト一覧を表示して」
「デプロイ履歴を確認して」
```

## 🛠️ トラブルシューティング

### MCPサーバーが認識されない場合

1. **環境変数の確認**
   ```bash
   # プロジェクトルートで
   cat .env
   ```

2. **Dockerの確認**（GitHub MCPサーバー用）
   ```bash
   docker --version
   docker pull ghcr.io/github/github-mcp-server
   ```

3. **Node.jsの確認**（Supabase, Vercel MCPサーバー用）
   ```bash
   node --version
   npx --version
   ```

### 権限エラーが発生する場合

1. **トークンのスコープ確認**
   - GitHub: `repo`, `workflow`, `write:packages` など
   - Supabase: Management API access
   - Render: API access
   - Vercel: Full access または適切なスコープ

2. **トークンの有効期限確認**
   - 期限切れの場合は再発行

### Docker関連エラーの場合

1. **Dockerデーモンの起動確認**
   ```bash
   docker ps
   ```

2. **イメージの手動プル**
   ```bash
   docker pull ghcr.io/github/github-mcp-server
   ```

## 📚 参考リンク

- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [MCP Server Specification](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Supabase MCP Server](https://github.com/supabase/mcp-server-supabase)

## 🔒 セキュリティ注意事項

- ✅ `.env`ファイルは`.gitignore`に含まれています
- ✅ トークンは絶対にGitにコミットしないでください
- ✅ トークンは定期的にローテーションしてください
- ✅ 不要になったトークンは無効化してください

---

**設定完了！これでClaude CodeからSupabase、Render、GitHub、Vercelを直接操作できるようになりました。**
