# poker

## ディレクトリ構成
```
.
└── Poker/
    ├── client # Expoクライアント側のコード
    │   ├── assets            # 画像、アイコン、フォントなど
    │   ├── components        # 再利用可能なReactコンポーネント
    │   ├── screens           # アプリの画面ごとのコンポーネント
    │   ├── hooks             # カスタムフック
    │   ├── services          # API呼び出しやWebSocket接続などの処理
    │   ├── contexts          # 状態管理用（React Contextや状態管理のためのコード）
    │   ├── App.js            # アプリのエントリーポイント
    │   └── package.json      # Expoの設定ファイル
    ├── server # サーバー側のコード（APIやWebSocketなど）
    │   ├── controllers       # APIのエンドポイントを処理するロジック
    │   ├── models            # ゲームのモデル（プレイヤー、ゲーム状態など）
    │   ├── routes            # APIのルーティング設定
    │   ├── services          # ゲームロジック（ポーカーのロジックなど）
    │   ├── utils             # ヘルパー関数やユーティリティ
    │   ├── config            # 環境設定（DB設定、認証設定など）
    │   ├── middlewares       # ミドルウェア（認証やログなど）
    │   ├── app.js            # サーバーのエントリーポイント
    │   └── package.json      # サーバーの設定ファイル
    ├── common # クライアントとサーバーで共通のコード（モデル、型定義、ユーティリティ）
    ├── assets # 画像、フォントなどの静的ファイル
    └── package.json # ルートの設定ファイル（共通の依存関係）
```