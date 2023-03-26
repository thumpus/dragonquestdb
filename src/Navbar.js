import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function NavBar() {
    
    return (
        <Navbar className = 'navbBar' expand='md' color="dark">
            <NavLink exact to="/" className="navbar-brand" style={{color: 'white'}}>
                    DQDB
            </NavLink>
            
            <Nav justified>
                <NavItem>
                    <NavLink to="/monsters"  className = 'navItem'>Monsters</NavLink>
                </NavItem> 
                
                <NavItem>
                    <NavLink to="/weapons" className = 'navItem'>Weapons</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/armor" className = 'navItem'>Armor</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/shields" className = 'navItem'>Shields</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/spells" className = 'navItem'>Spells</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/venture" className = 'navItem' >Venture Forth!</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default NavBar;