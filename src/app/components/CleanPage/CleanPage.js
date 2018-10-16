import React, {Component} from 'react'
import {connect} from 'react-redux'
import PanelControl from './PanelControl/PanelControl'
import Public from './PublicGroup/Public'
import {bindActionCreators} from 'redux'
import {AddPublicButton} from './PublicGroup/AddPublicButton'
import swal from 'sweetalert'
import axios from 'axios'

class CleanPage extends Component {
    state = {
        showGroupsModal: false,
        publics: []
    }

    renderGroups = (groups) => {
        if (!groups.length) return null
        return Object.keys(groups).map((key, i) => (
            <Public {...groups[key]} key={i} />
        ))
    }

    async componentWillMount() {
        const publics = (await axios.get('http://hot-dog.site/api/getPublics', {
            params: {
                auth_access_token:
                    '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844'
            }
        })).data
        this.setState({publics: publics})
    }

    constructor(props) {
        super(props)
        /*global VK*/
        // VK.init(
        //     () => {
        //         VK.api(
        //             'groups.get',
        //             {
        //                 filter: 'moder',
        //                 extended: '1',
        //                 fields: 'photo_100',
        //                 v: '5.85'
        //             },
        //             (data) => {
        //                 const publics = convertPublicsFromVkFormat(
        //                     data.response.items
        //                 )
        //                 const publics_count = data.response.count
        //                 console.log(`Got ${publics_count} publics from VK:`)
        //                 console.log(publics)
        //             }
        //         )
        //     },
        //     () => {
        //         console.log('VK API initialization failed')
        //     },
        //     '5.85'
        // )
    }

    async showModal() {
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
        const newPublic = await this.addPublicAndGetItsData(publicId)
        this.setState({publics: [newPublic]})
        newPublic.dogs = await this.getDogsCount(newPublic.id)
        this.setState({publics: [newPublic]})
    }

    async convertPublicLinkToId(link) {
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
        const {publics} = this.state
        return (
            <div className="clean">
                <PanelControl />
                {publics && this.renderGroups(publics)}
                <AddPublicButton onClick={() => this.showModal()} />
                {/*{showGroupsModal && <Modal/>}*/}
            </div>
        )
    }

    static resolvePublicName(name) {
        return new Promise((resolve, reject) => {
            /*global VK*/
            // VK.api(
            //     'utils.resolveScreenName',
            //     {
            //         screen_name: name,
            //         v: '5.85'
            //     },
            //     ({response}) => {
            //         if (response.type === 'group') {
            //             // noinspection JSUnresolvedVariable
            //             resolve(response.object_id)
            //         }
            //         reject('not group')
            //     }
            // )
        })
    }

    isId(name) {
        return Boolean(name.match(/^((club)|(public))\d+$/))
    }

    getPublicId(id) {
        return +id.match(/\d+$/)[0]
    }

    async addPublicAndGetItsData(publicId) {
        return (await axios.post('http://hot-dog.site/api/addPublic', {
            auth_access_token:
                '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844',
            vk_id: publicId
        })).data
    }

    async getDogsCount(publicId) {
        return (await axios.get('http://hot-dog.site/api/getDogsCount', {
            params: {
                id: publicId,
                auth_access_token:
                    '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844'
            }
        })).data.dogs_count
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
