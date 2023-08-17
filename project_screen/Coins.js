import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import { styled } from "styled-components/native";

const Container = styled.View`
  background-color: "#1e272e";
  justify-content: center;
`;
const Coin = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.15);
  width: 100%;
  height: 120px;
  margin: 1%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Coinimg = styled.Image`
  width: 50px;
  height: 50px;
`;
export default function Coins() {
  const [coins, setCoins] = useState([]);
  const getCoins = useCallback(
    () =>
      fetch("https://api.coinpaprika.com/v1/coins")
        .then((response) => response.json())
        .then((json) => setCoins(json)),
    []
  );
  useEffect(() => {
    getCoins();
  }, [getCoins]);
  // Use this variable to access the data
  const cleanedCoins = coins
    .filter((coin) => coin.rank !== 0)
    .filter((coin) => coin.is_active === true)
    .slice(0, 100);

  return (
    <FlatList
      data={coins}
      numColumns={3}
      renderItem={({ item }) => (
        <Coin>
          <Coinimg
            source={{
              uri: `https://coinicons-api.vercel.app//api/icon/${item.symbol.toLowerCase()}`,
            }}
          ></Coinimg>
          <Text>{item.name}</Text>
        </Coin>
      )}
    />
  );
}
