"use client"
import React, { useState } from 'react';
import { EmployeeDashboard } from '@/components/component/employee-dashboard';
import { AdminDashboard } from '@/components/component/admin-dashboard';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import ParentComponent from '@/components/component/ParentComponent';
const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Employee' | 'Admin'>('Admin');

  const handleTabClick = (tab: 'Employee' | 'Admin') => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <Tabs>
      <TabsList>
      <TabsTrigger value="admin" onClick={() => handleTabClick('Admin')}>
  Admin Dashboard
</TabsTrigger>
<TabsTrigger value="employee" onClick={() => handleTabClick('Employee')}>
  Employee Dashboard
</TabsTrigger>
      </TabsList>
      </Tabs>
      
      {activeTab === 'Employee' ?     <ParentComponent />
: <AdminDashboard />}
    </div>
  );
};

export default DashboardTabs;
