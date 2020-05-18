import React, { Component } from 'react'
import GameService from './../../../service/game.service'
import EventService from './../../../service/events.service'
import { Link } from 'react-router-dom'
import EventCard from './../eventCard/EventCard'
import GameCard from './../gameCard/GameCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            games: [],
            events: []
        }
        this.gameService = new GameService()       
        this.eventService = new EventService()       
    }
    
    getFourGames = () => {
        this.gameService.getGames()
            .then(response => this.setState({ games: response.data }))
            .catch(err => console.log(err))
    }
    getFourEvents = () => { 
        this.eventService.getEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getFourGames()
        this.getFourEvents()
    }
    render() {
        return (
            <>
                <section className="main-section">
                    <div className="fadeIn">
                        <h1>Bienvenido a BYOG </h1>
                        <h2>(bring your own game)</h2>
                        <p>En esta página puedes subir tus propios juegos, ver los juegos que tienen los demás, asistir a eventos creados por los mismos usuarios, dejar opiniones sobre sus juegos, y sobre los eventos a los que has asistido.</p>

                    </div>
                </section>
                <Container>
                    <hr/>
                        <h1>Juegos</h1>
                    <Row>
                        {
                            this.state.games.map((elm, idx) => <GameCard key={idx} {...elm}/>).splice(0,4)
                        }
                        <Col as="div" className="view-more-button">
                            <Link to={`/games`} className="btn btn-success btn-sm btn-one">Ver m&#225;s juegos</Link>
                        </Col>
                    </Row>
                    <hr />
                        <h1>Eventos</h1>
                    <Row>
                         {
                            this.state.events.map((elm, idx) => <EventCard key={idx} {...elm}/>).splice(0,4)
                        }
                        <Col as="div" className="view-more-button">
                            <Link to={`/events`} className="btn btn-success btn-sm btn-one">Ver m&#225;s eventos</Link>
                        </Col>
                    </Row>

                </Container>
            </>
            
        )
    }
}

export default Home