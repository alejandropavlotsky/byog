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
            <Navbar bg="success" variant="dark" expand="md">
                <Navbar.Brand as="div"><Link to="/"><img src="./../../../../img/logo.png" alt="logo"/></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                  
                            <Nav.Link as="div"><Link to="/">Inicio</Link></Nav.Link>
                            <Nav.Link as="div"><Link to="/games">Juegos</Link></Nav.Link>
                            <Nav.Link as="div"><Link to="/events">Eventos</Link></Nav.Link>

                            {
                                !this.props.loggedInUser ?
                                    <>
                                        <Nav.Link as="div"><Link to="/login">Iniciar sesi&#243;n</Link></Nav.Link>
                                        <Nav.Link as="div"><Link to="/signup">Registro</Link></Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as="div"><Link to="/profile">Mi perfil</Link></Nav.Link>
                                        <Nav.Link as="div" className="nav-link nav-logout" onClick={this.logout}>Cerrar sesi&#243;n</Nav.Link>
                                        <Navbar.Text className="ml-auto"> Hola, {this.props.loggedInUser && this.props.loggedInUser.username}</Navbar.Text>
                                    </>
                            }
          


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }

}

export default Navigation