import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import './style.scss';

const data = [
  {
    name: '25-Feb',
    income: 50,
    refunds: 80,
  },
  {
    name: '26-Feb',
    income: 30,
    refunds: 20,
  },
  {
    name: '28-Feb',
    income: 90,
    refunds: 50,
  },
  {
    name: '01-Mar',
    income: 30,
    refunds: 20,
  },
  {
    name: '02-Mar',
    income: 85,
    refunds: 50,
  },
  {
    name: '02-Mar',
    income: 25,
    refunds: 30,
  },
  {
    name: '02-Mar',
    income: 90,
    refunds: 50,
  },
];

const income = false;

export function IncomeOverview() {
  const { t } = useTranslation('/IncomeOverview/ns');
  return (
    <div className="income-overview">
      <div className="income-overview__header">
        <h3 className="income-overview__header-heading">{t('title')}</h3>
        <p className="income-overview__header-text">{t('desc')}</p>
      </div>
      {!income ? (
        <div className="text-white p-[20px] text-center">
          No Data Available Yet!
        </div>
      ) : (
        <>
          <div className="income-overview__chart">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                width={500}
                height={150}
                data={data}
                margin={{ top: 0, right: -5, bottom: 0, left: -5 }}
              >
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#FFA800"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="refunds"
                  stroke="#F64E60"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="income-overview__card">
            <div
              className="income-overview__card-inner"
              style={{ background: '#392F28 0% 0% no-repeat padding-box' }}
            >
              <div className="income-overview__card-inner-icon">
                <img src="/icon/coin-yellow.svg" alt="" />
              </div>
              <div
                className="income-overview__card-inner-text"
                style={{ color: '#FFA800' }}
              >
                {t('yi')}
              </div>
            </div>
            <div
              className="income-overview__card-inner"
              style={{ background: '#3A2434 0% 0% no-repeat padding-box' }}
            >
              <div className="income-overview__card-inner-icon">
                <img src="/icon/coin-red.svg" alt="" />
              </div>
              <div
                className="income-overview__card-inner-text"
                style={{ color: '#F64E60' }}
              >
                {t('yr')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
