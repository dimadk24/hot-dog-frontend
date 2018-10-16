import React, {Component} from 'react'
import * as PropTypes from 'prop-types'

export class AddPublicButton extends Component {
    render() {
        return <div
            className="btn btn__add"
            onClick={this.props.onClick}
        >
            Добавить Сообщество
        </div>
    }
}

AddPublicButton.propTypes = {onClick: PropTypes.func}