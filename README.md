# Convex Monorepo サンプルプロジェクト

このプロジェクトは、モノレポ構成を使用したサンプルプロジェクトです。複数のNext.jsアプリケーションと共有パッケージを管理するための構成例として作成されています。

## 📋 プロジェクト概要

このモノレポは以下の技術スタックを使用しています：

- **パッケージマネージャー**: pnpm (workspace)
- **ビルドシステム**: Turborepo
- **フロントエンド**: Next.js 16
- **バックエンド**: Convex
- **認証**: Convex Auth
- **UI**: React 19 + Tailwind CSS + shadcn/ui
- **言語**: TypeScript

## 🏗️ プロジェクト構造

```
convex-mono/
├── apps/                    # アプリケーション
│   ├── admin/              # 管理者向けアプリ (ポート: 5001)
│   ├── company/           # 企業向けアプリ (ポート: 4001)
│   └── worker/            # ワーカー向けアプリ
├── packages/               # 共有パッケージ
│   ├── backend/           # Convexバックエンド
│   ├── ui/                # 共有UIコンポーネント
│   ├── eslint-config/     # 共有ESLint設定
│   └── typescript-config/ # 共有TypeScript設定
└── turbo.json             # Turborepo設定
```

## 🚀 セットアップ

### 前提条件

- Node.js >= 20
- pnpm >= 10.4.1

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 環境変数の設定

各アプリケーションで必要な環境変数を設定してください。Convexの設定については、各アプリのディレクトリを参照してください。

## 💻 開発コマンド

### すべてのアプリケーションを開発モードで起動

```bash
pnpm dev
```

### 特定のアプリケーションのみ起動

```bash
# adminアプリのみ
cd apps/admin
pnpm dev

# companyアプリのみ
cd apps/company
pnpm dev

# workerアプリのみ
cd apps/worker
pnpm dev
```

### バックエンドの開発

```bash
cd packages/backend
pnpm dev
```

### ビルド

```bash
pnpm build
```

### リント

```bash
pnpm lint
```

### コードフォーマット

```bash
pnpm format
```

## 📦 パッケージの説明

### Apps

- **admin**: 管理者向けのNext.jsアプリケーション（ポート: 5001）
- **company**: 企業向けのNext.jsアプリケーション（ポート: 4001）
- **worker**: ワーカー向けのNext.jsアプリケーション

### Packages

- **@workspace/backend**: Convexバックエンド（認証、スキーマ、関数を含む）
- **@workspace/ui**: 共有UIコンポーネントライブラリ（shadcn/uiベース）
- **@workspace/eslint-config**: 共有ESLint設定
- **@workspace/typescript-config**: 共有TypeScript設定

## 🔐 認証

このプロジェクトは Convex Auth を使用して認証機能を実装しています。ユーザーには以下のロールが設定可能です：

- `admin`: 管理者
- `worker`: ワーカー
- `company`: 企業

## 🛠️ 技術スタック詳細

- **Next.js**: 16.0.10
- **React**: 19.2.1
- **Convex**: 1.31.0
- **Convex Auth**: 0.0.90
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.17
- **Turborepo**: 2.6.3

## 📝 ライセンス

このプロジェクトはサンプルプロジェクトです。

