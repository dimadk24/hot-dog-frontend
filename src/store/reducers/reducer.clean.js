import {API} from '../../services/services.api'

export const GET_USER_GROUPS = 'groups/GET_USER_GROUPS'

const groupID = 1
const initialState = {
    groups: []
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
        default:
            return state
    }
}

export const GetUserGroups = () => {
    return (dispatch) => {
        const groups = API.getGroups()
        groups.then((res) => {
            dispatch({type: GET_USER_GROUPS, payload: res})
        })
    }
}
