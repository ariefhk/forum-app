import { hideLoading, showLoading } from "react-redux-loading-bar"
import { apiEndpoint } from "./api-slice"

export const leaderBoardApiSlice = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderBoard: builder.query({
      query: () => ({
        url: `leaderboards`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const leaderboards = response?.data?.leaderboards
        return leaderboards
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ user }) => ({
                type: "LEADERBOARD",
                id: `LEADERBOARD-${user?.id}`,
              })),
              { type: "LEADERBOARD", id: "LIST_OF_LEADERBOARD" },
            ]
          : [{ type: "LEADERBOARD", id: "LIST_OF_LEADERBOARD" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL LEADERBOARD: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useGetLeaderBoardQuery } = leaderBoardApiSlice
