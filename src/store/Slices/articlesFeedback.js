import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articlesFeedbacks: [],
  articlesFeedback: null,
  loading: false,
};

const articlesFeedbackSlice = createSlice({
  name: 'articlesFeedback',
  initialState,
  reducers: {
    setArticlesFeedbackLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticleFeedbacks: (state, { payload }) => {
      state.articlesFeedbacks = payload;
    },
    getArticleFeedback: (state, { payload }) => {
      state.articlesFeedback = payload;
    },
  },
});

const { actions, reducer } = articlesFeedbackSlice;

export const {
  setArticlesFeedbackLoading,
  getArticleFeedbacks,
  getArticleFeedback,
} = actions;

export default reducer;
