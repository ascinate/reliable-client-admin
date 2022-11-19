import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "25-Feb",
    all: 50,
    your: 80,
  },
  {
    name: "26-Feb",
    all: 30,
    your: 20,
  },
  {
    name: "28-Feb",
    all: 90,
    your: 50,
  },
  {
    name: "01-Mar",
    all: 30,
    your: 20,
  },
  {
    name: "02-Mar",
    all: 85,
    your: 50,
  },
  {
    name: "02-Mar",
    all: 25,
    your: 30,
  },
  {
    name: "02-Mar",
    all: 90,
    your: 50,
  },
];

export function Orders() {
  const navigate = useNavigate();
  const { t } = useTranslation("/Orders/ns");
  return (
    <div className="order">
      <div className="order__header">
        <h3 className="order__header-heading">{t("title")}</h3>
        <p className="order__header-text">{t("desc")}</p>
      </div>
      <div className="order__chart">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            width={500}
            height={150}
            data={data}
            margin={{ top: 0, right: -5, bottom: 0, left: -5 }}
          >
            <Line
              type="monotone"
              dataKey="all"
              stroke="#3699FF"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="your"
              stroke="#0BB783"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="order__card">
        <div
          className="order__card-inner cursor-pointer"
          style={{ background: "#212e48 0% 0% no-repeat padding-box" }}
          onClick={() => {
            navigate("/admin/dashboard/billing/orders/all-orders/list");
          }}
        >
          <div className="order__card-inner-icon">
            <img src="/icon/bulk-blue.svg" alt="" />
          </div>
          <div className="order__card-inner-text " style={{ color: "#3699FF" }}>
            {t("all")}
          </div>
        </div>
        <div
          className="order__card-inner cursor-pointer"
          style={{ background: "#1C3238 0% 0% no-repeat padding-box" }}
          onClick={() => {
            navigate("/admin/dashboard/billing/orders/your-orders/list");
          }}
        >
          <div className="order__card-inner-icon">
            <img src="/icon/bulk-green.svg" alt="" />
          </div>
          <div className="order__card-inner-text " style={{ color: "#0BB783" }}>
            Your Orders
          </div>
        </div>
      </div>
    </div>
  );
}
