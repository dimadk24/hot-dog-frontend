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
        case GET_USER_GROUPS: {
            const groups = action.payload
            console.log('PUT IN STATE', groups)
            return {
                ...state,
                groups
            }
        }
        case LOAD_GROUPS: {
            const hotDogsGroups = action.payload
            return {
                ...state,
                hotDogsGroups
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
            dispatch({type: GET_USER_GROUPS, payload: res})
        })
        stopLoading(LOAD_GROUPS, dispatch)
    }
}

export const LoadGroups = () => {
    return (dispatch) => {
        startLoading(LOAD_GROUPS, dispatch)
        const groupsData = API.loadGroups().data
        dispatch({
            type: LOAD_GROUPS,
            payload: groupsData
        })
        stopLoading(LOAD_GROUPS, dispatch)
    }
}

export const LoadCleanTasks = () => {
    return (dispatch) => {
        startLoading(LOAD_CLEAN_TASKS, dispatch)
        const cleanTasksData = API.loadCleanTasks().data
        dispatch({Type: LOAD_CLEAN_TASKS.Loaded, payload: cleanTasksData})
        stopLoading(LOAD_CLEAN_TASKS, dispatch)
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
