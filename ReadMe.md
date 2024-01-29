# BitTutorial

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
