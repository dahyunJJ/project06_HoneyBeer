import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { Pressable, Text, Box, Center } from "native-base";

export default function MainBannerComponent() {
  return (
    <Center mt={4} w={"100%"} h={200} borderRadius={20} overflow={"hidden"}>
      <ImageBackground
        source={require("../assets/image/mainImage.png")}
        style={styles.bannerImg}
      >
        <Box style={styles.boxCon}>
          <Text style={styles.boxTxt} pt={4}>
            나의 최애 맥주를
          </Text>
          <Text style={styles.boxTxt}>추천해 주세요!</Text>
        </Box>
        <TouchableOpacity style={styles.recommend}>
          <Text textAlign={"center"} fontSize={12}>
            최애 맥주 추천하기
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </Center>
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
    fontFamily: "GamjaFlower",
  },
  recommend: {
    backgroundColor: "#ffffff95",
    width: "40%",
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 16,
  },
});
