import { Button, Input } from "components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCurrentOnlineUsers } from "store";
import { getUsers } from "store";

export const EditOrderSideBar = () => {
  const [adminList, setAdminList] = useState([]);
  const dispatch = useDispatch();
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const isSuperAdmin = useSelector(
    (state) => state?.auth?.user?.userRolesResponse?.userRoles
  )[1]?.enabled;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentOnlineUsers());
  }, []);

  useEffect(() => {
    let usersData = [];
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

    setAdminList(usersData);
  }, [users, onlineUsers]);

  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px]">
      <div className="flex justify-between items-center">
        <h6 className="text-white font-medium text-[16px]">Order Details</h6>
        {/* <div className="w-[11px] h-[11px] rounded-[50%] bg-[#0BB783]" /> */}
      </div>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        View corresponding product details
      </p>

      <Input
        name="orderNo"
        placeholder="#43"
        type="text"
        label="Order Number"
        className="mb-[20px] mt-1"
        disabled={true}
      />
      <Input
        name="orderPrice"
        type="text"
        label="Total Price"
        className="mb-[20px]"
        disabled
      />
      <Input
        name="createdOn"
        type="text"
        label="Created On"
        className="mb-[20px]"
        disabled
      />
      <Input
        name="modifiedOn"
        type="text"
        label="Last Modified On"
        className="mb-[20px]"
        disabled
      />

      <Input
        name="assignedToClientId"
        placeholder="Client"
        type="text"
        label="Client"
        className="mb-[20px]"
        disabled
      />

      <Input
        name="CustomerIp"
        placeholder="154.227.25.101"
        type="text"
        label="Customer IP"
        className="mb-[20px]"
        disabled
      />
      {isSuperAdmin && (
        <Input
          name="adminAssigned"
          placeholder="Select admin"
          type="select"
          label="Assign To"
          className="mb-[20px]"
          options={adminList}
        />
      )}
      <Input
        name="status"
        placeholder="Status"
        type="select"
        label="Status"
        className="mb-[20px]"
        options={[
          { label: "Draft", value: 0 },
          { label: "Pending", value: 1 },
          { label: "Paid", value: 2 },
          { label: "Processing", value: 3 },
          { label: "Completed", value: 4 },
          { label: "Accepted", value: 5 },
          { label: "Canceled", value: 6 },
        ]}
      />
      <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
        Save Changes
      </Button>
    </div>
  );
};
