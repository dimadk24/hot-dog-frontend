import React, {Component} from 'react'
import {PublicInfo} from './PublicInfo'
import {ProgressBar} from './ProgressBar'
import {PublicAvatar} from './PublicAvatar'
import './Public.css'

class Public extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCleaning: props.isCleaning,
            cleanProgress: props.cleanTask.progress,
            progressStatus: props.cleanTask.status
        }
    }

    render() {
        return (
            <div className="public-wrapper">
                <div className="public">
                    <div className="public__heading">
                        <PublicAvatar url={this.props.avatar_url}/>
                        <div className="public__heading__name">{this.props.name}</div>
                    </div>
                    <div className="public__info">
                        {this.state.isCleaning ? (
                            <ProgressBar
                                progress={this.state.cleanProgress}
                                status={this.state.progressStatus}
                            />
                        ) : (
                            <PublicInfo
                                peopleCount={this.props.followers}
                                deletedPeople={this.props.dogs}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Public
