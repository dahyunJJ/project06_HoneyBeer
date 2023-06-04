import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import DetailPage from "../pages/DetailPage";
import ThemePage from "../pages/ThemePage";
import ThemeBeerList from "../pages/ThemeBeerList";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: "black",
          height: 50,
        },
        headerTintColor: "black",
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="SigninPage" component={SigninPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="ThemePage" component={ThemePage} />
      <Stack.Screen name="ThemeBeerList" component={ThemeBeerList} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
