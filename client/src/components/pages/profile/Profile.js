import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
            editableObject: {},
            // toast: {
            //     show: false,
            //     text: ''
            // },
            profileData: null
        }
        this.UserService = new UserService()
        this.GameService = new GameService()
        this.EventService = new EventService()
        this.goBack = this.goBack.bind(this);
    }

    goBack(){this.props.history.goBack()}

    handleModal = (visible, modalContent = '', object = {}) => this.setState({ modalShow: visible, modalContent, editableObject: object })
    // handletoast = (visible, text = '') => {
    //     const toastCopy = { ...this.state.toast }
    //     toastCopy.show = visible
    //     toastCopy.text = text
    //     this.setState({ toast: toastCopy })
    // }

    finishGamePost = () => {
        this.handleModal(false, {})
    }
    finishEventPost = () => {
        this.handleModal(false, {})
    }
    
    deleteEvent(eventId) {
        this.EventService.deleteEvent(eventId)
            .then(() => this.getProfileInfo(this.props.loggedInUser._id))
            .catch(err => console.log(err))
    }

    deleteGame(gameId) {
        this.GameService.deleteGame(gameId)
            .then(() => this.getProfileInfo( this.props.loggedInUser._id))
            .catch(err => console.log(err))
    }
    deleteFavorite(favId) {
        this.UserService.deleteFavorite(this.props.loggedInUser._id, favId)
            .then(() => this.getProfileInfo(this.props.loggedInUser._id))
            .catch(err => console.log(err))
    }

    getProfileInfo(id) {
        this.UserService.getProfileInfo(id)
            .then((response) => this.setState({profileData: response.data}))
    }

    componentDidMount() {
        this.props.loggedInUser ? this.getProfileInfo(this.props.loggedInUser._id) : this.getProfileInfo(this.props.match.params.userId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match && prevProps.match.params && prevProps.match.params.userId && this.props.loggedInUser) {
            this.getProfileInfo(this.props.loggedInUser._id)
        }
    }


    render() {
        this.state.profileData && 
            console.log(this.state.profileData.user, "|", this.props.profileData)
        
        return (
            <>
                <Container>
                    {
                        this.state.profileData &&
                        <>
                            {this.props.loggedInUser ?  <><h1>&#161;Bienvend@, {this.props.loggedInUser.username}!</h1><h1>Mis juegos</h1> </> : <div className="back-button-users"><h1>Los juegos de {this.state.profileData.user.username}</h1><Button onClick={this.goBack} className="btn-one btn-sm edit-btn">Volver</Button></div>}
                                <Row className="justify-content-center">
                                    {
                                        this.state.profileData.games &&
                                        this.state.profileData.games.map(game =>          
                                            <Col lg={3} md={5} key={game._id} className="profile-game-details">
                                                <Link to={`/games/${game._id}/details`}>
                                                    <p className="btn-one btn-game-title">{game.title}</p>
                                                    <img src={game.gameImg} alt="gameImg" className="profile-game-img"/>
                                                </Link>
                                                    <div className="profile-game-details-buttons">
                                                        {this.state.profileData.user && this.props.loggedInUser && this.props.loggedInUser._id === this.state.profileData.user._id && <Button onClick={() => this.handleModal(true, 'game', game)} className="btn-sm edit-btn btn-one">Editar</Button>}
                                                        {this.state.profileData.user &&  this.props.loggedInUser && this.props.loggedInUser._id === this.state.profileData.user._id && <Button onClick={() => this.deleteGame(game._id)} className="btn-sm edit-btn btn-one">Borrar</Button>} 
                                                    </div>
                                            </Col>)
                                    }
                                    <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                                        <Modal.Body>
                                            {
                                            this.state.modalContent === 'game' ?
                                                
                                                <GameForm  loggedInUser={this.props.loggedInUser} finishGamePost={this.finishGamePost} closeModal={() => this.handleModal(false)} {...this.state.editableObject}/>
                                                :
                                                <EventForm loggedInUser={this.props.loggedInUser} finishEventPost={this.finishEventPost} closeModal={() => this.handleModal(false)} {...this.state.editableObject}/>
                                            }
                                        </Modal.Body>
                                    </Modal>
                                </Row>
                        </>
                    }       
                    {
                        this.state.profileData &&
                            <>
                                {this.props.loggedInUser ? <h1>Mis Eventos</h1> : <div className="back-button-users"><h1>Los eventos de {this.state.profileData.user.username}</h1></div>}
                                        <Row className="justify-content-center">
                                            {
                                                this.state.profileData.events &&
                                                this.state.profileData.events.map(event =>
                                                    <Col md={4} key={event._id} className="profile-event-details">
                                                         <Link to={`/events/${event._id}/details`}>
                                                            <p>{event.title}</p>
                                                            <p>{moment(event.gameDate).format("DD/MM/YYYY h:mmA")}</p>
                                                        </Link>
                                                            <div className="profile-event-details-buttons">
                                                                {this.state.profileData.user  && this.props.loggedInUser && this.props.loggedInUser._id === this.state.profileData.user._id && <Button onClick={() => this.handleModal(true, 'event', event)}  className="btn btn-sm btn-one btn-edit-event edit-btn">Editar</Button>}
                                                                {this.state.profileData.user  && this.props.loggedInUser && this.props.loggedInUser._id === this.state.profileData.user._id && <Button onClick={() => this.deleteEvent(event._id)} className="btn btn-sm btn-one btn-edit-event edit-btn">Borrar</Button>}
                                                            </div>
                                                    </Col>
                                                )
                                                }
                                        </Row>
                            </>
                    }
                    {
                        this.state.profileData &&
                            <>
                                {this.props.loggedInUser ? <h1>Mis Juegos Favoritos</h1> : <div className="back-button-users"><h1>Los Favoritos de {this.state.profileData.user.username}</h1></div>}
                                    <Row className="justify-content-center">
                                {
                                    this.state.profileData.user.favorites.length ?
                                    this.state.profileData.user.favorites.map(fav =>
                                        <Col md={3} key={fav._id} className="profile-game-details">
                                            <p>{fav.title}</p>
                                            <img src={fav.gameImg} alt="gameImg" className="profile-game-img" />
                                            {this.props.loggedInUser && this.props.loggedInUser._id === this.state.profileData.user._id && <Button onClick={() => this.deleteFavorite(fav._id)} className="btn edit-btn btn-sm btn-one">Quitar de favoritos</Button>}
                                        </Col>)
                                        
                                        :
                                        this.props.loggedInUser &&
                                        <p>No tienes juegos agregados a tu lista de favoritos. Ve a la sección <Link to="/games" className="game-button"> juegos</Link> y agrega algunos </p>
                                }
                                    </Row>
                            </>
                    }  
                </Container>
            </>
        )
}
}

export default Profile