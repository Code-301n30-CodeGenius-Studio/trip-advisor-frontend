import React from "react";
import Card from 'react-bootstrap/Card';
// import CardHeader from 'react-bootstrap/CardHeader'
import CardGroup from 'react-bootstrap/CardGroup';
// import CardImg from 'react-bootstrap/CardImg'

class Weather extends React.Component {

  render() {
    console.log()
    return (
       <CardGroup className="weatherCards">
         {/* <Card.Header>This is your five day forecast:</Card.Header> */}
        {this.props.weatherData.map((elements, idx) =>
          <Card 
          border="success" style={{ width: '25rem' }}
          key = {idx}
          className="weather"
          >
            {/* <Card.Img
            src={require(`./img/icons/${elements.weatherIcon}.png`)}
            alt={elements.forecast}
             /> */}
            <Card.Title>{elements.time}</Card.Title>
            <Card.Text>{elements.forecast}</Card.Text>
          </Card>
        )}
      </CardGroup>
    )
  }
}



export default Weather;