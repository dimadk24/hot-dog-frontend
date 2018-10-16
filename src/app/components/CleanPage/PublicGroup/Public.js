import React, {Component} from 'react'
import {PublicInfo} from './PublicInfo'
import {ProgressBar} from './ProgressBar'
import {PublicAvatar} from './PublicAvatar'
import './Public.css'
import axios from 'axios'

class Public extends Component {
    constructor(props) {
        super(props)
        this.id = props.id
        this.state = {
            isCleaning: props.isCleaning,
            cleanProgress: props.cleanTask? props.cleanTask.progress : 0,
            progressStatus: props.cleanTask ? props.cleanTask.status : ''
        }
    }

    componentWillMount() {
        if (this.state.isCleaning) {
            this.timerId = setInterval(async () => {
                const cleanTasks = (await axios.get(
                    'http://hot-dog.site/api/getCleanTasks',
                    {
                        params: {
                            auth_access_token:
                                '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844'
                        }
                    }
                )).data
                if (cleanTasks && cleanTasks.length) {
                    for (const cleanTask of cleanTasks) {
                        if (this.id === cleanTask.public_id) {
                            this.setState({
                                cleanProgress: cleanTask.progress,
                                progressStatus: cleanTask.status
                            })
                            if (
                                ['Возникла ошибка', 'Завершили'].includes(
                                    cleanTask.status
                                )
                            )
                                setTimeout(
                                    () => this.setState({isCleaning: false}),
                                    2500
                                )
                        }
                    }
                } else {
                    this.setState({isCleaning: false})
                }
            }, 1000)
        }
    }

    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId)
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
