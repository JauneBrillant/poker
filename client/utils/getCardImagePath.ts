import type { Card } from "@common/types";
import type { ImageSourcePropType } from "react-native";

const cardImages: { [key: string]: ImageSourcePropType } = {
  heart_A: require("../assets/images/heart_1.png"),
  heart_2: require("../assets/images/heart_2.png"),
  heart_3: require("../assets/images/heart_3.png"),
  heart_4: require("../assets/images/heart_4.png"),
  heart_5: require("../assets/images/heart_5.png"),
  heart_6: require("../assets/images/heart_6.png"),
  heart_7: require("../assets/images/heart_7.png"),
  heart_8: require("../assets/images/heart_8.png"),
  heart_9: require("../assets/images/heart_9.png"),
  heart_10: require("../assets/images/heart_10.png"),
  heart_J: require("../assets/images/heart_11.png"),
  heart_Q: require("../assets/images/heart_12.png"),
  heart_K: require("../assets/images/heart_13.png"),

  club_A: require("../assets/images/club_1.png"),
  club_2: require("../assets/images/club_2.png"),
  club_3: require("../assets/images/club_3.png"),
  club_4: require("../assets/images/club_4.png"),
  club_5: require("../assets/images/club_5.png"),
  club_6: require("../assets/images/club_6.png"),
  club_7: require("../assets/images/club_7.png"),
  club_8: require("../assets/images/club_8.png"),
  club_9: require("../assets/images/club_9.png"),
  club_10: require("../assets/images/club_10.png"),
  club_J: require("../assets/images/club_11.png"),
  club_Q: require("../assets/images/club_12.png"),
  club_K: require("../assets/images/club_13.png"),

  spade_A: require("../assets/images/spade_1.png"),
  spade_2: require("../assets/images/spade_2.png"),
  spade_3: require("../assets/images/spade_3.png"),
  spade_4: require("../assets/images/spade_4.png"),
  spade_5: require("../assets/images/spade_5.png"),
  spade_6: require("../assets/images/spade_6.png"),
  spade_7: require("../assets/images/spade_7.png"),
  spade_8: require("../assets/images/spade_8.png"),
  spade_9: require("../assets/images/spade_9.png"),
  spade_10: require("../assets/images/spade_10.png"),
  spade_J: require("../assets/images/spade_11.png"),
  spade_Q: require("../assets/images/spade_12.png"),
  spade_K: require("../assets/images/spade_13.png"),

  diamond_A: require("../assets/images/diamond_1.png"),
  diamond_2: require("../assets/images/diamond_2.png"),
  diamond_3: require("../assets/images/diamond_3.png"),
  diamond_4: require("../assets/images/diamond_4.png"),
  diamond_5: require("../assets/images/diamond_5.png"),
  diamond_6: require("../assets/images/diamond_6.png"),
  diamond_7: require("../assets/images/diamond_7.png"),
  diamond_8: require("../assets/images/diamond_8.png"),
  diamond_9: require("../assets/images/diamond_9.png"),
  diamond_10: require("../assets/images/diamond_10.png"),
  diamond_J: require("../assets/images/diamond_11.png"),
  diamond_Q: require("../assets/images/diamond_12.png"),
  diamond_K: require("../assets/images/diamond_13.png"),
};

export const getCardImagePath = (card: Card) => {
  return cardImages[`${card.suit}_${card.rank}`];
};
