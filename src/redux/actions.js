import { SET_SOUND } from './selectors'


export const setButtonSound = post => {
    return {
        type: SET_SOUND,
        payload: post,
    };
}