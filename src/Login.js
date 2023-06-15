import React from 'react';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import {withAuth0} from '@auth0/auth0-react';

function Login() {

  const {isAuthenticated,loginWithRedirect} = useAuth0();

  function handleLogin() {
    loginWithRedirect();
  }

  return !isAuthenticated &&
    <Button className ='login' onClick={handleLogin}>Log in</Button>
  ;
}
export default withAuth0(Login);