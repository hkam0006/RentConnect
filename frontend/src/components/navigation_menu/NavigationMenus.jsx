import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../../logo.svg";
import PersonIcon from '@mui/icons-material/Person';
import { MdOutlinePerson } from "react-icons/md";
import MenuBar from "./MenuBar";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationMenu() {
    return (
      <div>
      <Navbar bg="light" variant="light">
        <MenuBar/>
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
        <a href="#profile-page" style={{ paddingRight: "10px" }}>
    <MdOutlinePerson style={{ fontSize: "24px" }} />
  </a>
          <Navbar.Text style={{ paddingRight: "20px" }}>
            Signed in as: <a href="#login">UserTitle</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );

}