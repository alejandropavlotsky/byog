import React, { Component } from 'react'
import EventService from '../../../service/events.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            author: props.loggedInUser._id,
            location: '',
            attendance: 0,
            gameTime: '',
            gameHour: ''
        }
        this.eventService = new EventService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.eventService.saveEvent(this.state)
            .then(() => this.props.finishEventPost())
            .catch(err => console.log(err))
}

    render() {
        return (
            <Container>
                <h1>Nuevo Evento</h1>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control name="title" type="text" size="sm" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripci?n</Form.Label>
                        <Form.Control name="description" type="text" size="sm" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Direcci?n:</Form.Label>
                        <Form.Control name="location" type="text" size="sm" value={this.state.location} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="attendance">
                        <Form.Label>Capacidad máxima</Form.Label>
                        <Form.Control name="attendance" type="number" size="sm" value={this.state.attendance} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="gameTime">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control name="gameTime" type="date" size="sm" value={this.state.gameTime} onChange={this.handleInputChange} />
                    </Form.Group>
                     <Form.Group controlId="gameHour">
                        <Form.Label>Hora</Form.Label>
                        <Form.Control name="gameHour" type="time" size="sm" value={this.state.gameHour} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="success" onClick={() => this.props.closeModal()} style={{marginRight: "10px"}}>Cerrar</Button>
                    <Button variant="success" type="submit">Crear Evento</Button>
                </Form>
            </Container>
        )
    }
}

export default EventForm