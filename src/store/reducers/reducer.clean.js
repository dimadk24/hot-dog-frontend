import {API} from '../../services/services.api'

export const GET_USER_GROUPS = {
    Load: 'groups/USER_GROUPS_LOAD',
    Loaded: 'groups/USER_GROUPS_LOADED',
    Errors: 'groups/USER_GROUPS_ERRORS'
}
export const TOGGLE_IS_GROUP_FOR_CLEAN = 'ADD_GROUP_TO_QUE'

export const GET_GROUPS_FOR_CLEAN = {
    Load: 'groups/GET_GROUPS_FOR_CLEAN_LOAD',
    Loaded: 'groups/GET_GROUPS_FOR_CLEAN_LOADED',
    Errors: 'groups/GET_GROUPS_FOR_CLEAN_ERRORS'
}

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
        case GET_USER_GROUPS.Load: {
            console.log('Start Load User Groups')
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
            userGroups.forEach(userGroup => {
                groupsSetted.map(settedGroup => {
                    if (userGroup.id === settedGroup.vk_id) {
                        userGroup.inCleanQue = settedGroup.inCleanQue
                    }
                })
            })
            console.log('End Load User Groups', userGroups)
            return {
                ...state,
                groups: {
                    data: userGroups,
                    loadingUserGroups: false
                }
            }
        }
        case TOGGLE_IS_GROUP_FOR_CLEAN:
            const groupID = action.payload
            let toggledGroups = state.groups.data.map((group) => {
                if (group.id === groupID) {
                    return {
                        ...group,
                        inCleanQue: !group.inCleanQue
                    }
                } else {
                    return group
                }
            })
            console.log('TOGGLE GROUP')
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: toggledGroups
                }
            }
        case GET_GROUPS_FOR_CLEAN.Load: {
            console.log('Start Load clean tasks')
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
            })
            console.log('Stop Loading clean tasks', groupsForClean)
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: groupsForClean,
                    loadingCleanTasks: false
                }
            }
        }
        default:
            return state
    }
}

export const ToggleIsGroupForCleaning = (groupID) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_IS_GROUP_FOR_CLEAN,
            payload: groupID
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
