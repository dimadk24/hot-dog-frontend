import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class HomePage extends Component {
    render() {
        return (
            <div className="home">
                <div className="intro">
                    <div className="intro__header">
                        <Link
                            to={'/clean'}
                            style={{width: '100%', height: '100%'}}
                        >
                            Очистка от собачек
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
