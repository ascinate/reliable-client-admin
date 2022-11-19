// getAllProducts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  loading: false,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsDispatch: (state, { payload }) => {
      state.products = payload;
    },
    getProductDispatch: (state, { payload }) => {
      state.product = payload;
    },
    setProductsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const { getProductDispatch, getProductsDispatch, setProductsLoading } =
  actions;

export default reducer;
