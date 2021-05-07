import React, { useContext, useState } from "react"
import NavBar from "../Components/Navbar"
import { Jumbotron, Button } from "react-bootstrap"
import { TextField } from "@material-ui/core"
import { nanoid } from 'nanoid'
import random from 'random-name'
import DiaryCard from "../Components/DiaryCard"
import { OAuthContext } from "../OAuthContext"

interface postValues {
  title: string
  description: string
  id: string
  user: string
}

export default function Home() {

  const { user } = useContext<any>(OAuthContext)

  console.log(user);
  

  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')

  const handleSubmit = async () => {
    const newPost : postValues ={
      user: `${random.first()} ${random.last()}`,
      title,
      description,
      id: nanoid()
    }

    console.log(newPost);
    
    setTitle('')
    setDescription('')
    
  }

  

  return (
    <div>
      <NavBar />
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
        <TextField
        fullWidth
          label='Description'
          variant='outlined'
          color='primary'
          style={{margin: '15px 0'}}
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
