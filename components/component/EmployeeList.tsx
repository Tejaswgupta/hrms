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
  onEmployeeSelect: (name: string) => void; // New prop to handle employee selection
}

const EmployeeList: React.FC<Props> = ({ employees, onEmployeeSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeClick = (name: string) => {
    onEmployeeSelect(name); // Trigger the parent component function to set the selected employee
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
        <CardTitle className="pb-4">Employees</CardTitle>
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-4 mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-300"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Current Posting</TableHead>
              <TableHead>Next Posting</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} onClick={() => handleEmployeeClick(employee.name)} className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                <TableCell>{employee.name}</TableCell>
                <TableCell>
                  {employee.currentPosting.location} ({employee.currentPosting.shift})
                </TableCell>
                <TableCell>
                  {employee.nextPosting.location} ({employee.nextPosting.shift})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeList;
