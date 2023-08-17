import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";

import { styled } from "styled-components/native";

const CoinPrice = styled.View``;
const CoinLeft = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 3%;
`;

const CoinImg = styled.Image`
  width: 50px;
  height: 50px;
`;
const Coinname = styled.Text`
  color: white;
  width: 60%;
  margin-left: 10px;
`;
const CoinRight = styled.View`
  align-items: center;
  justify-content: center;
`;
const Coinprice = styled.Text`
  color: white;
`;
export default function Prices() {
  const [tickers, setTickers] = useState([]);
  const getTickers = useCallback(
    () =>
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => setTickers(json)),
    []
  );
  useEffect(() => {
    getTickers();
  }, [getTickers]);
  // Use this variable to access the data
  const cleanedTickers = tickers.filter(
    (ticker) => ticker.circulating_supply !== 0
  );
  return (
    <FlatList
      data={tickers}
      renderItem={({ item }) => (
        <>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <CoinLeft>
              <CoinImg
                source={{
                  uri: `https://coinicons-api.vercel.app//api/icon/${item.symbol.toLowerCase()}`,
                }}
              ></CoinImg>
              <Coinname>{item.name}</Coinname>
            </CoinLeft>
            <CoinRight>
              <Coinprice>
                ${String(item.quotes.USD.price).slice(0, 8)}
              </Coinprice>
              <Text
                style={{
                  color:
                    item.quotes.USD.market_cap_change_24h > 0 ? "red" : "green",
                }}
              >
                {item.quotes.USD.market_cap_change_24h > 0 ? "▼" : "▲"}
                {item.quotes.USD.market_cap_change_24h}%
              </Text>
            </CoinRight>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </>
      )}
    ></FlatList>
  );
}
