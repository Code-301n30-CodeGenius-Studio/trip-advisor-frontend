import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import './App.css'

class NationalPark extends React.Component {
  renderYelpData(yelpData) {
    // console.log(yelpData);
    return yelpData.map((review, idx) => 
      
      <div key={idx}>
        <p>Rating: {review.rating}</p>
        <p>Text: {review.text}</p>
      </div>
      )
  }
  render() {
    return (
      <div>
        <p className="selectedCity">This is your selected city: {this.props.city}</p>

        {this.props.displayInfo && (
          <Accordion className="allInfo" defaultActiveKey='0'>
            {this.props.thisIsArrOfNationalPark.map((elements, idx) => (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>{elements.name}</Accordion.Header>
                <Accordion.Body>
                  <div>
                    <p>{elements.description}</p>
                    <a href={elements.directions} target="_blank" rel="noreferrer">
                      Click Here to see the direction
                    </a>

                    {/* <img
                      className="national_park"
                      alt={elements.name}
                      src={elements.image}
                    /> */}

                    <p className="selectedCity">Standard Hours:</p>

                    <ul>
                      {Object.entries(elements.workHours).map(([day, hours]) => (
                        <li key={day}>
                          {day}: {hours}
                        </li>
                      ))}
                    </ul>
                    <p className="selectedCity">Yelp Reviews:</p>
                    {this.props.yelpData.length > 0 && this.renderYelpData(this.props.yelpData[idx])}
                  </div>

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
        {this.props.errorIn && <p>Error: City not found.</p>}

      </div>
    )
  }
}
export default NationalPark;