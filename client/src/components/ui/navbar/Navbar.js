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
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                            <Nav.Link as="div"><Link to="/games" className="btnnav btn-one">Juegos</Link></Nav.Link>
                            <Nav.Link as="div"><Link to="/events" className="btnnav btn-one">Eventos</Link></Nav.Link>
                            <Navbar.Brand as="div"><Link to="/"><img src="./../../../../img/logo.png" alt="logo"/></Link></Navbar.Brand>    
                            {
                                !this.props.loggedInUser ?
                                    <>
                                        <Nav.Link as="div"><Link to="/login" className="btnnav btn-one">Iniciar sesi&#243;n</Link></Nav.Link>
                                        <Nav.Link as="div"><Link to="/signup" className="btnnav btn-one">Registro</Link></Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as="div"><Link to="/profile" className="btnnav btn-one">Mi perfil</Link></Nav.Link>
                                        <Nav.Link as="div" className="nav-link nav-logout btnnav btn-one" onClick={this.logout} >Cerrar sesi&#243;n</Nav.Link>
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