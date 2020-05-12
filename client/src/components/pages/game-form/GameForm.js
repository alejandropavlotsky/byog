import React, { Component } from 'react'
import GameService from '../../../service/game.service'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class GameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            length: 0,
            inversions: 0,
            imageUrl: ''
        }
        this.gameService = new GameService()
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

    render() {
        return (
            <Container>

                <h1>Nuevo juego</h1>
                <hr></hr>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="desc">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control name="description" type="text" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="inv">
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control name="inversions" type="text" value={this.state.inversions} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="len">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control name="length" type="text" value={this.state.length} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="img">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control name="imageUrl" type="text" value={this.state.imageUrl} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button variant="dark" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Cerrar</Button>
                    <Button variant="dark" type="submit">Crear juego</Button>
                </Form>
            </Container>
        )
    }
}

export default GameForm