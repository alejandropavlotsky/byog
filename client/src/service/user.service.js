import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getUserById = userId => this.service.get(`/${userId}`)
    getProfileInfo = userId => this.service.get(`/${userId}/profile-info`)

}