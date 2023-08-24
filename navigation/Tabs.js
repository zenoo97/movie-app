import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY } from "../color";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import Tv from "../screens/Tv";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Prices from "../project_screen/Prices";
import Coins from "../project_screen/Coins";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() !== "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "#1e272e",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1E2229",
        },
        tabBarActiveTintColor: YELLOW_COLOR,
        tabBarInactiveTintColor: "white",
        headerStyle: {
          backgroundColor: "#1E2229",
        },
        headerTitleStyle: {
          color: "white",
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return <FontAwesome5 name="film" color={color} size={size} />;
          },
          //
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return <FontAwesome5 name="tv" color={color} size={size} />;
          },
          //
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return <FontAwesome5 name="search" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
