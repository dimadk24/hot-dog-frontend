import React, {Component} from 'react'
import HeaderControl from './HeaderControl'
import {FaSync, FaTrashAlt, FaBroom} from 'react-icons/fa'
class PanelControl extends Component {
    render() {
        return (
            <div className="panel-control">
                <HeaderControl text="Обновить" style={{visibility: 'hidden'}}>
                    <FaSync />
                </HeaderControl>
                <HeaderControl
                    text="Очистить все"
                    onClick={() => this.props.onCleanClick()}
                >
                    <FaBroom />
                </HeaderControl>
                <HeaderControl text="Удалить" style={{visibility: 'hidden'}}>
                    <FaTrashAlt />
                </HeaderControl>
            </div>
        )
    }
}

export default PanelControl
