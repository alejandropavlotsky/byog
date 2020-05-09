import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthService from './../../../service/auth.service'

import { Link } from 'react-router-dom'



class Navigation extends Component {

    constructor(props) {
        super(props)
        this.authService = new AuthService()
    }

    logout = () => {
        this.props.setTheUser(false)
        this.authService.logout()
    }

    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand as="div"><Link to="/">Coasters React!</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as="div"><Link to="/">Inicio</Link></Nav.Link>
                        <Nav.Link as="div"><Link to="/coasters">Montañas rusas</Link></Nav.Link>

                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link as="div"><Link to="/login">Iniciar sesión</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/signup">Registro</Link></Nav.Link>
                                </>

                                :
                                <>
                                    <Nav.Link as="div"><Link to="/profile">Mi perfil</Link></Nav.Link>
                                    <Nav.Link as="div" onClick={this.logout}>Cerrar sesión</Nav.Link>
                                </>

                        }

                    </Nav>
                    <Navbar.Text className="ml-auto"> Hola, {this.props.loggedInUser ? this.props.loggedInUser.username : 'invitad@'}</Navbar.Text>
                </Navbar.Collapse>

            </Navbar>
        )
    }

}

export default Navigation