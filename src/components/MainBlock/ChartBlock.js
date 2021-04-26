/*
 * @Component
 * This Component Plots the line chart among all the cities with there AQI values
 * @Author: Astitva Srivastava
 */
import React from "react";
import { Row, Col } from "react-bootstrap";
import { GetCityAQI } from "../../utility";

import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { getAQIColorAndCategory, triangleBar } from "../../utility";

const TriangleBar = (props) => {
  return triangleBar(props);
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

const ChartBlock = ({ citiesAQI }) => {
  const citiesChartAQI = GetCityAQI(citiesAQI);

  return (
    <Row className="App-chart-row">
      <Col className="App-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={citiesChartAQI}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis dataKey="aqi" domain={[0, 500]} />
            <Bar
              dataKey="aqi"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {citiesChartAQI.map(({ aqi }, index) => {
                let { aqiColor } = getAQIColorAndCategory(aqi);
                return <Cell key={`cell-${index}`} fill={aqiColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default ChartBlock;
