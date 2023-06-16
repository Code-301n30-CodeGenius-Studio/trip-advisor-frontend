import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";


class NationalPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isParkAdded: -1,
      parks: {},
    };
    this.resetStates = this.resetStates.bind(this);
  }

  resetStates = () => {
    this.setState({
      displayInfo: false,
      errorIn: false,
    });
  };

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

  handleFavorite = (park, idx) => {
    console.log(park.name);
    const newUser = {
      parkName: park.name,
      email: this.props.auth0.email,
    };
    this.postUsers(newUser);
    this.setState({ isParkAdded: idx });
  };

  componentDidMount() {
    this.pullUsers();
  }

  getJwt = () => {
    return this.props.auth0
      .getIdTokenClaims()
      .then((res) => res.__raw)
      .catch((err) => console.error(err));
  };

  pullUsers = () => {
    this.getJwt()
      .then((jwt) => {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const url = `${process.env.REACT_APP_SERVER}/users`;
        // console.log('The whole url getting from MongoDB- ', url)
        return axios.get(url, config);
      })
      .then((response) => {
        console.log(response.data); // Log the response data
        this.setState({ parks: response.data });
      })
      .catch((err) => console.error(err));
  };

  handleDelete = (parkId) => {
    this.deleteUsers(parkId)
      .then(() => {
        const updatedParks = { ...this.state.parks };
        delete updatedParks[parkId];
        this.setState({ parks: updatedParks }, () => {
          console.log(this.state.parks);
          this.pullUsers(); // Fetch updated data after successful deletion
        });

      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  deleteUsers = async (parkToDelete) => {
    try {
      console.log("inside the delete function");
      console.log(parkToDelete);
      const url = `${process.env.REACT_APP_SERVER}/users/${parkToDelete}`;
      const jwt = await this.getJwt();
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.delete(url, config);
    } catch (err) {
      throw err;
    }
  };

  // deleteUsers = async (parkToDelete) => {
  //   try {
  //     console.log("inside the delete function");
  //     console.log(parkToDelete);
  //     const url = `${process.env.REACT_APP_SERVER}/users/${parkToDelete}`;
  //     const jwt = await this.getJwt();
  //     const config = {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     };
  //     await axios.delete(url, config);
  
  //     // Create a copy of the parks object in the state
  //     const updatedParks = { ...this.state.parks };
  //     // Delete the property representing the park to be removed
  //     delete updatedParks[parkToDelete];
  //     this.setState({ parks: updatedParks }, () => {
  //       console.log(this.state.parks);
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };



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
      .then((response) =>
        this.setState({ parks: [...this.state.parks, response.data] }, () =>
          console.log("checking whats in the parks state", this.state.parks)
        )
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
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
                      <Button
                        onClick={() => this.handleFavorite(elements, idx)}
                      >
                        Save to Favorite
                      </Button>

                      {this.state.isParkAdded === idx && (
                        <h5 >{elements.name} has been added to favorites!</h5>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
   
        </div>

        <div>
        <h4 className="favPark">The Favorite parks of your choice</h4>
       
      <Accordion >
        {Object.keys(this.state.parks).map((key) => (
          <Accordion.Item key={key}>
            <Accordion.Header>{this.state.parks[key].parkName}</Accordion.Header>
            <Accordion.Body>
              <ol>
              <Button variant="danger" onClick={() => this.handleDelete(this.state.parks[key]._id)} >
              Delete from the favorite
            </Button>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
        </div>
      </>
    );
  }
}
export default withAuth0(NationalPark);
