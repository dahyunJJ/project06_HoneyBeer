import React from "react";
import { useEffect } from "react";
import { StyleSheet, Image, ImageBackground, ScrollView } from "react-native";
import { Center, Text, View } from "native-base";

import themeImg1 from "../assets/image/themeImg1.png";
import themeImg2 from "../assets/image/themeImg2.png";
import themeImg3 from "../assets/image/themeImg3.png";
import themeImg4 from "../assets/image/themeImg4.png";
import themeImg5 from "../assets/image/themeImg5.png";

export default function ThemePage({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      title: "테마별 맥주 추천",
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
      <View style={styles.imgCon}>
        <ImageBackground source={themeImg1} style={styles.themeImg}>
          <Text style={styles.themeTitle}>호불호 없는 대중적인 맥주</Text>
        </ImageBackground>
        <ImageBackground source={themeImg2} style={styles.themeImg}>
          <Text style={styles.themeTitle}>
            구수한 곡물의 풍미가 느껴지는 맥주
          </Text>
        </ImageBackground>
        <ImageBackground source={themeImg3} style={styles.themeImg}>
          <Text style={styles.themeTitle}>
            상큼한 과일향과 거품이 풍성한 맥주
          </Text>
        </ImageBackground>
        <ImageBackground source={themeImg4} style={styles.themeImg}>
          <Text style={styles.themeTitle}>
            진정한 에일을 느낄 수 있는 쓴 맛의 맥주
          </Text>
        </ImageBackground>
        <ImageBackground source={themeImg5} style={styles.themeImg}>
          <Text style={styles.themeTitle}>
            은은한 꽃 향이 느껴지는 산뜻한 맥주
          </Text>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgCon: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  themeImg: {
    width: "100%",
    height: 120,
    objectFit: "contain",
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  themeTitle: {
    fontFamily: "GamjaFlower",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    height: 120,
    verticalAlign: "middle",
  },
});
