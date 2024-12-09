import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Article, NewsState } from "./types";

// Initial state
const initialState: NewsState = {
  articles: [],
  totalResults: 0,
  status: "idle",
  error: null,
};

// Async thunk to fetch news
export const fetchNews = createAsyncThunk<
  { articles: Article[]; totalResults: number },
  { query: string; startDate: string | null; endDate: string | null }
>("news/fetchNews", async ({ query, startDate, endDate }) => {
  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: query,
      from: startDate,
      to: endDate,
      sortBy: "popularity",
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
    },
  });
  return {
    totalResults: response.data.totalResults,
    articles: response.data.articles,
  };
});

// Create the news slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNewsState: (state) => {
      state.totalResults = 0;
      state.articles = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchNews.fulfilled,
        (
          state,
          action: PayloadAction<{ articles: Article[]; totalResults: number }>
        ) => {
          state.status = "succeeded";
          state.articles = action.payload.articles;
          state.totalResults = action.payload.totalResults; // Add this line to update totalResults
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch news";
        state.articles = [];
        state.totalResults = 0;
      });
  },
});

export const { resetNewsState } = newsSlice.actions;
export default newsSlice.reducer;
