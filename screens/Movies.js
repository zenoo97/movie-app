import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { makeImgPath } from "./utils";
// import { BlurView } from "expo-blur";
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
  flex: 1;
`;
const Title = styled.Text``;
const Movies = ({ navigation: { navigate } }) => {
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
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <Comp key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }}></BgImg>
            {/* <BlurView>
              <Title>{movie.original_title}</Title>
            </BlurView> */}
          </Comp>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
