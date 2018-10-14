import React, {Component} from 'react'
import {FaUsers} from 'react-icons/fa/index'
import logo from '../../../../static/images/logo.jpg'
class PublicGroup extends Component {
    render() {
        const {groupName, peopleCount, deletedPeople, isLoading} = this.props
        return (
            <div className="public-wrapper">
                <div className="public">
                    <div className="public__heading">
                        <img
                            className="public__heading__img"
                            src={logo}
                            alt="pub img"
                        />
                        <div className="public__heading__name">{groupName}</div>
                    </div>
                    <div className="public__info">
                        <div className="public__info__container public__info--all">
                            <FaUsers />
                            {peopleCount}
                        </div>
                        <div className="public__info__container public__info--deleted">
                            <FaUsers />
                            {deletedPeople}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicGroup
