import React from "react";
import Accordion from 'react-bootstrap/Accordion';


class NationalPark extends React.Component {

  render() {
    return (
      <div>

        {this.props.displayInfo && (
          <Accordion className="allInfo">
            {this.props.thisIsArrOfNationalPark.map((elements, idx) => (
              <Accordion.Item eventKey="0" key={idx}>
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
        {this.props.errorIn && <p>Error: City not found.</p>}

      </div>
    )
  }
}
export default NationalPark;