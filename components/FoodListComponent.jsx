import React from "react";
import { StyleSheet } from "react-native";
import { HStack, Text, Box, Flex } from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";

import { FoodImages } from "../data/foodImages";

export default function FoodListComponent({ navigation, item }) {
  // console.log(item);
  // console.log(FoodImages);

  // 해당 음식에 대한 이미지 URL 출력 // 수정 필요함...
  const imageUrl = (food) => {
    if (FoodImages.hasOwnProperty(food)) {
      return FoodImages[food];
    }
    return null;
  };
  console.log(imageUrl("해산물"));

  return (
    <Box>
      {item
        .filter((food) => FoodImages.hasOwnProperty(food))
        .map((food, i) => (
          <ImageBlurLoading
            key={i}
            withIndicator
            thumbnailSource={FoodImages[food]}
            source={FoodImages[food]}
          />
        ))}
    </Box>
  );
}

// 매칭 되는 이미지만 (안되는건 띄우지 않는다)
// 최대 6개
