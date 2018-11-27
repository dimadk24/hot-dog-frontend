import axios from 'axios'
import ReactDOM from 'react-dom'
import {InputModal} from '../app/components/CleanPage/InputModal'
import swal from 'sweetalert'
import React from 'react'

const VK = window.VK

const API_URL = 'https://hot-dog.site/api'

export const API = {
    getUserGroups: () => getGroupsPromise,
    getGroupsForClean: () =>
        axios.get(API_URL + '/getPublics', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key
            }
        }),
    getGroupDogsCount: (groupID) =>
        axios.get(API_URL + '/getDogsCount', {
            params: {
                id: groupID,
                user_vk_id: window.user_id,
                auth_key: window.auth_key
            }
        }),
    deleteGroupFromCleanQue: (backEndID) => {
        console.log('DELETE REQUEST, id is:', backEndID)
        return axios.delete(API_URL + '/deletePublic', {
            id: backEndID,
            user_vk_id: window.user_id,
            auth_key: window.auth_key
        })
    },
    addGroupToCleanAndGetItData: (publicID) =>
        axios.post(API_URL + '/addPublic', {
            user_vk_id: window.user_id,
            auth_key: window.auth_key,
            vk_id: publicID
        }),
    startCleanTask: (public_ids) =>
        axios.post('https://hot-dog.site/api/startCleanTasks', {
            user_vk_id: window.user_id,
            auth_key: window.auth_key,
            public_ids: public_ids
        }),
    getCleaningTasks: () =>
        axios.get('https://hot-dog.site/api/getCleanTasks', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key
            }
        }),
    getFreshPublic: (public_id) =>
        axios.get('https://hot-dog.site/api/refreshPublic', {
            params: {
                user_vk_id: window.user_id,
                auth_key: window.auth_key,
                id: public_id
            }
        })
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