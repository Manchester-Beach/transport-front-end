import React from 'react';
import NavbarBrand  from 'react-bootstrap/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <NavbarBrand href="/">Transport</NavbarBrand>
        </Navbar>
    );
}

export default Header;