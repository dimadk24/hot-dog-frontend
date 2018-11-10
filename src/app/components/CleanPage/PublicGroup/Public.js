import React, {Component} from 'react'
import {PublicInfo} from './PublicInfo'
import {ProgressBar} from './ProgressBar'
import {PublicAvatar} from './PublicAvatar'
import './Public.css'
import PropTypes from 'prop-types'

class Public extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        vk_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        followers: PropTypes.number.isRequired,
        dogs: PropTypes.oneOf(PropTypes.number, PropTypes.string).isRequired,
        cleanData: PropTypes.shape({
            isCleaning: PropTypes.bool.isRequired,
            progress: PropTypes.number,
            status: PropTypes.string
        }).isRequired,
        onClean: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="public-wrapper">
                <div className="public">
                    <div className="public__heading">
                        <PublicAvatar url={this.props.avatar_url} />
                        <div className="public__heading__name">
                            {this.props.name}
                        </div>
                    </div>
                    <div className="public__info">
                        {this.props.cleanData.isCleaning ? (
                            <ProgressBar
                                progress={this.props.cleanData.progress}
                                status={this.props.cleanData.status}
                            />
                        ) : (
                            <PublicInfo
                                peopleCount={this.props.followers}
                                deletedPeople={this.props.dogs}
                                onStartClean={() => this.props.onClean(this.props.id)}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Public
