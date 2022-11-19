import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { FilterCheck, FilterIndicator } from '../../components';

let data = [];
for (let i = 1; i <= 12; i++) {
  data.push({
    month: moment(`${i}`, 'M').format('MMM'),
    byCustomer: i * 20,
    byAgent: i * 15,
    byEmail: i * 12,
    hourlyView: i * 13,
    linkedIP: i * 6,
    ticketStatuses: i * 7,
    ticketDepartments: i * 7,
  });
}

const getLabel = ({ filterName }) => {
  switch (filterName) {
    case 'byCustomer':
      return 'Tickets by Customer';
    case 'byAgent':
      return 'Tickets by Agent';
    case 'byEmail':
      return 'Tickets by Email';
    case 'hourlyView':
      return 'Hourly View';
    case 'linkedIP':
      return 'Linked IP / Server';
    case 'ticketStatuses':
      return 'Ticket Statuses';
    case 'ticketDepartments':
      return 'Ticket Departments';
    default:
      return '';
  }
};

export const SupportTicketDuration = () => {
  const [filters, setFilters] = useState({
    byCustomer: true,
    byAgent: true,
    byEmail: false,
    hourlyView: false,
    linkedIP: false,
    ticketStatuses: false,
    ticketDepartments: false,
  });
  return (
    <div className="m-[40px] max-w-[1367px]">
      {/* Filters */}
      <div className="w-full p-[18px] bg-[#1E1E2D] rounded-[8px]">
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
      </div>

      {/* Chart */}
      <div className="bg-[#1E1E2D] p-[32px] mt-[40px] rounded-[8px]">
        {/* Filter Indicator */}
        <div className="h-[52px] flex items-center justify-between">
          <div></div>
          <div className="flex items-center gap-[20px]">
            {Object.keys(filters).map((filter, idx) => {
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
            })}
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
            <ResponsiveContainer width="100%" height={437}>
              <BarChart
                barSize={8}
                barGap={1}
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
                  strokeDasharray="3 3"
                  stroke="#323248"
                  tick={{ fill: '#474761' }}
                />
                <YAxis
                  width={35}
                  strokeDasharray="3 3"
                  stroke="#323248"
                  tick={{ fill: '#474761' }}
                />
                {Object.keys(filters).map((filter, idx) => {
                  return (
                    <Bar
                      dataKey={filter}
                      fill={idx % 2 === 0 ? '#FFA800' : '#8950FC'}
                      hide={!filters?.[filter]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
