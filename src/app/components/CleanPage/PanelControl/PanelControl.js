import React, {Component} from 'react'
import HeaderControl from './HeaderControl'
import {FaSync, FaTrashAlt, FaBroom} from 'react-icons/fa'
class PanelControl extends Component {
    render() {
        return (
            <div className="panel-control">
                <HeaderControl text="Обновить">
                    <FaSync />
                </HeaderControl>
                <HeaderControl text="Очистить" onClick={()=> this.props.onCleanClick()}>
                    <FaBroom />
                </HeaderControl>
                <HeaderControl text="Удалить">
                    <FaTrashAlt />
                </HeaderControl>
            </div>
        )
    }
}

export default PanelControl
