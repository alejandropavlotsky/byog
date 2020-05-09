import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const CoasterCard = props => {

    return (
        <Col lg={3} md={6}>
            <Card as="article">
                <Card.Img variant="top" src={props.imageUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Link to={`/coasters/${props._id}`} className="btn btn-dark btn-block btn-sm">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CoasterCard