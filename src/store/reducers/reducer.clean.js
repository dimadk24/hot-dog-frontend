import {API} from '../../services/services.api'
import swal from 'sweetalert'
import axios from 'axios'
import ReactDOM from 'react-dom'
import {InputModal} from '../../app/components/CleanPage/InputModal'
import React from 'react'
import {history} from '../index'

export const GET_USER_GROUPS = {
    Load: 'groups/USER_GROUPS_LOAD',
    Loaded: 'groups/USER_GROUPS_LOADED',
    Errors: 'groups/USER_GROUPS_ERRORS'
}
export const ADD_GROUP_IN_CLEAN_QUE = {
    click: 'ADD_GROUP_IN_CLEAN_QUE_CLICK',
    added: 'ADD_GROUP_IN_CLEAN_QUE_ADD_TO_SERVER'
}
export const GET_DOGS_COUNT = 'GET_DOGS_COUNT '
export const DELETE_GROUP_FROM_CLEAN_QUE = 'DELETE_GROUP_FROM_CLEAN_QUE'
export const GET_GROUPS_FOR_CLEAN = {
    Load: 'groups/GET_GROUPS_FOR_CLEAN_LOAD',
    Loaded: 'groups/GET_GROUPS_FOR_CLEAN_LOADED',
    Errors: 'groups/GET_GROUPS_FOR_CLEAN_ERRORS'
}
export const CLEAN_GROUP_BY_ID = 'CLEAN_GROUP_BY_ID'
export const UPDATE_CLEANING_STATE = 'UPDATE_CLEANING_STATE'
export const CLEAN_ALL_GROUPS = 'CLEAN_ALL_GROUPS'

const initialState = {
    groups: {
        data: [],
        loadingUserGroups: true,
        loadingCleanTasks: true,
        errors: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS_FOR_CLEAN.Load: {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    loadingCleanTasks: true
                }
            }
        }
        case GET_GROUPS_FOR_CLEAN.Loaded: {
            const groupsForClean = action.payload
            groupsForClean.forEach((group) => {
                group.inCleanQue = true
                group.isLoadingInfo = false
                group.cleanData = {
                    isCleaning: false
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: groupsForClean,
                    loadingCleanTasks: false
                }
            }
        }
        case UPDATE_CLEANING_STATE: {
            const cleanTasks = action.payload
            if (cleanTasks.length === 0) {
                return state
            } else {
                let settedGroups = state.groups.data.map((g) => g)
                settedGroups.forEach((settedGroup) => {
                    cleanTasks.forEach((cleanTask) => {
                        if (settedGroup.backEndID === cleanTask.public_id) {
                            if (cleanTask.status === 'Завершили') {
                                settedGroup.cleanData = {
                                    isCleaning: false
                                }
                            } else {
                                settedGroup.cleanData = {
                                    isCleaning: true,
                                    progress: cleanTask.progress,
                                    status: cleanTask.status
                                }
                            }
                        }
                    })
                })
                return {
                    ...state,
                    groups: {
                        ...state.groups,
                        data: settedGroups
                    }
                }
            }
        }
        case GET_USER_GROUPS.Load: {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    loadingUserGroups: true
                }
            }
        }
        case GET_USER_GROUPS.Loaded: {
            const userGroups = action.payload
            const groupsSetted = state.groups.data
            userGroups.forEach((group) => {
                group.inCleanQue = false
                group.isLoadingInfo = true
            })
            userGroups.forEach((userGroup) => {
                groupsSetted.forEach((settedGroup) => {
                    if (userGroup.id === settedGroup.vk_id) {
                        userGroup.inCleanQue = settedGroup.inCleanQue
                        userGroup.backEndID = settedGroup.id
                        userGroup.dogs = settedGroup.dogs
                        userGroup.followers = settedGroup.followers
                        userGroup.cleanData = settedGroup.cleanData
                    }
                })
            })
            return {
                ...state,
                groups: {
                    data: userGroups,
                    loadingUserGroups: false
                }
            }
        }
        case ADD_GROUP_IN_CLEAN_QUE.click:
            const groupID = action.payload
            let toggledGroups = state.groups.data.map((group) => {
                if (group.id === groupID) {
                    return {
                        ...group,
                        inCleanQue: true,
                        cleanData: {
                            isCleaning: false
                        }
                    }
                } else {
                    return group
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: toggledGroups
                }
            }
        case ADD_GROUP_IN_CLEAN_QUE.added: {
            const {groupData, groupID} = action.payload
            let groupWithData = state.groups.data.map((group) => {
                if (group.id === groupID) {
                    return {
                        ...group,
                        ...groupData,
                        dogs: 'Анализ...',
                        backEndID: groupData.id
                    }
                } else {
                    return group
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: groupWithData
                }
            }
        }
        case GET_DOGS_COUNT: {
            const {dogsCount, groupID} = action.payload
            let groupWithDogs = state.groups.data.map((group) => {
                if (group.vk_id === groupID) {
                    return {
                        ...group,
                        dogs: dogsCount
                    }
                } else {
                    return group
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: groupWithDogs
                }
            }
        }
        case DELETE_GROUP_FROM_CLEAN_QUE: {
            const groupID = action.payload
            let toggledGroups = state.groups.data.map((group) => {
                if (group.id === groupID) {
                    return {...group, inCleanQue: false}
                } else {
                    return group
                }
            })
            return {...state, groups: {...state.groups, data: toggledGroups}}
        }
        case CLEAN_GROUP_BY_ID: {
            let groupID = action.payload
            let withCleanTask = state.groups.data.map((group) => {
                if (group.backEndID === groupID) {
                    return {
                        ...group,
                        cleanData: {
                            isCleaning: true,
                            progress: 0,
                            status: 'Отправляем запрос'
                        }
                    }
                } else {
                    return group
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: withCleanTask
                }
            }
        }
        case CLEAN_ALL_GROUPS: {
            const allGroupsWithClean = state.groups.data.map((group) => {
                API.startCleanTask([group.backEndID])
                return {
                    ...group,
                    cleanData: {
                        isCleaning: true,
                        progress: 0,
                        status: 'Отправляем запрос'
                    }
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: allGroupsWithClean
                }
            }
        }
        default:
            return state
    }
}

export const cleanAllGroups = (cb) => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_ALL_GROUPS
        })
        let myInterval = setInterval(() => {
            API.getCleaningTasks().then((r) => {
                const cleanTasks = r.data
                dispatch({
                    type: UPDATE_CLEANING_STATE,
                    payload: cleanTasks
                })
                if (cleanTasks.length === 0) {
                    showCommentAlert(cb)
                    clearInterval(myInterval)
                }
            })
        }, 500)
    }
}

export const AddGroupInCleanQue = (groupID) => {
    return (dispatch) => {
        dispatch({
            type: ADD_GROUP_IN_CLEAN_QUE.click,
            payload: groupID
        })
        API.addGroupToCleanAndGetItData(groupID).then((r) => {
            const groupData = r.data
            dispatch({
                type: ADD_GROUP_IN_CLEAN_QUE.added,
                payload: {groupData, groupID}
            })
            API.getGroupDogsCount(groupData.id).then((r) => {
                const dogsCount = r.data.dogs_count
                dispatch({
                    type: GET_DOGS_COUNT,
                    payload: {dogsCount, groupID}
                })
            })
        })
    }
}

export const cleanGroupByID = (groupID, cb) => {
    return (dispatch) => {
        API.startCleanTask([groupID]).then((res) => {
            switch (res.data.error.id) {
                case 1:
                    getAccessTokenFromUser()
                    break
                case 2:
                    showNotEnoughMoneyModal(res.error.value)
                    break
                default:
                    let myInterval = setInterval(async () => {
                        API.getCleaningTasks().then((r) => {
                            const cleanTasks = r.data
                            dispatch({
                                type: UPDATE_CLEANING_STATE,
                                payload: cleanTasks
                            })
                            if (cleanTasks.length === 0) {
                                showCommentAlert(cb)
                                clearInterval(myInterval)
                            }
                        })
                    }, 500)
            }
        })
        dispatch({
            type: CLEAN_GROUP_BY_ID,
            payload: groupID
        })
    }
}

async function getCleanTasks() {
    return (await axios.get('https://hot-dog.site/api/getCleanTasks', {
        params: {
            user_vk_id: window.user_id,
            auth_key: window.auth_key
        }
    })).data
}

export const DeleteGroupFromCleanQue = (groupID, backEndID) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_GROUP_FROM_CLEAN_QUE,
            payload: groupID
        })
        API.deleteGroupFromCleanQue(backEndID).then((r) => {})
    }
}

export const GetGroupsForCleanAndUserGroups = () => {
    return (dispatch) => {
        startLoading(GET_GROUPS_FOR_CLEAN, dispatch)
        API.getGroupsForClean().then((r) => {
            const groupsForClean = r.data
            dispatch({
                type: GET_GROUPS_FOR_CLEAN.Loaded,
                payload: groupsForClean
            })
            let myInterval = setInterval(() => {
                API.getCleaningTasks().then((r) => {
                    const cleanTasks = r.data
                    dispatch({
                        type: UPDATE_CLEANING_STATE,
                        payload: cleanTasks
                    })
                    if (cleanTasks.length === 0) {
                        clearInterval(myInterval)
                    }
                })
            }, 500)
            startLoading(GET_USER_GROUPS, dispatch)
            const groups = API.getUserGroups()
            groups.then((res) => {
                dispatch({type: GET_USER_GROUPS.Loaded, payload: res})
            })
        })
    }
}

const startLoading = (loadingProperty, dispatch) => {
    dispatch({
        type: loadingProperty.Load
    })
}

function showCommentAlert(cb) {
    console.log('Comment alert')
    const response = swal({
        title: 'Спасибо!',
        icon: 'success',
        text: 'Оставьте, пожалуйста, отзыв о сервисе :)',
        button: 'Хорошо'
    })
    response.then((r) => {
        console.log('R IS:', r)
        if (r === true) {
            if (cb) {
                cb()
            }
        }
    })
}

function getAccessTokenFromUser() {
    let wrapper = window.document.createElement('div')
    ReactDOM.render(<InputModal />, wrapper)
    let el = wrapper.firstChild
    const response = swal({
        title: 'Упс. Мы не можем очистить ваши сообщества',
        content: el,
        buttons: {
            confirm: {
                text: 'Сохранить и запустить!',
                value: ''
            }
        }
    })
    response.then((r) => {
        console.log('RESPONSE IS:', r)
        // return this.getAccessTokenFromLink(response)
    })
}
function showNotEnoughMoneyModal(money) {
    const response = swal({
        title: 'Упс.. Недостаточно денег',
        icon: 'error',
        text: `Для очистки сообществ нужно еще ${money}р.\nПополните, пожалуйста, баланс`,
        button: {text: 'Пополнить'}
    })
    response.then((r) => {
        if (r === true) {
            history.push('/add_money')
        }
    })
}
