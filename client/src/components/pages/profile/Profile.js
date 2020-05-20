import React, { Component } from 'react'

import UserService from '../../../service/user.service'
import GameService from '../../../service/game.service'
import EventService from '../../../service/events.service'

import './Profile.css'

import moment from 'moment'

import GameForm from './../game-form/GameForm'
import EventForm from './../eventForm/EventForm'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            modalContent: undefined,
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

    handleModal = (visible, modalContent) => this.setState({ modalShow: visible, modalContent })
    handletoast = (visible, text = '') => {
        const toastCopy = { ...this.state.toast }
        toastCopy.show = visible
        toastCopy.text = text
        this.setState({ toast: toastCopy })
    }

    finishGamePost = () => {
        this.handleModal(false, {})
    }
    finishEventPost = () => {
        this.handleModal(false, {})
    }
    
    deleteEvent(eventId) {
        this.EventService.deleteEvent(eventId)
            .then(() => this.getProfileInfo())
            .catch(err => console.log(err))
    }

    deleteGame(gameId) {
        this.GameService.deleteGame(gameId)
            .then(() => this.getProfileInfo())
            .catch(err => console.log(err))

    }

    getProfileInfo(id) {
        this.UserService.getProfileInfo(id)
            .then((response) => this.setState({profileData: response.data}))
    }

    componentDidMount() {
        this.props.loggedInUser ? this.getProfileInfo(this.props.loggedInUser._id) : this.getProfileInfo(this.props.match.params.userId)
    }


    render() {
        const { favorites } = this.props;
        return (
            <>
                <Container>
                    {
                        !this.state.profileData ? null :
                        <>
                        <h1>&#161;Bienvend@, {this.state.profileData.user.username}!</h1>
                            <h1>Mis juegos</h1>
                                <Row className="justify-content-center">    
                                    {
                                        this.state.profileData.games &&
                                        this.state.profileData.games.map(game =>          
                                            <Col md={3} key={game._id} className="profile-game-details">
                                                <p className="btn-one">{game.title}</p>
                                                <img src={game.gameImg} alt="gameImg" className="profile-game-img"/>
                                                <div className="profile-game-details-buttons">
                                                    {this.state.profileData && this.state.profileData.user._id === this.props.loggedInUser._id &&  <Button onClick={() => this.handleModal(true, 'game')} className="btn btn-success btn-sm edit-btn">Editar</Button>}
                                                    {this.state.profileData && this.state.profileData.user._id === this.props.loggedInUser._id &&  <Button onClick={() => this.deleteGame(game._id)} className="btn btn-success btn-sm dlt-btn">Borrar</Button>} 
                                                </div>
                                            </Col>)
                                        }
                                    <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                                        <Modal.Body>
                                            {
                                                this.state.modalContent === 'game' ?
                                                <GameForm loggedInUser={this.props.loggedInUser} finishGamePost={this.finishGamePost} closeModal={() => this.handleModal(false)} />
                                                :
                                                <EventForm loggedInUser={this.props.loggedInUser} finishEventPost={this.finishEventPost} closeModal={() => this.handleModal(false)} />
                                            }
                                        </Modal.Body>
                                    </Modal>
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
                                                    {this.state.profileData && this.state.profileData.user._id === this.props.loggedInUser._id && <Button onClick={() => this.handleModal(true, 'event')} className="btn btn-success btn-sm">Editar</Button>}
                                                    {this.state.profileData && this.state.profileData.user._id === this.props.loggedInUser._id && <Button onClick={() => this.deleteEvent(event._id)} className="btn btn-success btn-sm">Borrar</Button>}
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
                                            this.state.favorites.map(fav =>
                                                <Col md={3} key={fav._id} className="profile-event-details">
                                                    <p>{fav.title}</p>
                                                    <Button onClick={() => this.deleteEvent(fav._id)} className="btn btn-success btn-sm">Borrar</Button>
                                              </Col>)
                                        }
                                    </Row>
                            </>
                    }   */}
                </Container>
            </>
        )
}
}

export default Profile