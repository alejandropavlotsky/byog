import React from 'react'
import { Link } from 'react-router-dom'

import './UserCard.css'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const UserCard = props => {
	return (
		<Col lg={3} md={6}>
			<Card as='article' className='box'>
				<Card.Img className='card-image-user' variant='top' src={props.userImage} />
				<Card.Body>
					<Card.Title>{props.username}</Card.Title>
					<Link
						to={`/users/${props._id}`}
						className='btn btn-block btn-sm btn-one'>
						Ver detalles
					</Link>
				</Card.Body>
			</Card>
		</Col>
	)
}
export default UserCard
