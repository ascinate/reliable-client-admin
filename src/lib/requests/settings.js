import { getConfig } from 'lib';

// Settings End-Points
// TODO: Change module name after fix from backend-devs
const settingsConfig = (action) => getConfig({ module: 'Settings', action });
export const getSettingsByTenant = () => ({
  url: `/api/v1/admin/settings/getsettingswithtenant/admin`,
  // config: settingsConfig('View'),
});
export const updateSettingsConfig = (id) => ({
  url: `/api/v1/admin/settings/${id}`,
  // config: settingsConfig('Update'),
});
