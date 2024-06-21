"use client"
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface LeaveRequest {
  id: number;
  employeeId: number;
  start: string;
  end: string;
  replacement: string;
}

interface Employee {
  id: number;
  name: string;
}

interface Props {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
}

const LeaveRequestsList: React.FC<Props> = ({ leaveRequests, employees }) => {
  const [localLeaveRequests, setLocalLeaveRequests] = useState<LeaveRequest[]>(leaveRequests);
  const [newLeaveRequest, setNewLeaveRequest] = useState<LeaveRequest>({
    id: 0,
    employeeId: employees.length > 0 ? employees[0].id : 0,
    start: '',
    end: '',
    replacement: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLeaveRequest({
      ...newLeaveRequest,
      [name]: value,
    });
  };

  const addNewEmployeeOnLeave = () => {
    // Ensure the employeeId is converted to number before setting it
    const employeeId = parseInt(newLeaveRequest.employeeId.toString(), 10);
    const updatedLeaveRequests = [...localLeaveRequests, { ...newLeaveRequest, id: localLeaveRequests.length + 1, employeeId }];
    setLocalLeaveRequests(updatedLeaveRequests);
    setNewLeaveRequest({
      id: 0,
      employeeId: employees.length > 0 ? employees[0].id : 0,
      start: '',
      end: '',
      replacement: '',
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Replacement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localLeaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{employees.find((e) => e.id === request.employeeId)?.name}</TableCell>
              <TableCell>{request.start}</TableCell>
              <TableCell>{request.end}</TableCell>
              <TableCell>{request.replacement}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <select
                name="employeeId"
                value={newLeaveRequest.employeeId}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </TableCell>
            <TableCell>
              <input
                type="date"
                name="start"
                value={newLeaveRequest.start}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                placeholder="Start Date"
              />
            </TableCell>
            <TableCell>
              <input
                type="date"
                name="end"
                value={newLeaveRequest.end}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                placeholder="End Date"
              />
            </TableCell>
            <TableCell>
              <input
                type="text"
                name="replacement"
                value={newLeaveRequest.replacement}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                placeholder="Replacement"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addNewEmployeeOnLeave}
          disabled={!newLeaveRequest.employeeId || !newLeaveRequest.start || !newLeaveRequest.end || !newLeaveRequest.replacement}
        >
          Add Employee on Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestsList;
