import React, {Component} from 'react'
import "./modal.scss"

class GroupsModal extends Component {
    render() {
        return (
            <div className="modal">
                <div className='modal__body'>
                    <div className='modal__body__text'>Выберите сообщество</div>
                    <div className='modal__body__content'>
                        Сообщества пользователя...
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupsModal