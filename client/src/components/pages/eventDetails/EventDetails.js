import React, { Component } from 'react'
import EventService from '../../../service/events.service'
import moment from 'moment'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

import './EventDetails.css'

import { Link } from 'react-router-dom'

class EventDetails extends Component {

    static defaultProps = {
        center: {
        lat: 40.420524,
        lng:  -3.705128
        },
        zoom: 16,

    }

    constructor(props) {
        super(props)
        this.state = {
            event: null,
            center: {
                lat: props.lat,
                lng: props.lng
            }
        }
        this.eventService = new EventService()
    }

    getEventInfo() {
        const id = this.props.match.params.eventId
        this.eventService.getEvent(id)
            .then(response => this.setState({ event: response.data }, () =>  this.getGoogleMap()))
            .catch(err => console.log(err))
    }

    getGoogleMap() {
        let location = this.state.event.location
        let key = "AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM"

        axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
        )
            .then((geoRes) => {
                console.log(geoRes)
                let latitude = geoRes.data.results[0].geometry.location.lat
                let longitude = geoRes.data.results[0].geometry.location.lng
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

    render() {
        if (this.state.event) {
            const {author, title, description, location, attendance,  gameDate, reviews} = this.state.event
            return (
                <Container as="section" className="event-details">
                    <h1>{title}</h1>
    
                    <Row as="article">
                        <Col md={{ span: 5, offset: 1 }}>
                            <div id="map">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM" }}
                                    center={this.state.center}
                                    defaultZoom={this.props.zoom}>
                                    <div style={{backgroundImage: "url('../../../../img/marker.png')", width: "26px", height: "29px"}} lat={this.state.center.lat} lng={this.state.center.lng}>
                                        
                                    </div>
                                </GoogleMapReact>
                            </div>
                            <Link to="/events" className="btn btn-success">Volver</Link>
                            {
                                this.props.loggedInUser &&
                                    <Button to="/events" className="btn btn-success">Apuntarme</Button>
                            }
                        </Col>
                        <Col md={{ span: 5 }}>
                            <h4>Detalles</h4>
                            <hr />
                            <p> <strong>Autor: </strong> {author.username} </p>
                            <hr />
                            <p> <strong>Descripción: </strong> {description} </p>
                            <hr />
                            <p> <strong>Dirección: </strong> {location} </p>
                            <hr />
                            <p> <strong>Participantes:  </strong> {attendance} </p>
                            <hr />
                            <p> <strong>Fecha: </strong> {moment(gameDate).format("DD/MM/YYYY h:mmA")} </p>
                            <hr />
                            <p> <strong>Reseñas: </strong> {reviews} </p>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return <Spinner animation="border" role="status">
                     <span className="sr-only">Loading...</span>
                    </Spinner>
        }
    }
}
export default EventDetails