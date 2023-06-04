import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function HotListComponent({ navigation, item }) {
  // console.log("핫한맥주", item);

  const goDetail = () => {
    navigation.navigate("DetailPage", { item: item });
  };

  return (
    <View
      alignItems="center"
      width={140}
      height={220}
      marginRight={2}
      borderRadius={8}
      borderWidth={1}
      borderColor={"gray"}
      backgroundColor={"#fff"}
    >
      <TouchableOpacity onPress={() => goDetail()}>
        <Box w={"140px"} h={"140px"} p={2}>
          <ImageBlurLoading
            withIndicator
            thumbnailSource={{ uri: item.img }}
            source={{ uri: item.img }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </Box>
        <VStack mt={4} mb={2} alignItems={"center"}>
          <Text w={"120px"} numberOfLines={1} fontSize={12} textAlign="center">
            {item.korProduct}
          </Text>
          <HStack
            mt={2}
            w={"120px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack>
              <AntDesign name="star" size={14} color="#FFB000" />
              <Text paddingLeft={1} fontSize={12}>
                {item.rating}
              </Text>
            </HStack>
            <Entypo name="heart-outlined" size={16} color="gray" />
          </HStack>
        </VStack>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  boxCon: {
    padding: 16,
  },
  boxTxt: {
    color: "#fff",
    fontSize: 26,
    paddingVertical: 4,
    fontFamily: "Gamja-Flower",
  },
  recommend: {
    backgroundColor: "#ffffff95",
    width: "40%",
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 16,
  },
});
