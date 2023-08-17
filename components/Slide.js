import React from "react";
import { View, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../screens/utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;
const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
`;
const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ uri: makeImgPath(backdrop_path) }}></BgImg>
      <BlurView
        tint={isDark ? "dark" : "light"}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        intensity={80}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title>{original_title}</Title>
            <Overview>{overview.slice(0, 90)}</Overview>
            {vote_average > 0 ? <Votes>⭐{vote_average} / 10</Votes> : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};
export default Slide;
