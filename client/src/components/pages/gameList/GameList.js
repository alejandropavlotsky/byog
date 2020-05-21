import React, { Component } from 'react'

import './GameList.css'

import GameService from './../../../service/game.service'
import UserService from './../../../service/user.service'

import GameCard from '../gameCard/GameCard'
import GameForm from '../game-form/GameForm'
import SearchBar from './../searchBar/SearchBar'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'

class GameList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalShow: false,
			toast: {
				show: false,
				text: ''
			},
			games: [],
			favorites: []
		}
		this.gameService = new GameService()
		this.userService = new UserService()
	}

	addFavorite = favorite => {
		let favoritesCopy = [...this.state.favorites]
		if (!this.state.favorites.some(alreadyFav => alreadyFav._id === favorite)) {
			favoritesCopy = [...favoritesCopy, favorite]
			this.setState({ ...this.state, favorites: favoritesCopy }, () => {
				this.userService.editUser(this.props.loggedInUser._id, this.state)
			})
		}
	}

	handleModal = visible => this.setState({ modalShow: visible })
	handletoast = (visible, text = '') => {
		const toastCopy = { ...this.state.toast }
		toastCopy.show = visible
		toastCopy.text = text
		this.setState({ toast: toastCopy })
	}

	// handleFavToast = (visible, text = 'Se ha agreagado el juego a tu lista de favoritos') => {
	// 	const toastFavCopy = { ...this.state.toast }
	// 	toastFavCopy.show = visible
	// 	toastFavCopy.text = text
	// 	this.setState({ toast: toastFavCopy })
	// }

	filteredSearch = str => {
		const { gamesCopy } = this.state
		const filteredresults = gamesCopy.filter(game => game.title.toLowerCase().includes(str.toLowerCase()))
		this.setState({ games: filteredresults })
	}

	getAllGames = () => {
		this.gameService
			.getGames()
			.then(response => this.setState({ games: response.data, gamesCopy: response.data }))
			.catch(err => console.log(err))
	}

	componentDidMount = () => {
		this.getAllGames()
	}

	finishGamePost = () => {
		this.getAllGames()
		this.handleModal(false)
		this.handletoast(true, 'El juego se ha creado con éxito!')
	}

	render() {
		return (
			<Container as='section'>
				<h1>Listado de juegos</h1>
				<Col md={{ span: 4, offset: 4 }}>
					{this.props.loggedInUser && (
						<Button
							onClick={() => this.handleModal(true)}
							block
							style={{ marginBottom: '20px' }}
							className='btn-one'>
							Crear nuevo juego
						</Button>
					)}
				</Col>
				<div>
					<SearchBar filteredSearch={this.filteredSearch} />
					{!this.state.games.length && <p>No se encontraron resultados</p>}
				</div>

				<Row className='games-list'>{this.state.games.map(elm => <GameCard key={elm._id} {...elm} addFavorite={() => this.addFavorite(elm._id)} loggedInUser={this.props.loggedInUser}/>)}</Row>

				<Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
					<Modal.Body>
						<GameForm
							loggedInUser={this.props.loggedInUser}
							finishGamePost={this.finishGamePost}
							closeModal={() => this.handleModal(false)}
						/>
					</Modal.Body>
				</Modal>

				<Toast
					onClose={() => this.handletoast(false)}
					show={this.state.toast.show}
					delay={4000}
					autohide>
					<Toast.Header>
						<strong className='mr-auto'>Mensaje</strong>
					</Toast.Header>
					<Toast.Body>{this.state.toast.text}</Toast.Body>
				</Toast>
			</Container>
		)
	}
}

export default GameList
