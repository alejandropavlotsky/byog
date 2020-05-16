import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './pages/home/Home'
import GameService from './../service/game.service'
import EventService from './../service/events.service'
import Navigation from './ui/navbar/Navbar'
import GameList from './pages/gameList/GameList'
import GameDetails from './pages/game-details/GameDetails'
import EventsList from './pages/eventList/EventList'
import EventDetails from './pages/eventDetails/EventDetails'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Footer from './ui/footer/Footer'
import AuthService from './../service/auth.service'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null,
      games: [],
      events: []
    }
    this.authService = new AuthService()
    this.gameService = new GameService()
    this.eventService = new EventService()
  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))

    render() {
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <main>

          <Switch>
            <Route path="/" exact render={props => <Home {...props}/>}/>
            <Route path="/games" exact render={() => <GameList loggedInUser={this.state.loggedInUser} />} />
            <Route path="/games/:gameId/details" exact render={props => <GameDetails {...props} />} />
            <Route path="/events" exact render={() => <EventsList loggedInUser={this.state.loggedInUser} />} />
            <Route path="/events/:eventId/details" exact render={props => <EventDetails {...props} loggedInUser={this.state.loggedInUser} />} />


            <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
            <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          </Switch>

        </main>
        <Footer/>
      </>
    )
  }
}

export default App
