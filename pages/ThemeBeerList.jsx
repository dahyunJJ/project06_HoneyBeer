import React, { useState, useEffect } from "react";
import { ScrollView, Center, Text, View, Box } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";

import data from "../data/mackjooData.json";
import ThemeListComponent from "../components/ThemeListComponent";

export default function ThemeBeerList({ navigation, route }) {
  // console.log(route);
  const { theme } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: theme,
      headerStyle: {
        backgroundColor: "#131518",
        height: 80,
        shadowColor: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "Gamja-Flower",
      },
      headerShown: true,
    });
  }, [navigation, theme]);

  const ThemeList = (theme) => {
    return data.filter((item) => item.theme === theme);
  };

  const filteredData = ThemeList(theme);
  // console.log(filteredData);

  return (
    <ScrollView backgroundColor={"#fff"}>
      <Box safeAreaTop>
        {filteredData.map((item, i) => {
          return (
            <ThemeListComponent item={item} key={i} navigation={navigation} />
          );
        })}
      </Box>
    </ScrollView>
  );
}
