import React, { Component } from 'react'

import './EventList.css'

import EventService from './../../../service/events.service'

import EventCard from '../eventCard/EventCard'
import EventForm from '../eventForm/EventForm'
import SearchBar from './../searchBar/SearchBar'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'

class EventsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalShow: false,
			toast: {
				show: false,
				text: ''
			},
			events: [],
			filteredEvents: []

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
    
    filteredSearch = str => {
		const filteredresults =  this.state.events.filter(event => event.title.toLowerCase().includes(str.toLowerCase()))
        this.setState({ filteredEvents: filteredresults })
	}

	getAllEvents = () => {
		this.eventService.getEvents().then(response => this.setState({ events: response.data, filteredEvents: response.data }))
	}

	componentDidMount = () => {
		this.getAllEvents()
	}

	finishEventPost = () => {
		this.getAllEvents()
		this.handleModal(false)
		this.handleToast(true, 'El evento se ha creado con éxito')
	}

	render() {
		return (
			<Container as='section'>
				<h1>Listado de Eventos</h1>
				<Col md={{ span: 4, offset: 4 }}>
					{this.props.loggedInUser && (
						<Button
							onClick={() => this.handleModal(true)}
							block
							style={{ marginBottom: '20px' }}
							className='btn-one'>
							Crear nuevo evento
						</Button>
					)}
                </Col>
                <div>
					<SearchBar filteredSearch={this.filteredSearch} />
					{!this.state.events.length && <p>No se encontraron resultados</p>}
				</div>

				<Row className='events-list'>{this.state.filteredEvents.map(elm => <EventCard key={elm._id} {...elm} />)}</Row>

				<Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
					<Modal.Body>
						<EventForm
							loggedInUser={this.props.loggedInUser}
							finishEventPost={this.finishEventPost}
							closeModal={() => this.handleModal(false)}
						/>
					</Modal.Body>
				</Modal>

				<Toast onClose={() => this.handleToast(false)} show={this.state.toast.show} delay={4000} autohide>
					<Toast.Header>
						<strong className='mr-auto'>Mensaje</strong>
					</Toast.Header>
					<Toast.Body>{this.state.toast.text}</Toast.Body>
				</Toast>
			</Container>
		)
	}
}
export default EventsList
