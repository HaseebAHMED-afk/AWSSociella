//@ts-nocheck
import React, { useContext , useEffect , useState } from 'react'
import NavBar from '../Components/Navbar'
import YourDiaryCard from '../Components/YourDiaryCard'
import { OAuthContext } from '../OAuthContext'
import { getDiaries } from '../graphql/queries'
import {API} from 'aws-amplify' 

const YourDiary = () => {

    const { user } = useContext<any>(OAuthContext)
    const [data , setData] = useState()

    
    const fetchPost = async () => {
        let {data} = await API.graphql({query: getDiaries})
        setData(data.getDiaries)
      }
    
      useEffect(()=> {fetchPost() }, [])

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
                    {
                       data && data.filter( (d)=> d.user === user.signInUserSession.idToken.payload.email).map((post,i)=>(
                           <YourDiaryCard id={post.id} user={post.user} title={post.title} content={post.content} timestamp={post.timestamp} isPublic={post.isPublic} />
                       ))
                    }
                    </div>
                    </div>
                )
            }
          

        </div>
    )
}

export default YourDiary
