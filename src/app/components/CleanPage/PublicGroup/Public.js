import React, {Component} from 'react'
import logo from '../../../../static/images/logo.jpg'
import {PublicInfo} from './PublicInfo'

class Public extends Component {
    constructor(props) {
        super(props)
        this.state = {isCleaning: false, cleanProgress: 0}
    }

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
                        {this.state.isCleaning ? (
                            <ProgressBar progress={this.state.cleanProgress} />
                        ) : (
                            <PublicInfo
                                peopleCount={peopleCount}
                                deletedPeople={deletedPeople}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Public
