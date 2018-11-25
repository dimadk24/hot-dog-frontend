import {API} from '../../services/services.api'

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

export const SET_CLEANING_STATE_BY_ID = 'SET_CLEANING_STATE_BY_ID'

export const UPDATE_CLEANING_STATE = 'UPDATE_CLEANING_STATE'

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
                        inCleanQue: true
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
        case SET_CLEANING_STATE_BY_ID: {
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
        default:
            return state
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

export const setCleaningStateOnGroupByID = (groupID) => {
    return (dispatch) => {
        API.startCleanTask([groupID]).then((res) => {
        })
        dispatch({
            type: SET_CLEANING_STATE_BY_ID,
            payload: groupID
        })
        let myInterval = setInterval(() => {
            API.getCleaningTasks().then((r) => {
                const cleanTasks = r.data
                dispatch({
                    type: UPDATE_CLEANING_STATE,
                    payload: cleanTasks
                })
                if (cleanTasks.length === 0) {
                    console.log('CLEAR INTERVAL')
                    clearInterval(myInterval)
                }
            })
        }, 50)
    }
}

export const DeleteGroupFromCleanQue = (groupID, backEndID) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_GROUP_FROM_CLEAN_QUE,
            payload: groupID
        })
        API.deleteGroupFromCleanQue(backEndID).then((r) => {
        })
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
            API.getCleaningTasks().then((r) => {
                const tasksInClean = r.data
                dispatch({
                    type: UPDATE_CLEANING_STATE,
                    payload: tasksInClean
                })
            })
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
