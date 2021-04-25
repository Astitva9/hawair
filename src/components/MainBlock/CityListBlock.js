import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {getCityListWithAQI,getAQIColor} from '../../utility';


const CityListBlock = ({ citiesAQI }) => {

  const [citiesChartAQI, setCitiesChartAQI] = useState([]);

  useEffect(() => {
    if(citiesAQI.length>0){
      const cities = getCityListWithAQI(citiesAQI)
      setCitiesChartAQI(cities);
    }
  }, [citiesAQI, citiesChartAQI]);


  let cityListComponent = "";
  if (citiesChartAQI.length > 0) {
    cityListComponent = citiesChartAQI.map(({ city, aqi }, index) => {
      let { aqiColor, category } = getAQIColor(aqi);
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
