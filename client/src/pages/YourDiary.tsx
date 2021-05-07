import { Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import NavBar from '../Components/Navbar'
import YourDiaryCard from '../Components/YourDiaryCard'
import { OAuthContext } from '../OAuthContext'

const YourDiary = () => {

    const { user } = useContext<any>(OAuthContext)
    return (
        <div>
            <NavBar />
            {
                !user ? (
                    <h1 className='login-heading' >You need to login first.</h1>
                ) : (
                    <div>
                    <h1 className='your-diary-heading' >Your Diary</h1>
                    <div className='your-diary-section' >
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    <YourDiaryCard />
                    </div>
                    </div>
                )
            }
          

        </div>
    )
}

export default YourDiary
