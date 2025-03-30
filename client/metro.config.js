const path = require("node:path");

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  "@babel/runtime": path.resolve(__dirname, "node_modules/@babel/runtime"),
  "@common": path.resolve(__dirname, "../common"),
};

config.watchFolders = [path.resolve(__dirname, "../common")];

config.resolver.assetExts.push("ttf"); // フォントを扱うために拡張子を追加

module.exports = config;
