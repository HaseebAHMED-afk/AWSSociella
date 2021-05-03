import { Avatar } from '@material-ui/core'
import React from 'react'
import NavBar from '../Components/Navbar'

const You = () => {
    return (
        <div>
            <NavBar />
            <div className='profile-page' >
            <Avatar className='profile-avatar'>H</Avatar>
            <div className='profile-details' >
                <h1 className="fName">Firstname</h1>
                <h1 className="lName">Lastname</h1>
            </div>
            <div className='profile-details' style={{display:'block'}} >
                <h2 className="userName">Username</h2>
                <p>points</p>
            </div>
            </div>
        </div>
    )
}

export default You
