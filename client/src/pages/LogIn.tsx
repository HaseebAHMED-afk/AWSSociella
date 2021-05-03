import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import NavBar from '../Components/Navbar'
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

const Login = () => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const handleLogin = () => {
        const newLog = {
            email ,
            password
        }

        console.log(newLog);
        
    }

    return (
        <div>
            <NavBar />
            <div className="login-page">
            <h1 className='login-heading' >Login to continue</h1>
            <Button variant='contained'color='primary' style={{margin: 5 , width:'100%'}} startIcon={<FacebookIcon />} >Log in with Facebook</Button> <br/>
            <Button variant='contained'color='secondary' style={{margin: 5, width:'100%'}} startIcon={<GTranslateIcon />} >Log in with Google</Button>
            <TextField className='login-field' value={email} onChange={(e)=> setEmail(e.target.value) } variant='outlined' color='primary' label='Email' />
            <TextField className='login-field' variant='outlined' value={password} onChange={(e)=> setPassword(e.target.value)} color='primary' label='Password' type='password' />
            <Button variant='outlined'color='primary' onClick={handleLogin} >Log In</Button>
            </div>
            
        </div>
    )
}

export default Login
