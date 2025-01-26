import React, { useState } from "react";
import { DimensionValue } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createLobby, findLobby } from "@services/http"; // HTTPリクエスト用の関数
import { CreateLobbyRequest, FindLobbyRequest } from "@common/types"; // ロビー作成リクエストの型定義
import { Redo } from "@tamagui/lucide-icons"; // アイコンのインポート（未使用のため削除可能）
import { View, Text, Button, Input } from "tamagui";

export const HomeScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [existLobby, setExistLobby] = useState<boolean | null>(null);
  // ナビゲーション用のフック
  const navigation = useNavigation<NavigationProp<any, "Home">>();

  // ロビー作成リクエストのデータ（ホスト名）
  const requestData: CreateLobbyRequest = {
    hostName: "test",
  };

  // ロビー作成ボタンが押された時の処理
  const handleClickCreateLobby = async () => {
    const lobbyId = await createLobby(requestData);
    console.log(lobbyId);
  };

  const handleClickFindLobby = async (lobbyId: string) => {
    console.log(lobbyId);
    // const existLobby = await findLobby(lobbyId);
    const existLobby = false;
    setExistLobby(existLobby);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Texas Holdem</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={handleClickCreateLobby}>ロビーを作成</Button>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.text}>ロビーを探す</Text>
        <Input
          style={styles.textInput}
          placeholder={"lobby ID Here"}
          placeholderTextColor="rgb(150, 150, 150)"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button onPress={() => handleClickFindLobby(inputValue)}>
          ロビーを探す
        </Button>
        <Text style={styles.text}>
          {existLobby === null
            ? ""
            : existLobby
            ? "ロビーがありました"
            : "ロビーがありません"}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  // 画面全体のスタイル
  container: {
    flex: 1, // 画面全体を埋める
    backgroundColor: "rgb(240, 238, 181)", // 背景色
    padding: 20, // 内側の余白
  },
  // タイトルのスタイル
  title: {
    fontFamily: "x10y12pxDonguriDuel", // フォント指定（カスタムフォント）
    fontSize: 70, // フォントサイズ
    color: "rgb(44, 189, 156)", // 文字色
    textAlign: "center" as "center", // 文字の中央揃え
    marginTop: 170, // 上の余白
    marginBottom: 70, // 下の余白
  },
  // ボタンのコンテナ（現在は空のスタイル）
  buttonContainer: {},

  // テキスト入力部分のスタイル
  textInput: {
    width: "100%" as DimensionValue, // 幅を100%に設定
    height: 40, // 高さを40pxに設定
    paddingHorizontal: 10, // 横方向のパディング
    borderWidth: 1, // 枠線の太さ
    borderColor: "rgb(161, 161, 161)", // 枠線の色
    borderRadius: 4, // 角の丸み
    backgroundColor: "rgb(255, 255, 255)", // 背景色
    textAlign: "center" as "center", // 文字を中央揃え
  },

  // 「ロビーを探す」テキストのスタイル
  text: {
    color: "rgb(0, 0, 0)", // 文字色（黒）
    fontWeight: "bold" as "bold", // 太字
    textAlign: "left" as "left", // 左揃え
    marginTop: 20, // 上の余白
  },
};
