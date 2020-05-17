import React, { Component } from 'react'

import './SearchBar.css'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchBar: ''
		}
	}
	handleChange = e => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		this.setState({
			[e.target.name]: value
		})
	}
	handleSearch = e => {
		this.handleChange(e)
		this.props.filteredSearch(e.target.value)
	}

	render() {
		return (
				<form className="search-bar">
						<input
							type='text'
							name='searchBar'
							value={this.state.searchBar}
							onChange={this.handleSearch}
							className='search-bar'
							placeholder='Buscar'
						/>
				</form>
		)
	}
}

export default SearchBar
