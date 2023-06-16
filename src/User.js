import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import "./App.css";

class User extends React.Component {
    render() {
        const { isAuthenticated, user } = this.props.auth0;
        // console.log(this.props.auth0);
        return (
            isAuthenticated && (
      < div className="userInfo" >
        <img className="userImg" src={user.picture} alt={user.name} />
        <p className="userName">{user.name}</p>
        {/* <p className="userEmail">{user.email}</p> */}
      </div >
        )
      );
}
}

export default withAuth0(User);
