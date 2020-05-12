import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getEvents = () => this.service.get('/getAllEvents')
    getEvent = eventId => this.service.get(`/getOneEvent/${eventId}`)
    saveEvent = theEvent => this.service.post(`/postEvent`, theEvent)
}