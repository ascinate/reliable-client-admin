import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { Sidebar, GeneralSettings } from "./sections";
import "./AddEditOrder.styles.scss";
import { createServerImage } from "lib";
import {
  getCategories,
  createOrder,
  // editOrderTemplateByID,
  getOrderTemplate,
  getOrderTemplates,
  getDepartments,
  // getOrderTemplateByID,
} from "store";
import { getOrderDetails } from "store";
import * as Yup from "yup";
import { useQuery } from "components/TicketDetails/sections/Details/Details.section";

const validationSchema = Yup.object().shape({
  assignedToClientId: Yup.string().required("Client is required"),
});

export const AddEditOrder = () => {
  // const [active, setActive] = useState('GENERAL SETTINGS');

  // const links = [
  //   { label: 'GENERAL SETTINGS', onClick: () => setActive('GENERAL SETTINGS') },
  //   {
  //     label: 'ADVANCED SETTINGS',
  //     onClick: () => setActive('ADVANCED SETTINGS'),
  //   },
  // ];

  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state?.orders);
  const { id } = useParams();
  const query = useQuery();
  const clientId = query.get("client");

  useEffect(() => {
    (async () => {
      // console.log(id);
      await dispatch(getCategories());
      if (id) {
        dispatch(getOrderDetails(id));
      } else if (!id) {
        dispatch(getOrderTemplate(null));
      }
      await dispatch(getDepartments());
      await dispatch(getOrderTemplates());
    })();
  }, []);

  const initVal = {
    preview: order ? order?.products[0]?.base64Image : "",
    isActive: true,
    name: order ? order?.products[0]?.name : "",
    description: order ? order?.products[0]?.description : "",
    thumbnail: order ? order?.products[0]?.thumbnail : "",
    status: order ? order?.products[0]?.status : 0,
    productCategories: order
      ? order?.products[0]?.productCategories?.map((category) => category?.id)
      : [],
    productDepartments: order
      ? order?.products[0]?.productDepartments?.map(
          (department) => department?.id
        )
      : [],
    productLineItems: order
      ? order?.orderProductLineItems?.map((item) => ({
          ...item,
          isDeleted: item?.isDeleted || false,
        }))
      : [],
    tags: order ? order?.products[0]?.tags?.split(",") : [],
    paymentType: order ? order?.products[0]?.paymentType : 0,
    billingCycle: order ? order?.products[0]?.billingCycle : 0,
    notes: order ? order?.products[0]?.notes : "",
    registrationDate: order ? moment(order?.products[0]?.registrationDate) : "",
    nextDueDate: order ? moment(order?.products[0]?.registrationDate) : "",
    terminationDate: order ? moment(order?.products[0]?.registrationDate) : "",
    overrideSuspensionDate: order
      ? moment(order?.products[0]?.registrationDate)
      : "",
    overrideTerminationDate: order
      ? moment(order?.products[0]?.registrationDate)
      : "",
    adminAssigned: order ? order?.adminAssigned : "",
    orderForClientId: order ? order?.orderForClientId : "",
    assignedToClientId: clientId
      ? clientId
      : order
      ? order?.assignedClient
      : "",
    orderNotes: order ? order?.notes : "",
    orderTenant: order ? order?.tenant : "admin",
  };
  const { user } = useSelector((state) => state?.auth);

  return (
    <Formik
      initialValues={initVal}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        const img = await createServerImage(values.thumbnail);
        const newValues = {
          products: [
            {
              name: values.name,
              description: values.description,
              thumbnail: img,
              assignedToClientId: values.assignedToClientId,
              // productCategories: values?.orderTemplateCategories,
              // productDepartments: values?.orderTemplateDepartments,
              productLineItems: values.productLineItems?.map((item) => {
                if (id) {
                  if (item?.isNew) {
                    return {
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  } else {
                    return {
                      // id: item?.isNew ? "" : item?.id,
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  }
                } else {
                  if (item?.isNew) {
                    return {
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  } else {
                    return {
                      id: item?.isNew ? "" : item?.id,
                      lineItem: item?.lineItem,
                      price: item?.price,
                      isDeleted: item?.isDeleted ? true : false,
                      priceType: Number(values?.paymentType),
                    };
                  }
                }
              }),
              status: 0,
              // tags: `${values?.tags}`,
              paymentType: Number(values.paymentType),
              billingCycle: Number(values.billingCycle),
              notes: values?.notes,
              registrationDate: moment()?.toISOString(),
              nextDueDate: moment()?.toISOString(),
              terminationDate: null,
              overrideSuspensionDate: null,
              overrideTerminationDate: null,
            },
          ],
          adminAssigned: order ? order?.adminAssigned : user?.id,
          orderForClientId: values.assignedToClientId,
          orderStatus: 0,
          orderNotes: order ? order?.notes : "",
          tenant: "admin",
        };
        if (id) {
          // await dispatch(editOrderTemplateByID(id, newValues));
        } else {
          await dispatch(createOrder({ data: newValues }));
          // await dispatch(createOrderTemplate({ data: newValues }));
        }
        // resetForm();
        // navigate('/admin/dashboard/billing/orders/order-templates/list');
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="users">
              <div className="admin-details min-w-[60vh]">
                {loading ? (
                  // categoriesLoading ||
                  // usersLoading ||
                  // departmentsLoading ? (
                  <Spin
                    size="large"
                    style={{ gridColumn: "1/3", alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <div className="admin-details__left">
                      {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
                      <Sidebar />
                    </div>
                    <div className="admin-details__right">
                      {/* <Navigation active={active} links={links} /> */}
                      {/* {active === 'GENERAL SETTINGS' ? ( */}
                      <GeneralSettings />
                      {/* ) : (
                        <></>
                      )} */}
                      {/* {active === 'ADVANCED SETTINGS' ? (
                        <AdvancedSettings />
                      ) : (
                        <></>
                      )} */}
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
