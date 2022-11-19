import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  article: null,
  loading: false,
  recentArticles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticlesLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticles: (state, { payload }) => {
      state.articles = payload;
    },
    getArticle: (state, { payload }) => {
      state.article = payload;
    },
    getRecentArticles: (state, { payload }) => {
      state.recentArticles = payload;
    },
  },
});

const { actions, reducer } = articlesSlice;

export const {
  setArticlesLoading,
  getArticles,
  getArticle,
  getRecentArticles,
} = actions;

export default reducer;
