import React from 'react'
import swal from 'sweetalert'
import './InputModal.css'

const OAUTH_LINK =
    `https://oauth.vk.com/authorize?client_id=6726221&redirect_uri=https://dimadk24.github.io/smm-service-frontend/getToken&display=page&response_type=token&v=5.85&scope=groups,offline`
const PLACEHOLDER_ACCESS_TOKEN = 'https://oauth.vk.com/blank.html#access_token=1383bc6d5df7bf74655b531297c71617b2345687ca&expires_in=0&user_id=159204098'

class InputModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: ''}
    }

    changeText(text) {
        this.setState({text: text})
        swal.setActionValue(text)
    }

    render() {
        return (
            <div>
                <div className="modal__text">
                    <p>Нет доступа к управлению вашими сообществами</p>
                    <p>
                        Для решения этой проблемы перейдите, по{' '}
                        <a target="_blank" rel="noopener noreferrer" href={OAUTH_LINK}>этой ссылке</a>.
                    </p>
                    <p>Разрешите доступ нашему приложению</p>
                    <p>
                        ВКонтакте покажет страницу, сообщающую, что не стоит
                        передавать данные из адресной строки
                    </p>
                    <p>
                        Однако, это абсолютно безопасно в случае с нашим
                        приложением
                    </p>
                    <p>Скопируйте целиком URL и вставьте в поле ниже:</p>
                    <input
                        type="text"
                        placeholder={PLACEHOLDER_ACCESS_TOKEN}
                        value={this.state.text}
                        onChange={(e) => {
                            this.changeText(e.target.value)
                        }}
                    />
                    <p>
                        Это необходимо для получения доступа к удалению
                        заблокированных пользователей
                    </p>
                </div>
            </div>
        )
    }
}

export {InputModal}
