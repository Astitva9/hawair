import React from "react";
import { Container } from "react-bootstrap";
import ChartBlock from "./ChartBlock";
import CityListBlock from "./CityListBlock";
import { GetWebSocketData } from "../../utility";

const MainBlock = () => {
  const citiesAQI = GetWebSocketData();

  return (
    <Container>
      <ChartBlock citiesAQI={citiesAQI} />
      <CityListBlock citiesAQI={citiesAQI} />
    </Container>
  );
};

export default MainBlock;
