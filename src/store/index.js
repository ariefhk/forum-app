import counterReducer from "@/store/slices/counter-slice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loadingBarReducer } from "react-redux-loading-bar"
import { apiEndpoint, protectedApiEndpoint } from "./api-slices/api-slice"
import authReducer from "./slices/auth-slice"

export const store = configureStore({
  reducer: {
    [apiEndpoint.reducerPath]: apiEndpoint.reducer,
    [protectedApiEndpoint.reducerPath]: protectedApiEndpoint.reducer,
    auth: authReducer,
    counter: counterReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiEndpoint.middleware)
      .concat(protectedApiEndpoint.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
