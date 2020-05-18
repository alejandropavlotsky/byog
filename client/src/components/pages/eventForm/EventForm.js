import React, { Component } from 'react'
import EventService from '../../../service/events.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

class EventForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: props.title || '',
			description: props.description || '',
			author: props.loggedInUser._id,
			location: props.location || '',
			attendance: props.attendance || 0,
			gameTime: props.gameTime || '',
			gameHour: props.gameHour || ''
		}
		this.eventService = new EventService()
	}

	handleInputChange = e => {
		const { name, value, valueAsDate } = e.target
		if (name === 'gameTime' || name === 'gameHour') {
			this.setState({ [`${name}AsDate`]: valueAsDate.toUTCString() })
		}
		this.setState({ [name]: value })
	}

	handleSubmit = e => {
		e.preventDefault()
		const { gameTimeAsDate, gameHourAsDate } = this.state
		const gameHourMoment = moment(gameHourAsDate).parseZone()
		const gameDate = moment(gameTimeAsDate).parseZone().hour(gameHourMoment.hour()).minute(gameHourMoment.minute())
		console.log(gameDate, gameHourMoment, gameHourAsDate)
		this.eventService
			.saveEvent({ ...this.state, gameDate, _id: this.props._id })
			.then(() => this.props.finishEventPost())
			.catch(err => console.log(err))
	}

	render() {
		return (
			<Container>
				<h1>Nuevo Evento</h1>
				<hr />
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='title'>
						<Form.Label>T&#237;tulo</Form.Label>
						<Form.Control
							name='title'
							type='text'
							size='sm'
							value={this.state.title}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.Label>Descripci&#243;n</Form.Label>
						<Form.Control
							name='description'
							type='text'
							size='sm'
							value={this.state.description}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='location'>
						<Form.Label>Direcci&#243;n:</Form.Label>
						<Form.Control
							name='location'
							type='text'
							size='sm'
							value={this.state.location}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='attendance'>
						<Form.Label>Capacidad m&#225;xima de asistentes</Form.Label>
						<Form.Control
							name='attendance'
							type='number'
							size='sm'
							value={this.state.attendance}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='gameTime'>
						<Form.Label>Fecha</Form.Label>
						<Form.Control
							name='gameTime'
							type='date'
							size='sm'
							value={this.state.gameTime}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='gameHour'>
						<Form.Label>Hora</Form.Label>
						<Form.Control
							name='gameHour'
							type='time'
							size='sm'
							value={this.state.gameHour}
							onChange={this.handleInputChange}
						/>
					</Form.Group>

					<Button
						variant='success'
						className='btn-one'
						onClick={() => this.props.closeModal()}
						style={{ marginRight: '10px' }}>
						Cerrar
					</Button>
					<Button variant='success' className='btn-one' type='submit'>
						{this.props.title ? 'Actualizar evento' : 'Crear Evento'}
					</Button>
				</Form>
			</Container>
		)
	}
}

export default EventForm
