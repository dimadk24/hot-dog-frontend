import React, {Component} from 'react'
import {connect} from 'react-redux'
import PanelControl from './PanelControl/PanelControl'
import Public from './PublicGroup/Public'
import {bindActionCreators} from 'redux'
import {AddPublicButton} from './PublicGroup/AddPublicButton'
import swal from 'sweetalert'
import axios from 'axios'
import {
    GetGroupsForCleanAndUserGroups,
    cleanGroupByID,
    cleanAllGroups
} from '../../../store/reducers/reducer.clean'
import ReactDOM from 'react-dom'
import {InputModal} from './InputModal'
import {VideoGuide} from './VideoGuide'
import {Redirect} from 'react-router-dom'
import GroupsModal from './PublicGroup/GroupsModal/GroupsModal'
import {history} from '../../../store'

const CLEAN_TASK_ERRORS = ['Возникла ошибка', 'Завершили'] // errors? finished != error

console.log('changes:', document.domain, history)

class CleanPage extends Component {
    state = {
        publics: [],
        redirect: false,
        isAddGroupOpen: false
    }

    componentWillMount() {
        const {GetGroupsForCleanAndUserGroups} = this.props
        GetGroupsForCleanAndUserGroups()
    }

    renderGroups = (groups) => {
        if (!groups.length) return null
        return groups.map(
            (group) => group.inCleanQue && <Public {...group} key={group.id} />
        )
    }

    async startCleanPublicById(publicID) {
        const {setCleaningStateOnGroupByID} = this.props
        const response = await this.startCleanTasks([publicID])
        if ('error' in response) {
            if (response.error.id === 1) {
                const accessToken = await this.getAccessTokenFromUser()
                await this.setAccessToken(accessToken)
                return await this.onStartClean()
            } else if (response.error.id === 2) {
                await this.showNotEnoughMoneyModal(response.error.value)
            }
        } else {
            setCleaningStateOnGroupByID(publicID)
            // this.setGroups(publics)
            this.timerId = setInterval(async () => {
                await this.updateCleanTasks()
                console.log(this)
                await this.props.updateBalance()
            }, 1500)
        }
    }

    async onStartClean() {
        const public_ids = this.getPublicIds()
        const response = await this.startCleanTasks(public_ids)
        if ('error' in response) {
            if (response.error.id === 1) {
                const accessToken = await this.getAccessTokenFromUser()
                await this.setAccessToken(accessToken)
                return await this.onStartClean()
            } else if (response.error.id === 2) {
                await this.showNotEnoughMoneyModal(response.error.value)
            }
        } else {
            const publics = this.setCleaningStateOnPublics()
            this.setGroups(publics)
            this.timerId = setInterval(async () => {
                await this.updateCleanTasks()
                await this.props.updateBalance()
            }, 1500)
        }
    }

    async startCleanTasks(public_ids) {
        return (await axios.post('https://hot-dog.site/api/startCleanTasks', {
            user_vk_id: window.user_id,
            auth_key: window.auth_key,
            public_ids: public_ids
        })).data
    }

    cleanTaskIsFinished(cleanTask) {
        return CLEAN_TASK_ERRORS.includes(cleanTask.status)
    }

    getPublicIds() {
        return this.state.publics.map((item) => item.id)
    }

    async getAccessTokenFromUser() {
        let wrapper = window.document.createElement('div')
        ReactDOM.render(<InputModal />, wrapper)
        let el = wrapper.firstChild
        const response = await swal({
            title: 'Упс. Мы не можем очистить ваши сообщества',
            content: el,
            buttons: {
                confirm: {
                    text: 'Сохранить и запустить!',
                    value: ''
                }
            }
        })
        return this.getAccessTokenFromLink(response)
    }

    async setAccessToken(token) {
        return await axios.patch('https://hot-dog.site/api/setAccessToken', {
            access_token: token,
            user_vk_id: window.user_id,
            auth_key: window.auth_key
        })
    }

    async getCleanTasks() {
        return (await axios.get('https://hot-dog.site/api/getCleanTasks', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key
            }
        })).data
    }

    async updateCleanTasks() {
        const cleanTasks = await this.getCleanTasks()
        if (!(cleanTasks && cleanTasks.length)) {
            clearInterval(this.timerId)
            for (const publik of this.state.publics) {
                await this.refreshPublicById(publik.id)
            }
            await this.showCommentAlert()
            return
        }
        const publics = this.addCleanTaskToGroups(
            this.state.publics,
            cleanTasks
        )
        this.setGroups(publics)
    }

    async refreshPublicById(publicId) {
        const freshPublic = await this.getFreshPublic(publicId)
        freshPublic.cleanData = {
            isCleaning: false
        }
        freshPublic.onClean = async () => {
            await this.startCleanPublicById(freshPublic.id)
        }
        const {publics} = this.state
        const freshPublicIndex = publics.findIndex(
            (item) => item.id === publicId
        )
        publics[freshPublicIndex] = freshPublic
        this.setGroups(publics)
    }

    async getFreshPublic(public_id) {
        return (await axios.get('https://hot-dog.site/api/refreshPublic', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key,
                id: public_id
            }
        })).data
    }

    getAccessTokenFromLink(link) {
        const searchStartStr = '#access_token='
        const searchEndStr = '&expires_in='
        return link.slice(
            link.indexOf(searchStartStr) + searchStartStr.length,
            link.indexOf(searchEndStr)
        )
    }

    getPublicById(publics, public_id) {
        return publics.find((item) => item.id === public_id)
    }

    async showNotEnoughMoneyModal(money) {
        const response = await swal({
            title: 'Упс.. Недостаточно денег',
            icon: 'error',
            text: `Для очистки сообществ нужно еще ${money}р.\nПополните, пожалуйста, баланс`,
            button: {text: 'Пополнить'}
        })
        if (response) this.setState({redirect: '/add_money'})
    }

    async showCommentAlert() {
        const response = await swal({
            title: 'Спасибо!',
            icon: 'success',
            text: 'Оставьте, пожалуйста, отзыв о сервисе :)',
            button: 'Хорошо'
        })
        if (response) this.setState({redirect: '/feedback'})
    }

    toggleModal = () => {
        this.setState({
            isAddGroupOpen: !this.state.isAddGroupOpen
        })
    }

    render() {
        const {isAddGroupOpen} = this.state
        const {groups, cleanAllGroups} = this.props

        return (
            <div className="clean">
                <PanelControl
                    onCleanClick={() =>
                        cleanAllGroups(() => {
                            history.push('/feedback')
                        }, groups)
                    }
                />

                <div className="publics">
                    {groups && this.renderGroups(groups)}
                </div>

                <AddPublicButton onClick={this.toggleModal} />

                {isAddGroupOpen && (
                    <GroupsModal close={this.toggleModal} groups={groups} />
                )}

                <VideoGuide />

                {this.state.redirect && (
                    <Redirect to={this.state.redirect} push />
                )}
            </div>
        )
    }
}

const mapStateToProps = ({clean}) => ({
    groups: clean.groups.data,
    cleanTasks: clean.cleanTasks
})

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            GetGroupsForCleanAndUserGroups,
            setCleaningStateOnGroupByID: cleanGroupByID,
            cleanAllGroups
        },
        dispatch
    )
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CleanPage)
