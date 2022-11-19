import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
});

export const DeleteBrand = ({ show, setShow, id }) => {
    const initialValues = {
        id,
    };
    const { t } = useTranslation("/Settings/ns");
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state?.paymentGateways);

    return (

        <Modal
            heading={t("deleteBrand")}
            submitText={t("deleteBrand")}
            show={show}
            setShow={setShow}
            customBody={
                <div className="mb-[32px]" >
                    Are you sure you wish to delete this brand ? This action is
                    permanent and can not be undone.
                </div >
            }
            loading={loading}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={async ({ id }) => {
                await dispatch(deleteBrand({ id }));
                setShow(false);
            }}
        />
    );
};
