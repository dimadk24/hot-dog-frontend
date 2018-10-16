import React, {Component} from 'react'
import {connect} from 'react-redux'
import PanelControl from './PanelControl/PanelControl'
import Public from './PublicGroup/Public'
import {bindActionCreators} from 'redux'
import {AddPublicButton} from './PublicGroup/AddPublicButton'
import swal from 'sweetalert'

class CleanPage extends Component {
    state = {
        showGroupsModal: false
    }

    renderGroups = (groups) => {
        return Object.keys(groups).map((key, i) => (
            <Public {...groups[key]} key={i} />
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

    static async showModal() {
        const addingPublicLink = await swal({
            text: 'Введите ссылку на сообщество:',
            content: 'input',
            button: 'Добавить!'
        })
        let publicId
        try {
            publicId = await this.convertPublicLinkToId(addingPublicLink)
        } catch (e) {
            console.log(e)
        }
        console.log(publicId)
    }

    static async convertPublicLinkToId(link) {
        const searchElement = 'vk.com/'
        if (!link.includes(searchElement)) {
            throw new Error('no vk.com in link')
        }
        const name = link.slice(
            link.indexOf(searchElement) + searchElement.length
        )
        if (this.isId(name)) {
            return this.getPublicId(name)
        }
        return await this.resolvePublicName(name)
    }

    render() {
        const {groups} = this.props
        return (
            <div className="clean">
                <PanelControl />
                {groups && this.renderGroups(groups)}
                <AddPublicButton onClick={() => CleanPage.showModal()} />
                {/*{showGroupsModal && <Modal/>}*/}
            </div>
        )
    }

    static resolvePublicName(name) {
        return new Promise((resolve, reject) => {
            /*global VK*/
            VK.api(
                'utils.resolveScreenName',
                {
                    screen_name: name,
                    v: '5.85'
                },
                ({response}) => {
                    if (response.type === 'group') {
                        // noinspection JSUnresolvedVariable
                        resolve(response.object_id)
                    }
                    reject('not group')
                }
            )
        })
    }

    static isId(name) {
        return Boolean(name.match(/^((club)|(public))\d+$/))
    }

    static getPublicId(id) {
        return +id.match(/\d+$/)[0]
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
