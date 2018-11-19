import React, {Component} from 'react'
import './modal.scss'

class GroupsModal extends Component {
    render() {
        const {groups} = this.props
        return (
            <div className="modal">
                <div className="modal__body">
                    <div className="modal__body__text">Выберите сообщество</div>
                    <div className="modal__body__content">
                        {groups.map((group) => {
                            return (
                                <div className="group">
                                    <div className="group__details">
                                        <img
                                            src={group.avatar_url}
                                            alt="avatar"
                                        />
                                        {group.name}
                                    </div>
                                    <span className="plus-sign" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupsModal
