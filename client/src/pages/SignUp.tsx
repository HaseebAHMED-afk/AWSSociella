import { TextField } from '@material-ui/core'
import React from 'react'
import { Button } from '@material-ui/core'
import NavBar from '../Components/Navbar'
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

const SignUp = () => {
    return (
        <div>
            <NavBar />
            <div className="login-page">
            <h1 className='login-heading' >Sign up to see great content</h1>
            <Button variant='contained'color='primary' style={{margin: 5 , width:'100%'}} startIcon={<FacebookIcon />} >Sign up with Facebook</Button> <br/>
            <Button variant='contained'color='secondary' style={{margin: 5, width:'100%'}} startIcon={<GTranslateIcon />} >Sign up with Google</Button>
            <TextField className='login-field' variant='outlined' color='primary' label='Email' />
            <TextField className='login-field' variant='outlined' color='primary' label='Password' type='password' />
            <Button variant='outlined'color='primary' >Sign up</Button>
            </div>
        </div>
    )
}

export default SignUp
