import React, {Component} from 'react'

class HeaderControl extends Component {
    render() {
        const {text, children} = this.props
        return (
            <div className="header-control">
                <div className="header-control__icon">{children}</div>
                <span>{text}</span>
            </div>
        )
    }
}

export default HeaderControl
