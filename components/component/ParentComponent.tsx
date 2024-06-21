"use client"
import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import {EmployeeDashboard }from './employee-dashboard';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/names.csv'); // Adjust the path as per your server setup
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const csvData = await response.text();
    
        // Split CSV data into lines and process each line
        const lines = csvData.split('\n').filter(line => line.trim() !== '');
    
        const fetchedEmployees: Employee[] = lines.map((line, index) => {
          // Remove leading "['" or "'"
          const cleanedLine = line.replace(/['"\[\]]/g, '');
          const parts = cleanedLine.trim().split(',');
          const name = parts[0];
          const currentLocation = parts[1];
          const currentShift = parts[2];
          const nextLocation = parts[3];
          const nextShift = parts[4];
          return {
            id: index + 1,
            name: name,
            currentPosting: { location: currentLocation, shift: currentShift },
            nextPosting: { location: nextLocation, shift: nextShift },
            leaveRequests: [],
            attendance: [],
          };
        });

        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (name: string) => {
    setSelectedEmployeeName(name);
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <Card className='my-4'>
        <CardHeader>
          <CardTitle>Employee dashboard</CardTitle>
        </CardHeader>
      </Card>
      <EmployeeList employees={employees} onEmployeeSelect={handleEmployeeSelect} />
      <EmployeeDashboard selectedEmployeeName={selectedEmployeeName} employees={employees} />
    </div>
  );
};

export default ParentComponent;
