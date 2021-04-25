import { cities } from "../config/defaultCityList";
import {
  webSocketURL,
  goodAQI,
  satisfactoryAQI,
  moderateAQI,
  poorAQI,
  veryPoorAQI,
  severeAQI,
} from "../constant";

const getCityListWithAQI = (citiesAQI) => {
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

const getAQIColor = (_aqi) => {
  let aqiColor = goodAQI.color;
  let category = goodAQI.categoryName;
  let aqi = parseInt(_aqi);

  if (aqi > goodAQI.minRange && aqi <= goodAQI.maxRange) {
    aqiColor = goodAQI.color;
    category = goodAQI.categoryName;
  } else if (
    aqi > satisfactoryAQI.minRange &&
    aqi <= satisfactoryAQI.maxRange
  ) {
    aqiColor = satisfactoryAQI.color;
    category = satisfactoryAQI.categoryName;
  } else if (aqi > moderateAQI.minRange && aqi <= moderateAQI.maxRange) {
    aqiColor = moderateAQI.color;
    category = moderateAQI.categoryName;
  } else if (aqi > poorAQI.minRange && aqi <= poorAQI.maxRange) {
    aqiColor = poorAQI.color;
    category = poorAQI.categoryName;
  } else if (aqi > veryPoorAQI.minRange && aqi <= veryPoorAQI.maxRange) {
    aqiColor = veryPoorAQI.color;
    category = veryPoorAQI.categoryName;
  } else if (aqi > severeAQI.minRange && aqi <= severeAQI.maxRange) {
    aqiColor = severeAQI.color;
    category = severeAQI.categoryName;
  }
  return { aqiColor, category };
};

const connectWebSocket = async (setCitiesAQI, socket) => {
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
      socket = new WebSocket(webSocketURL);
      console.error("[close] Connection died");
    }
  };
};

export { getCityListWithAQI, getAQIColor, connectWebSocket };