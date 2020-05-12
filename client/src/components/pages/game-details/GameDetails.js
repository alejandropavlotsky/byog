import React, { Component } from 'react'
import GameService from '../../../service/game.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './GameDetails.css'

import { Link } from 'react-router-dom'

class GameDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.gameService = new GameService()
    }


    getGameInfo() {
        const id = this.props.match.params.gameId
        this.gameService.getGame(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getGameInfo()
    }

    render() {
        return (
            <Container as="section" className="game-details">
                <h1>{this.state.title}</h1>
                <Row as="article">
                    <Col md={{span: 5, offset: 1}} className="image-button-game-detail">
                        <img src={this.state.gameImg} alt={this.state.title}></img>
                        <Link to="/games" className="btn btn-success">Volver</Link>
                    </Col>
                    <Col md={{ span: 5 }}>
                        <h4>Detalles</h4>
                        <hr/>
                        <p> <strong>Autor:</strong> {this.state.author}</p>
                        <hr/>
                        <p> <strong>Tema:</strong> {this.state.theme}</p>
                        <hr/>

                        <p> <strong>Rango de edades:</strong> {this.state.ageRange}</p>
                        <hr/>

                        <p> <strong>Numero de Jugadores:</strong> {this.state.numOfPlayers}</p>
                        <hr/>

                        <p> <strong>Tiempo de Juego:</strong> {this.state.gameTime}</p>
                        <hr/>

                        <p> <strong>Dificultad:</strong> {this.state.difficulty}</p>
                        <hr/>

                        <p> <strong>Precio:</strong> {this.state.price}</p>
                        <hr/>

                        <p> <strong>Idioma:</strong> {this.state.language}</p>                       
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                         <h4>Info</h4>
                        <p>{this.state.description}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameDetails