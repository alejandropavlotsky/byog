import React, { Component } from 'react'
import EventService from '../../../service/events.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './EventDetails.css'

import { Link } from 'react-router-dom'

class EventDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.eventService = new EventService()
    }

    getEventInfo() {
        const id = this.props.match.params.eventId
        this.eventService.getEvent(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
        
    }

    componentDidMount = () => {
        this.getEventInfo()
    }

    render() {
        return (
            <Container as="section" className="event-details">
                <h1>{this.state.title}</h1>

                <Row as="article">
                    <Col md={{ span: 5, offset: 1 }}>
                        <div id="map"></div>
                        <Link to="/events" className="btn btn-success">Volver</Link>
                    </Col>
                    <Col md={{ span: 5 }}>
                        <h4>Detalles</h4>
                        <hr />
                        <p> <strong>Autor: </strong> {this.state.author} </p>
                        {console.log(this.state)}
                        <hr />
                        <p> <strong>Descripción: </strong> {this.state.description} </p>
                        <hr />
                        <p> <strong>Dirección: </strong> {this.state.location} </p>
                        <hr />
                        <p> <strong>Participantes:  </strong> {this.state.attendance} </p>
                        <hr />
                        <p> <strong>Fecha: </strong> {this.state.gameTime} </p>
                        <hr />
                        <p> <strong>Hora: </strong> {this.state.gameHour} </p>
                        <hr />
                        <p> <strong>Reseñas: </strong> {this.state.reviews} </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default EventDetails