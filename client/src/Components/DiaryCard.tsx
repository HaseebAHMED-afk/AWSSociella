import React from "react"
import {  Card } from "react-bootstrap"

const DiaryCard = () => {
  return (
    <div>
      <Card className='diary-card'>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
           User
          </Card.Subtitle>
          <Card.Title>Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
           Date & Time
          </Card.Subtitle>
          <Card.Text>
            Content
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DiaryCard
