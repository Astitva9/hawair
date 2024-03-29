import { useEffect, useState } from "react";
import { cities } from "../config/defaultCityList";
import { Row, Col } from "react-bootstrap";

import {
  webSocketURL,
  goodAQI,
  satisfactoryAQI,
  moderateAQI,
  poorAQI,
  veryPoorAQI,
  severeAQI,
  defaultCellColor,
} from "../constant";

const getCityListWithAQI = (citiesAQI) => {
  /*
   * Making the Default City List which keeps getting updated on each new message
   */
  if (citiesAQI.length > 0) {
    for (let i = 0; i < cities.length; i++) {
      if (citiesAQI[i] !== undefined) {
        if (cities[i].city === citiesAQI[i].city) {
          cities[i].aqi = citiesAQI[i].aqi.toFixed(2);
        }
      }
    }
  }

  return cities;
};

const getAQIColorAndCategory = (_aqi) => {
  /*
   * Provides the color code and category name according to the AQI value
   */
  let aqiColor = goodAQI.color;
  let category = "Fetching...";
  let aqi = ~~_aqi;

  if (aqi > goodAQI.minRange && aqi <= goodAQI.maxRange) {
    aqiColor = goodAQI.color;
    category = goodAQI.categoryName;
  } else if (
    aqi >= satisfactoryAQI.minRange &&
    aqi <= satisfactoryAQI.maxRange
  ) {
    aqiColor = satisfactoryAQI.color;
    category = satisfactoryAQI.categoryName;
  } else if (aqi >= moderateAQI.minRange && aqi <= moderateAQI.maxRange) {
    aqiColor = moderateAQI.color;
    category = moderateAQI.categoryName;
  } else if (aqi >= poorAQI.minRange && aqi <= poorAQI.maxRange) {
    aqiColor = poorAQI.color;
    category = poorAQI.categoryName;
  } else if (aqi >= veryPoorAQI.minRange && aqi <= veryPoorAQI.maxRange) {
    aqiColor = veryPoorAQI.color;
    category = veryPoorAQI.categoryName;
  } else if (aqi >= severeAQI.minRange && aqi <= severeAQI.maxRange) {
    aqiColor = severeAQI.color;
    category = severeAQI.categoryName;
  }
  return { aqiColor, category };
};

const connectWebSocket = async (setCitiesAQI, socket) => {
  /*
   * Handles the Websocket Connection
   */
  socket = new WebSocket(webSocketURL);

  socket.onmessage = function (event) {
    setCitiesAQI(JSON.parse(event.data));
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.error(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      // try to reconnect as well
      socket = new WebSocket(webSocketURL);
      console.error("[close] Connection died");
    }
  };
};

const GetWebSocketData = () => {
  /*
   * Custom hook for getting the city AQI list from webhook
   */
  const [citiesAQI, setCitiesAQI] = useState([]);

  useEffect(() => {
    let socket = "";

    connectWebSocket(setCitiesAQI, socket);

    return () => {
      if (socket !== "") socket.close();
    };
  }, []);

  return citiesAQI;
};

const GetCityAQI = (citiesAQI) => {
  /*
   * Custom hook for mapping the websocket data with default city AQI List, so List can be of fixed size always
   */
  const [citiesChartAQI, setCitiesChartAQI] = useState([]);

  useEffect(() => {
    if (citiesAQI.length > 0) {
      const cities = getCityListWithAQI(citiesAQI);
      setCitiesChartAQI(cities);
    }
  }, [citiesAQI]);

  return citiesChartAQI;
};

const getCityListComponent = (citiesChartAQI, searchQuery) => {
  /*
   * Plots the list of the cities
   */
  let cityListComponent = (
    <Row className="App-cityData" style={{ backgroundColor: defaultCellColor }}>
      <Col></Col>
      <Col>Loading</Col>
      <Col></Col>
    </Row>
  );
  if (citiesChartAQI.length > 0) {
    cityListComponent = citiesChartAQI
      .sort((a, b) => {
        return b.aqi - a.aqi;
      })
      .filter(({ city }) => {
        return city.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map(({ city, aqi, icon }, index) => {
        let { aqiColor, category } = getAQIColorAndCategory(aqi);
        return (
          <Row key={index} className="App-cityData">
            <Col style={{ color: "#fff" }} className="align-self-center">
              <img src={icon} alt={city} width="50" height="50"></img>
              <p>{city}</p>
            </Col>
            <Col style={{ color: aqiColor }} className="align-self-center">
              {aqi}
            </Col>
            <Col style={{ color: aqiColor }} className="align-self-center">
              {category}
            </Col>
          </Row>
        );
      });
  }

  return cityListComponent;
};

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const triangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export {
  getCityListWithAQI,
  getAQIColorAndCategory,
  connectWebSocket,
  GetWebSocketData,
  GetCityAQI,
  getCityListComponent,
  triangleBar,
};
