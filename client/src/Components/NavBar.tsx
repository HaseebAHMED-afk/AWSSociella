import { Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import { Button, Navbar } from "react-bootstrap"

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Sociella</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="nav-links">
          <Typography> <Link to='/' >Home</Link></Typography>
          <Typography> <Link to='/YourDiary' >Your diary</Link> </Typography>
          <Typography><Link to='/You'>You</Link></Typography>
        </div>
        <div className="login-signup-btns">
          <Button variant="dark" > <Link to='/LogIn'>Log In</Link> </Button>
          <Button variant="outline-dark" className="signup-btn">
            <Link to='/SignUp' >
            Sign Up
            </Link>
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
