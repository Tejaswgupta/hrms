import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface LeaveRequest {
  id: number;
  employeeId: number;
  start: string;
  end: string;
  replacement: string;
  status: string;
}

interface Props {
  leaveRequests: LeaveRequest[];
  employees: { id: number; name: string }[];
}

const LeaveRequestsList: React.FC<Props> = ({ leaveRequests, employees }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Replacement</TableHead>
          {/* <TableHead>Status</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{employees.find((e) => e.id === request.employeeId)?.name}</TableCell>
            <TableCell>{request.start}</TableCell>
            <TableCell>{request.end}</TableCell>
            <TableCell>{request.replacement}</TableCell>
            {/* <TableCell>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  request.status === "Approved"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }`}
              >
                {request.status}
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaveRequestsList;
