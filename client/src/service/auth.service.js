import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    signup = ({ username, password }) => this.service.post('/signup', { username, password })
    login = ({ username, password }) => this.service.post('/login', { username, password })
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')
}