"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LeaveRequestsList from './LeaveRequestsList';
import ScheduleForRotation from './ScheduleForRotation';

interface Employee {
  id: number;
  name: string;
}

interface LeaveRequest {
  id: number;
  employeeId: number; // should correspond to Employee.id
  start: string;
  end: string;
  replacement: string;
}

export function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeId: 1, // Adjust this as per the employee IDs fetched
      start: "2023-06-01",
      end: "2023-06-05",
      replacement: "Jane Smith",
    },
    {
      id: 2,
      employeeId: 3, // Adjust this as per the employee IDs fetched
      start: "2023-06-15",
      end: "2023-06-20",
      replacement: "Sarah Lee",
    },
  ]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/names.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const csvData = await response.text();
    
        // Split CSV data into lines and process each line
        const lines = csvData.split('\n').filter(line => line.trim() !== '');
    
        const fetchedEmployees = lines.map((line, index) => {
          // Remove leading "['" or "'"
          const cleanedLine = line.replace(/['"\[\]]/g, '');
          const parts = cleanedLine.trim().split(' ');
          const id = `E${index + 1}`;
          const phone = parts.pop() || '';
          const name = parts.join(' ');
                return { id: index + 1, name };
        });

        setEmployees(fetchedEmployees);
        
        // Update leave requests with correct employeeId based on fetchedEmployees
        const updatedLeaveRequests: LeaveRequest[] = leaveRequests.map(request => {
          const employee = fetchedEmployees.find(emp => emp.name === request.replacement);
          if (employee) {
            return { ...request, employeeId: employee.id };
          }
          return request;
        });

        setLeaveRequests(updatedLeaveRequests);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-white">
      <Card className='my-4 w-full'>
        <CardHeader>
          <CardTitle>Admin dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Card className='my-4'>
        <CardHeader>
          <CardTitle>Leave Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveRequestsList leaveRequests={leaveRequests} employees={employees} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rotation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleForRotation />
        </CardContent>
      </Card>
    </div>
  );
}
