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
        dogs: PropTypes.number.isRequired,
        cleanData: PropTypes.shape({
            isCleaning: PropTypes.bool.isRequired,
            progress: PropTypes.number,
            status: PropTypes.string
        }).isRequired
    }

    // async getCleanTasks() {
    //     return (await axios.get('http://hot-dog.site/api/getCleanTasks', {
    //         params: {
    //             auth_access_token:
    //                 '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844'
    //         }
    //     })).data
    // }

    // async checkCleanTaskProgress() {
    //     const cleanTasks = await this.getCleanTasks()
    //     if (cleanTasks) {
    //         const cleanTask = this.getPublicCleanTask(cleanTasks)
    //         this.updateCleanProgress(cleanTask)
    //         if (this.cleanTaskIsFinished(cleanTask)) {
    //             this.finishCleanTask()
    //         }
    //     } else {
    //         this.setState({isCleaning: false})
    //     }
    // }

    // updateCleanProgress(cleanTask) {
    //     this.setState({
    //         cleanProgress: cleanTask.progress,
    //         progressStatus: cleanTask.status
    //     })
    // }

    // getPublicCleanTask(cleanTasks) {
    //     // noinspection JSUnresolvedVariable
    //     return cleanTasks.filter((item) => item.public_id === this.id)[0]
    // }

    // finishCleanTask() {
    //     setTimeout(() => this.setState({isCleaning: false}), 5000)
    //     clearInterval(this.timerId)
    // }

    // cleanTaskIsFinished(cleanTask) {
    //     return ['Возникла ошибка', 'Завершили'].includes(cleanTask.status)
    // }

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
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Public
