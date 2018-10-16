import React, {Component} from 'react'
import logo from '../../../../static/images/logo.jpg'
import {PublicInfo} from './PublicInfo'
import {ProgressBar} from './ProgressBar'

class Public extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCleaning: true,
            cleanProgress: 0,
            progressStatus: 'Запускаем'
        }
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
                            <ProgressBar
                                progress={this.state.cleanProgress}
                                status={this.state.progressStatus}
                            />
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
