import React from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
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
    console.log("inside the delete function");
    console.log(parkToDelete);
    const url = `${process.env.REACT_APP_SERVER}/users/${parkToDelete._id}`;
    this.getJwt()
      .then((jwt) => {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const updatedUsers = axios.delete(url, config);
        return updatedUsers;
      })
      .then((updatedUsers) => {
        console.log(this.state.parks);
        const updatedUsersArr = this.state.parks.filter(
          (element) => element._id !== parkToDelete._id
        );
        this.setState({ parks: updatedUsersArr });
      })
      .catch((err) => console.error(err));
    console.log(this.updatedUsers);
  };


  render() {
    
    return (
      <div>
      <p>{this.state.parks.name}</p>
            <Button onClick={() => this.handleDelete()}>
              Delete from the favorite
            </Button>
          </div>
      
    );
  }
  
  
}

export default withAuth0(Profile);
