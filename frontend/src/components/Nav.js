import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    render () {
        return (
            <nav className='nav'>
                <ul>
                    <li className='nav-item'>
                        <NavLink to='/new' activeStyle={{color:'#42A5F5'}}>
                            New Post
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/new' activeStyle={{color:'#42A5F5'}}>
                            Posts
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/new' activeStyle={{color:'#42A5F5'}}>
                            Category 1
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/new' activeStyle={{color:'#42A5F5'}}>
                            Category 2
                        </NavLink>
                    </li>
                    <li className='nav-item'>Sort By</li>
                </ul>
            </nav>
        )
    }
}

export default Nav