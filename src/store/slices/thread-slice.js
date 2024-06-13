import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  threadCategory: [],
  threadCountByCategory: {},
}

export const threadSlice = createSlice({
  initialState,
  name: "thread-slice",
  reducers: {
    clearThreadCategory: (state) => {
      state.threadCategory = []
    },
    setThreadCategory: (state, action) => {
      state.threadCategory = action.payload
    },
    clearThreadCountByCategory: (state) => {
      state.threadCountByCategory = {}
    },
    setThreadCountByCategory: (state, action) => {
      state.threadCountByCategory = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  clearThreadCategory,
  clearThreadCountByCategory,
  setThreadCategory,
  setThreadCountByCategory,
} = threadSlice.actions

// getter func
export const getThreadCategory = (state) => state.thread.threadCategory
export const getThreadCountByCategory = (state) =>
  state.thread.threadCountByCategory

export default threadSlice.reducer
