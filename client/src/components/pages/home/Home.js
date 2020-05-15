import React, { Component } from 'react'
import GameList from './../gameList/GameList'
import EventList from './../eventList/EventList'

class Home extends Component {

    render() {
        return (
            <>
                <GameList />
                <EventList />
                
            </>
            
        )
    }
}

export default Home