import React from 'react'
import { Button, Card } from "react-bootstrap"

const YourDiaryCard = () => {

  let visible = false
    return (
        <div>
            <Card className='your-diary-card'>
              {
                visible ? (
                  <Card.Header style={{color:'green'}} >Public</Card.Header>
                ) : (
                  <Card.Header style={{color:'red'}} >Private</Card.Header>
                )
              }
        <Card.Body>
          <Card.Title>Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
           Date & Time
          </Card.Subtitle>
          <Card.Text>
            Content
          </Card.Text>
          <Button variant='danger' >Delete</Button>
        </Card.Body>
        
      </Card>
        </div>
    )
}

export default YourDiaryCard
