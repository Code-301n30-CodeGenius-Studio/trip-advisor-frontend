import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./Login";
import Logout from "./Logout";
import {withAuth0} from '@auth0/auth0-react';

function AuthButtons() {

  const {
    isAuthenticated,
  } = useAuth0();

  return isAuthenticated ? <Logout /> : <Login />
}

export default withAuth0(AuthButtons);
