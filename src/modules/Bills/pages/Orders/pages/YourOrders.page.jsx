import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "components";
import { statusList } from "lib";
import { checkModule } from "lib/checkModule";
import { getOrders } from "store";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import { AddOrder } from "./sections/AddOrder.section";
import { getClients } from "store";
import { getProducts } from "store";
import { getOrderTemplates } from "store";
import { Button } from "antd";
import { Delete } from "modules/UserProfile/sections/APIKeys/sections";
import { getUsers } from "store";
import { getCurrentOnlineUsers } from "store";

export const YourOrders = ({ myOrders }) => {
  const navigate = useNavigate();
  // const [showAdd, setShowAdd] = useState(false);
  const { settings } = useSelector((state) => state.appSettings);
  const [showDelete, setShowDelete] = useState(false);
  const { t } = useTranslation("/Bills/ns");
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state?.orders);
  const { userModules } = useSelector((state) => state?.modules);
  const { user } = useSelector((state) => state?.auth);
  const [record, setRecord] = useState(null);
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const { clients } = useSelector((state) => state?.users);
  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
      await dispatch(getOrderTemplates());
      await dispatch(getClients());
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentOnlineUsers());
  }, []);

  let usersData = [{ label: "Any", value: "" }];
  if (users?.length) {
    users?.forEach((user) => {
      const isOnline = onlineUsers?.find((admin) => admin?.userId === user?.id)
        ? true
        : false;
      usersData.push({
        value: user?.id,
        label: user?.fullName
          ? `${user?.fullName}${isOnline ? "   (Online)" : ""}`
          : "N/A",
        isActive: isOnline ? true : false,
      });
    });
  }

  // Setting data properly

  const { permissions } = checkModule({
    module: "Orders",
    modules: userModules,
  });

  const AdvancedSearchOptions = {
    searchValues: {
      orderId: "",
      dateAdded: "",
      status: "",
      total: "",
      client: "",
      admin: "",
      numResult: 100,
      title: "",
    },
    fields: [
      {
        label: "Order No",
        name: "orderId",
        type: "text",
        variant: "text",
        placeholder: "36",
      },
      {
        label: "Amount",
        name: "total",
        type: "number",
        variant: "text",
        placeholder: "100",
      },
      {
        label: "Date",
        name: "dateAdded",
        type: "date",
        variant: "dateRange",
        placeholder: "12-13-2022",
      },
      {
        label: "Client",
        name: "client",
        type: "text",
        variant: "searchable",
        options: clients,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        variant: "select",
        options: [
          { label: "Any", value: "" },
          { label: "Draft", value: 0 },
          { label: "Pending", value: 1 },
          { label: "Paid", value: 2 },
          { label: "Processing", value: 3 },
          { label: "Completed", value: 4 },
          { label: "Accepted", value: 5 },
          { label: "Canceled", value: 6 },
        ],
      },
      {
        label: "Admin",
        name: "admin",
        type: "select",
        placeholder: "Select Admin",
        variant: "select",
        options: usersData,
      },
      {
        label: "Max Results",
        name: "numResult",
        type: "number",
        variant: "text",
      },
      {
        label: "Search string",
        name: "title",
        type: "text",
        variant: "text",
      },
    ],
  };

  const columns = [
    {
      title: t("orderId"),
      dataIndex: "orderNo",
      key: "orderNo",
      sorter: (a, b) => (a?.orderNo < b?.orderNo ? -1 : 1),
    },
    {
      title: t("client"),
      dataIndex: "clientFullName",
      key: "clientFullName",
      sorter: (a, b) => (a?.clientFullName < b?.clientFullName ? -1 : 1),
      render: (fullName) => {
        // let name = "";
        // let userN = fullName?.split(" ");
        // if (userN?.length < 2) {
        //   name = userN?.[0]?.charAt(0);
        // } else {
        //   name = userN?.[0]?.charAt(0) + userN?.[1]?.charAt(0);
        // }
        // console.log(record);
        // const statusValue = statusList(record?.status);
        return (
          <div className="flex items-center gap-[12px]">
            {/* {record?.issueByImage ? (
              <img
                src={record?.userImagePath}
                alt="card"
                className="w-[32px] h-[20px] object-cover rounded-[4px]"
              />
            ) : (
              <div
                className={`bg-[${statusValue.bg}] px-[8px] py-[4px]  text-[${statusValue.text}] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center`}
              >
                {name}
              </div>
            )} */}
            <p className="text-white">{fullName ? fullName : "N/A"}</p>
          </div>
        );
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => (a?.status < b?.status ? -1 : 1),
      render: (status) => {
        const statusValue = statusList(status);
        return (
          <div
            className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}
          >
            {statusValue.name}
          </div>
        );
      },
    },
    {
      title: t("total"),
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => (a?.totalPrice < b?.totalPrice ? -1 : 1),
      render: (totalPrice) => {
        return <>{`${totalPrice} USD`}</>;
      },
    },
    {
      title: t("dateAdded"),
      dataIndex: "createdOn",
      key: "createdOn",
      sorter: (a, b) => (moment(a?.createdOn) < moment(b?.createdOn) ? -1 : 1),
      render: (createdOn) => moment(createdOn).format(settings?.dateFormat),
    },
    {
      title: t("dateModified"),
      dataIndex: "lastModifiedOn",
      key: "lastModifiedOn",
      sorter: (a, b) =>
        moment(a?.lastModifiedOn) < moment(b?.lastModifiedOn) ? -1 : 1,
      render: (lastModifiedOn) =>
        moment(lastModifiedOn).format(settings?.dateFormat),
    },
  ];

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Delete
          show={showDelete}
          setShow={setShowDelete}
          record={record}
          type="order"
        />
        <Table
          AdvancedSearchOptions={AdvancedSearchOptions}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomRight"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          columns={columns}
          data={
            myOrders
              ? orders?.filter((order) => order?.adminAssigned === user?.id)
              : orders
          }
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(
                  `/admin/dashboard/billing/orders/${
                    myOrders ? "your-orders" : "all-orders"
                  }/list/edit/${record?.id}`
                );
              },
            };
          }}
          btnData={{
            text: "Add Order",
            onClick: () =>
              navigate(
                `/admin/dashboard/billing/orders/${
                  myOrders ? "your-orders" : "all-orders"
                }/list/add/new`
              ),
          }}
          viewAction={(record) => (
            <Button
              onClick={() => {
                navigate(
                  `/admin/dashboard/billing/orders/${
                    myOrders ? "your-orders" : "all-orders"
                  }/list/edit/${record?.id}`
                );
              }}
            >
              View/Edit
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
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
