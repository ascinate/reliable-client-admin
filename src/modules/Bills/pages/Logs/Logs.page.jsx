import moment from "moment";
import { Table } from "components";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { axios, exportToExcel, getError, getLogsConfig } from "lib";
import { getLogsSlice, setLogsLoading } from "store/Slices/logs";
import { toast } from "react-toastify";

export default function Logs() {
  const [data, setData] = useState([]);
  const { settings } = useSelector((state) => state.appSettings);
  const { t } = useTranslation("/Users/ns");
  const [totalCount, setTotalCount] = useState(0);

  const { logs, loading } = useSelector((state) => state?.logs);
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Logs",
    modules: userModules,
  });
  const dispatch = useDispatch();

  const getLogs = (page, pageSize) => {
    return async (dispatch) => {
      dispatch(setLogsLoading(true));
      try {
        const { url, defaultData, config } = getLogsConfig(page, pageSize);
        const res = await axios.post(url, defaultData, config);
        setTotalCount(res?.data?.totalCount);
        await dispatch(getLogsSlice(res?.data?.data));
        dispatch(setLogsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setLogsLoading(false));
      }
    };
  };

  useEffect(() => {
    dispatch(getLogs(0, 10));
  }, []);

  const columns = [
    {
      title: t("status"),
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
          {status}
        </div>
      ),
    },
    {
      title: t("url"),
      key: "url",
      dataIndex: "url",
      sorter: (a, b) => (a?.url < b?.url ? -1 : 1),
    },
    {
      title: "User",
      key: "user",
      dataIndex: "user",
      sorter: (a, b) => (a?.user < b?.user ? -1 : 1),
    },
    {
      title: t("reqDate"),
      key: "reqDate",
      sorter: (a, b) => (moment(a?.reqDate) < moment(b?.reqDate) ? -1 : 1),
      dataIndex: "reqDate",
    },
    // {
    //   title: 'Description',
    //   key: 'description',
    //   dataIndex: 'description',
    // },
  ];

  // Set Data to Fetched Logs
  useEffect(() => {
    const dataHolder = [];
    logs?.forEach((log) => {
      dataHolder?.push({
        key: log?.id,
        status: "200 OK",
        url: `${log?.type} ${log?.tableName}`,
        user: log?.fullName ? log?.fullName : "system",
        // description: log?.text,
        reqDate: moment(log?.dateTime)?.format(settings?.dateFormat),
      });
    });
    setData(dataHolder);
  }, [logs]);

  const handlePageChange = (page, pageSize) => {
    dispatch(getLogs(page, pageSize));
  };

  return (
    <div className="p-[40px]">
      <div className="bg-[#1E1E2D] rounded-[8px]">
        <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
          {t("logs")}
        </h6>
        <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
        <div className="p-[20px]">
          <Table
            data={data}
            columns={columns}
            fieldToFilter={"url"}
            t={t}
            btnData={{
              text: "Download Logs",
              onClick: () => {
                exportToExcel(logs);
              },
            }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              position: ["bottomRight"],
              pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
              onChange: handlePageChange,
              total: totalCount,
            }}
            hideActions
            permissions={permissions}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
