import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { downloadBlob } from "./fileDownload";
const REACT_APP_API_URL = "https://api.codelab.pk/api";
const API_URL = REACT_APP_API_URL;
const handleBlobDownload = async (response, filename) => {
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          push();
        });
      }
      push();
    },
  });
  const blob = await new Response(stream).blob();
  downloadBlob(blob, filename, "application/octet-stream");
};
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json"); // Add Accept header
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result", result);
  const contentType = result.meta?.response?.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return result;
  } else if (contentType && contentType.includes("application/octet-stream")) {
    return { data: result.meta.response };
  } else {
    throw new Error("Expected JSON response but received non-JSON response.");
  }
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    get: builder.query({
      query: ({ path, params }) => ({
        url: path,
        method: "GET",
        params,
      }),
      transformResponse: async (response, meta, params) => {
        const contentType = meta.response.headers.get("content-type");
        if (contentType.includes("application/octet-stream")) {
          if (params && params.filename) {
            await handleBlobDownload(meta.response, params.filename);
          }
          return;
        } else if (contentType.includes("application/json")) {
          return response;
        } else {
          throw new Error("Unexpected content type received");
        }
      },
    }),
    post: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "POST",
        body,
      }),
    }),
    put: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "PUT",
        body,
      }),
    }),
    delete: builder.mutation({
      query: ({ path }) => ({
        url: path,
        method: "DELETE",
      }),
    }),
    patch: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "PATCH",
        body,
      }),
    }),
  }),
});
export const {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
  usePatchMutation,
} = apiSlice;
export default apiSlice.reducer;
