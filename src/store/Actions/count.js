import { getError, axios } from 'lib';
import { toast } from 'react-toastify';
import { setCount, setCountLoading } from 'store/Slices/dataCount';

export const getDataCounts = () => {
  return async (dispatch) => {
    const AuthToken = localStorage.getItem('AuthToken');
    const tokenObj = JSON.parse(AuthToken);
    const token = tokenObj?.token;
    const headers = {
      'Content-type': 'application/json',
      'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
      tenant: 'admin',
      Authorization: `Bearer ${token}`,
    };
    setCountLoading(true);
    try {
      const url = '/api/v1/admin/dashboard/getdatacounts';
      const res = await axios.get(`${process.env.REACT_APP_BASEURL}${url}`, {
        headers,
      });
      dispatch(setCount(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      setCountLoading(false);
    }
  };
};
