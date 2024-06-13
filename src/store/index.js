import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loadingBarReducer } from "react-redux-loading-bar"
import { apiEndpoint } from "./api-slices/api-slice"
import authReducer from "./slices/auth-slice"
import threadReducer from "./slices/thread-slice"
import userReducer from "./slices/user-slice"

export const store = configureStore({
  reducer: {
    [apiEndpoint.reducerPath]: apiEndpoint.reducer,
    auth: authReducer,
    thread: threadReducer,
    user: userReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEndpoint.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
