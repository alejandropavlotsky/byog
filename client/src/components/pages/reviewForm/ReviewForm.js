import React, { Component } from 'react'

import ReviewService from '../../../service/review.service'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class ReviewForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            text: '',
            author: props.loggedInUser._id,
            reviewedInEvent: props.eventId,
        }
        this.reviewService = new ReviewService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    finishAction = () => {
        this.props.closeModal()
        this.props.refreshReviews()
    }

    handleSubmit = e => {
        e.preventDefault()
        this.reviewService.saveReview(this.state)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
        
    }


    render() {

        return (
            <Container>
                <h1>Nuevo comentario</h1>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control name="text" type="text" size="sm" value={this.state.text} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button className="btn-one" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Cerrar</Button>
                    <Button className="btn-one" type="submit">Postear Comentario</Button>
                </Form>
            </Container>
        )
    }

}
export default ReviewForm