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
    constructor(props) {
        super(props)
        /*global VK*/
        VK.init(
            () => {
                VK.api(
                    'groups.get',
                    {
                        filter: 'moder',
                        extended: '1',
                        fields: 'photo_100',
                        v: '5.85'
                    },
                    (data) => {
                        const publics = convertPublicsFromVkFormat(
                            data.response.items
                        )
                        const publics_count = data.response.count
                        console.log(`Got ${publics_count} publics from VK:`)
                        console.log(publics)
                    }
                )
            },
            () => {
                console.log('VK API initialization failed')
            },
            '5.85'
        )
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

function convertPublicsFromVkFormat(array) {
    function converter(item) {
        // noinspection JSUnresolvedVariable
        return {
            avatar_url: item.photo_100,
            id: item.id,
            name: item.name
        }
    }
    return array.map(converter)
}
