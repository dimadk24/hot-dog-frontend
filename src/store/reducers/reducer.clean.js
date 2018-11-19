import {API} from '../../services/services.api'

export const GET_USER_GROUPS = {
    Load: 'groups/USER_GROUPS_LOAD',
    Loaded: 'groups/USER_GROUPS_LOADED',
    Errors: 'groups/USER_GROUPS_ERRORS'
}
export const LOAD_GROUPS = {
    Load: 'groups/GROUPS_LOAD',
    Loaded: 'groups/GROUPS_LOADED',
    Errors: 'groups/GROUPS_ERRORS'
}
export const LOAD_CLEAN_TASKS = {
    Load: 'tasks/LOAD_CLEAN_TASKS',
    Loaded: 'tasks/CLEAN_TASKS_LOADED',
    Errors: 'tasks/CLEAN_TASKS_ERRORS'
}
export const TOGGLE_IS_GROUP_FOR_CLEAN = 'ADD_GROUP_TO_QUE'

const initialState = {
    groups: {
        data: [],
        loading: true,
        errors: []
    },
    hotDogsGroups: {
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
                group.isInCleanQue = false;
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
        case LOAD_GROUPS.Load: {
            return {
                ...state,
                hotDogsGroups: {
                    ...state.hotDogsGroups,
                    loading: true
                }
            }
        }
        case LOAD_GROUPS.Loaded: {
            const hotDogsGroups = action.payload
            return {
                ...state,
                hotDogsGroups
            }
        }
        case LOAD_CLEAN_TASKS.Load: {
            return {
                ...state,
                cleanTasks: {
                    ...state.cleanTasks,
                    loading: true
                }
            }
        }
        case LOAD_CLEAN_TASKS.Loaded: {
            const cleanTasks = action.payload
            return {
                ...state,
                cleanTasks: {
                    loading: false,
                    data: cleanTasks,
                    errors: []
                }
            }
        }
        case TOGGLE_IS_GROUP_FOR_CLEAN:
            const groupID = action.payload
            console.log('TOGGLE GROUP:', groupID)
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
            console.log(g)
            return {
                ...state,
                groups: {
                    ...state.groups,
                    data: g
                }
            }
        default:
            return state
    }
}

export const GetUserGroups = () => {
    return (dispatch) => {
        startLoading(LOAD_GROUPS, dispatch)
        const groups = API.getUserGroups()
        groups.then((res) => {
            console.log('GET USER GROUPS!!!', res)
            dispatch({type: GET_USER_GROUPS.Loaded, payload: res})
        })
        stopLoading(LOAD_GROUPS, dispatch)
    }
}

export const LoadGroups = () => {
    return (dispatch) => {
        startLoading(LOAD_GROUPS, dispatch)
        API.loadGroups().then((response) => {
            const groupsData = response.data
            dispatch({
                type: LOAD_GROUPS.Loaded,
                payload: groupsData
            })
            stopLoading(LOAD_GROUPS, dispatch)
        })
    }
}

export const LoadCleanTasks = () => {
    return (dispatch) => {
        startLoading(LOAD_CLEAN_TASKS, dispatch)

        API.loadCleanTasks().then((response) => {
            const cleanTasksData = response.data
            dispatch({type: LOAD_CLEAN_TASKS.Loaded, payload: cleanTasksData})
            stopLoading(LOAD_CLEAN_TASKS, dispatch)
        })
    }
}

export const SetGroupForCleaning = (groupID) => {
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
const stopLoading = (loadingProperty, dispatch) => {
    dispatch({
        type: loadingProperty.Loaded
    })
}
