import { hideLoading, showLoading } from "react-redux-loading-bar"
import {
  setThreadCategory,
  setThreadCountByCategory,
} from "../slices/thread-slice"
import { apiEndpoint, protectedHeaders } from "./api-slice"

export const threadApiSlice = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    createThread: builder.mutation({
      query: ({ title, body, category }) => ({
        url: `threads`,
        method: "POST",
        headers: protectedHeaders,
        body: {
          title,
          body,
          category,
        },
      }),
      transformResponse: (response) => {
        const thread = response?.data?.thread
        return thread
      },
      invalidatesTags: () => [{ type: "THREAD", id: "LIST_OF_THREAD" }],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED CREATE THREAD: ", error)
        }
      },
    }),
    createCommentOnThread: builder.mutation({
      query: ({ threadId, content }) => ({
        url: `threads/${threadId}/comments`,
        method: "POST",
        headers: protectedHeaders,
        body: {
          content,
        },
      }),
      transformResponse: (response) => {
        const comment = response?.data?.comment
        return comment
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED CREATE COMMENT THREAD: ",
            error,
          )
        }
      },
    }),
    upVoteThread: builder.mutation({
      query: ({ threadId }) => ({
        url: `threads/${threadId}/up-vote`,
        method: "POST",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const vote = response?.data?.vote
        return vote
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED UP-VOTE THREAD: ", error)
        }
      },
    }),
    downVoteThread: builder.mutation({
      query: ({ threadId }) => ({
        url: `threads/${threadId}/down-vote`,
        method: "POST",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const vote = response?.data?.vote
        return vote
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED DOWN-VOTE THREAD: ", error)
        }
      },
    }),
    neutralizeVoteThread: builder.mutation({
      query: ({ threadId }) => ({
        url: `threads/${threadId}/neutral-vote`,
        method: "POST",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const vote = response?.data?.vote
        return vote
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED NEUTRAL-VOTE THREAD: ", error)
        }
      },
    }),
    upVoteCommentThread: builder.mutation({
      query: ({ threadId, commentId }) => ({
        url: `threads/${threadId}/comments/${commentId}/up-vote`,
        method: "POST",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const vote = response?.data?.vote
        return vote
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED UP-VOTE COMMENT THREAD: ",
            error,
          )
        }
      },
    }),
    downVoteCommentThread: builder.mutation({
      query: ({ threadId, commentId }) => ({
        url: `threads/${threadId}/comments/${commentId}/down-vote`,
        method: "POST",
        headers: protectedHeaders,
      }),
      transformResponse: (response) => {
        const vote = response?.data?.vote
        return vote
      },
      invalidatesTags: (_result, _error, { threadId }) => [
        { type: "THREAD", id: threadId },
      ],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED DOWN-VOTE COMMENT THREAD: ",
            error,
          )
        }
      },
    }),
    getAllThread: builder.query({
      query: () => ({
        url: `threads`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const threads = response?.data?.threads
        return threads
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "THREAD", id })),
              { type: "THREAD", id: "LIST_OF_THREAD" },
            ]
          : [{ type: "THREAD", id: "LIST_OF_THREAD" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          const { data: threads } = await queryFulfilled

          // Initialize a Set to store unique categories
          const uniqueCategories = new Set()

          // Initialize an empty object to store category counts
          const categoryCounts = {}

          // Loop through each thread and add the category to the Set
          threads.forEach((thread) => {
            const category = thread.category

            // Increment the count for the category
            if (categoryCounts[category]) {
              categoryCounts[category]++
            } else {
              categoryCounts[category] = 1
            }
            // adding category to set of uniqueCategories
            uniqueCategories.add(category)
          })

          // Convert the Set to an array
          const uniqueCategoriesList = [...uniqueCategories]

          // dispatching category and thread count by category
          dispatch(setThreadCategory(uniqueCategoriesList))
          dispatch(setThreadCountByCategory(categoryCounts))
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL THREAD: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    getDetailThread: builder.query({
      query: ({ threadId }) => ({
        url: `threads/${threadId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const detailThread = response?.data?.detailThread
        return detailThread
      },
      providesTags: (result) => [{ type: "THREAD", id: result?.id }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET DETAIL THREAD: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const {
  useGetAllThreadQuery,
  useCreateThreadMutation,
  useGetDetailThreadQuery,
  useCreateCommentOnThreadMutation,
  useDownVoteCommentThreadMutation,
  useDownVoteThreadMutation,
  useNeutralizeVoteThreadMutation,
  useUpVoteCommentThreadMutation,
  useUpVoteThreadMutation,
} = threadApiSlice
