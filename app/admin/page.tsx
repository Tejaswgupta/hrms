"use client"
import React from 'react';
import { AdminDashboard } from '@/components/component/admin-dashboard';
// import EmployeeCmdk from '@/components/component/EmployeeCmdk';
import { CommandMenu } from '@/components/component/CommandMenu';
const Admin: React.FC = () => {
  return (
    <div className='flex flex-end'>
      {/* <EmployeeCmdk/> */}
      {/* <CommandMenu/> */}
     <AdminDashboard/>
    </div>
  );
};

export default Admin;
