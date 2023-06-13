import React from "react";
import "./App.css";
import {Card, Col} from "react-bootstrap"
import background from "./img/yosemite.jpg";
import kalisa from "./img/kalisa.jpg"

class BestTrip extends React.Component {
  render() {
    return (
      <>
        <h1 className="home_h1">Welcome Travelers!</h1>

        <Col>
        <div id="cardOne">
        <Card  style={{ width: "400px", height:"600px", borderRadius: "30%" }}>
          <Card.Img className="image" variant="top" src={background} />
          <Card.Body>
            <Card.Title className="title">Let's make traveling easy</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        <div id="cardTwo">
        <Card  style={{ width: "400px", height:"600px", borderRadius: "30%" }}>
          <Card.Img className="image" variant="top" src={kalisa} />
          <Card.Body>
            <Card.Title className="title">Inspiring and mesmerizing</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </Col>
       
      </>
    );
  }
}

export default BestTrip;
