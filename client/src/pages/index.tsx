//@ts-nocheck
import React, { useContext, useEffect, useState } from "react"
import NavBar from "../Components/Navbar"
import { Jumbotron, Button } from "react-bootstrap"
import { MenuItem, Select, TextField } from "@material-ui/core"
import { nanoid } from 'nanoid'
import random from 'random-name'
import DiaryCard from "../Components/DiaryCard"
import { OAuthContext } from "../OAuthContext"
import moment from 'moment'
import {API} from 'aws-amplify'
import {addDiary} from '../graphql/mutations'
import {getDiaries} from '../graphql/queries'

interface postValues {
  title: string
  content: string
  id: string
  user: string
  isPublic: boolean
  timestamp: string
}

export default function Home() {

  const { user } = useContext<any>(OAuthContext)

  const [data , setData] = useState()


  const [title , setTitle] = useState('')
  const [content , setContent] = useState('')
  const [visible , setVisible] = useState<any>(true)

  const fetchPost = async () => {
    let {data} = await API.graphql({query: getDiaries})
    setData(data.getDiaries)
  }

  useEffect(()=> {fetchPost() }, [])

  const handleSubmit = async () => {

    const newPost : postValues ={
      user: `${user.signInUserSession.idToken.payload.email}`,
      title,
      content,
      id: nanoid(),
      isPublic: visible,
      timestamp: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
    }

    await API.graphql({query:addDiary , variables:{
      diary: newPost
    }})

    fetchPost()
    
    
    setTitle('')
    setContent('')
    
  }

  

  return (
    <div>
      <NavBar />
      {
        !user ? (
          <h1 className='login-heading' >You need to login first.</h1>
        ) : (
          <div>
          <Jumbotron className="home-input">
        <h1>Write words that inspire</h1>
        <TextField
        fullWidth
          label='Title'
          variant='outlined'
          color='primary'
          style={{margin: '15px 0'}}
          value={title}
          onChange={(e) => setTitle(e.target.value) }
        />
        
        <Select 
          value={visible}
          onChange={(e)=> setVisible(e.target.value)}
          placeholder='Visibility'
          variant='outlined'
          style={{width: '50%'}}
        >
          <MenuItem value={true} >Public</MenuItem>
          <MenuItem value={false} >Private</MenuItem>
        </Select>
        <TextField
        fullWidth
          label='Description'
          variant='outlined'
          color='primary'
          style={{margin: '15px 0'}}
          multiline={true}
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value) }
        />
        <Button variant='success' onClick={handleSubmit} >Post</Button>
      </Jumbotron>
       {
         data && data.filter((d)=> d.isPublic === true).map((post , i)=> (
           <DiaryCard id={post.id} user={post.user} title={post.title} content={post.content} timestamp={post.timestamp} />
         ))
       }
      </div>
        )
      }
      
    </div>
  )
}
