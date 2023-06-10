import React from 'react'
import './App.css';
import AboutUs from './About';
import Header from './Header';
import NationalPark from './NationalPark';
import BestTrip from './BestTrip';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        
        <Route 
          exact path="/"
          element={<BestTrip/>}></Route>
        

        <Route
        path="Advisor"
        element={<NationalPark/>}>

        </Route>
        <Route
          path="About"
          element={<AboutUs/>}>
        </Route>
      </Routes>
      <Footer />
    </Router>
  </>
  );
}

export default App;
