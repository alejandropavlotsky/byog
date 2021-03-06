import React from 'react'
import { Link } from 'react-router-dom'

import './EventCard.css'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const EventCard = props => {
    return (
        <Col lg={3} md={6} className="class-card card-event">
            <Card as="article" className="card-zoom card-zoom--inverted">
                <Card.Body className="card-zoomed">
                    <Card.Title>{props.title}</Card.Title>
                    <div className="name-and-image">
                        <Card.Img variant="top" src={props.author.userImage} alt="user Image" className="user-image" />
                        <Card.Text>{props.author.username}</Card.Text>

                    </div>
                    <Card.Text>{props.location}</Card.Text>

                    <Link to={`/events/${props._id}/details`} className="btn btn-block btn-sm btn-one">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default EventCard