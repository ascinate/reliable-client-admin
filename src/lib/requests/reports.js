import { getConfig } from 'lib';

// Reports End-Points
const Reports = 'Reports';
const prefix = `api/v1/admin/reports/tickets`;

// Retrieve annual income agains a year
export const getAnnualIncome = ({ year }) => ({
  url: `${prefix}/annualincome/${year}`,
  // config: getConfig({ module: Reports, action: 'View' }),
});

// Get data by Filter
export const getReportsByFilter = ({ reportField, startDate, endDate }) => ({
  url: `${prefix}/${reportField}/${startDate}/${endDate}`,
  // config: getConfig({ module: Reports, action: 'View' }),
});

// Get Replies Count
export const getReportsByReplyCount = ({ startDate, endDate }) => ({
  url: `${prefix}/repliespertickets/${startDate}/${endDate}`,
  // config: getConfig({ module: Reports, action: 'View' }),
});

// Get Response Time
export const getReportsByResponseTime = ({ startDate, endDate }) => ({
  url: `${prefix}/responsetime/${startDate}/${endDate}`,
  // config: getConfig({ module: Reports, action: 'View' }),
});
