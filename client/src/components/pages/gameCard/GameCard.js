import React from 'react'
import './GameCard.css'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const GameCard = props => {

    return (
        <Col lg={3} md={6}>
            <Card as="article" className="box" >
                <Card.Img variant="top" src={props.gameImg} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Link to={`/games/${props._id}/details`} className="btn btn-success btn-block btn-sm btn-one">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default GameCard