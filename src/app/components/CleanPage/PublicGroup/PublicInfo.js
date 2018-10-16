import React, {Component} from 'react'
import {FaUsers} from 'react-icons/fa'
import * as PropTypes from 'prop-types'

export class PublicInfo extends Component {
    render() {
        return <>
            <div className="public__info__container public__info--all">
                <FaUsers/>
                {this.props.peopleCount}
            </div>
            <div className="public__info__container public__info--deleted">
                <FaUsers/>
                {this.props.deletedPeople}
            </div>
        </>
    }
}

PublicInfo.propTypes = {
    peopleCount: PropTypes.any,
    deletedPeople: PropTypes.any
}