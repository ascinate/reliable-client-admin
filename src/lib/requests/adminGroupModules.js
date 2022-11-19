import { getConfig } from 'lib';

// Admin Group Module Management
const AdminGroupModuleManagement = 'AdminGroups';
const adminGMMC = (action) =>
  getConfig({ module: AdminGroupModuleManagement, action });
// Get Admin Group Permissions
export const getAdminGroupPermissions = (groupId) => ({
  url: `/api/admingroupmodulemanagement/getmodulebyadmingroup/${groupId}`,
  // config: adminGMMC('View'),
});
// Create Admin Group Permission
export const createAdminGroupPermission = () => ({
  url: `/api/admingroupmodulemanagement`,
  // config: adminGMMC('Create'),
});
// Update Admin Group Permission
export const updateAdminGroupPermission = (permissionId) => ({
  url: `/api/admingroupmodulemanagement/${permissionId}`,
  // config: adminGMMC('Update'),
});
