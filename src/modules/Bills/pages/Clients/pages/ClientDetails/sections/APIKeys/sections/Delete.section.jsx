import { Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserById } from "store";
import { deleteAPIKey } from "store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
});

export const Delete = ({ show, setShow, id, type }) => {
  const { loading } = useSelector((state) => state?.apiKeys);
  const { loading: isLoading } = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal
      heading={`Delete ${type === "client" ? "Client" : "API Key"}`}
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this{" "}
          {type === "client" ? "Client" : "API Key"}? This action is permanent
          and can not be undone.
        </div>
      }
      initialValues={{ id }}
      validationSchema={validationSchema}
      submitText={`Delete ${type === "client" ? "Client" : "API Key"}`}
      loading={type === "client" ? isLoading : loading}
      handleSubmit={async (values) => {
        if (type === "client") {
          dispatch(deleteUserById(values?.id));
          navigate("/admin/dashboard/billing/clients/list/show");
        } else {
          await dispatch(deleteAPIKey(values?.id));
        }
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
