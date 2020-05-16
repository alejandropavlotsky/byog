import React, { Component } from 'react'
import GameService from '../../../service/game.service'
import FileService from '../../../service/file.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './GameForm.css'
const utils = require('../../../utils/gameDificultyOptions')


class GameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            author: '',
            gameImg: '',
            theme: '',
            ageRange: '',
            numOfPlayers: '',
            gameTime: '',
            difficulty: '',
            price: '€',
            language: 'Español',
            owner: props.loggedInUser._id
        }
        this.gameService = new GameService()
        this.filesService = new FileService()
    }


    handleInputChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.gameService.saveGame(this.state)
            .then(() => this.props.finishGamePost())
            .catch(err => console.log(err))
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("gameImg", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => {
                console.log("subida de archivo finalizada", response.data.secure_url)
                this.setState({
                    ...this.state, gameImg: response.data.secure_url 
                })
            })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className="game-form">

                <h1>Nuevo juego</h1>
                <hr></hr>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Nombre del juego</Form.Label>
                        <Form.Control name="title" type="text" size="sm" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control name="description" type="text" size="sm" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="author">
                        <Form.Label>Autor del juego</Form.Label>
                        <Form.Control name="author" type="text" size="sm" value={this.state.author} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="img">
                        <Form.Label>Imagen del juego</Form.Label>
                        <Form.Control name="gameImg" type="file" size="sm" onChange={this.handleFileUpload} />
                    </Form.Group>
                    <Form.Group controlId="theme">
                        <Form.Label>Tematica del juego</Form.Label>
                        <Form.Control name="theme" type="text" size="sm" value={this.state.theme} onChange={this.handleInputChange} />
                    </Form.Group>
                     <Form.Group controlId="ageRange">
                        <Form.Label>Rango de edades</Form.Label>
                                <div key={`inline-radio`} className="mb-3">
                                    <Form.Check name="ageRange" key="+4" inline label="+4"  value="+4"  type="radio" onChange={this.handleInputChange} id={`inline-radio-1`} />
                                    <Form.Check name="ageRange" key="+6" inline label="+6"  value="+6"  type="radio" onChange={this.handleInputChange} id={`inline-radio-2`} />
                                    <Form.Check name="ageRange" key="+8" inline label="+8"  value="+8"  type="radio" onChange={this.handleInputChange} id={`inline-radio-3`} />
                                    <Form.Check name="ageRange" key="+10" inline label="+10" value="+10"  type="radio" onChange={this.handleInputChange} id={`inline-radio-4`} />
                                    <Form.Check name="ageRange" key="+12" inline label="+12" value="+12"  type="radio" onChange={this.handleInputChange} id={`inline-radio-5`} />
                                    <Form.Check name="ageRange" key="+14" inline label="+14" value="+14"  type="radio" onChange={this.handleInputChange} id={`inline-radio-6`} />
                                    <Form.Check name="ageRange" key="+16" inline label="+16" value="+16"  type="radio" onChange={this.handleInputChange} id={`inline-radio-7`} />
                                    <Form.Check name="ageRange" key="+18" inline label="+18" value="+18"  type="radio" onChange={this.handleInputChange} id={`inline-radio-8`} />
                                </div>
                    
                    </Form.Group>
                    <Form.Group controlId="numOfPlayers">
                        <Form.Label>Numero de Jugadores</Form.Label>
                        <Form.Control name="numOfPlayers" type="text" size="sm" value={this.state.numOfPlayers} placeholder="2-4 jugadores" onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="gameTime">
                        <Form.Label>Duracion media de la partida</Form.Label>
                        <Form.Control name="gameTime" type="text" size="sm" value={this.state.gameTime} placeholder="20 minutos"  onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="difficulty">
                        <Form.Label>Dificultad del juego</Form.Label>
                        <Form.Control as="select" name="difficulty" size="sm" value={this.state.difficulty} custom onChange={this.handleInputChange}>
                            {utils.map((elm, idx) => <option key={idx}>{elm.label}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control name="price" type="text" size="sm" value={this.state.price} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="language">
                        <Form.Label>Idioma</Form.Label>
                        <Form.Control name="language" type="text" size="sm" value={this.state.language} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="success" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }} className="btn-one">Cerrar</Button>
                    <Button variant="success" className="btn-one" type="submit">Crear juego</Button>
                </Form>
            </Container>
        )
    }
}

export default GameForm