import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = "f7bb1cc5b3d4e2f328321b87a0b9b675";
const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const Movie = styled.View`
  margin-right: 20px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;
const Movies = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    setTrending(results);
  };
  const getUpComing = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setUpComing(results);
  };
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setNowPlaying(results);
  };
  const getData = async () => {
    //wait for all of them
    await Promise.all([getTrending(), getUpComing(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
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
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 3,
          marginBottom: 30,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>⭐{movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
