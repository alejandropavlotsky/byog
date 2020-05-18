import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`,
            withCredentials: true
        })
    }

    getUsers = () => this.service.get('/')
    getUserById = userId => this.service.get(`/${userId}`)
    getProfileInfo = userId => this.service.get(`/${userId}/profile-info`)

}