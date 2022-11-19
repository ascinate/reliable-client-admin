import {
    getError,
    axios,
    getInvoicesConfig,
    getInvoiceConfig
} from 'lib';
import { toast } from 'react-toastify';
import { getInvoicesDispatch, setInvoiceLoading, getInvoice } from 'store/Slices';


// Get All Admin Invoice
export const getInvoices = (params = []) => {
    return async (dispatch) => {
        dispatch(setInvoiceLoading(true));
        try {
            const { url, defaultData, config } = getInvoicesConfig(params);
            if (params?.status) {
                defaultData.advancedSearch.fields.push('status');
                defaultData.advancedSearch.keyword = params?.status;
            }
            if (params?.startDate && params?.endDate) {
                defaultData['startDate'] = params?.startDate;
                defaultData['endDate'] = params?.endDate;
            }

            const res = await axios.post(url, defaultData, config);
            dispatch(getInvoicesDispatch(res?.data?.data));
            dispatch(setInvoiceLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setInvoiceLoading(false));
        }
    };
};


// Get User By ID
export const getInvoiceById = (id) => {
    return async (dispatch) => {
        dispatch(setInvoiceLoading(true));
        try {
            const { url, config } = getInvoiceConfig(id);
            const res = await axios.get(url, config);
            dispatch(getInvoice(res?.data?.data));
            dispatch(setInvoiceLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setInvoiceLoading(false));
        }
    };
};