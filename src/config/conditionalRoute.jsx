import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import DefaultLayout from '../components/layout/DefaultLayout'; // adjust path if needed

function ConditionalRoute() {
  const { user } = useAuthStore();

  if (user?.fullName) {
    return (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    );
  }

  return <Outlet />;
}

export default ConditionalRoute;
