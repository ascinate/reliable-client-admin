import { Spin } from "antd";
import { Button } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userStatusChangeById } from "store";
import { EditClientUser } from "../../ClientList/sections";
import { Delete } from "./APIKeys/sections";

export const OtherActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { id } = useParams();

  const { user, loading } = useSelector((state) => state?.users);

  const userStatus = user?.isActive;

  const handleDisableClient = async () => {
    setIsLoading(true);
    if (userStatus) {
      await dispatch(userStatusChangeById(id, "deactivate"));
    } else {
      await dispatch(userStatusChangeById(id, "activate"));
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#1E1E2D] rounded-lg admin-details__user-card px-8">
      <EditClientUser show={showEdit} setShow={setShowEdit} client={user} />
      <Delete
        show={showDelete}
        setShow={setShowDelete}
        record={user}
        type="client"
        id={user?.id}
      />
      <Spin spinning={loading}>
        <h6 className="text-white text-[16px] mb-8">Other Actions</h6>
        <div className="flex flex-col gap-4">
          <Button type="ghost">Login as Client</Button>
          <Button type="ghost" onClick={() => setShowEdit(true)}>
            Reset and Send Password
          </Button>
          {userStatus ? (
            <Button type="deactivate" onClick={handleDisableClient}>
              {isLoading ? "Deactivating Client..." : "Deactivate Client"}
            </Button>
          ) : (
            <Button type="activate" onClick={handleDisableClient}>
              {isLoading ? "Activating Client..." : "Activate Client"}
            </Button>
          )}
          <Button type="delete" onClick={() => setShowDelete(true)}>
            Delete client's account
          </Button>
        </div>
      </Spin>
    </div>
  );
};
