import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: [],
  loading: false,
  orders: [],
  order: null,
  orderTemplates: [],
  orderTemplate: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderTemplates: (state, { payload }) => {
      state.orderTemplates = payload;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setOrderLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAllOrders: (state, { payload }) => {
      state.allOrders = payload;
    },
    getOrder: (state, { payload }) => {
      state.order = payload;
    },
    getOrderTemplate: (state, { payload }) => {
      state.orderTemplate = payload;
    },
  },
});

const { reducer, actions } = ordersSlice;
export const {
  getOrders,
  getOrder,
  setOrderLoading,
  getOrderTemplate,
  getOrderTemplates,
  getAllOrders,
} = actions;

export default reducer;
