import React from 'react'
import './App.css';
import AboutUs from './About';
import Header from './Header';
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
        
        {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
        <Route
          path="About"
          element={<AboutUs/>}>
        </Route>

        {/* <Route
        path="Profile"
        element={<User/>}></Route> */}
      </Routes>
      <Footer />
    </Router>
  </>
  );
}

export default App;
