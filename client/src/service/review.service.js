import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/review`,
            withCredentials: true
        })
    }

    getReviews = () => this.service.get('/')
    saveReview = theReview => this.service.post(`/new-post`, theReview)
}