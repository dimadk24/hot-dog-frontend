import React, {Component} from 'react'
import './modal.scss'
import Group from './Group'

class GroupsModal extends Component {
    componentDidMount() {
        const html = document.querySelector("html");
        const height = html.scrollHeight;
        document.querySelector('.modal__bg').style.height = `${height}px`
    }

    render() {
        const {groups, close} = this.props
        return (
            <div className="modal">
                <div className="modal__bg" onClick={close} />
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
