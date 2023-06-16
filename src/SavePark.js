import React from "react";
import axios from "axios";
import NationalPark from "./NationalPark";

class savePark extends React.Component {
  constructor(props) {
    super(props);
    this.postUsers = this.postUsers.bind(this);
  }

  handleFavorite = (e) => {
    e.preventDefault();

    const newUser = {
      parkName: e.target.parkName.value,
    };
    this.postUsers(newUser);

    this.props.hideModal();
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
      .then((response) => {
        // Update the state with the saved item
        this.setState((prevState) => ({
          parkName: [...prevState.parkName, response.data],
        }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <NationalPark
          handleFavorite={this.handleFavorite}
        />
        <p>Fav Park</p>
      </div>
    );
  }
}

export default savePark;
