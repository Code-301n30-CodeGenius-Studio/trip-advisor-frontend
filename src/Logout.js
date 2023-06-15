import React from 'react';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

function Logout() {

  const {
    isAuthenticated,
    logout
  } = useAuth0();

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  return isAuthenticated &&
      <Button className ='login'variant='danger' onClick={handleLogout}>Log out</Button>
    ;
}

export default withAuth0(Logout);