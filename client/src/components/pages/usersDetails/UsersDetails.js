import React, { Component } from 'react'

import UserService from '../../../service/user.service'
import GameService from '../../../service/game.service'
import EventService from '../../../service/events.service'

import moment from 'moment'

import GameList from './../gameList/GameList'
import GameForm from './../game-form/GameForm'
import EventForm from './../eventForm/EventForm'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class UsersDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            toast: {
                show: false,
                text: ''
            },
            profileData: null
        }
        this.UserService = new UserService()
        this.GameService = new GameService()
        this.EventService = new EventService()
    }

    getProfileInfo() {
        this.UserService.getProfileInfo(this.props.loggedInUser._id)
            .then((response) => this.setState({profileData: response.data}))
    }

    componentDidMount() {
        this.getProfileInfo()
    }


    render() {
        const { favorites } = this.props;
        return (
            <>
                <Container>
                    <h1>&#161;Bienvend@, {this.props.loggedInUser.username}!</h1>
                    {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis juegos</h1>
                                    <Row className="justify-content-center">    
                                        {
                                            this.state.profileData.games &&
                                            this.state.profileData.games.map(game =>          
                                                <Col md={3} key={game._id} className="profile-game-details">
                                                    <p className="btn-one">{game.title}</p>
                                                    <img src={game.gameImg} alt="gameImg" className="profile-game-img"/>
                                                    <div className="profile-game-details-buttons">
                                                        <Button onClick={() => this.handleModal(true, game)} className="btn btn-success btn-sm edit-btn">Editar</Button>
                                                        <Button onClick={() => this.deleteGame(game._id)} className="btn btn-success btn-sm dlt-btn">Borrar</Button>
                                                    </div>
                                                </Col>)
                                            }
                                    </Row>
                            </>
                    }
                    
                            
                    {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis Eventos</h1>
                                    <Row className="justify-content-center">
                                        
                                        {
                                            this.state.profileData.events &&
                                            this.state.profileData.events.map(event =>
                                                <Col md={3} key={event._id} className="profile-event-details">
                                                    <p>{event.title}</p>
                                                    <p>{moment(event.gameDate).format("DD/MM/YYYY h:mmA")}</p>
                                                    <Button onClick={() => this.handleModal(true, event)} className="btn btn-success btn-sm">Editar</Button>
                                                    <Button onClick={() => this.deleteEvent(event._id)} className="btn btn-success btn-sm">Borrar</Button>
                                              </Col>)
                                            }
                                    </Row>
                            </>
                    }
                    {/* {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis Juegos Favoritos</h1>
                                    <Row className="justify-content-center">
                                        {
                                            favorites.map(fav =>
                                                <Col md={3} key={fav._id} className="profile-event-details">
                                                    <p>{fav.title}</p>
                                                    <Button onClick={() => this.deleteEvent(fav._id)} className="btn btn-success btn-sm">Borrar</Button>
                                              </Col>)
                                        }
                                    </Row>
                            </>
                    } */}
                </Container>
            </>
        )
}
}

export default UsersDetails