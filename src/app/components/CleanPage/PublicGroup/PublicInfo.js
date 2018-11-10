import React, {Component} from 'react'
import {FaBroom, FaUsers} from 'react-icons/fa'
import * as PropTypes from 'prop-types'
import HeaderControl from '../PanelControl/HeaderControl'

export class PublicInfo extends Component {
    render() {
        return <>
            <div className="public__info__container public__info--all">
                <FaUsers/>
                {this.props.peopleCount}
            </div>
            <div className="public__info__container">
                <HeaderControl
                    text="Очистить"
                    onClick={() => this.props.onStartClean()}
                >
                    <FaBroom />
                </HeaderControl>
            </div>
            <div className="public__info__container public__info--deleted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="feather feather-user-x">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="18" y1="8" x2="23" y2="13"></line>
                    <line x1="23" y1="8" x2="18" y2="13"></line>
                </svg>
                {this.props.deletedPeople}
            </div>
        </>
    }
}

PublicInfo.propTypes = {
    peopleCount: PropTypes.any,
    deletedPeople: PropTypes.any
}