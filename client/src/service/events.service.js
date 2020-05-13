import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/events',
            withCredentials: true
        })
    }

    getEvents = () => this.service.get('/')
    getEvent = eventId => this.service.get(`/${eventId}/details`)
    saveEvent = theEvent => this.service.post(`/new-event`, theEvent)
}