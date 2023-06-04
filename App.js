import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";
import { NativeBaseProvider, extendTheme } from "native-base";

import * as Font from "expo-font";

import LoadingPage from "./pages/LoadingPage";

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      "NG-Bold": require("./assets/fonts/NanumGothic-Bold.ttf"),
      "NG-Regular": require("./assets/fonts/NanumGothic-Regular.ttf"),
      "Gamja-Flower": require("./assets/fonts/GamjaFlower-Regular.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return ready ? (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNavigator />
        <StatusBar style="light" backgroundColor="black" />
      </NavigationContainer>
    </NativeBaseProvider>
  ) : (
    <LoadingPage />
  );
}
