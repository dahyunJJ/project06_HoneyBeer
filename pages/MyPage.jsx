import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Center, HStack, Text, VStack, Flex } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import my from "../assets/image/02.png";

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
        fontFamily: "GamjaFlower",
      },
      headerShown: true,
    });
  });

  return (
    <ScrollView>
      <Center>
        <ImageBlurLoading source={my} style={styles.thumbnail} />
      </Center>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 80,
    height: 80,
    borderWidth: 1,
  },
});
