const initState = {
    sound: true,
}


export function reducer(state = initState, action) {
    switch (action.type) {
        case "set_sound":
            return {
                ...state,
                sound: state.sound ? false : true,
            }

        default:
            return state
    }
}