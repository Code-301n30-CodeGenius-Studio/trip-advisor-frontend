import React from "react";
// import { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";

class Us extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    };
  }
  addLike = () => {
    console.log("Button clicked"); 
    this.setState({
      likes: this.state.likes +1
    });
    // this.props.addHeart();
  };
  render() {
    return (
      <Col>
      
        <Card style={{ width: "20 rem" }}>
          <Card.Img variant="top" src={this.props.image} />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
             <strong> {this.props.title} </strong>
            <Card.Text>
              {this.props.description}
            </Card.Text>
            <Button variant="primary" onClick = {this.addLike}>Show Some Love! {this.state.likes}</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Us;
