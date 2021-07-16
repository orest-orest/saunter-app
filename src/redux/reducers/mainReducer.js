import {ADD_NEW_PATH, SET_FAVORITE, DELETE_ROUTE} from '../actions/routeActions'

let initialState = {
    routeListItems: []
};

export const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_PATH: {
            return {
                ...state,
                routeListItems: [...state.routeListItems, action.payload]
            }
        }
        case SET_FAVORITE: {
            return {
                ...state,
                routeListItems: state.routeListItems.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            favorite: action.payload.favorite,
                        }
                    }
                    return item;
                })
            }
        }
        case DELETE_ROUTE: {
            return {
                ...state,
                routeListItems: state.routeListItems.filter(item => item.id !== action.id),

            }
        }
        default: {
            return state
        }
    }
}

