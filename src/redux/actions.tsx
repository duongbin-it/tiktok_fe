import { SET_SOUND, SET_API } from './selectors';


export const setButtonSound = (payload: boolean) => ({ type: SET_SOUND, payload: payload })
export const setApi = (payload: any) => ({ type: SET_API, payload: payload })