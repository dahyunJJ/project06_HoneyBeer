import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import DetailPage from "../pages/DetailPage";
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
      <Stack.Screen name="SignupPage" component={SignupPage} />
      {/* <Stack.Screen name="SigninPage" component={SigninPage} /> */}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
