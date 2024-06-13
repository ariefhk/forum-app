import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profile: {},
}

export const userSlice = createSlice({
  initialState,
  name: "user-slice",
  reducers: {
    clearProfile: (state) => {
      state.profile = []
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearProfile, setProfile } = userSlice.actions

// getter func
export const getProfile = (state) => state.user.profile

export default userSlice.reducer
