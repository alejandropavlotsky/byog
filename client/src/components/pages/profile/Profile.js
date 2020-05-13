import React, { Component } from 'react'
import UserService from '../../../service/user.service'

import Card from 'react-bootstrap/Card'


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
                <h1>¡Bienvend@, {this.props.loggedInUser.username}!</h1>
                {
                    !this.state.profileData ? null :
                        <>
                        <h1>Mis juegos</h1>
                            <Card>
                                {
                                    this.state.profileData.games.map(game => <p key={game._id}>{game.title}</p> )
                                }
                            </Card>
                        </>
                }
                  {
                    !this.state.profileData ? null :
                        <>
                            <h1>Mis Eventos</h1>
                            <Card>
                                {
                                    this.state.profileData.events.map(event => <p key={event._id}>{event.title}</p> )
                                }
                            </Card>
                        </>
                }
                   {
                    !this.state.profileData ? null :
                        <>
                            <h1>Mis reviews</h1>
                            <Card>
                                {
                                    this.state.profileData.reviews.map(review => <p key={review._id}>{review.text}</p> )
                                }
                            </Card>
                        </>
                }
            </>
        )
}
}

export default Profile