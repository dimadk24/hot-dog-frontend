import {API} from '../../services/services.api'

export const GET_USER_GROUPS = {
    Load: 'groups/USER_GROUPS_LOAD',
    Loaded: 'groups/USER_GROUPS_LOADED',
    Errors: 'groups/USER_GROUPS_ERRORS'
}
export const TOGGLE_IS_GROUP_FOR_CLEAN = 'ADD_GROUP_TO_QUE'

export const GET_GROUPS_FOR_CLEAN = {
    Load: 'groups/GET_GROUPS_FOR_CLEAN',
    Loaded: 'groups/GET_GROUPS_FOR_CLEAN',
    Errors: 'groups/GET_GROUPS_FOR_CLEAN'
}

const initialState = {
    groups: {
        data: [],
        loading: true,
        errors: []
    },
    cleanTasks: {
        data: [],
        loading: true,
        errors: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_GROUPS.Load: {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    loading: true
                }
            }
        }
        case GET_USER_GROUPS.Loaded: {
            const groups = action.payload
            groups.forEach((group) => {
                group.isInCleanQue = false
                group.isLoadingInfo = true
            })
            return {
                ...state,
                groups: {
                    data: groups,
                    loading: false
                }
            }
        }
        case TOGGLE_IS_GROUP_FOR_CLEAN:
            const groupID = action.payload
            let g = state.groups.data.map((group) => {
                if (group.id === groupID) {
                    return {
                        ...group,
                        isInCleanQue: !group.isInCleanQue
                    }
                } else {
                    return group
                }
            })
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: g
                }
            }
        case GET_GROUPS_FOR_CLEAN.Loaded: {
            const groupsForClean = action.payload
            console.log('SET GROUPS FOR CLEAN:', groupsForClean)
            return {
                ...state,
                cleanTasks: {
                    ...state.cleanTasks,
                    data: groupsForClean
                }
            }
        }
        default:
            return state
    }
}

export const GetUserGroups = () => {
    return (dispatch) => {
        startLoading(GET_USER_GROUPS, dispatch)
        const groups = API.getUserGroups()
        groups.then((res) => {
            console.log('GET USER GROUPS!!!', res)
            dispatch({type: GET_USER_GROUPS.Loaded, payload: res})
        })
    }
}

export const GetGroupsForClean = () => {
    return (dispatch) => {
        startLoading(GET_GROUPS_FOR_CLEAN)
        API.getGroupsForClean().then(function fetchGroupsForClean(r) {
            const groupsForClean = r.data
            console.log('GET GROUPS FOR CLEAN:', groupsForClean)
            dispatch({
                type: GET_GROUPS_FOR_CLEAN.Loaded,
                payload: groupsForClean
            })
        })
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

const startLoading = (loadingProperty, dispatch) => {
    dispatch({
        type: loadingProperty.Load
    })
}
