import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function HotListComponent({ item, navigation }) {
  // console.log(item);
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
      <Box w={20} h={40} p={2}>
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
      <VStack px={2}>
        <Text w={"120px"} numberOfLines={1} fontSize={12} textAlign="center">
          {item.korProduct}
        </Text>
        <HStack alignItems={"center"} justifyContent={"space-between"} mt={2}>
          <HStack>
            <AntDesign name="star" size={14} color="#FFB000" />
            <Text paddingLeft={1} fontSize={12}>
              {item.rating}
            </Text>
          </HStack>
          <Entypo name="heart-outlined" size={16} color="gray" />
        </HStack>
      </VStack>
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
    fontFamily: "GamjaFlower-Regular",
  },
  recommend: {
    backgroundColor: "#ffffff95",
    width: "40%",
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 16,
  },
});
