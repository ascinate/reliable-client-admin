// import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import moment from "moment";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAnnualReports } from "store";
import { Formik, Form } from "formik";
import { Spin } from "antd";
import { Button, Input } from "components";
// import { FilterCheck, FilterIndicator } from '../../components';

let data = [];
for (let i = 1; i <= 1; i++) {
  data.push({
    month: moment("2022-06-14T07:18:27.043Z").format("MMM"),
    totalAmount: i * 20,
  });
}

// 0 = ByCustomer, 1 = ByAgent, 2 = ByStatus, 3 = ByDepartment, 4 = ByPriority

export const AnnualIncomeReport = () => {
  // const [filters, setFilters] = useState({
  //   byCustomer: true,
  //   byAgent: true,
  // });
  const [data, setData] = useState([]);

  const initialValues = {
    year: "2022",
  };

  const validationSchema = Yup.object().shape({
    year: Yup.string().required("Year is required!"),
  });

  const { annualReports, loading } = useSelector((state) => state?.reports);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnualReports({ year: 2022 }));
  }, []);
  useEffect(() => {
    setData(annualReports);
  }, [annualReports]);

  return (
    <div className="m-[40px] max-w-[1367px]">
      {/* Filters */}
      {/* <div className="w-full p-[18px] bg-[#1E1E2D] rounded-[8px]">
        <FilterCheck
          checked={filters?.byCustomer}
          name="byCustomer"
          label="Tickets by Customer"
          setFilters={setFilters}
        />
        <FilterCheck
          checked={filters?.byAgent}
          name="byAgent"
          label="Tickets by Agent"
          setFilters={setFilters}
        />
      </div> */}

      {/* Chart */}
      <Spin spinning={loading}>
        <div className="bg-[#1E1E2D] p-[32px] mt-[40px] rounded-[8px]">
          {/* Filter Indicator */}
          <div className="h-[52px] flex items-center justify-between">
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(getAnnualReports({ year: values?.year }));
                }}
              >
                {() => {
                  return (
                    <Form className="flex gap-[12px] items-center">
                      <Input
                        className="min-w-[200px]"
                        type="select"
                        options={[
                          { label: "2022", value: "2022" },
                          { label: "2021", value: "2021" },
                          { label: "2020", value: "2020" },
                        ]}
                        name="year"
                      />
                      <Button type="ghost" htmlType="submit">
                        Filter
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            {/* <div className="flex items-center gap-[20px]">
            {filters?.byCustomer && (
              <FilterIndicator title="Tickets By Customer" bg="bg-[#8950FC]" />
            )}
            {filters?.byAgent && (
              <FilterIndicator title="Tickets By Agent" bg="bg-[#ffa800]" />
            )}
          </div> */}
          </div>
          {/* Chart Component */}
          <div className="mt-[32px]">
            {/* Heading */}
            <h5 className="text-[24px] text-white mb-[32px]">
              Annual Income Report
            </h5>
            {/* Chart */}
            <div className="w-full">
              {data?.length ? (
                <ResponsiveContainer width="100%" height={437}>
                  <BarChart
                    barSize={30}
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <XAxis
                      dataKey="month"
                      tickFormatter={(text) => moment(text)?.format("MMM-YYYY")}
                      strokeDasharray="3 3"
                      stroke="#323248"
                      tick={{ fill: "#474761" }}
                    />
                    <YAxis
                      width={35}
                      strokeDasharray="3 3"
                      stroke="#323248"
                      tick={{ fill: "#474761" }}
                    />
                    <Bar dataKey="totalAmount" fill="#8950FC" />
                    {/* <Bar
                  dataKey="totalCustomer"
                  fill="#8950FC"
                  hide={!filters?.byCustomer}
                />
                <Bar
                  dataKey="totalAgent"
                  fill="#FFA800"
                  hide={!filters?.byAgent}
                /> */}
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
