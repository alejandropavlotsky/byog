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

    constructor(props) {
        super(props)
        this.state = {
            event: null,
            assistance: [],
            // center: {
            //     lat: props.lat,
            //     lng: props.lng
            // },
            loggedInUser: this.props.loggedInUser
        }
        this.eventService = new EventService()
    }

    // static defaultProps = {
    //     center: {
    //         lat: 40.420524,
    //         lng: -3.705128
    //     },
    //     zoom: 16,
    // }

    handleEventSign = e => {
        this.state.event.assistance.push(this.props.loggedInUser.username)

        this.setState({
            assitance: [...this.state.event.assistance]
        })
        console.log(this.props.loggedInUser.username)

        console.log(this.state.event.assistance)
    }

    getEventInfo() {
        const id = this.props.match.params.eventId
        console.log(this.props)
        this.eventService.getEvent(id)
            .then(response => this.setState({ event: response.data }))
            .catch(err => console.log(err))
    }


    // , () => this.getGoogleMap()


    // getGoogleMap() {
    //     let location = this.state.event.location
    //     let key = "AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM"
    //     axios.get(
    //         `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    //         .then((geores) => {
    //             let latitude = geores.data.results[0].geometry.location.lat
    //             let longitude = geores.data.results[0].geometry.location.lng
    //             this.setState({
    //                 center: {
    //                     lat: latitude,
    //                     lng: longitude
    //                 }
    //             })
    //         })
    // }

    componentDidMount = () => { 
        this.getEventInfo()
    }

    render() {
        if (this.state.event) {
            const {author, title, description, location, attendance, assistance, gameDate, reviews} = this.state.event
            return (
                <Container as="section" className="event-details">
                    <h1>{title}</h1>
    
                    <Row as="article">
                        <Col md={{ span: 5, offset: 1 }}>
                            {/* <div id="map">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyA5zll-K3WnkRdKTRaRgbyeC_JkL76ygyM" }}
                                    center={this.state.center}
                                    defaultZoom={this.props.zoom}>
                                    <div style={{ backgroundImage: "url('../../../../img/marker.png')", width: "26px", height: "29px" }}
                                        lat={this.state.center.lat}
                                        lng={this.state.center.lng}>
                                    </div>
                                </GoogleMapReact>
                            </div> */}
                            <Link to="/events" className="btn btn-success">Volver</Link>
                            {
                                this.state.loggedInUser &&
                                <Button onClick={this.handleEventSign} className="btn btn-success">Apuntarme</Button>   
                            }
                        </Col>
                        <Col md={{ span: 5 }}>
                            <h4>Detalles</h4>
                            <hr />
                            <p> <strong>Autor: </strong> {author.username} </p>
                            <hr />
                            <p> <strong>Descripcion: </strong> {description} </p>
                            <hr />
                            <p> <strong>Direccion: </strong> {location} </p>
                            <hr />
                            <p> <strong>Participantes:  </strong> {attendance} </p>
                            <hr />
                            <p> <strong>Asistentes: </strong> {assistance} </p>
                            <hr/>
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