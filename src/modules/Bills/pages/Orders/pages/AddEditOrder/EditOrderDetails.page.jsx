import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import moment from "moment";
import "../../../ProductsServices/pages/PSDetails/PSDetails.styles.scss";
// import { getCategories } from "store";
// import { getDepartments } from "store";
import { GS, LineItems } from "./sections/GeneralSettings/sub-sections";
import { EditOrderSideBar } from "./sections/Sidebar/sub-sections/editOrderSideBar";
import { getOrderDetails } from "store";
import { editOrder } from "store";
import { getUsersByDepartmentID } from "store";

export const EditOrderDetails = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state?.products);
  const { loading, order } = useSelector((state) => state?.orders);
  const { settings } = useSelector((state) => state.appSettings);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      //   await dispatch(getCategories());
      await dispatch(getOrderDetails(id));
      //   await dispatch(getDepartments());
    })();
  }, []);

  useEffect(() => {
    if (order && order?.products[0]?.productDepartments) {
      order?.products[0]?.productDepartments?.forEach((dept) => {
        dispatch(getUsersByDepartmentID(dept?.departmentId));
      });
    }
  }, [order]);

  const initVal = {
    preview: product?.base64Image,
    thumbnail: product?.thumbnail,
    status: order?.status,
    orderNo: `#${order?.orderNo}`,
    orderPrice: order?.status === 0 ? "Draft Order" : order?.totalPrice,
    adminAssigned: order?.adminAssigned,
    name: order?.products[0]?.name,
    description: order?.products[0]?.description,
    productLineItems: order?.orderProductLineItems?.map((item) => ({
      ...item,
      isDeleted: item?.isDeleted || false,
    })),
    assignedToClientId: order?.clientFullName,
    createdOn: moment(order?.createdOn).format(settings?.dateFormat),
    modifiedOn: moment(order?.lastModifiedOn).format(settings?.dateFormat),
  };
  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values) => {
        const newValues = {
          status: Number(values?.status),
          adminAssignedId: values?.adminAssigned,
        };
        await dispatch(editOrder(id, newValues));
        // console.log(newValues);
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="users">
              <div className="admin-details min-w-[60vh]">
                {loading ? (
                  <Spin
                    size="large"
                    style={{ gridColumn: "1/3", alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <div className="admin-details__left">
                      {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
                      {/* <Sidebar defaulValue={initVal?.assignedToClientId} /> */}
                      <EditOrderSideBar />
                      {/* <ProductDetails /> */}
                    </div>
                    <div className="admin-details__right">
                      <GS
                        isView
                        actionLink={[
                          {
                            link: order?.bill?.id
                              ? `/admin/dashboard/billing/invoices/list/details/${order?.bill?.id}`
                              : "#",
                            text: "View Invoice",
                          },
                        ]}
                      />
                      <LineItems isView />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
