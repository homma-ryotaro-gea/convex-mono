# Backend Package

このパッケージは Convex を使用したバックエンド機能を提供します。monorepo 内の `admin`、`company`、`worker` アプリから共有されるバックエンドロジックを含んでいます。

## 概要

- **認証システム**: `@convex-dev/auth` を使用したパスワード認証
- **ロール管理**: `admin`、`worker`、`company` の3つのロールをサポート
- **プロファイル管理**: ユーザープロファイルと本人確認機能

## セットアップ

### 必要な環境変数

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
CONVEX_DEPLOY_KEY=your_deploy_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_SITE_URL=your_site_url
```

### 開発環境の起動

```bash
# ルートディレクトリから
pnpm dev

# または、このディレクトリから直接
cd packages/backend
pnpm dev
```

これにより Convex の開発サーバーが起動し、関数の変更が自動的に反映されます。

## プロジェクト構造

```
packages/backend/
├── convex/
│   ├── _generated/     # Convex が自動生成するファイル
│   ├── auth.ts         # 認証設定とプロバイダー
│   ├── auth.config.ts  # 認証設定
│   ├── schema.ts       # データベーススキーマ
│   ├── myFunctions.ts  # クエリ、ミューテーション、アクション
│   └── http.ts         # HTTP ルーター設定
├── package.json
└── README.md
```

## 認証システム

### 認証プロバイダー

現在、パスワード認証プロバイダーが設定されています：

```ts
// convex/auth.ts
Password({
  id: "password-custom",
  profile(params, _ctx) {
    return {
      email: params.email as string,
      role: params.role as "admin" | "worker" | "company",
    };
  },
})
```

### ロール

システムは以下の3つのロールをサポートしています：

- `admin`: 管理者
- `worker`: ワーカー
- `company`: 企業

### ユーザープロファイル

新規ユーザー作成時に自動的にプロファイルが作成されます：

- `isVerified`: 本人確認済みかどうか
- `isOnboarded`: オンボーディング済みかどうか
- `birthday`: 生年月日
- `address`: 住所
- `postalCode`: 郵便番号
- `addressDetail`: 住所詳細（マンション名など）

## データベーススキーマ

### テーブル

- **users**: ユーザー情報（認証テーブルを含む）
- **profiles**: ユーザープロファイル情報
- **numbers**: サンプルデータテーブル

詳細は `convex/schema.ts` を参照してください。

## Convex 関数の書き方

### Query（クエリ）

データベースからデータを読み取る関数：

```ts
// convex/myFunctions.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const myQueryFunction = query({
  args: {
    first: v.number(),
    second: v.string(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db.query("tablename").collect();
    return documents;
  },
});
```

React コンポーネントでの使用：

```ts
const data = useQuery(api.myFunctions.myQueryFunction, {
  first: 10,
  second: "hello",
});
```

### Mutation（ミューテーション）

データベースにデータを書き込む関数：

```ts
// convex/myFunctions.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const myMutationFunction = mutation({
  args: {
    first: v.string(),
    second: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", {
      body: args.first,
      author: args.second,
    });
    return await ctx.db.get("messages", id);
  },
});
```

React コンポーネントでの使用：

```ts
const mutation = useMutation(api.myFunctions.myMutationFunction);
function handleButtonPress() {
  mutation({ first: "Hello!", second: "me" });
}
```

### Action（アクション）

外部 API を呼び出したり、npm パッケージを使用する関数：

```ts
// convex/myFunctions.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const myAction = action({
  args: {
    first: v.number(),
    second: v.string(),
  },
  handler: async (ctx, args) => {
    // 外部 API を呼び出す
    const response = await ctx.fetch("https://api.example.com");
    const data = await response.json();

    // Convex クエリを実行
    const queryResult = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
    });

    // Convex ミューテーションを実行
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});
```

## デプロイ

### GitHub Actions による自動デプロイ

`main` ブランチへのプッシュ時に、`packages/backend/**` に変更があると自動的にデプロイされます。

### 手動デプロイ

```bash
cd packages/backend
npx convex deploy
```

環境変数 `CONVEX_DEPLOY_KEY` が設定されている必要があります。

## リンター

```bash
pnpm lint
```

## 参考資料

- [Convex ドキュメント](https://docs.convex.dev)
- [Convex Auth ドキュメント](https://github.com/get-convex/convex-auth)
- Convex CLI のヘルプ: `npx convex -h`
- ドキュメントの起動: `npx convex docs`
