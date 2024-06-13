import { getLocalStorageData } from "@/lib/local-storage"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AuthType = {
  AUTH_LOCALSTORAGE_KEY: "accessToken-forum-app",
}

export const protectedHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY)}`,
}

// api endpoint
export const apiEndpoint = createApi({
  reducerPath: "API_ENDPOINT",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_URL,
  }),
  tagTypes: ["AUTH", "USER", "THREAD", "LEADERBOARD"],
  endpoints: () => ({}),
})
