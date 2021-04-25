import React from "react";
import { Row, Col } from "react-bootstrap";
import { GetCityAQI } from "../../utility";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartBlock = ({ citiesAQI }) => {
  const citiesChartAQI = GetCityAQI(citiesAQI);

  return (
    <Row className="App-chart-row">
      <Col className="App-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={800}
            height={350}
            data={citiesChartAQI}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis dataKey="aqi" domain={[0, 1000]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default ChartBlock;
