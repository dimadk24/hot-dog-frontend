import React, {Component} from 'react'

export class PublicAvatar extends Component {
    render() {
        return <img
            className="public__heading__img"
            src={this.props.url}
            alt="pub img"
        />
    }
}