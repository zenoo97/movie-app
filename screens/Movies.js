import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;
const ListContainer = styled.View`
  margin-bottom: 20px;
`;
const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const Movies = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);
  const onRefresh = async () => {
    // refetchNowPlaying();
    // refetchUpcoming();
    // refetchTrending();
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }) => (
    <Movie>
      <Poster path={item.poster_path} />
      <Title>
        {item.original_title.slice(0, 12)}
        {item.original_title.length > 12 ? "..." : null}
      </Title>
      <Votes>
        {item.vote_average > 0 ? `⭐ ${item.vote_average}/10` : `Coming soon`}
      </Votes>
    </Movie>
  );
  const renderHMedia = ({ item }) => (
    <HMovie>
      <Poster path={item.poster_path} />
      <HColumn>
        <Title>{item.original_title}</Title>
        <Release>
          {new Date(item.release_date).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview>
          {item.overview !== "" && item.overview.length > 80
            ? `${item.overview.slice(0, 140)}...`
            : item.overview}
        </Overview>
      </HColumn>
    </HMovie>
  );
  const movieKeyExtractor = (item) => item.id;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;

  console.log(refreshing);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            loop
            timeout={3.5}
            controlsEnabled={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlayingData.results.map((movie) => (
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
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={VSeperator}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              data={trendingData.results}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
