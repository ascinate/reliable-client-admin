import {
  axios,
  createProductCall,
  deleteProductByIDCall,
  getError,
  getProductsByIDCall,
  getProductsCall,
  updateProductsByIDCall,
  getProductsByClientIDCall,
  getCancelledProductsCall,
  suspendProductByID,
  terminateProductByID,
  cancelProductByIDConfig,
  unSuspenseProductByID,
  renewProductByID,
} from "lib";
import { toast } from "react-toastify";
import {
  getProductsDispatch,
  getProductDispatch,
  setProductsLoading,
} from "store/Slices";

// Get All Products
export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const products = await getProductsCall();
      dispatch(getProductsDispatch(products?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Get Cancelled Products
export const getCancelledProducts = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const products = await getCancelledProductsCall();
      dispatch(getProductsDispatch(products?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Get Products by Client ID
export const getProductsByClientID = ({ clientId }) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const products = await getProductsByClientIDCall({ clientId });
      dispatch(getProductsDispatch(products?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Get Product By ID
export const getProductByID = (id) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const product = await getProductsByIDCall(id);
      dispatch(getProductDispatch(product?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Update Product By ID
export const updateProductByID = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(setProductsLoading(true));
      const res = await updateProductsByIDCall(id, data);
      if (res?.status === 200) {
        const product = await getProductsByIDCall(id);
        dispatch(getProductDispatch(product?.data?.data));
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Create a Product
export const createProduct = (data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await createProductCall(data);
      if (res?.status === 200) {
        const products = await getProductsCall();
        dispatch(getProductsDispatch(products?.data?.data));
        toast.success("Product created successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Delete Product By ID
export const deleteProductByID = (id) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await deleteProductByIDCall(id);
      if (res?.status === 200) {
        const products = await getProductsCall();
        dispatch(getProductsDispatch(products?.data?.data));
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Suspensd, Cancel, UnSuspend, Renew, or Terminate Product By ID
export const performProductActionsByID = (id, type) => {
  let url = "";
  let config = "";
  switch (type) {
    case "SUSPEND":
      url = suspendProductByID(id).url;
      config = suspendProductByID(id).config;
      break;
    case "TERMINATE":
      url = terminateProductByID(id).url;
      config = terminateProductByID(id).config;
      break;
    case "CANCEL":
      url = cancelProductByIDConfig(id).url;
      config = cancelProductByIDConfig(id).config;
      break;
    case "UNSUSPEND":
      url = unSuspenseProductByID(id).url;
      config = unSuspenseProductByID(id).config;
      break;
    case "RENEW":
      url = renewProductByID(id).url;
      config = renewProductByID(id).config;
      break;
    default:
      url = "";
      config = "";
  }
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await axios.put(url, config);
      if (res?.status === 200) {
        const products = await getProductsCall();
        dispatch(getProductsDispatch(products?.data?.data));
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};
