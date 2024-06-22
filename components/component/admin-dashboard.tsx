"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import LeaveRequestsList from "./LeaveRequestsList";
import ScheduleForRotation from "./ScheduleForRotation";
import { supabase } from "./supabase";

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
        const { data: fetchedEmployees, error } = await supabase
          .from("personnel")
          .select();

        console.log(fetchedEmployees);
        setEmployees(fetchedEmployees);

        //! Leave Logic
        // const updatedLeaveRequests: LeaveRequest[] = leaveRequests.map(
        //   (request) => {
        //     const employee = fetchedEmployees.find(
        //       (emp) => emp.name === request.replacement
        //     );
        //     if (employee) {
        //       return { ...request, employeeId: employee.id };
        //     }
        //     return request;
        //   }
        // );

        // setLeaveRequests(updatedLeaveRequests);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const onUpdateLeaveRequests = (updatedLeaveRequests: LeaveRequest[]) => {
    setLeaveRequests(updatedLeaveRequests);
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <Card className="my-4 w-full">
        <CardHeader>
          <CardTitle>Admin dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Card className="my-4">
        <CardHeader>
          <CardTitle>Leave Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveRequestsList
            leaveRequests={leaveRequests}
            employees={employees}
            onUpdateLeaveRequests={onUpdateLeaveRequests}
          />
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
