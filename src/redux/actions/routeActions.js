export const ADD_NEW_PATH = 'ADD_NEW_PATH'
export const SET_FAVORITE = 'SET_FAVORITE'
export const DELETE_ROUTE = 'DELETE_ROUTE'

export const addNewRoute =  payload => async dispatch =>{
    dispatch(setNewRoute(payload))
}

export const setNewRoute = (payload) => {
    return {type: ADD_NEW_PATH, payload}
}

export const setFavorite = (payload) => {
    return {type: SET_FAVORITE, payload}
}

export const deleteRoute = (id) => {
    return {type: DELETE_ROUTE, id}
}