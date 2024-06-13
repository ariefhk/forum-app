import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setProfile } from "../slices/user-slice"
import { apiEndpoint, protectedHeaders } from "./api-slice"

export const userApiSlice = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `users`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const users = response?.data?.users
        return users
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "USER", id })),
              { type: "USER", id: "LIST_OF_USER" },
            ]
          : [{ type: "USER", id: "LIST_OF_USER" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: `users/me`,
        method: "GET",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const user = response?.data?.user
        return user
      },
      providesTags: (result) => [{ type: "USER", id: result.id }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(setProfile(user))
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL USER: ", error)
        }
      },
    }),
  }),
})

export const { useGetAllUserQuery, useGetProfileQuery } = userApiSlice
