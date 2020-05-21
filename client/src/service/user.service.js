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
    editUser = (userId, theEditedUser) => this.service.post(`/${userId}/edit`, theEditedUser)
    addFavorite = (userId, newFavorite) => this.service.put(`/${userId}/add-favorite`, newFavorite)
    deleteFavorite = (userId, favId) => this.service.delete(`/${userId}/remove-favorite/${favId}`)
}