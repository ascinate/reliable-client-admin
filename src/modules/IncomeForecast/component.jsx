import React from 'react';
import { useTranslation } from 'react-i18next';

import './style.scss';

const incomelist = [
  {
    id: 0,
    text: 'Monthly Payment',
    price: '20,000 USD',
  },
  {
    id: 1,
    text: 'Annualy Payment',
    price: '20,000 USD',
  },
  {
    id: 2,
    text: 'Semi-Annual Payment',
    price: '20,000 USD',
  },
  {
    id: 3,
    text: 'Triennial Payment',
    price: '20,000 USD',
  },
  {
    id: 4,
    text: 'Monthly Payment',
    price: '20,000 USD',
  },
  {
    id: 5,
    text: 'Quarterly Payment',
    price: '20,000 USD',
  },
];

const income = false;

export function IncomeForecast() {
  const { t } = useTranslation('/IncomeForecast/ns');
  return (
    <div className="income-forecast">
      <div className="income-forecast__header">
        <div>
          <h3 className="income-forecast__header-heading">{t('title')}</h3>
          <p className="income-forecast__header-text">{t('desc')}</p>
        </div>
        {income ? (
          <div className="income-forecast__header-price">120.000 USD</div>
        ) : null}
      </div>
      <div className="income-forecast__box">
        {income ? (
          <ul className="income-forecast__box-list">
            {incomelist.map(({ id, text, price }) => (
              <li key={id} className="income-forecast__box-list-item">
                <p className="income-forecast__box-list-item-txt">{text}</p>
                <p className="income-forecast__box-list-item-price">{price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-white text-center">No Data Available Yet!</div>
        )}
      </div>
    </div>
  );
}
