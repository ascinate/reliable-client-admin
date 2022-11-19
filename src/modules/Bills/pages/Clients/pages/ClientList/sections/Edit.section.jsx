import { Modal } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "store";
import { updateUser } from "store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  status: Yup.bool().required("Status is required"),
  // ipAddress: Yup.string().required('IP Address is required'),
  brandId: Yup.string().required("Brand is required"),
  password: Yup.string().matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Please use 8 or more characters with a mix of letters, numbers & symbols"
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const EditClientUser = ({ show, setShow, client }) => {
  const { t } = useTranslation("/Users/ns");
  const dispatch = useDispatch();
  const { loading, clients } = useSelector((state) => state?.users);
  // const allUsers = [...users, ...clients];
  const { brands } = useSelector((state) => state?.brands);
  const brandsLoading = useSelector((state) => state?.brands?.loading);
  const initialValues = {
    fullName: client?.fullName,
    status: client?.status,
    parentID:
      !client?.parentID || client?.parentID === "0" ? "" : client?.parentID,
    brandId: !client?.brandId || client?.brandId === "0" ? "" : client?.brandId,
    password: "",
    confirmPassword: "",
    ipAddresses: client?.ipAddresses,
  };

  const editFields = [
    {
      type: "input",
      name: "fullName",
      placeholder: "Paul.Elliott",
      title: t("fullName"),
    },

    {
      type: "switch",
      name: "status",
      title: t("status"),
    },
    {
      type: "select",
      name: "brandId",
      title: "Select Brand",
      placeholder: "Select Brand",
      options: brands?.map((brand) => ({
        label: brand?.name,
        value: brand?.id,
      })),
    },
    {
      type: "select",
      name: "parentID",
      placeholder: "Select Parent User",
      title: "Parent User",
      options: clients?.map((user) => ({
        label: user?.userName,
        value: user?.id,
      })),
    },
    {
      type: "password",
      name: "password",
      placeholder: "*******",
      title: "Change Password",
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "*******",
      title: "Confirm New Password",
    },
    {
      type: "multiselect",
      name: "ipAddresses",
      placeholder: "253.205.121.39",
      title: t("ipAddress"),
      mode: "tags",
      options:
        client?.ipAddresses?.length > 0
          ? client?.ipAddresses?.map((ip) => ({
              label: ip,
              value: ip,
            }))
          : null,
    },
  ];
  return (
    <Modal
      heading="Edit Client User"
      submitText="Edit Client User"
      show={show}
      loading={loading || brandsLoading}
      setShow={setShow}
      fields={editFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const editData = {
          fullName: values?.fullName,
          status: values?.status,
          parentID: values?.parentID ? values?.parentID : "",
          brandId: values?.brandId,
          ipAddresses: values?.ipAddresses,
        };
        await dispatch(updateUser(client?.id, editData, true));
        if (values?.password) {
          const data = {
            userId: client?.id,
            password: values?.password,
            confirmPassword: values?.confirmPassword,
          };
          await dispatch(updateUserPassword(data));
        }
        setShow(false);
      }}
    />
  );
};
