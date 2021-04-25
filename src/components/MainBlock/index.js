import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ChartBlock from "./ChartBlock";
import CityListBlock from "./CityListBlock";
import {connectWebSocket} from '../../utility';

const MainBlock = () => {

const [citiesAQI, setCitiesAQI] = useState([]);

  useEffect(() => {

    let socket ='';

    connectWebSocket(setCitiesAQI,socket);
   
    return () => {
     if(socket!=='') socket.close();
     console.log('Connection Closed')
    };
  }, []);

  return (
    <Container>
      <ChartBlock citiesAQI={citiesAQI}/>
      <CityListBlock citiesAQI={citiesAQI}/>
    </Container>
  );
};

export default MainBlock;
