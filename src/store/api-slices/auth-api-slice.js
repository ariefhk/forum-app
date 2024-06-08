import { hideLoading, showLoading } from "react-redux-loading-bar"
import { apiEndpoint } from "./api-slice"

export const authApiSlice = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response) => {
        const token = response?.data?.token
        return token
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED LOGIN: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: `register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
          name,
          password,
        },
      }),
      transformResponse: (response) => {
        const user = response?.data?.user
        return user
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED REGISTER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
