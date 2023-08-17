import React from "react";
import { styled } from "styled-components/native";
import { makeImgPath } from "../screens/utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
const Poster = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
