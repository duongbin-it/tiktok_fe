import { SET_SOUND } from "./selectors"

const initState = {
    sound: true,
}


export function reducer(state = initState, action: any) {
    console.log({ state, action });
    switch (action.type) {
        case SET_SOUND:
            return {
                ...state,
                sound: action.payload,
            }
        default:
            return state
    }
}