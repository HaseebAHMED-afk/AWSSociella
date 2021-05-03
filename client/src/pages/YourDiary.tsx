import { Typography } from '@material-ui/core'
import React from 'react'
import NavBar from '../Components/Navbar'
import YourDiaryCard from '../Components/YourDiaryCard'

const YourDiary = () => {
    return (
        <div>
            <NavBar />
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

export default YourDiary
