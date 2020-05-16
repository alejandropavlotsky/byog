import React, { Component } from 'react'
import UserService from '../../../service/user.service'
import './Profile.css'
import moment from 'moment'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: null
        }
        this.UserService = new UserService()
    }

    componentDidMount() {
        this.UserService.getProfileInfo(this.props.loggedInUser._id)
        
            .then((response) => {
                console.log(response.data)
                this.setState({profileData: response.data})
            })
    }


    render() {
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
                                                        <Button className="btn btn-success btn-sm edit-btn">Editar</Button>
                                                        <Button className="btn btn-success btn-sm dlt-btn">Borrar</Button>
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
                                                <Col md={3} key={event._id}>
                                                    <p>{event.title}</p>
                                                    <p>{moment(event.gameDate).format("DD/MM/YYYY h:mmA")}</p>
                                                    <Button className="btn btn-success btn-sm">Editar</Button>
                                                    <Button className="btn btn-success btn-sm">Borrar</Button>
                                              </Col>)
                                            }
                                      
                                    </Row>
                            </>
                    }
                    {/* {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis reviews</h1>
                                    <Row>
                                        <Col md={3}>
                                        {
                                            this.state.profileData.reviews &&
                                            this.state.profileData.reviews.map(review => <p key={review._id}>{review.text}{}</p>)
                                            }
                                        </Col>
                                    </Row>
                            </>
                    } */}
                </Container>
            </>
        )
}
}

export default Profile