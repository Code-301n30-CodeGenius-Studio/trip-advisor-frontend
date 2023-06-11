import React from "react";
import axios from "axios";
import { Button, Container, Form, } from "react-bootstrap";
import Error from "./Error";
import Location from "./Location";



class Main extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    displayInfo: false,
    city: '',
    cityName:'',
    cityLat:'',
    cityLon:'',
    weatherData: [],
    airQualityData:[],
    displayError: false
  }
}


  handleInput = (e) => {
    this.setState({ city: e.target.value}
      , () => console.log(this.state.city)
      );
  }
    // handleTravel = async (e) => {
    //   e.preventDefault();
    //   try {
    //     let url = `${this.locationData}`
    //     const response = await axios.get(url)
    //     console.log(response);

    //     const lat = response.data[0].lat
    //     const lon = response.data[0].lon
    //     let weatherUrl = `${this.weather}`
    //     const weatherResponse = await axios.get(weatherUrl)
    //     let airQualityUrl = ``
    //     const airQualityResponse = await axios.get(airQualityUrl)
    //     this.setState({
    //       displayInfo: true,
    //       cityName: response.data[0].display_name,
    //       cityLat: response.data[0].lat,
    //       cityLon: response.data[0].lon,
    //       weatherData: weatherResponse.data,
    //       airQualityData: airQualityResponse.data,
    //     })
    //   }
    //   catch {
    //     this.setState({
    //       displayError: true
    //     })
    //   }
    // }

  fetchLocationData = async () => {

  }



  fetchWeatherData = async () => {


  }

  fetchYelpData = async () => {


  }






    resetError = () => {
      this.setState({
        displayInfo: false,
        displayError: false
      })
    }

render() {
  return (
      <>
        <Form onSubmit={this.handleTravel} className="city">
          <Form.Group>
            <Form.Label>Enter your Destination!</Form.Label>
            <Form.Control type="text" onChange={this.handleInput}  />
          </Form.Group>
          <Button type="submit" onClick={this.resetError}>Let's Go Traveling</Button>
        </Form>
        {this.state.displayInfo &&
        <Container>
          
        <Location />

        </Container>
         }
         {this.state.displayError &&
         <>
         <Error />
         </>      
         }
      </>
  )
}
}

export default Main;