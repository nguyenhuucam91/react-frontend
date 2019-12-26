import styles from './index.css';
import React, { useEffect } from 'react';
import { useAsync } from '@umijs/hooks';
import authService from '@/services/authService';

const Dashboard = () => {

  document.title = "Dashboard"

  const { data, error } = useAsync(() => authService.user(), []);

  return (
    <>
      <h1>Hi {data && data.success ? data.data.user.name  : ''}</h1>
    </>
  );
}

export default Dashboard
