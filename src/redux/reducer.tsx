import * as ht from "./selectors"

const initState = {
    sound: true,
    api: [],
}

export function reducer(state = initState, action: any) {
    switch (action.type) {
        case ht.SET_SOUND:
            return {
                ...state,
                sound: action.payload,
            }
        case ht.SET_API:
            return {
                ...state,
                api: action.payload,
            }
        default:
            return state
    }
}