import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../../logo.svg";
import MenuBar from "./MenuBar";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationMenu() {
    return (
      <div>
      <Navbar bg="light" variant="light">
      <MenuBar />
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
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">User</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );

}