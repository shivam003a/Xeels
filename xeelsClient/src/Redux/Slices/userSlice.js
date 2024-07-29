import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    logged: false
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
        }
    }
})

export const { stopLoading, startLoading, setLoggedIn, setLoggedOut } = userSlice.actions
export default userSlice.reducer