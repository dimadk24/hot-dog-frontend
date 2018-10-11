import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Navigation extends Component {
    render() {
        return (
            <header className="nav">
                <NavLink className="nav__item" exact to="/">
                    Главная
                </NavLink>
                <NavLink className="nav__item" to="/clean">
                    Очистка
                </NavLink>
            </header>
        )
    }
}

export default Navigation
