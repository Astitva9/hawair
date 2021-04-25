import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainBlock from "./components/MainBlock";

function App() {
  return (
    <Fragment>
      <Header/>
      <MainBlock/>
      <Footer/>
    </Fragment>
  );
}

export default App;
