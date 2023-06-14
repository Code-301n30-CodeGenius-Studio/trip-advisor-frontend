import React from "react";
import "./App.css";
import AboutUs from "./About";
import Header from "./Header";
// import NationalPark from './NationalPark';
import BestTrip from "./BestTrip";
import Footer from "./Footer";
import Main from "./Main";
import { withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestTrip />}></Route>

            <Route
              path="Advisor"
              // element={<Main />}
              element={isAuthenticated ? <Main /> : <BestTrip />}
            ></Route>

            <Route path="About" element={<AboutUs />}></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
