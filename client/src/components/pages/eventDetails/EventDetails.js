import React, { Component } from 'react'
import EventService from '../../../service/events.service'
import moment from 'moment'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'
import GoogleMapReact from 'google-map-react'

import ReviewForm from './../reviewForm/ReviewForm'
import './EventDetails.css'

class EventDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			event: null,
			center: {
				lat: props.lat,
				lng: props.lng
			},
			attendance: 0,
			loggedInUser: this.props.loggedInUser,
			modalShow: false,
			toast: {
				show: false,
				text: ''
			}
		}
		this.eventService = new EventService()
	}

	static defaultProps = {
		center: {
			lat: 40.420524,
			lng: -3.705128
		},
		zoom: 16
	}

	handleModal = visible => this.setState({ modalShow: visible })
	handleToast = (visible, text = '') => {
		const toastCopy = { ...this.state.toast }
		toastCopy.show = visible
		toastCopy.text = text
		this.setState({ toast: toastCopy })
	}

	handleEventSign = e => {
		if (this.state.event.attendance > 0 && !this.state.event.assistance.includes(this.props.loggedInUser.username)) {
			let eventCopy = this.state.event
			eventCopy.assistance.push(this.props.loggedInUser._id)
			eventCopy.attendance -= 1
			this.eventService
				.editEvent(eventCopy)
				.then(response => this.setState({ event: response.data }))
				.catch(err => console.log(err))
		}
	}

	getEventInfo() {
		const id = this.props.match.params.eventId
		this.eventService
			.getEvent(id)
			.then(response => this.setState({ event: response.data }, () => this.getGoogleMap()))
			.catch(err => console.log(err))
	}

	getGoogleMap() {
		let location = this.state.event.location
		let key = 'AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM'
		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`).then(geores => {
			let latitude = geores.data.results[0].geometry.location.lat
			let longitude = geores.data.results[0].geometry.location.lng
			this.setState({
				center: {
					lat: latitude,
					lng: longitude
				}
			})
		})
	}

	componentDidMount = () => {
		this.getEventInfo()
	}

	finishEventPost = () => {
		this.getAllEvents()
		this.handleModal(false)
		this.handleToast(true, 'El comentario se ha creado con Ã©xito!')
	}
	render() {
		if (this.state.event) {
			const { author, title, description, location, attendance, gameDate, reviews, assistance } = this.state.event
			
			const isAttending =
			this.props.loggedInUser &&
			assistance &&
			assistance.length > 0 &&
			assistance.findIndex(user => user._id === this.props.loggedInUser._id) > -1
			return (
				<Container as='section' className='event-details'>
					<h1>{title}</h1>

					<Row as='article'>
						<Col md={{ span: 5, offset: 1 }} className='map-button-event-details'>
							<div id='map'>
								<GoogleMapReact
									bootstrapURLKeys={{ key: 'AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM' }}
									center={this.state.center}
									defaultZoom={this.props.zoom}>
									<div
										style={{
											backgroundImage: "url('../../../../img/marker.png')",
											width: '26px',
											height: '29px'
										}}
										lat={this.state.center.lat}
										lng={this.state.center.lng}
									/>
								</GoogleMapReact>
							</div>
							<div className='event-details-buttons'>
								<Link to='/events' className='btn btn-success btn-one'>
									Volver
								</Link>
								{this.state.loggedInUser && (
									<Button
										onClick={this.handleEventSign}
										disabled={isAttending}
										className='btn btn-success btn-one'>
										Apuntarme
									</Button>
								)}
							</div>
						</Col>
						<Col md={{ span: 5 }}>
							<h4>Detalles</h4>
							<hr />
							<p>
								
								<strong>Autor: </strong> {author.username}
							</p>
							<hr />
							<p>
								
								<strong>Descripci&#243;n: </strong> {description}
							</p>
							<hr />
							<p>

								<strong>Direcci&#243;n: </strong> {location}
							</p>
							<hr />
							<p>
								<strong>Plazas restantes: </strong> {attendance}
							</p>
							<hr />
							<p>
								<strong>Asistentes: </strong>
								{!this.state.event && !this.state.event.assistance ? (
									<p>No hay nadie apuntado, todavía</p>
								) : (
									this.state.event.assistance.map(user => user.username ).join(', ')
								)}
							</p>
							<hr />
							<p>
								<strong>Fecha: </strong> {moment(gameDate).format('DD/MM/YYYY h:mmA')}
							</p>
							<hr />
							{this.props.loggedInUser && (
								<Button
									onClick={() => this.handleModal(true)}
									variant='success'
									block
									style={{ marginBottom: '20px' }}
									className='btn-one'>
									Dejar Rese&ntilde;a
								</Button>
							)}
							<p>
								<strong>Rese&#241;as: </strong> {reviews}
							</p>
						</Col>
					</Row>
					<Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
						<Modal.Body>
							<ReviewForm
								loggedInUser={this.props.loggedInUser}
								eventId={this.state.event._id}
								finishEventPost={this.finishEventPost}
								closeModal={() => this.handleModal(false)}
							/>
						</Modal.Body>
					</Modal>

					<Toast
						variant='success'
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
		} else {
			return (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			)
		}
	}
}
export default EventDetails
