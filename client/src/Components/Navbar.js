import React from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import {useState, useEffect} from "react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [roles, setRoles] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect (()=>{
    const user =JSON.parse(localStorage.getItem("user"));
    setUserId(user?.id);
  }, []);


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
    
    if(!localStorage.getItem("roles")){
      setRoles(null);
    } else {
      setRoles(localStorage.getItem("roles"))
    }

    if (!localStorage.getItem("user")) {
      setUser(null);
    } else {
      setUser(localStorage.getItem("user"));
    }
  }, [isAuth, roles, user]);

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setRoles(null);
    localStorage.clear();
  }

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/">Amazon Clone</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href={"/user/" + userId} >User Profile</Nav.Link>
          <Nav.Link href="/productsList">Our products</Nav.Link>
          <Nav.Link href="/test">Test Cart</Nav.Link>
          
          <NavDropdown title="For Admin" id="collasible-nav-dropdown">
          {/* <NavDropdown.Item href="/admin">Admin Home</NavDropdown.Item> */}
            <NavDropdown.Item href="/admin/ProductList">Product Management</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Client Management</NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item href="/addSubcategory">add Subcategory</NavDropdown.Item>
            <NavDropdown.Item href="/addProduct">add Product</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
      {(isAuth && user) ?
        <Button variant="outline-success" onClick={logout}>Sign Out</Button>
        :
         <Nav.Link href="/login">Login</Nav.Link>
      }
      </Navbar.Collapse>

      
      </Container>
    </Navbar>
        



       

    )
}

export default NavBar;
