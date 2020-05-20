import React, { Component } from 'react'

import './GameCard.css'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class GameCard extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	

	render() {
		return (
			<Col lg={3} md={6}>
				<Card as='article' className='box'>
					<Card.Img className='card-image' variant='top' src={this.props.gameImg} />
					<Card.Body>
						<Card.Title>{this.props.title}</Card.Title>
						<Link
							to={`/games/${this.props._id}/details`}
							className='btn btn-success btn-block btn-sm btn-one'>
							Ver detalles
						</Link>
						{this.props.loggedInUser && (
							<Button onClick={() => this.props.addFavorite(this.props._id)} loggedInUser={this.state.loggedInUser} variant="success" block style={{ marginBottom: '20px' }}
							className='btn-one'>Agregar a Favoritos</Button>
						)}
					</Card.Body>
				</Card>
			</Col>
		)
	}
}

export default GameCard
