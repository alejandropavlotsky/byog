import React, { Component } from 'react'
import EventService from './../../../service/events.service'

import './EventList.css'

import EventCard from '../eventCard/EventCard'
import EventForm from '../eventForm/EventForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'

class EventsList extends Component {
    constructor() {
        super()
        this.state = {
            modalShow: false,
            toast: {
                show: false,
                text: ''
            },
            events: []
        }
        this.eventService = new EventService()
    }


    handleModal = visible => this.setState({ modalShow: visible })
    handleToast = (visible, text = '') => {
        const toastCopy = { ...this.state.toast }
        toastCopy.show = visible
        toastCopy.text = text
        this.setState({ toast: toastCopy })
    }

    getAllEvents = () => {
        this.eventService.getEvents()
            .then(response => this.setState({events: response.data}))
    }

    componentDidMount = () => {
        this.getAllEvents()
    }

    finishEventPost = () => {
        this.getAllEvents()
        this.handleModal(false)
        this.handleToast(true, 'Registro creado en la BBDD')
    }


    render() {
        return (
            <Container as="section">
                <h1>Listado de Eventos</h1>
                <Col md={{ span: 4, offset: 4 }}>
                    {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="success" block style={{ marginBottom: '20px' }}>Crear nuevo evento</Button>}
                </Col>

                <Row className="events-list">
                    {this.state.events.map(elm => <EventCard key={elm._id} {...elm}/>)}
            </Row>

                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EventForm loggedInUser={this.props.loggedInUser} finishEventPost={this.finishEventPost} closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>

                <Toast onClose={() => this.handleToast(false)} show={this.state.toast.show} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Mensaje</strong>
                    </Toast.Header>
                </Toast>
            </Container>
        )
    }
}
export default EventsList