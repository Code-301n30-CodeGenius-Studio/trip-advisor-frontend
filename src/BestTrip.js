import React from "react";
import "./App.css";
import {Card} from "react-bootstrap"
import background from "./img/yosemite.jpg";
import kalisa from "./img/kalisa.jpg";
import kurt from "./img/kurt.jpg";

class BestTrip extends React.Component {
  render() {
    return (
      <>
        <h1 className="home_h1">Welcome Travelers!</h1>

        <div className="card-container">
        
        <Card  style={{ width: "400px", height:"600px", borderRadius: "30%" }}>
          <Card.Img className="image" variant="top" src={background} />
          <Card.Body>
            <Card.Title className="title">Let's make traveling easy</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>
      
       
        <Card  style={{ width: "400px", height:"600px", borderRadius: "30%" }}>
          <Card.Img className="image" variant="top" src={kalisa} />
          <Card.Body>
            <Card.Title className="title">Inspiring and mesmerizing</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>
     

       
        <Card  style={{ width: "400px", height:"600px", borderRadius: "30%" }}>
          <Card.Img className="image" variant="top" src={kurt} />
          <Card.Body>
            <Card.Title className="title">We will Plan it for you</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
       
       
      </>
    );
  }
}

export default BestTrip;
