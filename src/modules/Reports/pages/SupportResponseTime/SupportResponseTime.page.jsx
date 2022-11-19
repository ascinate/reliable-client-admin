// import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import moment from "moment";
// import { FilterCheck, FilterIndicator } from '../../components';
import { Button, DateRangePicker } from "components";
import { Form, Formik } from "formik";
// import { useEffect } from 'react';
import { getResponseReports } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

let dataHolder = [];
for (let i = 1; i <= 12; i++) {
  dataHolder.push({
    createdOn: moment(`${i}`, "M").format("MMM"),
  });
}

// const getLabel = ({ filterName }) => {
//   switch (filterName) {
//     case 'byCustomer':
//       return 'Tickets by Customer';
//     case 'byAgent':
//       return 'Tickets by Agent';
//     case 'byStatus':
//       return 'Tickets by Status';
//     case 'byDepartment':
//       return 'Tickets by Department';
//     case 'byPriority':
//       return 'Tickets by Priority';
//     default:
//       return '';
//   }
// };

export const SupportResponseTime = () => {
  // const [filters, setFilters] = useState({
  //   byCustomer: true,
  //   byAgent: true,
  //   byStatus: false,
  //   byDepartment: false,
  //   byPriority: false,
  // });

  const dispatch = useDispatch();
  const { responseReports, loading } = useSelector((state) => state?.reports);

  return (
    <div className="m-[40px] max-w-[1367px]">
      {/* Filters */}
      {/* <div className="w-full p-[18px] bg-[#1E1E2D] rounded-[8px]">
        {Object.keys(filters).map((filter) => {
          return (
            <FilterCheck
              checked={filters?.[filter]}
              name={filter}
              label={getLabel({ filterName: filter })}
              setFilters={setFilters}
            />
          );
        })}
      </div> */}
      {/* Chart */}
      <Spin spinning={loading}>
        <div className="bg-[#1E1E2D] p-[32px] mt-[40px] rounded-[8px]">
          {/* Filter Indicator */}
          <div className="h-[52px] flex items-center justify-between">
            <div>
              <Formik
                onSubmit={async (values) => {
                  const startDate = moment(values?.dates[0]).toISOString();
                  const endDate = moment(values?.dates[1])?.toISOString();
                  await dispatch(
                    getResponseReports({
                      startDate,
                      endDate,
                    })
                  );
                }}
                initialValues={{ dates: "" }}
              >
                <Form className="flex items-center gap-[20px]">
                  <div className="min-w-[350px]">
                    <DateRangePicker name="dates" />
                  </div>
                  <div>
                    <Button type="ghost" htmlType="submit">
                      Filter Data
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="flex items-center gap-[20px]">
              {/* {Object.keys(filters).map((filter, idx) => {
              return (
                <>
                  {filters?.[filter] ? (
                    <FilterIndicator
                      title={getLabel({ filterName: filter })}
                      bg={idx % 2 === 0 ? 'bg-[#FFA800]' : 'bg-[#8950FC]'}
                    />
                  ) : null}
                </>
              );
            })} */}
            </div>
          </div>
          {/* Chart Component */}
          <div className="mt-[32px]">
            {/* Heading */}
            <h5 className="text-[24px] text-white mb-[32px]">
              Support Response Time
            </h5>
            {/* Chart */}
            <div className="w-full">
              {responseReports?.length ? (
                <ResponsiveContainer width="100%" height={437}>
                  <BarChart
                    barSize={30}
                    // barGap={1}
                    width={500}
                    height={300}
                    data={
                      responseReports?.length ? responseReports : dataHolder
                    }
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <XAxis
                      dataKey="createdOn"
                      strokeDasharray="3 3"
                      stroke="#323248"
                      tick={{ fill: "#474761" }}
                      tickFormatter={(text) => moment(text)?.format("MMM-YYYY")}
                    />
                    <YAxis
                      width={35}
                      strokeDasharray="3 3"
                      stroke="#323248"
                      tick={{ fill: "#474761" }}
                    />
                    <Bar dataKey="response" fill={"#FFA800"} />
                    {/* {Object.keys(filters).map((filter, idx) => {
                  return (
                    <Bar
                      dataKey={filter}
                      fill={idx % 2 === 0 ? '#FFA800' : '#8950FC'}
                      hide={!filters?.[filter]}
                    />
                  );
                })} */}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-[#323248] rounded-[8px] text-white text-[16px]">
                  No Data Available
                </div>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
