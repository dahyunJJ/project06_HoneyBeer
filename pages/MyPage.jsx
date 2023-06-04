import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Center, HStack, Text, VStack, Flex, Box } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import my from "../assets/image/beeB.png";

export default function MyPage({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "마이페이지",
      headerStyle: {
        backgroundColor: "#131518",
        height: 80,
        shadowColor: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        // fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Gamja-Flower",
      },
      headerShown: true,
    });
  });

  return (
    <ScrollView>
      <Center
        mt={4}
        borderBottomWidth={1}
        borderBottomColor={"gray.300"}
        pb={4}
      >
        <Box borderWidth={1} p={4} borderRadius={50} borderColor={"#FFB000"}>
          <ImageBlurLoading source={my} style={styles.thumbnail} />
        </Box>
        <Text mt={4}>닉네임 :</Text>
        <Text>이메일 :</Text>
        <TouchableOpacity style={styles.logout}>
          <Text color={"white"} fontFamily={"Gamja-Flower"}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </Center>
      <Flex flexDirection={"row"} justifyContent={"center"} mt={4}>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>작성한 글</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            12
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>작성한 댓글</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            12
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>방문 횟수</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            30
          </Text>
        </VStack>
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 70,
    height: 70,
    borderWidth: 1,
  },
  logout: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 10,
  },
});
