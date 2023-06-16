import React from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Accordion } from "react-bootstrap";
// import { useAuth0 } from "@auth0/auth0-react";

// const { email } = useAuth0;
// console.log(email)

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: {},
    };
  }

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
  
      // Create a copy of the parks object in the state
      const updatedParks = { ...this.state.parks };
      // Delete the property representing the park to be removed
      delete updatedParks[parkToDelete];
      this.setState({ parks: updatedParks });
  
      console.log(this.state.parks);
    } catch (err) {
      console.error(err);
    }
  };


  render() {
    return (
      <Accordion>
        {Object.keys(this.state.parks).map((key) => {
          const park = this.state.parks[key];
          return (
            <Accordion.Item key={key}>
              <Accordion.Header>{park.parkName}</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <Button onClick={() => this.deleteUsers(park._id)}>
                    Delete from the favorite
                  </Button>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  }
  
  
  
}

export default withAuth0(Profile);
