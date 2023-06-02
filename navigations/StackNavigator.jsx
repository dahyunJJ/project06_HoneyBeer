import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import DetailPage from "../pages/DetailPage";
import ThemePage from "../pages/ThemePage";
import TabNavigator from "./TabNavigator";

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
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="ThemePage" component={ThemePage} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
