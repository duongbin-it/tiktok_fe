import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './reducer'

export const store = configureStore({
    reducer: {
        filters: filterSlice.reducer
    }
})