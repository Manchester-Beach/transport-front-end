import React from "react";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";

type HeaderProps = {
  text : String
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <NavbarBrand href="/">{props.text}</NavbarBrand>
    </Navbar>
  );
};

export default Header;
