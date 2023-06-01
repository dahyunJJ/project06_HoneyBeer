import React, { useEffect } from "react";

import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainPage from "../pages/MainPage";
import AddPage from "../pages/AddPage";
import MyPage from "../pages/MyPage";

// expo 에서 제공하는 아이콘
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        // tabnavigator 에서 제공하는 tabBarIcon 기능
        // 모든 페이지에 동시에 적용되는 기능
        tabBarIcon: ({ focused }) => {
          //현재 이 앱을 구동하고 있는 디바이스가 뭔지 Platform.OS 을 통해 확인 할 수 있음
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "MainPage") {
            iconName += "home-outline";
          } else if (route.name === "AddPage") {
            iconName += "list";
          } else if (route.name === "MyPage") {
            iconName += "person";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "tomato" : "gray"}
              size={26}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
          display: "flex",
        },
      })}
    >
      <Tabs.Screen name="MainPage" component={MainPage} />
      <Tabs.Screen name="AddPage" component={AddPage} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};
export default TabNavigator;
