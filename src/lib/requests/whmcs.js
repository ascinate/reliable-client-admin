import { getConfig } from 'lib';

// Users
const WHMCS = 'WHMCS';
export const validateDataConfig = () => ({
  url: `/api/whmcsimport/validatethedata`,
  // config: getConfig({ module: WHMCS, action: 'View' }),
});

export const importDataConfig = () => ({
  url: `/api/whmcsimport/importdata`,
  // config: getConfig({ module: WHMCS, action: 'View' }),
});
