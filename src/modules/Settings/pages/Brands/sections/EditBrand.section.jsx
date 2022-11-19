import { Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { editBrand } from "store";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { createServerImage } from "lib";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  //logo: Yup.mixed().required('Logo is required'),
  clientAssigned: Yup.array().required("Client Assigned is required"),
  status: Yup.bool().required("Status is required"),
});

export const EditBrand = ({ show, setShow, editValue, users }) => {
  const initialValues = {
    id: editValue.id,
    name: editValue.name,
    companyName: editValue.companyName,
    logoUrl: editValue.base64Logo,
    clientAssigned: editValue?.clientAssigned?.split(","),
    status: editValue.status,
    termsOfServiceAgreement: editValue?.termsOfServiceAgreement,
    termsOfServiceURL: editValue?.termsOfServiceURL,
  };
  const { t } = useTranslation("/Settings/ns");
  const dispatch = useDispatch();
  const fields = [
    {
      type: "input",
      name: "name",
      placeholder: "Brand Name",
      title: t("Name"),
    },
    {
      type: "input",
      name: "companyName",
      placeholder: "Mind2Matter",
      title: t("Company"),
    },
    {
      type: "file",
      name: "logoUrl",
      title: t("logo"),
      subText: t("browseLogo"),
    },
    {
      type: "switch",
      name: "status",
      title: t("status"),
    },
    {
      name: "termsOfServiceAgreement",
      title: "Terms of Service Agreement",
      type: "switch",
    },
    {
      name: "termsOfServiceURL",
      title: "Terms of Service",
      type: "text",
    },
    {
      type: "userList",
      name: "clientAssigned",
      placeholder: "Client Assigned",
      title: t("clientAssigned"),
      users: users,
    },
  ];

  const { loading } = useSelector((state) => state?.paymentGateways);

  return (
    <Modal
      heading={t("editBrand")}
      submitText={t("editBrand")}
      show={show}
      setShow={setShow}
      fields={fields}
      loading={loading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const img = values?.image ? await createServerImage(values?.image) : [];
        const newValues = {
          image: Object.keys(img).length ? img : undefined,
          name: values?.name,
          companyName: values?.companyName,
          logoUrl: values?.logoUrl,
          clientAssigned: values?.clientAssigned.toString(),
          status: values?.status,
          termsOfServiceAgreement: values?.termsOfServiceAgreement,
          termsOfServiceURL: values?.termsOfServiceURL,
          id: values?.id,
        };
        await dispatch(editBrand({ data: newValues }));
        setShow(false);
      }}
    />
  );
};
