import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Employee {
  id: number;
  name: string;
  currentPosting: { location: string; shift: string };
  nextPosting: { location: string; shift: string };
}

interface Props {
  selectedEmployeeName: string;
  employees: Employee[];
}

export const EmployeeDashboard: React.FC<Props> = ({ selectedEmployeeName, employees }) => {
  const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);

  useEffect(() => {
    if (selectedEmployeeName) {
      const foundEmployee = employees.find(emp => emp.name.toLowerCase() === selectedEmployeeName.toLowerCase());
      if (foundEmployee) {
        setEmployeeDetails(foundEmployee);
      } else {
        setEmployeeDetails(null);
      }
    }
  }, [selectedEmployeeName, employees]);

  return (
    <div className="container mx-auto py-8 bg-white">


      <Card>
        
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          {employeeDetails ? (
            <Card>
              <CardHeader>
                <CardTitle>My Postings</CardTitle>
                <h3 className="text-lg font-semibold">{employeeDetails.name}</h3>

              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold">Current Posting</h3>
                    <p>
                      Location: {employeeDetails.currentPosting.location} ({employeeDetails.currentPosting.shift})
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold">Next Posting</h3>
                    <p>
                      Location: {employeeDetails.nextPosting.location} ({employeeDetails.nextPosting.shift})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p>No employee details to display.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

