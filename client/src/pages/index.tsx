//@ts-nocheck
import React, { useContext, useState } from "react"
import NavBar from "../Components/Navbar"
import { Jumbotron, Button } from "react-bootstrap"
import { MenuItem, Select, TextField } from "@material-ui/core"
import { nanoid } from 'nanoid'
import random from 'random-name'
import DiaryCard from "../Components/DiaryCard"
import { OAuthContext } from "../OAuthContext"
import moment from 'moment'

interface postValues {
  title: string
  description: string
  id: string
  user: string
  visible: boolean
  timestamp: string
}

export default function Home() {

  const { user } = useContext<any>(OAuthContext)

  console.log(user);
  

  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')
  const [visible , setVisible] = useState<any>(true)

  const handleSubmit = async () => {
    const newPost : postValues ={
      user: `${random.first()} ${random.last()}`,
      title,
      description,
      id: nanoid(),
      visible,
      timestamp: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
    }

    console.log(newPost);
    
    setTitle('')
    setDescription('')
    
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
          value={description}
          onChange={(e) => setDescription(e.target.value) }
        />
        <Button variant='success' onClick={handleSubmit} >Post</Button>
      </Jumbotron>
      <DiaryCard />
      <DiaryCard />
      </div>
        )
      }
      
    </div>
  )
}
