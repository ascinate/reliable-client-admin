import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [],
    loading: false,
    invoice: null
};

const invoicesSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        getInvoices: (state, { payload }) => {
            state.invoices = payload;
        },
        getInvoice: (state, { payload }) => {
            state.invoice = payload;
        },
        setInvoiceLoading: (state, { payload }) => {
            state.loading = payload;
        },
    }
})

const { reducer, actions } = invoicesSlice;
export const { getInvoices, getInvoice, setInvoiceLoading } = actions;

export default reducer;