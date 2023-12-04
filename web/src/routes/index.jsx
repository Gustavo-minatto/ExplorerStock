import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { USER_ROLE } from '../utils/roles';

export function Routes() {
  const { user } = useAuth();

  function AcessRoutes() {
    switch (user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />;
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />;
      case USER_ROLE.SALE:
        return <SaleRoutes />;
      default:
        <CustomerRoutes />;
    }
  }

  return (
    <BrowserRouter>
      {user ? <AcessRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}