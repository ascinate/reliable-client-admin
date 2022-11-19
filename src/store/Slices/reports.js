// getAllProducts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  annualReports: [],
  filteredReports: [],
  replyReports: [],
  responseReports: [],
  reportsByCustomer: [],
  reportsByAgent: [],
  reportsByStatus: [],
  reportsByDepartment: [],
  reportsByPriority: [],
  loading: false,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getAnnualReportsDispatch: (state, { payload }) => {
      state.annualReports = payload;
    },
    getFilteredReportsDispatch: (state, { payload }) => {
      state.filteredReports = payload;
    },
    getReplyReportsDispatch: (state, { payload }) => {
      state.replyReports = payload;
    },
    getResponseReportsDispatch: (state, { payload }) => {
      state.responseReports = payload;
    },
    getReportsByCustomerDispatch: (state, { payload }) => {
      state.reportsByCustomer = payload;
    },
    getReportsByAgentDispatch: (state, { payload }) => {
      state.reportsByAgent = payload;
    },
    getReportsByStatusDispatch: (state, { payload }) => {
      state.reportsByStatus = payload;
    },
    getReportsByDepartmentDispatch: (state, { payload }) => {
      state.reportsByDepartment = payload;
    },
    getReportsByPriorityDispatch: (state, { payload }) => {
      state.reportsByPriority = payload;
    },
    setReportsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const {
  getAnnualReportsDispatch,
  getFilteredReportsDispatch,
  getReplyReportsDispatch,
  getResponseReportsDispatch,
  setReportsLoading,

  // Filter Reports
  getReportsByAgentDispatch,
  getReportsByCustomerDispatch,
  getReportsByStatusDispatch,
  getReportsByDepartmentDispatch,
  getReportsByPriorityDispatch,
} = actions;

export default reducer;
