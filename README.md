# Square CSV エクスポートツール

Square APIを使用してオーダー情報をCSV形式で出力するツールです。

## 機能

- Square APIからオーダー情報を取得
- 顧客情報と決済情報を含む詳細データの取得
- CSV形式でのデータエクスポート
- 日付範囲とオーダー状態でのフィルタリング

## 環境構築

### 前提条件

- [mise](https://mise.jdx.dev/) または [Bun](https://bun.sh/) がインストールされていること
  - miseを使用する場合：適当なバージョンで問題ありません
  - Bunを直接使用する場合：適当なバージョンで問題ありません（1.0以降推奨）

### セットアップ

1. リポジトリをクローン

```bash
git clone <repository-url>
cd squere-csv
```

2. ツールのインストール

**miseを使用する場合：**
```bash
mise install
```

**Bunを直接使用する場合：**
```bash
curl -fsSL https://bun.sh/install | bash
```

3. 依存関係をインストール

```bash
bun install
```

4. 環境変数を設定

`.env` ファイルを作成し、以下の環境変数を設定してください：

```env
SQUARE_ACCESS_TOKEN=your_square_access_token_here
SQUARE_LOCATION_ID=your_square_location_id_here
```

### Square API の設定

1. [Square Developer Dashboard](https://developer.squareup.com/apps) にアクセス
2. アプリケーションを作成またはすでに作成済みのものを選択
3. 以下の情報を取得：
   - **Access Token**: アプリケーションの「Production」または「Sandbox」タブから取得
   - **Location ID**: Square ダッシュボードまたは Locations API から取得

## 使用方法

### 基本実行

```bash
bun run start
```

または

```bash
npm run start
```

実行すると、現在の日時をファイル名に含むCSVファイル（例: `orders_2025-01-15T10-30-00.csv`）が生成されます。

### 出力データ

CSVファイルには以下の情報が含まれます：

- **id**: オーダーID
- **state**: オーダー状態
- **amount**: 金額
- **currency**: 通貨
- **created_at**: 作成日時
- **closed_at**: 完了日時
- **reference_id**: 参照ID
- **source_name**: 注文元
- **customer_id**: 顧客ID
- **customer_given_name**: 顧客名（名）
- **customer_family_name**: 顧客名（姓）
- **customer_email**: 顧客メールアドレス
- **customer_phone**: 顧客電話番号

### デフォルト設定

- **期間**: 過去2ヶ月間のオーダー
- **状態**: OPEN状態のオーダーのみ
- **出力先**: プロジェクトルートディレクトリ

## 開発

### コード品質チェック

```bash
bun run check
```

Biome を使用してコードの品質チェックとフォーマットを実行します。

### プロジェクト構造

```
src/
├── index.ts          # メインエントリーポイント
├── getOrders.ts      # オーダー取得機能
├── getCustomer.ts    # 顧客情報取得機能
└── getPayments.ts    # 決済情報取得機能
```
