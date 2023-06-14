import React from "react";
import Card from 'react-bootstrap/Card';

import CardGroup from 'react-bootstrap/CardGroup';
class Weather extends React.Component {

  render() {
    console.log()
    return (
       <CardGroup className="weatherCards">

        {this.props.weatherData.map((elements, idx) =>
          <Card 
          border="success" style={{ width: '25rem' }}
          key = {idx}
          className="weather"
          >
            <Card.Img
            src={require(`./img/icons/${elements.weatherIcon}.png`)}
            alt={elements.forecast}
             /> 
            <Card.Title>{elements.time}</Card.Title>
            <Card.Text>{elements.forecast}</Card.Text>
          </Card>
        )}
      </CardGroup>
    )
  }
}



export default Weather;