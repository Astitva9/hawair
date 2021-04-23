import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import React, { Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function App() {
  return (
    <Fragment>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col className="App-header ">
            <img src="hawair-logo.png" alt="hawair" width="200"></img>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="App-chart-row">
          <Col className="App-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={800}
                height={350}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row className="App-cityList">
          <Col>
            <Row>
              <Col className="App-cityData">1 of 1</Col>
            </Row>
            <Row>
              <Col className="App-cityData">1 of 1</Col>
            </Row>
            <Row>
              <Col className="App-cityData">1 of 1</Col>
            </Row>
            <Row>
              <Col className="App-cityData">1 of 1</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col className="App-footer">© 2021 Hawair corps</Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
