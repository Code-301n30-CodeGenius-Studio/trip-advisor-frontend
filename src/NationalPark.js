import React from "react";
import "./NationalPark.css";
import { Button, Form, Modal } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";

// const localDataNationalData = `${process.env.REACT_APP_SERVER}/national`;

class NationalPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      city: "",
      thisIsArrOfNationalPark:[],
      lon: "",
      lat: "",
      image: "",
      location: {},
      errorIn: false,
      showModal: false,
    
    };
    this.resetStates = this.resetStates.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  fetchCityData = async () => {
    const { city } = this.state;
    // console.log(city)
    const url = `${process.env.REACT_APP_SERVER}/national/?query=${city}`;
    console.log(url)
    try {
      const response = await axios.get(url);
      
          this.setState({
            thisIsArrOfNationalPark:response.data,
            displayInfo: true,
            errorIn: false,
          }, 
            ()=> console.log(this.state.thisIsArrOfNationalPark)
          );
   
    } catch (error) {
      console.error(`${error}`);
      this.setState({
        errorIn: true,
      });
    }
  };
  

  handleExplore = (e) => {
    e.preventDefault();
    this.fetchCityData();
    this.setState({ showModal: false });
  };

  resetStates = () => {
    this.setState({
      displayInfo: false,
      errorIn: false,
    });
  };

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    
    return (
      <>
      <div id="modalButton">
        <Button variant="primary" onClick={this.handleOpen}>
          National Park Finder
        </Button>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>National Park Finder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleExplore}>
              <Form.Group className="mb-3">
                <Form.Label>Enter a city name or zipcode</Form.Label>
                <Form.Control type="text" onChange={this.handleInput} />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.resetStates}
              >
                Explore!
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {this.state.displayInfo && (
          <Accordion className="allInfo">
            {this.state.thisIsArrOfNationalPark.map((elements, idx) => (
            <Accordion.Item eventKey="0">
            <Accordion.Header>{elements.name}</Accordion.Header>
            <Accordion.Body>
            <p>{elements.description}</p>
            <a href={elements.directions}>
              Click Here to see the direction
            </a>
           
            <img
              className="national_park"
              alt={elements.name}
              src={elements.image}
            />

            <p>Standard Hours:</p>

            <ul>
              {Object.entries(elements.workHours).map(([day, hours]) => (
                <li key={day}>
                  {day}: {hours}
                </li>
              ))}
            </ul>
            {/* <p>Exception Hours:</p>
            <ul>
              {this.state.exceptions.map((exception) => (
                <li key={exception.name}>
                  <p>Holiday: {exception.name}</p>
                  <ul>
                    {Object.entries(exception.exceptionHours[0]).map(
                      ([day, hours]) => (
                        <li key={day}>
                          {day}: {hours}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul> */}
            </Accordion.Body>
            </Accordion.Item>
            )
            )}
          </Accordion>
        )}
        {this.state.errorIn && <p>Error: City not found.</p>}
      </>
    );
  }
}

export default NationalPark;
