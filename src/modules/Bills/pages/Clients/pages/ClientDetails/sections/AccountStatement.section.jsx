import { List } from 'components';
import { useState } from 'react';

let data2019 = [];
let data2020 = [];
let data2021 = [];
let data2022 = [];
// for (let i = 0; i < 20; i++) {
//   data2019.push({
//     date: '05/02/2019',
//     orderNo: `021${i}`,
//     details:
//       'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
//     amount: 100,
//     invoice: '1234',
//     type: i % 2 === 0 ? 'loss' : 'profit',
//   });
//   data2020.push({
//     date: '05/02/2020',
//     orderNo: `021${i}`,
//     details:
//       'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
//     amount: 100,
//     invoice: '1234',
//     type: i % 2 === 0 ? 'loss' : 'profit',
//   });
//   data2021.push({
//     date: '05/02/2021',
//     orderNo: `021${i}`,
//     details:
//       'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
//     amount: 100,
//     invoice: '1234',
//     type: i % 2 === 0 ? 'loss' : 'profit',
//   });
//   data2022.push({
//     date: '05/02/2022',
//     orderNo: `021${i}`,
//     details:
//       'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
//     amount: 100,
//     invoice: '1234',
//     type: i % 2 === 0 ? 'loss' : 'profit',
//   });
// }

const allData = [
  { year: 'This Year', data: data2022 },
  { year: '2021', data: data2021 },
  { year: '2020', data: data2020 },
  { year: '2019', data: data2019 },
];

export const AccountStatement = () => {
  const [current, setCurrent] = useState({ year: 'This Year', data: data2022 });

  return (
    <div className="mt-[20px] p-[32px] bg-[#1E1E2D] rounded-[8px]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-[32px]">
        <h6 className="text-white text-[16px]">Account Statement</h6>
        <div className="flex items-center gap-[20px]">
          {allData.map((el) => {
            return (
              <button
                className={`${
                  current?.year !== el?.year
                    ? 'text-[#6D6D80]'
                    : 'text-[#3699FF]'
                } hover:text-[#3699FF] transition-all`}
                onClick={() => setCurrent(el)}
              >
                {el?.year}
              </button>
            );
          })}
        </div>
      </div>
      {/* List Section */}
      <List
        data={current?.data}
        header={
          <div className="grid grid-cols-[1fr_1fr_8fr_1fr_1fr] gap-[30px] items-center w-full">
            <div className="col-[1/2]">DATE</div>
            <div className="col-[2/3]">ORDER ID</div>
            <div className="col-[3/4]">DETAILS</div>
            <div className="col-[4/5]">AMOUNT</div>
            <div className="col-[5/6]">INVOICE</div>
          </div>
        }
        renderFn={(item) => {
          return (
            <div className="grid grid-cols-[1fr_1fr_8fr_1fr_1fr] gap-[30px] items-center w-full">
              <div className="text-white text-[14px] col-[1/2]">
                {item?.date}
              </div>
              <div className="text-white text-[14px] col-[2/3]">
                {item?.orderNo}
              </div>
              <div className="text-white text-[14px] col-[3/4]">
                {item?.details}
              </div>
              <div
                className={`${
                  item?.type === 'profit' ? 'text-[#0BB783]' : 'text-[#F64E60]'
                } text-[14px] col-[4/5]`}
              >
                ${item?.amount.toFixed(2)}
              </div>
              <div className="text-white text-[14px] col-[5/6]">
                <button
                  type="button"
                  className="py-[4px] px-[8px] rounded-[4px] bg-[#323248] text-[#fff] text-[10px]"
                >
                  Download
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
