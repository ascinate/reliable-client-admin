import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Input, Table } from "components";
// import { useState } from 'react';
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { useEffect, useState } from "react";
import { getProducts } from "store";
import { Form, Formik } from "formik";
import {
  Cancel,
  Delete,
  Renew,
  Suspend,
  Terminate,
  Unsuspend,
} from "./sections";
import { getCategories } from "store";

export const PSList = () => {
  // const [showAdd, setShowAdd] = useState(false);
  const { settings } = useSelector((state) => state.appSettings);
  const navigate = useNavigate();
  // const { clients } = useSelector((state) => state?.users);
  const { t } = useTranslation("/Bills/ns");
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Products",
    modules: userModules,
  });

  const Options = [
    { label: "Hourly", value: 0 },
    { label: "Monthly", value: 1 },
    { label: "Quarterly", value: 2 },
    { label: "SemiAnnually", value: 3 },
    { label: "Annually", value: 4 },
    { label: "Biennially", value: 5 },
    { label: "Triennially", value: 6 },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a?.id < b?.id ? -1 : 1),
      render: (text) => <>{text.substr(text.length - 5)}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name < b?.name ? -1 : 1),
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[16px]">
            {record?.base64Image ? (
              <img
                className="w-[100px] h-[98px] rounded-[8px] object-contain bg-[yellow]"
                src={record?.base64Image}
                alt={record?.name}
              />
            ) : null}
            <p className="text-white text-[14px]">{record?.description}</p>
          </div>
        );
      },
      width: "20%",
    },
    // {
    //   title: "Items",
    //   dataIndex: "productLineItems",
    //   key: "productLineItems",
    //   render: (lineItems) => {
    //     return (
    //       <div className="flex flex-col gap-[16px]">
    //         {lineItems?.map((item, idx) => {
    //           if (idx >= 3) {
    //             return null;
    //           } else {
    //             return (
    //               <div className="flex flex-col gap-[4px]">
    //                 <div className="text-white text-[14px]">
    //                   {item?.lineItem}
    //                 </div>
    //                 <div className="text-[#474761] text-[12px]">
    //                   ${item?.price}
    //                 </div>
    //               </div>
    //             );
    //           }
    //         })}
    //       </div>
    //     );
    //   },
    //   width: "20%",
    // },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => (a?.total < b?.total ? -1 : 1),
      render: (text, record) => {
        let sum = 0;
        record?.productLineItems?.forEach((item) => {
          if (!item?.isDeleted) {
            sum += item?.price;
          }
        });
        return <>${sum}</>;
      },
    },
    {
      title: "Client Name",
      dataIndex: "assignedClient",
      key: "assignedClient",
      sorter: (a, b) => (a?.assignedClient < b?.assignedClient ? -1 : 1),
      // render: (text) => {
      //   const client = clients?.find((client) => client?.id === text);
      //   return client?.fullName ? client.fullName : "N/A";
      // },
    },
    {
      title: "Billing Cycle",
      dataIndex: "billingCycle",
      key: "billingCycle",
      render: (cycle) => {
        let text = "";
        switch (cycle) {
          case 0:
            text = Options[0]?.label;
            break;
          case 1:
            text = Options[1]?.label;
            break;
          case 2:
            text = Options[2]?.label;
            break;
          case 3:
            text = Options[3]?.label;
            break;
          case 4:
            text = Options[4]?.label;
            break;
          case 5:
            text = Options[5]?.label;
            break;
          case 6:
            text = Options[6]?.label;
            break;

          default:
            text = "UNKNOWN";
        }
        return text;
      },
    },
    {
      title: "Next Due Date",
      dataIndex: "nextDueDate",
      key: "nextDueDate",
      sorter: (a, b) =>
        moment(a?.nextDueDate) < moment(b?.nextDueDate) ? -1 : 1,
      render: (nextDueDate) => moment(nextDueDate).format(settings?.dateFormat),
      width: "70px",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        let text = "";
        switch (status) {
          case 0:
            color = "bg-[#392F28] text-[#FFA800]";
            text = "DRAFT";
            break;
          case 1:
            color = "bg-[#392F28] text-[#FFA800]";
            text = "PENDING";
            break;
          case 2:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "PAID";
            break;
          case 3:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "PROCESSING";
            break;
          case 4:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "COMPLETED";
            break;
          case 5:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "ACCEPTED";
            break;
          case 6:
            color = "bg-[#3A2434] text-[#F64E60]";
            text = "CANCELLED";
            break;
          default:
            color = "";
            text = "UNKNOWN";
        }
        return (
          <div
            className={`${color} px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
          >
            {text}
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state?.products);
  const categoriesLoading = useSelector((state) => state?.categories?.loading);

  // const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [showTerminate, setShowTerminate] = useState(false);
  const [showRenew, setShowRenew] = useState(false);
  const [showUnsuspend, setShowUnsuspend] = useState(false);
  const [record, setRecord] = useState(null);

  return (
    <div className="p-[40px]">
      {/* <Add show={showAdd} setShow={setShowAdd} /> */}
      <Delete show={showDelete} setShow={setShowDelete} record={record} />
      <Cancel show={showCancel} setShow={setShowCancel} record={record} />
      <Suspend show={showSuspend} setShow={setShowSuspend} record={record} />
      <Terminate
        show={showTerminate}
        setShow={setShowTerminate}
        record={record}
      />
      <Renew show={showRenew} setShow={setShowRenew} record={record} />
      <Unsuspend
        show={showUnsuspend}
        setShow={setShowUnsuspend}
        record={record}
      />
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Formik initialValues={{ selectFilter: "name" }}>
          {({ values }) => (
            <Form>
              <Table
                columns={columns}
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
                  position: ["bottomRight"],
                }}
                data={products}
                loading={categoriesLoading || loading}
                fieldToFilter={values?.selectFilter}
                // btnData={{
                //   onClick: () => setShowAdd(true),
                //   text: "Add New Product",
                // }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(
                        `/admin/dashboard/billing/products-services/list/details/${record?.id}`
                      );
                    },
                  };
                }}
                editAction={(record) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/admin/dashboard/billing/products-services/list/details/${record?.id}`
                      );
                    }}
                  >
                    View
                  </Button>
                )}
                deleteAction={(record) => (
                  <>
                    <Button
                      onClick={() => {
                        setRecord(record);
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        setRecord(record);
                        if (record?.status === 4) {
                          setShowUnsuspend(true);
                        } else {
                          setShowSuspend(true);
                        }
                      }}
                    >
                      {record?.status === 4 ? "Un-Suspend" : "Suspend"}
                    </Button>
                    <Button
                      onClick={() => {
                        setRecord(record);
                        setShowTerminate(true);
                      }}
                    >
                      Terminate
                    </Button>
                    <Button
                      onClick={() => {
                        setRecord(record);
                        setShowRenew(true);
                      }}
                    >
                      Renew
                    </Button>
                    <Button
                      onClick={() => {
                        setRecord(record);
                        setShowCancel(true);
                      }}
                    >
                      Cancel
                    </Button>
                    {/* <Button>Termiate</Button> */}
                  </>
                )}
                permissions={permissions}
                customAdditionalBody={
                  <div className="min-w-[250px] flex items-center gap-[10px]">
                    <div className="text-white text-[14px] w-[100px]">
                      Filter By:
                    </div>
                    <Input
                      name="selectFilter"
                      type="select"
                      options={[
                        { value: "name", label: "Name" },
                        { value: "total", label: "Total" },
                        { value: "status", label: "Status" },
                      ]}
                    />
                  </div>
                }
                t={t}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
