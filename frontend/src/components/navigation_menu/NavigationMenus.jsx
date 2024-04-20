import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../../logo.svg";
import MenuBar from "./MenuBar";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationMenu(){
    return (
      <div className="navbar-container">
        <MenuBar/>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <Logo
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            RentConnect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
              <Nav.Link href="#properties">Properties</Nav.Link>
            </Nav>
        </Navbar>
        </div>
      );
    
}