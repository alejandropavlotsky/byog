import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getCoasters = () => this.service.get('/getAllCoasters')
    getCoaster = coasterId => this.service.get(`/getOneCoaster/${coasterId}`)
    saveCoaster = theCoaster => this.service.post(`/postCoaster`, theCoaster)
}