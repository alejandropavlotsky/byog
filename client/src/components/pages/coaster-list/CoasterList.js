import React, { Component } from 'react'
import CoasterService from '../../../service/coasters.service'

import './CoastersList.css'

import CoasterCard from './CoasterCard'
import CoasterForm from './../coaster-form/CoasterForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'


class CoasterList extends Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            toast: {
                show: false,
                text: ''
            },
            coasters: []
        }
        this.coasterService = new CoasterService()
    }


    handleModal = visible => this.setState({ modalShow: visible })
    handletoast = (visible, text = '') => {
        const toastCopy = { ...this.state.toast }
        toastCopy.show = visible
        toastCopy.text = text
        this.setState({ toast: toastCopy })
    }

    getAllCoasters = () => {
        this.coasterService.getCoasters()
            .then(response => this.setState({ coasters: response.data }))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getAllCoasters()
    }


    finishCoasterPost = () => {
        this.getAllCoasters()
        this.handleModal(false)
        this.handletoast(true, 'Registro creado en BBDD')
    }

    render() {
        return (
            <Container as="section">

                <h1>Listado de montañas rusas</h1>

                {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" style={{ marginBottom: '20px' }}>Crear nueva montaña rusa</Button>}

                <Row className="coasters-list">
                    {this.state.coasters.map(elm => <CoasterCard key={elm._id} {...elm} />)}
                </Row>


                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <CoasterForm finishCoasterPost={this.finishCoasterPost} closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>


                <Toast onClose={() => this.handletoast(false)} show={this.state.toast.show} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Mensaje</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.toast.text}</Toast.Body>
                </Toast>


            </Container>
        )
    }
}

export default CoasterList