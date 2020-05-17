import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/games`,
            withCredentials: true
        })
    }

    getGames = () => this.service.get('/')
    getGame = gameId => this.service.get(`/${gameId}/details`)
    saveGame = theGame => this.service.post(`/new-game`, theGame)
    editGame = theGameEdit => this.service.put(`/${theGameEdit._id}/edit`, theGameEdit)
    deleteGame = gameId => this.service.delete(`/${gameId}/delete`)
}