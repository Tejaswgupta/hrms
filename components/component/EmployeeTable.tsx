import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Employee {
  id: number;
  name: string;
  currentPosting: { location: string; shift: string };
  nextPosting: { location: string; shift: string };
  leaveRequests: { start: string; end: string; replacement: string }[];
  attendance: { date: string, status: string }[];
}

interface Props {
  employees: Employee[];
}

const EmployeeTable: React.FC<Props> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!employees || employees.length === 0) {
    return <div>No employees found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='pb-4'>Employees</CardTitle>
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-4 mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-grey-300"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Current Posting</TableHead>
              <TableHead>Next Posting</TableHead>
              <TableHead>Leave Requests</TableHead>
              <TableHead>Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} >
                <TableCell>{employee.name}</TableCell>
                <TableCell>
                  {employee.currentPosting.location} ({employee.currentPosting.shift})
                </TableCell>
                <TableCell>
                  {employee.nextPosting.location} ({employee.nextPosting.shift})
                </TableCell>
                <TableCell>
                  {employee.leaveRequests.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {employee.leaveRequests.map((request, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          <p>
                            {request.start} - {request.end}
                          </p>
                          <p>Replacement: {request.replacement}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "None"
                  )}
                </TableCell>
                <TableCell>
                  {employee.attendance.map((record, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                     {record.date}{":  "}{record.status}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
