import React, {Component} from 'react'
import PanelControl from './PanelControl/PanelControl'
import PublicGroup from './PublicGroup/PublicGroup'

class CleanPage extends Component {
    render() {
        return (
            <div className="clean">
                <PanelControl />
                <PublicGroup />
                <div className='btn btn__add'>
                    Добавить Сообщество
                </div>
            </div>
        )
    }
}

export default CleanPage
