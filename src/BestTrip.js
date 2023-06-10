import React from "react";
import "./App.css"
import logo from "./img/CodeGenius-Studios-logos.jpeg"
class BestTrip extends React.Component{
  render(){
    return(
      <>
    <h1>
      <img className="logo" src={logo} alt="Logo"/>
    </h1>

   <p>Welcome to trip advisor website!</p>
    </>
    )
  }
}

export default BestTrip; 