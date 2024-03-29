/*
 * @Component
 * This Component plot all the list of the city with respective AQI Values and Category
 * @Author: Astitva Srivastava
 */
import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { GetCityAQI, getCityListComponent } from "../../utility";

const CityListBlock = ({ citiesAQI }) => {
  const citiesChartAQI = GetCityAQI(citiesAQI);

  const [searchQuery, createSearchQuery] = useState("");

  const cityListComponent = getCityListComponent(citiesChartAQI, searchQuery);

  return (
    <Row className="App-cityList">
      <Col>
        <Row>
          <Col className="search-box">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search City"
                onChange={(e) => createSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className="App-list-block">
          <Col>
            <Row className="App-CityList-header">
              <Col>City Name</Col>
              <Col>AQI</Col>
              <Col>Category</Col>
            </Row>
            {cityListComponent}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CityListBlock;
