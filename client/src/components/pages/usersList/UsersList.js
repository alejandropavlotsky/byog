import React, { Component } from 'react'
import UserService from './../../../service/user.service'

import './UserList.css'

import UserCard from './../userCard/UserCard'
import SearchBar from './../searchBar/SearchBar'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class UserList extends Component {
	constructor() {
		super()
		this.state = {
            users: [],
            filteredUsers:[]
		}
		this.userService = new UserService()
	}

	filteredSearch = str => {
		const filteredresults =  this.state.users.filter(user => user.username.toLowerCase().includes(str.toLowerCase()))
        this.setState({ filteredUsers: filteredresults })
	}

	getAllUsers = () => {
		this.userService.getUsers()
			.then(response => this.setState({ users: response.data, filteredUsers: response.data }))
			.catch(err => console.log(err))
	}

	componentDidMount = () => {
        this.getAllUsers()
    }
    
	render() {
		return (
			<Container as='section'>
				<h1>Usuarios</h1>
				<div>
					<SearchBar filteredSearch={this.filteredSearch} />
					{!this.state.users.length && <p>No se encontraron resultados</p>}
				</div>
				<Row className='users-list'>{this.state.filteredUsers.map(user => <UserCard key={user._id} {...user} />)}</Row>
			</Container>
		)
	}
}
export default UserList
