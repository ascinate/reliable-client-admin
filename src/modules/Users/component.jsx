import { DashboardLayout } from 'layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersList, UsersGroups } from './pages';
import './style.scss';

export function Users() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/users/list" />}
        />
        <Route path="list/*" element={<UsersList />} />
        <Route path="groups" element={<UsersGroups />} />
      </Routes>
    </DashboardLayout>
  );
}
