import React, { Component } from 'react'
import GameList from './../gameList/GameList'
import EventList from './../eventList/EventList'
import './Home.css'

class Home extends Component {

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
                    <GameList />
                    <EventList />

            </>
            
        )
    }
}

export default Home