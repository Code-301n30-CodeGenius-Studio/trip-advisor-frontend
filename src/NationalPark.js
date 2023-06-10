import React from "react";
import "./NationalPark.css";
import { Button, Form, Modal } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

// const localDataNationalData = `${process.env.REACT_APP_SERVER}/national`;

class NationalPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      city: "",
      name: "",
      lon: "",
      lat: "",
      entranceFee: "",
      image: "",
      location: {},
      errorIn: false,
      showModal: false,
      standardHours: [],
      exceptions: [],
      description: "",
      directionURL: "",
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
    // console.log(url)
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
      
        if (data && data.length > 0) {
          const foundCity = data[0];
          this.setState({
            name: foundCity.name,
            entranceFee: foundCity.entranceFee,
            // standardHours: foundCity.operatingHours[0].standardHours,
            // exceptions: foundCity.operatingHours[0].exceptions,
            description: foundCity.description,
            // directionURL: foundCity.directionsUrl,
            // image: foundCity.images[0].url,
            // lon: foundCity.latLong.lon,
            // lat: foundCity.latLong.lat,
            displayInfo: true,
            errorIn: false,
          });
          console.log(this.state.description);
        } else {
          this.setState({
            errorIn: true,
          });
        }
      } else {
        throw new Error("Error fetching city data.");
      }
    } catch (error) {
      console.error(`Error fetching city data: ${error}`);
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
    console.log(this.state.name)
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
            <Accordion.Item eventKey="0">
            <Accordion.Header>{this.state.name}</Accordion.Header>
            <Accordion.Body>
            <p>{this.state.description}</p>
            <a href={this.state.directionURL}>
              Click Here to see the direction
            </a>
            <p>
              Entrance fee for non-commercial vehicle: {this.state.entranceFee}$
            </p>
            <img
              className="national_park"
              alt={this.state.name}
              src={this.state.image}
            />

            <p>Standard Hours:</p>

            <ul>
              {Object.entries(this.state.standardHours).map(([day, hours]) => (
                <li key={day}>
                  {day}: {hours}
                </li>
              ))}
            </ul>
            <p>Exception Hours:</p>
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
            </ul>
            </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
        {this.state.errorIn && <p>Error: City not found.</p>}
      </>
    );
  }
}

export default NationalPark;
