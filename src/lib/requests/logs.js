// import { getConfig } from './getConfig';

// Logs and Login History End-Points
export const getLogsConfig = (pageNumber, pageSize) => ({
  url: "/api/v1/admin/auditlogs",
  defaultData: {
    advancedSearch: {
      fields: [""],
      keyword: "",
    },
    keyword: "",
    pageNumber: pageNumber,
    pageSize: pageSize,
    orderBy: ["dateTime"],
    OrderType: 0,
  },
  // // config: getConfig({ module: 'Users', action: 'View' }),
});
export const getLogsByUserIDConfig = (uid) => ({
  url: `/api/v1/admin/auditlogs/user/${uid}`,
  defaultData: {
    advancedSearch: {
      fields: [""],
      keyword: "",
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: [""],
  },
  // // config: getConfig({ module: 'Users', action: 'View' }),
});
export const getUserLoginSessions = (userId) => ({
  url: `/api/userloginhistory/loginhistorybyuserid/${userId}`,
});
