import React, {Component} from 'react'

class GroupsControl extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="public-list">
                            <div className="header">
                                <div className="header-checkbox" />
                                <div className="header-name">
                                    <span>Сообщество</span>
                                </div>
                                <div className="header-left">
                                    <div className="header-followers-count">
                                        <span>Подписчиков</span>
                                    </div>
                                    <div className="header-gods-count">
                                        <span>Собачек</span>
                                    </div>
                                </div>
                            </div>
                            <div className="publics">
                                <div className="public flex-column flex-md-row">
                                    <div className="left-position">
                                        <div className="checkbox">
                                            <label className="custom-control label-res custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    name="example-checkbox1"
                                                    id="check-box1"
                                                />
                                                <span className="custom-control-label ccl-new" />
                                            </label>
                                        </div>
                                        <div className="">
                                            <img
                                                src="assets/images/avatars/logo.jpg"
                                                alt="Мой ПК"
                                                className="avatar avatar-md"
                                            />
                                        </div>
                                        <div className="name">
                                            <label
                                                className="public-text-name"
                                                htmlFor="check-box1"
                                            >
                                                Мой Компьютер
                                            </label>
                                        </div>
                                    </div>
                                    <div className="right-position">
                                        <div className="followers-count">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="feather feather-users"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            <span className="count">
                                                500 000
                                            </span>
                                        </div>
                                        <div className="dogs-count">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="feather feather-user-x"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <line
                                                    x1="18"
                                                    y1="8"
                                                    x2="23"
                                                    y2="13"
                                                />
                                                <line
                                                    x1="23"
                                                    y1="8"
                                                    x2="18"
                                                    y2="13"
                                                />
                                            </svg>
                                            <span className="count">10</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="public flex-column flex-md-row">
                                    <div className="left-position">
                                        <div className="checkbox">
                                            <label className="custom-control label-res custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    name="example-checkbox1"
                                                    id="check-box2"
                                                />
                                                <span className="custom-control-label ccl-new" />
                                            </label>
                                        </div>
                                        <div className="">
                                            <img
                                                src="assets/images/avatars/logo.jpg"
                                                alt="Мой ПК"
                                                className="avatar avatar-md"
                                            />
                                        </div>
                                        <div className="name">
                                            <label
                                                className="public-text-name"
                                                htmlFor="check-box1"
                                            >
                                                Мой Компьютер
                                            </label>
                                        </div>
                                    </div>
                                    <div className="progress-position">
                                        <span>Lorem text</span>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style="width: 84%;"
                                            >
                                                <span className="percent">
                                                    84%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupsControl
