
const notificationReducer = (state = 'Initial state', action) => {
    switch(action.type) {
    case 'SET_NOTIFICATION':
        return action.notification
    default:
        return state
    }
}

export const notify = (notification, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, time*1000)
    }
}

export default notificationReducer