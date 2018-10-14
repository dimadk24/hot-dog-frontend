import React, {Component} from 'react'
import {connect} from 'react-redux'
import PanelControl from './PanelControl/PanelControl'
import PublicGroup from './PublicGroup/PublicGroup'
import {bindActionCreators} from 'redux'

class CleanPage extends Component {
    renderGroups = (groups) => {
        return Object.keys(groups).map((key, i) => (
            <PublicGroup {...groups[key]} key={i} />
        ))
    }
    render() {
        const {groups} = this.props
        return (
            <div className="clean">
                <PanelControl />
                {groups && this.renderGroups(groups)}
                <div className="btn btn__add">Добавить Сообщество</div>
            </div>
        )
    }
}

const mapStateToProps = ({clean}) => ({
    groups: clean.groups
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CleanPage)
