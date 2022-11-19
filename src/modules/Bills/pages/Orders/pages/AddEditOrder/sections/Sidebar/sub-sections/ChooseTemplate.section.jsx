import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { Input } from "components";
import { useSelector } from "react-redux";

// const initVal = {
//   status: order ? order?.products[0]?.status : 0,
//   productCategories: order
//     ? order?.products[0]?.productCategories?.map(
//         (category) => category?.categoryId
//       )
//     : [],
//   productDepartments: order
//     ? order?.products[0]?.productDepartments?.map(
//         (department) => department?.departmentId
//       )
//     : [],
//   productLineItems: order
//     ? order?.product[0]?.productLineItems?.map((item) => ({
//         ...item,
//         isDeleted: item?.isDeleted || false,
//       }))
//     : [],
//   tags: order ? order?.products[0]?.tags?.split(',') : [],
//   paymentType: order ? order?.products[0]?.paymentType : 0,
//   billingCycle: order ? order?.products[0]?.billingCycle : 0,
//   notes: order ? order?.products[0]?.notes : '',
// };

export const ChooseTemplate = () => {
  const [selected, setSelected] = useState("");
  const { orderTemplates } = useSelector((state) => state?.orders);

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (selected) {
      const template = orderTemplates?.find(
        (template) => template?.id === selected
      );
      setFieldValue("preview", template?.base64Image);
      setFieldValue("name", template?.productName);
      setFieldValue("description", template?.productDescription);
      setFieldValue("thumbnail", template?.thumbnail);
      setFieldValue("status", template?.status);
      setFieldValue("tags", template?.tags ? template?.tags?.split(",") : []);
      setFieldValue(
        "paymentType",
        template?.paymentType ? template?.paymentType : 0
      );
      setFieldValue("billingCycle", template?.billingCycle);
      setFieldValue("productCategories", template?.orderTemplateCategories);
      setFieldValue("productDepartments", template?.orderTemplateDepartments);
      setFieldValue("productLineItems", template?.orderTemplateLineItems);
    } else {
      setFieldValue("preview", "");
      setFieldValue("name", "");
      setFieldValue("description", "");
      setFieldValue("thumbnail", "");
      setFieldValue("status", "");
      setFieldValue("tags", "");
      setFieldValue("paymentType", "");
      setFieldValue("billingCycle", "");
      setFieldValue("productCategories", "");
      setFieldValue("productDepartments", "");
      setFieldValue("productLineItems", "");
    }
  }, [selected]);

  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px]">
      <div className="flex justify-between items-center">
        <h6 className="text-white font-medium text-[16px]">Order Template</h6>
      </div>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        Select Order Template
      </p>
      <Input
        name="orderTemplate"
        placeholder="Choose Template"
        type="select"
        options={orderTemplates?.map((template) => ({
          label: template?.name,
          value: template?.id,
        }))}
        customOnChange={(e) => {
          setSelected(e?.target?.value);
        }}
      />
    </div>
  );
};
