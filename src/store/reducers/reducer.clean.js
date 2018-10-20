import {API} from '../../services/services.api'

export const GET_USER_GROUPS = 'groups/GET_USER_GROUPS'
export const LOAD_GROUPS = 'groups/LOAD_GROUPS'

const groupID = 1
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
        const groups = API.getUserGroups()
        groups.then((res) => {
            dispatch({type: GET_USER_GROUPS, payload: res})
        })
    }
}

export const LoadGroups = () => {
    return (dispatch) => {
        const groupsData = API.loadGroups().data
        dispatch({
            type: LOAD_GROUPS,
            payload: groupsData
        })
    }
}
