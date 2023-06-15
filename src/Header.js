import React from 'react';
import { Navbar, Nav, Col, Row, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css'
import logo from "./img/pngwing.com.png"
import { withAuth0 } from '@auth0/auth0-react';
import AuthButtons from './AuthButtons';

class Header extends React.Component {
  render() { 
    return (
      <Navbar collapseOnSelect expand="lg" className='color-nav' bg="dark" variant="light" >
        <Navbar.Brand className='headNav'><img
          alt=""
          src={logo}
          width="30"
          height="30"
          className='nav-logo'
        />Trip Advisor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Col>
            <Nav.Link as={Link} to="/" className="headNav">Home</Nav.Link>
            </Col>
            <Col>
            <Button as={Link} to="/Advisor" id="custom-btn" className="headNav">Explore</Button>
            </Col>
            <Col>
            <Nav.Link as={Link} to="/about" className="headNav">About</Nav.Link>
            </Col>
            
            <Col>
            <Row>
            <AuthButtons/>
            </Row>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuth0(Header);
