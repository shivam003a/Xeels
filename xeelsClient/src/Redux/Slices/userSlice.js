import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    logged: false,
    page: 1
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        stopLoading: (state) => {
            state.loading = false
        },
        setLoggedIn: (state) => {
            state.logged = true
        },
        setLoggedOut: (state) => {
            state.logged = false
        },
        incrementPage: (state) => {
            state.page += 1
        }
    }
})

export const { stopLoading, startLoading, setLoggedIn, setLoggedOut, incrementPage } = userSlice.actions
export default userSlice.reducer