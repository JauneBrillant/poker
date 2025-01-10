# poker

## 基本ディレクトリ構成
/poker
|-- /client         # Expoクライアント側のコード
|-- /server         # サーバー側のコード（APIやWebSocketなど）
|-- /common         # クライアントとサーバーで共通のコード（モデル、型定義、ユーティリティ）
|-- /assets         # 画像、フォントなどの静的ファイル
|-- package.json    # ルートの設定ファイル（共通の依存関係）

/client
|-- /assets            # 画像、アイコン、フォントなど
|-- /components        # 再利用可能なReactコンポーネント
|-- /screens           # アプリの画面ごとのコンポーネント
|-- /hooks             # カスタムフック
|-- /services          # API呼び出しやWebSocket接続などの処理
|-- /contexts          # 状態管理用（React Contextや状態管理のためのコード）
|-- App.js             # アプリのエントリーポイント
|-- package.json       # Expoの設定ファイル

/server
|-- /controllers       # APIのエンドポイントを処理するロジック
|-- /models            # ゲームのモデル（プレイヤー、ゲーム状態など）
|-- /routes            # APIのルーティング設定
|-- /services          # ゲームロジック（ポーカーのロジックなど）
|-- /utils             # ヘルパー関数やユーティリティ
|-- /config            # 環境設定（DB設定、認証設定など）
|-- /middlewares       # ミドルウェア（認証やログなど）
|-- app.js             # サーバーのエントリーポイント
|-- package.json       # サーバーの設定ファイル

/common
|-- /models            # 共通のデータモデル（ゲーム状態、プレイヤー情報など）
|-- /types             # TypeScriptを使っている場合の型定義
|-- /utils             # クライアント・サーバー両方で使えるユーティリティ関数
|-- /constants         # 定数の管理（ゲームのルールや設定など）