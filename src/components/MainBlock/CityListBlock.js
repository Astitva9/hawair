/*
* @Component 
* This Component plot all the list of the city with respective AQI Values and Category
* @Author: Astitva Srivastava
*/
import React from "react";
import { Row, Col } from "react-bootstrap";
import { getAQIColorAndCategory, GetCityAQI } from "../../utility";

const CityListBlock = ({ citiesAQI }) => {
  const citiesChartAQI = GetCityAQI(citiesAQI);

  let cityListComponent = "";
  if (citiesChartAQI.length > 0) {
    cityListComponent = citiesChartAQI.map(({ city, aqi }, index) => {
      let { aqiColor, category } = getAQIColorAndCategory(aqi);
      return (
        <Row
          key={index}
          className="App-cityData"
          style={{ backgroundColor: aqiColor }}
        >
          <Col>{city}</Col>
          <Col>{aqi}</Col>
          <Col>{category}</Col>
        </Row>
      );
    });
  }

  return (
    <Row className="App-cityList">
      <Col>{cityListComponent}</Col>
    </Row>
  );
};

export default CityListBlock;
