import axios from 'axios'

const API_URL = 'someurl'

const VK = window.VK

const DOGS_API_URL = 'https://hot-dog.site/api'

export const API = {
    getUserGroups: () => {
        return getGroupsPromise
    },
    loadGroups: () =>
        axios.get(DOGS_API_URL + '/getPublics', authHeaderDogsAPI())
}

const getGroupsPromise = new Promise((resolve, reject) => {
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
                    const groups = normalizeVKGroupsData(data.response.items)
                    // const groupsCount = data.response.count
                    // console.log(`Got ${groupsCount} publics from VK:`)
                    // console.log(groups)
                    resolve(groups)
                }
            )
        },
        () => {
            console.log('VK API initialization failed')
            reject('Groups fetch failed')
        },
        '5.85'
    )
})

const normalizeVKGroupsData = (array) => {
    return array.map(converter)
}

const converter = (item) => {
    // noinspection JSUnresolvedVariable
    return {
        avatar_url: item.photo_100,
        id: item.id,
        name: item.name
    }
}

const authHeaderDogsAPI = () => {
    return {
        params: {
            auth_access_token:
                '2c760152aad7cffcd688e7a0e7bc9b23904c522efeb98fc4f27c0ed89a084eb329aa3e23d2bf28d591844'
        }
    }
}
