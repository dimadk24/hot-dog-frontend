export const REFRESH_GROUPS = 'groups/REFRESH_GROUPS'
export const CLEAN_GROUPS = 'groups/CLEAN_GROUPS'
export const DELETE_GROUPS = 'groups/DELETE_GROUPS'
export const SELECT_GROUP = 'groups/SELECT_GROUP'
export const ADD_GROUP = 'groups/ADD_GROUP'
export const START_COUNTING_DELETED_PEOPLE =
    'groups/START_COUNTING_DELETED_PEOPLE'
export const STOP_COUNTING_DELETED_PEOPLE =
    'groups/STOP_COUNTING_DELETED_PEOPLE'

const groupID = 1
const initialState = {
    groups: {
        [groupID]: {
            groupName: 'My group',
            peopleCount: 500000,
            deletedPeople: 120,
            isLoading: true
        }
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_GROUP:
            const groupToAdd = action.payload
            return {
                ...state,
                groups: [...state.groups, groupToAdd]
            }
        default:
            return state
    }
}
