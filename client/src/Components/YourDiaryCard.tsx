import React from "react"
import { Button, Card } from "react-bootstrap"

const YourDiaryCard = ({ id, user, title, content, timestamp, isPublic }) => {
  return (
    <div>
      <Card className="your-diary-card">
        {isPublic ? (
          <Card.Header style={{ color: "green" }}>Public</Card.Header>
        ) : (
          <Card.Header style={{ color: "red" }}>Private</Card.Header>
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{timestamp}</Card.Subtitle>
          <Card.Text>{content}</Card.Text>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default YourDiaryCard
