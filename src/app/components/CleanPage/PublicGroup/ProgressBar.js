import React from 'react'
import './ProgressBar.css'

class ProgressBar extends React.Component {
    render() {
        return (
            <div className="progress-position">
                <span className={'progress-status'}>{this.props.status}</span>
                <div className="progress">
                    <div
                        className="progress-bar main-progress-bar"
                        style={{width: `${this.props.progress}%`}}
                    >
                        <span className="percent">{this.props.progress}%</span>
                    </div>
                </div>
            </div>
        )
    }
}

export {ProgressBar}
