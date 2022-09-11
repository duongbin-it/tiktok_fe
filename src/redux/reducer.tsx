import { createSlice } from "@reduxjs/toolkit"

export const filterSlice = createSlice({
    name: "filters",
    initialState: {
        sound: true,
        api: [],
    },
    reducers: {
        setButtonSound: (state, action) => {
            state.sound = action.payload
        },
        setApi: (state, action) => {
            state.api = action.payload
        },
    }
})