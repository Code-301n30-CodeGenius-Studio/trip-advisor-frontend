import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
// import Profile from "./Profile";

class NationalPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isParkAdded: -1,
      parks:{}
    };
  }
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

  handleDelete = (park) => {
    // const deleteUser = {
    //   parkName: park.name,

    // };
    // console.log(park)
    this.deleteUsers(park.name);
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
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        }
        const url = `${process.env.REACT_APP_SERVER}/users`;
        // console.log('The whole url getting from MongoDB- ', url)
        return axios.get(url, config);
      })
      .then(response => {
        console.log(response.data); // Log the response data
        this.setState({ parks: response.data });
      })
      .catch(err => console.error(err));
      
  }

  // deleteUsers = async (parkToDelete) => {
  //   console.log("inside the delete function");
  //   console.log(parkToDelete);
  //   const url = `${process.env.REACT_APP_SERVER}/users/${parkToDelete._id}`;
  //   this.getJwt()
  //     .then((jwt) => {
  //       const config = {
  //         headers: { Authorization: `Bearer ${jwt}` },
  //       };
  //       const updatedUsers = axios.delete(url, config);
  //       return updatedUsers;
  //     })
  //     .then(updatedUsers => {
  //       console.log(this.state.parks);
  //       const updatedUsersArr = this.state.parks.filter(element => element._id !== parkToDelete._id)
  //       this.setState({ parks: updatedUsersArr })
  //     })
  //     .catch((err) => console.error(err));
  //   console.log(this.updatedUsers);
  // }

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
      .then(response => this.setState({ parks: [...this.state.parks, response.data] },() => console.log('checking whats in the parks state', this.state.parks)))
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
                    <Button onClick={() => this.handleFavorite(elements, idx)}>
                      Save to Favorite
                    </Button>
                    
                    {this.state.isParkAdded === idx && (
                      <h3>{elements.name} has been added to favorites!</h3>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {this.props.errorIn && <p>Error: City not found.</p>}

  
      </div>
      <div>

        <h4>The Favorite parks of your choice</h4>
        <ol>
          <li>
            {this.state.parks}
          </li>
        </ol>
      </div>
         </>             
    );
  }
}
export default withAuth0(NationalPark);
