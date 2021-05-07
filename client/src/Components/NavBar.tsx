import { Avatar, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React, { useContext } from "react"
import { Button, Navbar } from "react-bootstrap"
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types"
import { OAuthContext } from "../OAuthContext"


const NavBar = () => {

  const {user} = useContext<any>(OAuthContext)
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Sociella</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="nav-links">
          <Typography> <Link to='/' >Home</Link></Typography>
          <Typography> <Link to='/YourDiary' >Your diary</Link> </Typography>
        </div>
        <div className="login-signup-btns">
          {
            !user ? (<Button variant="dark" onClick={()=> Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google
            })} > Log In </Button>) : (
              <div style={{display: 'flex', alignItems: 'center' , justifyContent:'space-between'}} >
              <Button style={{margin: 5}} variant="dark" onClick={() => Auth.signOut()} > Log Out </Button>
              <Avatar>{((user.signInUserSession.idToken.payload.email).charAt(0)).toUpperCase()}</Avatar>
              </div>
            )
          }
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
