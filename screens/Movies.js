import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { makeImgPath } from "./utils";
import { BlurView } from "expo-blur";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = "f7bb1cc5b3d4e2f328321b87a0b9b675";
const Container = styled.ScrollView``;
const Comp = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
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
const Movies = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
      >
        {nowPlaying.map((movie) => (
          <Comp key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }}></BgImg>
            <BlurView
              tint={isDark ? "dark" : "light"}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              intensity={80}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>{movie.overview.slice(0, 90)}</Overview>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐{movie.vote_average} / 10</Votes>
                  ) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </Comp>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
