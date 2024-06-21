"use client"
import React, { useState } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmployeeTable from './EmployeeTable';
import LeaveRequestsList from './LeaveRequestsList';
import ScheduleForRotation from './ScheduleForRotation';
export function AdminDashboard() {
    const [employees, setEmployees] = useState([
        {
          id: 1,
          name: "John Doe",
          currentPosting: { location: "HQ", shift: "Morning" },
          nextPosting: { location: "Warehouse", shift: "Afternoon" },
          leaveRequests: [{ start: "2023-06-01", end: "2023-06-05", replacement: "Jane Smith" }],
          attendance: [
            { date: "2023-06-01", status: "Present" },
            { date: "2023-06-02", status: "Present" },
            { date: "2023-06-03", status: "Absent" },
            { date: "2023-06-04", status: "Present" },
            { date: "2023-06-05", status: "Present" },
          ],
        },
        {
          id: 2,
          name: "Jane Smith",
          currentPosting: { location: "Warehouse", shift: "Afternoon" },
          nextPosting: { location: "Retail Store", shift: "Morning" },
          leaveRequests: [],
          attendance: [
            { date: "2023-06-01", status: "Present" },
            { date: "2023-06-02", status: "Present" },
            { date: "2023-06-03", status: "Present" },
            { date: "2023-06-04", status: "Present" },
            { date: "2023-06-05", status: "Present" },
          ],
        },
        {
          id: 3,
          name: "Bob Johnson",
          currentPosting: { location: "Retail Store", shift: "Morning" },
          nextPosting: { location: "HQ", shift: "Afternoon" },
          leaveRequests: [{ start: "2023-06-15", end: "2023-06-20", replacement: "Sarah Lee" }],
          attendance: [
            { date: "2023-06-01", status: "Present" },
            { date: "2023-06-02", status: "Present" },
            { date: "2023-06-03", status: "Present" },
            { date: "2023-06-04", status: "Absent" },
            { date: "2023-06-05", status: "Present" },
          ],
        },
        {
          id: 4,
          name: "Sarah Lee",
          currentPosting: { location: "HQ", shift: "Afternoon" },
          nextPosting: { location: "Warehouse", shift: "Morning" },
          leaveRequests: [],
          attendance: [
            { date: "2023-06-01", status: "Present" },
            { date: "2023-06-02", status: "Present" },
            { date: "2023-06-03", status: "Present" },
            { date: "2023-06-04", status: "Present" },
            { date: "2023-06-05", status: "Present" },
          ],
        },
      ])

    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            employeeId: 1,
            start: "2023-06-01",
            end: "2023-06-05",
            replacement: "Jane Smith",
            status: "Approved",
        },
        {
            id: 2,
            employeeId: 3,
            start: "2023-06-15",
            end: "2023-06-20",
            replacement: "Sarah Lee",
            status: "Pending",
        },
    ]);

    const [rotationSchedule, setRotationSchedule] = useState([
        {
            week: 1,
            schedule: [
                { location: "HQ", shift: "Morning", employee: "John Doe" },
                { location: "HQ", shift: "Afternoon", employee: "Sarah Lee" },
                { location: "Warehouse", shift: "Morning", employee: "Sarah Lee" },
                { location: "Warehouse", shift: "Afternoon", employee: "Jane Smith" },
                { location: "Retail Store", shift: "Morning", employee: "Bob Johnson" },
                { location: "Retail Store", shift: "Afternoon", employee: "John Doe" },
            ],
        },
        {
            week: 2,
            schedule: [
                { location: "HQ", shift: "Morning", employee: "Bob Johnson" },
                { location: "HQ", shift: "Afternoon", employee: "John Doe" },
                { location: "Warehouse", shift: "Morning", employee: "Jane Smith" },
                { location: "Warehouse", shift: "Afternoon", employee: "Sarah Lee" },
                { location: "Retail Store", shift: "Morning", employee: "Sarah Lee" },
                { location: "Retail Store", shift: "Afternoon", employee: "Bob Johnson" },
            ],
        },
    ]);

    const [leaveRequestForm, setLeaveRequestForm] = useState({
        start: "",
        end: "",
        replacement: "",
    });


    return (
        <div className="container mx-auto p-8 bg-white">
                        <Card className='my-4 w-full'>
                            <CardHeader>
                                <CardTitle>Admin dashboard</CardTitle>
                            </CardHeader>            </Card>
                            <EmployeeTable employees={employees} />
                        <Card className='my-4'>
                            <CardHeader >
                                <CardTitle >Leave Tracker</CardTitle>
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
                                <ScheduleForRotation/>
                            </CardContent>
                        </Card>
              
        </div>
    );
}
