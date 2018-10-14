import React, {Component} from 'react'
import PanelControl from './PanelControl/PanelControl'
import PublicGroup from './PublicGroup/PublicGroup'

class CleanPage extends Component {
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
        return (
            <div className="clean">
                <PanelControl />
                <PublicGroup />
                <div className="btn btn__add">Добавить Сообщество</div>
            </div>
        )
    }
}

export default CleanPage

function convertPublicsFromVkFormat(array) {
    function converter(item) {
        // noinspection JSUnresolvedVariable
        return {
            ava: item.photo_100,
            id: item.id,
            name: item.name
        }
    }
    return array.map(converter)
}
