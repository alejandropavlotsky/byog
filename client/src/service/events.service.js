import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/events`,
            withCredentials: true
        })
    }

    getEvents = () => this.service.get('/')
    getEvent = eventId => this.service.get(`/${eventId}/details`)
    saveEvent = theEvent => this.service.post(`/new-event`, theEvent)
}