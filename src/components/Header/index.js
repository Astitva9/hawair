import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function Header() {
    return (
        <Container fluid className="p-0 m-0">
            <Row className="p-0 m-0">
            <Col className="App-header ">
                <img src="hawair-logo.png" alt="hawair" width="200"></img>
            </Col>
            </Row>
        </Container>
    )
}

export default Header
