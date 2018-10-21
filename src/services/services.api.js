import axios from 'axios'

const VK = window.VK

const API_URL = 'https://hot-dog.site/api'

export const API = {
    getUserGroups: () => {
        return getGroupsPromise
    },
    loadGroups: () =>
        axios.get(API_URL + '/getPublics', authHeaderDogsAPI()),
    loadCleanTasks: () =>
        axios.get(API_URL + '/getCleanTasks', authHeaderDogsAPI())
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
            user_vk_id: window.user_id,
            auth_key: window.auth_key
        }
    }
}
