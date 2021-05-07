import React from "react"
import {  Card } from "react-bootstrap"

const DiaryCard = ({id , user , title , content ,timestamp}) => {
  return (
    <div>
      <Card className='diary-card'>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
           {user}
          </Card.Subtitle>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
           {timestamp}
          </Card.Subtitle>
          <Card.Text>
            {content}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DiaryCard
