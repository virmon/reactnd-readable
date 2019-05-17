import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { _getCategories } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { connect } from 'react-redux'

class Nav extends Component {
    componentDidMount () {
        const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
        const url = `${api}/categories`
        _getCategories(url)
        .then((data) => {
            this.props.receiveCategories(data.categories)
        });
    }
    onHandleCategory = (cat) => {
        this.props.handleCategory(cat)
    }
    render () {
        const { categories } = this.props
        console.log(categories)
        return (
            <nav className='nav'>
                <ul>
                    <li className='nav-item'>
                        <NavLink to='/new' activeStyle={{color:'#42A5F5'}}>
                            New Post
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink exact to='/' activeStyle={{color:'#42A5F5'}} onClick={() => this.onHandleCategory('all')}>
                            All
                        </NavLink>
                    </li>
                    {
                        categories.map((cat, i) => 
                        <li className='nav-item' key={i}>
                            <NavLink exact to={`/${cat.name}`} activeStyle={{color:'#42A5F5'}} onClick={() => this.onHandleCategory(cat.name)}>
                                {cat.name}
                            </NavLink>
                        </li>
                        )
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps ({ categories }) {
    return {
        categories: !categories ? [] : categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        receiveCategories: (categories) => dispatch(receiveCategories(categories))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)