import React, { Component } from 'react'
import CoasterService from '../../../service/coasters.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './CoasterDetails.css'

import { Link } from 'react-router-dom'

class CoasterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.coasterService = new CoasterService()
    }


    getCoasterInfo() {
        const id = this.props.match.params.coasterId
        this.coasterService.getCoaster(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getCoasterInfo()
    }

    render() {
        return (
            <Container as="section" className="coaster-details">
                <h1>{this.state.title}</h1>
                <hr />
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <h4>Info</h4>
                        <p>{this.state.description}</p>
                        <h4>Detalles técnicos</h4>
                        <ul>
                            <li>Longitud: {this.state.length}</li>
                            <li>Inversiones: {this.state.inversions}</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <img src={this.state.imageUrl} alt={this.state.title}></img>
                    </Col>
                </Row>
                <Link to="/coasters" className="btn btn-dark">Volver</Link>
            </Container>
        )
    }
}

export default CoasterDetails