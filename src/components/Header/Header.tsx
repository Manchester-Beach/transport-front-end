import React, {Component}  from 'react';
import NavbarBrand  from 'react-bootstrap/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';

export default class Header extends Component {

    render(){
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <NavbarBrand href="/">Transport</NavbarBrand>
            </Navbar>
        );
    }
}