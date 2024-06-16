import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import {EmployeeDashboard }from './employee-dashboard';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Employee {
  id: number;
  name: string;
  currentPosting: { location: string; shift: string };
  nextPosting: { location: string; shift: string };
  leaveRequests: { start: string; end: string; replacement: string }[];
  attendance: { date: string, status: string }[];
}

const ParentComponent: React.FC = () => {
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>('');
  const employees: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      currentPosting: { location: "HQ", shift: "Morning" },
      nextPosting: { location: "Warehouse", shift: "Afternoon" },
      leaveRequests: [],
      attendance: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      currentPosting: { location: "Warehouse", shift: "Afternoon" },
      nextPosting: { location: "Retail Store", shift: "Morning" },
      leaveRequests: [],
      attendance: [],
    },
    {
      id: 3,
      name: "Bob Johnson",
      currentPosting: { location: "Retail Store", shift: "Morning" },
      nextPosting: { location: "HQ", shift: "Afternoon" },
      leaveRequests: [],
      attendance: [],
    },
    {
      id: 4,
      name: "Sarah Lee",
      currentPosting: { location: "HQ", shift: "Afternoon" },
      nextPosting: { location: "Warehouse", shift: "Morning" },
      leaveRequests: [],
      attendance: [],
    },
  ];

  const handleEmployeeSelect = (name: string) => {
    setSelectedEmployeeName(name);
  };

  return (
    <div >
       <Card className='my-4'>
                            <CardHeader>
                                <CardTitle>Employee dashboard</CardTitle>
                            </CardHeader>            </Card>
      <EmployeeList employees={employees} onEmployeeSelect={handleEmployeeSelect} />
      <EmployeeDashboard selectedEmployeeName={selectedEmployeeName} employees={employees} />
    </div>
  );
};

export default ParentComponent;
