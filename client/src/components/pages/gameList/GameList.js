import React, { Component } from 'react'
import GameService from './../../../service/game.service'

import './GameList.css'

import GameCard from '../gameCard/GameCard'
import GameForm from '../game-form/GameForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'


class GameList extends Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            toast: {
                show: false,
                text: ''
            },
            games: []
        }
        this.gameService = new GameService()
    }


    handleModal = visible => this.setState({ modalShow: visible })
    handletoast = (visible, text = '') => {
        const toastCopy = { ...this.state.toast }
        toastCopy.show = visible
        toastCopy.text = text
        this.setState({ toast: toastCopy })
    }

    getAllGames = () => {
        this.gameService.getGames()
            .then(response => this.setState({ games: response.data }))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getAllGames()
    }


    finishGamePost = () => {
        this.getAllGames()
        this.handleModal(false)
        this.handletoast(true, 'Registro creado en BBDD')
    }

    render() {
        return (
            <Container as="section">
            
                <h1>Listado de juegos</h1>
                <Col md={{ span: 4, offset: 4 }}>
                    {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="success" block style={{ marginBottom: '20px' }}>Crear nuevo juego</Button>}

                </Col>


                <Row className="games-list">
                    {this.state.games.map(elm => <GameCard key={elm._id} {...elm} />)}
                </Row>


                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <GameForm loggedInUser={this.props.loggedInUser} finishGamePost={this.finishGamePost} closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>


                <Toast onClose={() => this.handletoast(false)} show={this.state.toast.show} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Mensaje</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.toast.text}</Toast.Body>
                </Toast>


            </Container>
        )
    }
}

export default GameList