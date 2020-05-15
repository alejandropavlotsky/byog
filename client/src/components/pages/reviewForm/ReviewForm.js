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
            typeOfReview: '',
            author: '',
            loggedInUser: this.props.loggedInUser,
        }
        this.reviewService = new ReviewService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.prevenDefault()
        this.reviewService.saveReview(this.state)
            .then(() => this.props.finishEventPost())
            .catch(err => console.log(err))
    }

    render(){
        return (
            <Container>
                <h1>Nuevo comentario</h1>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control name="text" type="text" size="sm" loggedInUser={this.props.loggedInUser} value={this.state.text} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button variant="success" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Cerrar</Button>
                    <Button variant="success" type="submit">Postear Comentario</Button>
                </Form>
            </Container>
        )
    }

}
export default ReviewForm