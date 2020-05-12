import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/games',
            withCredentials: true
        })
    }

    getGames = () => this.service.get('/')
    getGame = gameId => this.service.get(`/${gameId}/details`)
    saveGame = theGame => this.service.post(`/new-game`, theGame)
    // editGame = theGameEdit => this.service.put(`/${theGameEdit}/edit`, theGameEdit)
    // deleteGame = theGameDelete => this.service.delete(`/${theGameDelete}/delete`, theGameDelete)
}