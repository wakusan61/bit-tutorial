# BitTutorial

([TypeScript]モノレポ管理ツール比較検討)[https://zenn.dev/okmttdhr/articles/96506133e4efa0]
→ ここ見る感じだと Rush とか Nx のほうがよさげ？

(公式)[https://bit.dev/docs/intro/]

Bit は、コンポーザブル・ソフトウェアのためのビルド・システムだ。独立してバージョン管理されたコンポーネントから、シームレスかつ高速にアプリケーションを構築することができる。

## モノレポの記事に従ってやってみた

(ビットでモノレポの依存関係を簡単に管理)[https://bit.dev/blog/painless-monorepo-dependency-management-with-bit-l4f9fzyw/?utm_source=pnpm&utm_medium=workspace_page]

bit インストール

```
npx @teambit/bvm install
```

bit 初期化

```
bit init
```

bit でパッケージを新規作成

```
-- 現在のバージョンでは以下は動かない
-- bit create node lib
bit create module lib
```

`my-scope/lib/lib.ts` を以下に編集

```typescript
import R from 'ramda';

export function lib() {
  return 'Hello world!';
}
```

bit の依存関係をみる

```
bit status
```

エラー

```
components with issues (1)
(fix the issues according to the suggested solution)

     > my-scope/lib ...  issues found
       missing packages or links from node_modules to the source  (run "bit install --add-missing-deps" to fix both issues):
          lib.ts -> ramda
```

ramda をインストール

```
bit install ramda
```

依存関係を可視化

```
bit show lib
```

```
┌──────────────────┬───────────────────────────────────────────┐
│ id               │ my-scope/lib                              │
├──────────────────┼───────────────────────────────────────────┤
│ scope            │ my-scope                                  │
├──────────────────┼───────────────────────────────────────────┤
│ name             │ lib                                       │
├──────────────────┼───────────────────────────────────────────┤
│ env              │ bitdev.node/node-env@1.0.15               │
├──────────────────┼───────────────────────────────────────────┤
│ package name     │ @my-scope/lib                             │
├──────────────────┼───────────────────────────────────────────┤
│ deprecated       │ false                                     │
├──────────────────┼───────────────────────────────────────────┤
│ main file        │ index.ts                                  │
├──────────────────┼───────────────────────────────────────────┤
│ files            │ index.ts                                  │
│                  │ lib.docs.mdx                              │
│                  │ lib.spec.ts                               │
│                  │ lib.ts                                    │
├──────────────────┼───────────────────────────────────────────┤
│ dev files        │ lib.spec.ts (teambit.defender/tester)     │
│                  │ lib.docs.mdx (teambit.docs/docs)          │
├──────────────────┼───────────────────────────────────────────┤
│ aspects          │ bitdev.node/node-env@1.0.15               │
│                  │ teambit.component/dev-files               │
│                  │ teambit.compositions/compositions         │
│                  │ teambit.dependencies/dependency-resolver  │
│                  │ teambit.docs/docs                         │
│                  │ teambit.envs/envs                         │
│                  │ teambit.harmony/application               │
│                  │ teambit.pkg/pkg                           │
│                  │ teambit.preview/preview                   │
├──────────────────┼───────────────────────────────────────────┤
│ dependencies     │ ramda@^0.29.1- (package)                  │
├──────────────────┼───────────────────────────────────────────┤
│ dev dependencies │ @bitdev/node.node-env@1.0.15- (component) │
└──────────────────┴───────────────────────────────────────────┘
```

lib.ts をもう一度編集し、ramda の import 文を削除

```
export function lib() {
  return 'Hello world!';
}
```

何もしなくても依存関係を bit が解決してくれている

```
bit show lib
```

```
┌──────────────────┬───────────────────────────────────────────┐
│ id               │ my-scope/lib                              │
├──────────────────┼───────────────────────────────────────────┤
│ scope            │ my-scope                                  │
├──────────────────┼───────────────────────────────────────────┤
│ name             │ lib                                       │
├──────────────────┼───────────────────────────────────────────┤
│ env              │ bitdev.node/node-env@1.0.15               │
├──────────────────┼───────────────────────────────────────────┤
│ package name     │ @my-scope/lib                             │
├──────────────────┼───────────────────────────────────────────┤
│ deprecated       │ false                                     │
├──────────────────┼───────────────────────────────────────────┤
│ main file        │ index.ts                                  │
├──────────────────┼───────────────────────────────────────────┤
│ files            │ index.ts                                  │
│                  │ lib.docs.mdx                              │
│                  │ lib.spec.ts                               │
│                  │ lib.ts                                    │
├──────────────────┼───────────────────────────────────────────┤
│ dev files        │ lib.spec.ts (teambit.defender/tester)     │
│                  │ lib.docs.mdx (teambit.docs/docs)          │
├──────────────────┼───────────────────────────────────────────┤
│ aspects          │ bitdev.node/node-env@1.0.15               │
│                  │ teambit.component/dev-files               │
│                  │ teambit.compositions/compositions         │
│                  │ teambit.dependencies/dependency-resolver  │
│                  │ teambit.docs/docs                         │
│                  │ teambit.envs/envs                         │
│                  │ teambit.harmony/application               │
│                  │ teambit.pkg/pkg                           │
│                  │ teambit.preview/preview                   │
├──────────────────┼───────────────────────────────────────────┤
│ dependencies     │ ramda@^0.29.1- (package)                  │
├──────────────────┼───────────────────────────────────────────┤
│ dev dependencies │ @bitdev/node.node-env@1.0.15- (component) │
└──────────────────┴───────────────────────────────────────────┘
Yusuke@wakusan bit-tutorial % bit show lib
┌──────────────────┬───────────────────────────────────────────┐
│ id               │ my-scope/lib                              │
├──────────────────┼───────────────────────────────────────────┤
│ scope            │ my-scope                                  │
├──────────────────┼───────────────────────────────────────────┤
│ name             │ lib                                       │
├──────────────────┼───────────────────────────────────────────┤
│ env              │ bitdev.node/node-env@1.0.15               │
├──────────────────┼───────────────────────────────────────────┤
│ package name     │ @my-scope/lib                             │
├──────────────────┼───────────────────────────────────────────┤
│ deprecated       │ false                                     │
├──────────────────┼───────────────────────────────────────────┤
│ main file        │ index.ts                                  │
├──────────────────┼───────────────────────────────────────────┤
│ files            │ index.ts                                  │
│                  │ lib.docs.mdx                              │
│                  │ lib.spec.ts                               │
│                  │ lib.ts                                    │
├──────────────────┼───────────────────────────────────────────┤
│ dev files        │ lib.spec.ts (teambit.defender/tester)     │
│                  │ lib.docs.mdx (teambit.docs/docs)          │
├──────────────────┼───────────────────────────────────────────┤
│ aspects          │ bitdev.node/node-env@1.0.15               │
│                  │ teambit.component/dev-files               │
│                  │ teambit.compositions/compositions         │
│                  │ teambit.dependencies/dependency-resolver  │
│                  │ teambit.docs/docs                         │
│                  │ teambit.envs/envs                         │
│                  │ teambit.harmony/application               │
│                  │ teambit.pkg/pkg                           │
│                  │ teambit.preview/preview                   │
├──────────────────┼───────────────────────────────────────────┤
│ dev dependencies │ @bitdev/node.node-env@1.0.15- (component) │
└──────────────────┴───────────────────────────────────────────┘
```

## bit の仕組み

pnpm か Yarn のどちらかを使用して、Bit は package.json ファイルを動的に生成し、プログラム API を使ってパッケージマネージャに直接渡します。これは(依存性リゾルバ)[https://bit.cloud/teambit/dependencies/dependency-resolver]という側面で処理される。
デフォルトでは pmpm を利用している。
