import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSupportSettingsByTenant } from 'store';
import { updateSupportSettings } from 'store';

const validationSchema = Yup.object().shape({
  maxNumberOfSubCategories: Yup.number().required('This is a required field'),
  autoApproveNewArticles: Yup.boolean().required('This is a required field'),
});

export default function Support() {
  // Fields
  const fields = [
    {
      name: 'maxNumberOfSubCategories',
      label: 'Max Number of Sub Categories',
      type: 'number',
    },
    {
      name: 'refundRetainPercentage',
      label: 'Refund Retain Percentage',
      type: 'number',
    },
    {
      name: 'autoApproveNewArticles',
      label: 'Auto Approve New Articles',
      type: 'switch',
    },
  ];

  const { supportSettings, loading } = useSelector(
    (state) => state?.appSettings
  );
  const dispatch = useDispatch();
  const initialValues = {
    maxNumberOfSubCategories: supportSettings?.maxNumberOfSubCategories,
    autoApproveNewArticles: supportSettings?.autoApproveNewArticles,
    refundRetainPercentage: supportSettings?.refundRetainPercentage,
  };

  useEffect(() => {
    dispatch(getSupportSettingsByTenant());
  }, []);
  return (
    <div className="p-[40px]">
      <Card heading="Support Settings" loading={loading}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await dispatch(
              updateSupportSettings({ id: supportSettings?.id, data: values })
            );
          }}
        >
          <Form>
            <div className="grid grid-cols-4 gap-[20px] mb-[32px]">
              {fields.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field?.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  options={field.options}
                />
              ))}
            </div>
            <Button
              htmlType="submit"
              type="ghost"
              className="px-[32px] h-[52px]"
            >
              Save Changes
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}
