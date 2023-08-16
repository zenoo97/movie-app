import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import Tabs from "./navigation/Tabs";
import { useColorScheme } from "react-native";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

export default function App() {
  const isDark = useColorScheme() === "dark";
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
