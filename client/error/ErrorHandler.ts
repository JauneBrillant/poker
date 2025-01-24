import { CustomError } from "@error";

const formatError = (error: unknown): CustomError => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return {
    name: "UnknownError",
    message: "予期しないエラーが発生しました。",
  };
};

export const handleError = (error: unknown): CustomError => {
  const formattedError = formatError(error);

  if (formattedError.name === "CreateLobbyError") {
    return {
      name: formattedError.name,
      message: "ロビーの作成に失敗しました。",
    };
  }

  return {
    name: "UnknownError",
    message: "予期しないエラーが発生しました。",
  };
};
