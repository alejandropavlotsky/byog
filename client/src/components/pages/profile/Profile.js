import React, { Component } from 'react'
import UserService from '../../../service/user.service'
import './Profile.css'
import Card from 'react-bootstrap/Card'
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
                                    <Row>
                                        <Col md={3}>
                                            {
                                            this.state.profileData.games.map(game =>          
                                                    <Card key={game._id}>{game.title}
                                                        <Button className="btn btn-success btn-sm">Editar</Button>
                                                        <Button className="btn btn-success btn-sm">Borrar</Button>
                                                    </Card>)
                                            }
                                            
                                        </Col>
                                    </Row>
                            </>
                    }
                    {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis Eventos</h1>
                                    <Row>
                                        <Col md={3}>
                                            {
                                            this.state.profileData.events.map(event =>
                                                <p key={event._id}>{event.title}
                                                    <Button className="btn btn-success btn-sm">Editar</Button>
                                                    <Button className="btn btn-success btn-sm">Borrar</Button>
                                            </p>)
                                            }
                                        </Col>
                                    </Row>
                            </>
                    }
                    {
                        !this.state.profileData ? null :
                            <>
                                <h1>Mis reviews</h1>
                                    <Row>
                                        <Col md={3}>
                                            {
                                            this.state.profileData.reviews.map(review => <p key={review._id}>{review.text}</p>)
                                            }
                                        </Col>
                                    </Row>
                            </>
                    }
                </Container>
            </>
        )
}
}

export default Profile