import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './GameDetails.css'

import GameService from '../../../service/game.service'
import ReviewService from '../../../service/review.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class GameDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			game: null,
			loggedInUser: this.props.loggedInUser,
			modalShow: false,
			toast: {
				show: false,
				text: ''
			},
			reviews: []
		}
		this.reviewService = new ReviewService()
		this.gameService = new GameService()
        this.goBack = this.goBack.bind(this);

	}
	

	goBack(){this.props.history.goBack()}
	
    handleModal = visible => this.setState({ modalShow: visible })

    updateReviews(newReview) {
        const reviewCopy = [...this.state.reviews, newReview]
        console.log(reviewCopy)

        this.setState({...this.state, reviews: reviewCopy})
    }

	getGameInfo() {
		console.log(this.props.match.params)
		const id = this.props.match.params.gameId
		this.gameService.getGame(id).then(response => this.setState(response.data)).catch(err => console.log(err))
	}

	componentDidMount = () => {
        this.getGameInfo()
        // this.getGameReviews()
	}

	render() {
		return (
			<Container as='section' className='game-details'>
				<h1>{this.state.title}</h1>
				<Row as='article'>
					<Col md={{ span: 5, offset: 1 }} className='image-button-game-detail'>
						<img src={this.state.gameImg} alt={this.state.title} />
						<Button onClick={this.goBack} className='btn btn-game-details btn-block btn-sm btn-one'>
							Volver
						</Button>
					</Col>
					<Col md={{ span: 5 }}>
						<h4>Detalles</h4>
						<hr />
						<p>
							{' '}
							<strong>Autor:</strong> {this.state.author}
						</p>
						<hr />
						<p>
							{' '}
							<strong>Tema:</strong> {this.state.theme}
						</p>
						<hr />

						<p>
							{' '}
							<strong>Rango de edades:</strong> {this.state.ageRange}
						</p>
						<hr />

						<p>
							{' '}
							<strong>N&#250;mero de Jugadores:</strong> {this.state.numOfPlayers}
						</p>
						<hr />

						<p>
							{' '}
							<strong>Tiempo de Juego:</strong> {this.state.gameTime}
						</p>
						<hr />

						<p>
							{' '}
							<strong>Dificultad:</strong> {this.state.difficulty}
						</p>
						<hr />

						<p>
							{' '}
							<strong>Precio:</strong> {this.state.price}
						</p>
						<hr />

						<p>
							{' '}
							<strong>Idioma:</strong> {this.state.language}
						</p>

						{/* {this.state.loggedInUser && (
							<Button
								onClick={() => this.handleModal(true)}
								block
								style={{ marginBottom: '20px' }}
								className='btn-one'>
								Dejar comentario
							</Button>
                        )} */}
                        {/* <h4>Comentarios</h4>
                        {this.state.games && this.state.games.map(review => <div className="review-box"> <p> <strong>Autor: </strong> {review.author.username} </p> <p>{review.text}</p> </div>)} */}
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 10, offset: 1 }}>
						<h4>Info</h4>
						<p>{this.state.description}</p>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default GameDetails
