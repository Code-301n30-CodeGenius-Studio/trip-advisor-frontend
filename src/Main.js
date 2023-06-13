import React from "react";
import "./Main.css";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import NationalPark from "./NationalPark";

// const localDataNationalData = `${process.env.REACT_APP_SERVER}/national`;
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      city: "",
      thisIsArrOfNationalPark: [],
      lon: "",
      lat: "",
      image: "",
      location: {},
      errorIn: false,
      showModal: false,
      locationData: [],
      weatherData: [],
      parkName: []
    };
    this.resetStates = this.resetStates.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value,
    }, () => console.log(this.state.city));
  };

  fetchCityData = async () => {
    const { city } = this.state;
    // console.log(city)
    const url = `${process.env.REACT_APP_SERVER}/national/?query=${city}`;
    console.log(url)
    try {
      const response = await axios.get(url);
      this.setState({
        parkName: response.data[0].name,
        thisIsArrOfNationalPark: response.data,
        displayInfo: true,
        errorIn: false,
      }, () => this.fetchYelpData()
      );

    
    } catch(error) {
    console.error(`${error}`);
    this.setState({
      errorIn: true,
    });
  }
};


fetchLocationData = async () => {
  const { city } = this.state;
  // console.log(city)
  const url = `${process.env.REACT_APP_SERVER}/locationIQ/?city=${city}`;
  console.log(city)
  try {
    const res = await axios.get(url);
    console.log(res);
    this.setState({
      lat: res.data[0].lat,
      lon: res.data[0].lon,
      locationData: res.data,
      displayInfo: true,
      errorIn: false,
    },
      () => this.fetchWeatherData()
    );

  } catch (err) {
    console.log(err);
    this.setState({
      errorIn: true,
    },
    );
  }
};




fetchYelpData = async () => {
  const { thisIsArrOfNationalPark, city, lat, lon } = this.state;
  try {
    const requests = thisIsArrOfNationalPark.map((park) => {
      const name = park.name;
      const url = `${process.env.REACT_APP_SERVER}/yelp/?latitude=${lat}&longitude=${lon}&term=${name}&location=${city}`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);
    const yelpData = responses.map((res) => res.data);

    this.setState({
      yelpData: yelpData,
      displayInfo: true,
      errorIn: false,
    }, () => console.log(this.state.yelpData));
  } catch (err) {
    console.log(err);
    this.setState({
      errorIn: true,
    });
  }
};

// fetchYelpData = async () => {
//   const { thisIsArrOfNationalPark } = this.state;
//   const { city } = this.state;
//   const { lat } = this.state;
//   const { lon } = this.state;
//   try {
//     for (let i = 0; i < thisIsArrOfNationalPark.length; i++) {
//       const park = thisIsArrOfNationalPark[i];
//       const name = park.name;
//       const url = `${process.env.REACT_APP_SERVER}/yelp/?latitude=${lat}&longitude=${lon}&term=${name}&location=${city}`;
    

//       const res = await axios.get(url);
//       this.setState({
//         yelpData: res.data,
//         displayInfo: true,
//         errorIn: false,
//       },() => console.log(this.state.yelpData)
//       );
//     }
//   } catch (err) {
//     console.log(err);
//     this.setState({
//       errorIn: true,
//     });
//   }
// }

fetchWeatherData = async () => {
  const { lat, lon } = this.state;
  const url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
  console.log(url)
  try {
    const res = await axios.get(url);
    this.setState({
      weatherData: res.data,
      displayInfo: true,
      errorIn: false,

    }, () =>
      console.log(this.state.weatherData)
    )
  } catch (err) {
    console.log(err);
    this.setState({
      errorIn: true,
    });
  }
}


handleExplore = (e) => {
  e.preventDefault();
  this.fetchCityData();
  this.fetchLocationData();
  // this.fetchYelpData();
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
        <Container>

          <NationalPark
            handleInput={this.handleInput}
            showModal={this.state.showModal}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            handleExplore={this.handleExplore}
            resetStates={this.resetStates}
            thisIsArrOfNationalPark={this.state.thisIsArrOfNationalPark}
            errorIn={this.state.errorIn}
            displayInfo={this.state.displayInfo}
          />

        </Container>

      )}
      {this.state.errorIn && <p>Error: City not found.</p>}
    </>
  );
}
}

export default Main;
