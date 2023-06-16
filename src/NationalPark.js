import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

const { name, email } = withAuth0();

class NationalPark extends React.Component {
  renderYelpData(yelpData) {
    if (!yelpData) {
      return <p>No Yelp reviews available</p>;
    }

    return yelpData.map((review, idx) => (
      <div key={idx}>
        <p>Rating: {review.rating || "No ratings available"}</p>
        <p>Text: {review.text || ""}</p>
      </div>
    ));
  }

  handleFavorite = (park) => {
    console.log(park.name)
    const newUser = {
      parkName: park.name,
      email:email
    };
    this.postUsers(newUser);

    // this.props.hideModal();
  };

  getJwt = () => {
    return this.props.auth0
      .getIdTokenClaims()
      .then((res) => res.__raw)
      .catch((err) => console.error(err));
  };

  postUsers(newUser) {
    this.getJwt()
      .then((jwt) => {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        return axios.post(
          `${process.env.REACT_APP_SERVER}/users`,
          newUser,
          config
        );
      })
      // .then((response) => {
      //   // Update the state with the saved item
      //   this.setState((prevState) => ({
      //     parkName: [...prevState.parkName, response.data],
      //   }));
      // })
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <div>
        <p className="selectedCity">
          This is your selected city: {this.props.city}
        </p>

        {this.props.displayInfo && (
          <Accordion className="allInfo" defaultActiveKey="0">
            {this.props.thisIsArrOfNationalPark.map((elements, idx) => (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>{elements.name}</Accordion.Header>

                <Accordion.Body>
                  <div>
                    <p>{elements.description}</p>
                    <a
                      href={elements.directions}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click Here to see the direction
                    </a>

                    {/* <img
                      className="national_park"
                      alt={elements.name}
                      src={elements.image}
                    /> */}

                    <p className="selectedCity">Standard Hours:</p>

                    <ul>
                      {Object.entries(elements.workHours).map(
                        ([day, hours]) => (
                          <li key={day}>
                            {day}: {hours}
                          </li>
                        )
                      )}
                    </ul>
                    <p className="selectedCity">Yelp Reviews:</p>
                    {this.props.yelpData.length > 0 &&
                      this.renderYelpData(this.props.yelpData[idx])}
                    <Button onClick={() => this.handleFavorite(elements)}>
                      Save to Favorite
                    </Button>
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
            ))}
          </Accordion>
        )}
        {this.props.errorIn && <p>Error: City not found.</p>}
      </div>
    );
  }
}
export default withAuth0(NationalPark);
