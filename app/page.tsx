// "use client"
// import React, { useState } from 'react';
// import Link from 'next/link';

import { EmployeeDashboard } from '@/components/component/employee-dashboard';
import { AdminDashboard } from '../components/component/admin-dashboard';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import ParentComponent from '@/components/component/ParentComponent';
// const DashboardTabs: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'Employee' | 'Admin'>('Admin');

//   const handleTabClick = (tab: 'Employee' | 'Admin') => {
//     setActiveTab(tab);
//   };

//   return (
    
//     <div className="container mx-auto p-8 bg-white">
//       {/* <Tabs>
//       <TabsList>
//       <TabsTrigger value="admin" onClick={() => handleTabClick('Admin')}>
//   Admin Dashboard
// </TabsTrigger>
// <TabsTrigger value="employee" onClick={() => handleTabClick('Employee')}>
//   Employee Dashboard
// </TabsTrigger>
//       </TabsList>
//       </Tabs>
      
//       {activeTab === 'Employee' ?     <ParentComponent />
// : <AdminDashboard />} */}
//             <Link href="/admin"><AdminDashboard /></Link>
//             <Link href="/employee"><ParentComponent /></Link>

//     </div>
//   );
// };

// export default DashboardTabs;
// pages/index.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link href="/employee">Employee Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
