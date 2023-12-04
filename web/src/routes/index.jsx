import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { USER_ROLE } from '../utils/roles';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get("/users/valited")
      .catch((error) => {
        if (error.response?.status === 401) {
          signOut();
        }
      })
  }, []);

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