import React, {Component} from 'react'
import './modal.scss'
import Group from './Group'

class GroupsModal extends Component {
    render() {
        const {groups, close} = this.props
        return (
            <div className="modal" onClick={close}>
                <div className="modal__body">
                    <div className="modal__body__text">Выберите сообщество</div>
                    <div className="modal__body__content">
                        {groups.map((group) => {
                            return <Group group={group} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupsModal
