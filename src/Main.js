import React from "react";
import "./Main.css";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import NationalPark from "./NationalPark";
import Weather from "./Weather"
import { withAuth0 } from '@auth0/auth0-react';

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
      yelpData: [],
      // parks: {},
    };
    this.resetStates = this.resetStates.bind(this);
  }


  getJwt = () => {
    return this.props.auth0.getIdTokenClaims()
      .then(res => res.__raw)
      .catch(err => console.error(err))
  }

  // pullUsers = () => {
  //   this.getJwt()
  //     .then(jwt => {
  //       const config = {
  //         headers: { 'Authorization': `Bearer ${jwt}` }
  //       }
  //       return axios.get(`${process.env.REACT_APP_SERVER}/users`, config);
  //     })
  //     .then(response => this.setState({ parkName: response.data }))
  //     .catch(err => console.error(err));
  // }

 

 

 // deleteUsers = async (userToDelete) => {
  //   console.log('inside the delete function');
  //   console.log(userToDelete);
  //   const url = `${process.env.REACT_APP_SERVER}/users/${userToDelete._id}`;
  //   this.getJwt()
  //     .then(jwt => {
  //       const config = {
  //         headers: { 'Authorization': `Bearer ${jwt}` }
  //       }
  //       const updatedUsers = axios.delete(url, config)
  //       return updatedUsers
  //     })
  //     .then(updatedUsers => {
  //       console.log(this.state.parkName);
  //       const updatedUsersArr = this.state.parkName.filter(element => element._id !== userToDelete._id)
  //       this.setState({ parkName: updatedUsersArr })
  //     })
  //     .catch(err => console.error(err));
  //   console.log(this.updatedUsers)
  // };

  // updateUsers = (userToUpdate) => {
  //   console.log(userToUpdate);
  //   this.getJwt()
  //     .then(jwt => {
  //       const config = {
  //         headers: { 'Authorization': `Bearer ${jwt}` }
  //       }
  //       return axios.put(`${process.env.REACT_APP_SERVER}/users/${userToUpdate._id}`, userToUpdate, config)
  //     })
  //     .then( userToUpdate => {
  //       console.log(userToUpdate.data);
  //      const updateUsersArr = this.state.books.map(val => val._id === userToUpdate.data._id ? userToUpdate.data : val)
  //       this.setState({ books: updateUsersArr })
  //     })
  //     .catch(err => console.error(err))
  // };




  handleInput = (event) => {
    this.setState({
      city: event.target.value,
    },
    //  () => console.log(this.state.city)
    );
  };

  fetchCityData = async () => {
    const { city } = this.state;
    const url = `${process.env.REACT_APP_SERVER}/national/?query=${city}`;
    this.getJwt()
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        };
        return axios.get(url, config);
      })
      .then(response => {
        this.setState({
          parkName: response.data.length > 0 ? response.data[0].name : "",
          thisIsArrOfNationalPark: response.data,
          displayInfo: true,
          errorIn: false,
        }
        , () => this.fetchYelpData()
        );
        
      })
      .catch(error => {
        console.error(error);
        this.setState({
          errorIn: true,
        });
      });
  };

  fetchLocationData = async () => {
    const { city } = this.state;
    const url = `${process.env.REACT_APP_SERVER}/locationIQ/?city=${city}`;
    this.getJwt()
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        };
        return axios.get(url, config);
      })
      .then(res => {
        console.log(res);
        this.setState({
          lat: res.data[0].lat,
          lon: res.data[0].lon,
          locationData: res.data,
          displayInfo: true,
          errorIn: false,
        }
        , () => this.fetchWeatherData()
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorIn: true,
        });
      });
  };
  


  fetchYelpData = async () => {
    const { thisIsArrOfNationalPark, city, lat, lon } = this.state;
    console.log(`this yelp ${this.state}`);
    try {
      const requests = thisIsArrOfNationalPark.map((park) => {
        const name = park.name;
        const url = `${process.env.REACT_APP_SERVER}/yelp/?latitude=${lat}&longitude=${lon}&term=${name}&location=${city}`;
        return this.getJwt()
          .then(jwt => {
            const config = {
              headers: { 'Authorization': `Bearer ${jwt}` }
            };
            const token=axios.get(url, config);
            console.log('token', token)
            return token
            
            // return axios.get(url, config);
          });
      });
  
      const responses = await Promise.all(requests);
      console.log('yelp responses:', responses)
      const yelpData = responses.map((res) => res.data);
  
      if (yelpData.every(Array.isArray)) {
        this.setState({
          yelpData: yelpData,
          displayInfo: true,
          errorIn: false,
        }, 
        () => this.fetchWeatherData()
        );
      } else {
        this.setState({
          yelpData: [],
          displayInfo: true,
          errorIn: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        yelpData: [],
        displayInfo: true,
        errorIn: true,
      });
    }
  };
  
  
  
  
  



  fetchWeatherData = async () => {
    const { lat, lon } = this.state;
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
    this.getJwt()
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        };
        return axios.get(url, config);
      })
      .then(res => {
        this.setState({
          weatherData: res.data,
          displayInfo: true,
          errorIn: false,
        }, () => console.log(this.state.weatherData));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorIn: true,
        });
      });
  };
  



handleExplore = (e) => {
  e.preventDefault();
  this.fetchCityData();
  this.fetchLocationData();
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
        <Button id="parkButton" variant="primary" onClick={this.handleOpen}>
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
              <Form.Label>Enter a city name or state</Form.Label>
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
        <Container className="mainPage">

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
            yelpData={this.state.yelpData}
            city = {this.state.city}
           parks = {this.state.parks}
            />

          <Weather 
          weatherData = {this.state.weatherData}
          Icons={this.Icons} 
          />

        </Container>

      )}
      {/* Should we comment this? */}
      {/* {this.state.errorIn && <p>Error: City not found.</p>} */}
    </>
  );
}
}

export default withAuth0(Main);
