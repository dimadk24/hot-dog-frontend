import React, {Component} from 'react'

class HeaderControl extends Component {
    render() {
        const {text, children, onClick} = this.props
        return (
            <div className="header-control" onClick={() => onClick()}>
                <div className="header-control__icon">{children}</div>
                <span>{text}</span>
            </div>
        )
    }
}

export default HeaderControl
