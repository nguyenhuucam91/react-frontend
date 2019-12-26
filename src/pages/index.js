import React from 'react'
import { LOGIN_ROUTE } from '@/constants/routes';
import { router } from 'umi'

export default function() {
  return (
    <>
      {router.replace(LOGIN_ROUTE)}
    </>
  );
}
