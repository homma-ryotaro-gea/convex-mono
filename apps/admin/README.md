# Admin アプリケーション

管理者向けのサンプルアプリケーションです。このアプリケーションは、モノレポ構成の Convex + Next.js プロジェクトの一部として作成されています。

## 📋 概要

このアプリケーションは、管理者向けのダッシュボードや管理機能を提供するサンプルアプリケーションです。

- **ポート**: 5001
- **フレームワーク**: Next.js 16
- **バックエンド**: Convex
- **認証**: Convex Auth（`admin` ロール）

## 🚀 セットアップ

### 前提条件

- Node.js >= 20
- pnpm >= 10.4.1

### インストール

ルートディレクトリから依存関係をインストールします：

```bash
# ルートディレクトリから
pnpm install
```

### 環境変数の設定

`.env.local` ファイルを作成し、Convex の設定を追加してください：

```env
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

## 💻 開発

### 開発サーバーの起動

ルートディレクトリからすべてのアプリケーションを起動：

```bash
pnpm dev
```

このアプリケーションのみを起動する場合：

```bash
cd apps/admin
pnpm dev
```

アプリケーションは `http://localhost:5001` で起動します。

### ビルド

```bash
pnpm build
```

### 本番環境での起動

```bash
pnpm start
```

## 🏗️ プロジェクト構造

```
apps/admin/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── signin/            # サインインページ
│   └── account-confirm/   # アカウント確認ページ
├── components/            # React コンポーネント
│   ├── ConvexClientProvider.tsx
│   └── providers.tsx
└── package.json
```

## 🔐 認証

このアプリケーションは Convex Auth を使用して認証機能を実装しています。

- **ロール**: `admin`
- 認証設定は `packages/backend/convex/auth.ts` で管理されています

## 📦 依存関係

- **@workspace/backend**: 共有バックエンドパッケージ
- **@workspace/ui**: 共有UIコンポーネントライブラリ
- **@convex-dev/auth**: Convex Auth ライブラリ
- **next-themes**: テーマ管理

## 📚 参考資料

- [Convex ドキュメント](https://docs.convex.dev)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [Convex Auth ドキュメント](https://github.com/get-convex/convex-auth)
