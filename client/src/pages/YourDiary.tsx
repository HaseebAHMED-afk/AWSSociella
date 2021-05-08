//@ts-nocheck
import React, { useContext , useEffect , useState } from 'react'
import NavBar from '../Components/Navbar'
import { OAuthContext } from '../OAuthContext'
import { getDiaries } from '../graphql/queries'
import { deleteDiary } from '../graphql/mutations'
import {API} from 'aws-amplify' 
import { Button, Card } from "react-bootstrap"
import { Fade } from 'react-reveal'

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
                        <Fade bottom >
                        <Card key={i} className="your-diary-card">
                          {post.isPublic ? (
                            <Card.Header style={{ color: "green" }}>Public</Card.Header>
                          ) : (
                            <Card.Header style={{ color: "red" }}>Private</Card.Header>
                          )}
                          <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{post.timestamp}</Card.Subtitle>
                            <Card.Text>{post.content}</Card.Text>
                            <Button variant="danger" onClick={ async () => {
                                await API.graphql({query: deleteDiary, variables:{
                                    diaryId: post.id
                                }})

                                fetchPost()
                            }} >Delete</Button>
                          </Card.Body>
                        </Card>
                        </Fade>
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
