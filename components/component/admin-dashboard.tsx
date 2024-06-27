"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ScheduleForRotation from "./ScheduleForRotation";
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
  return (
    <div className="container mx-auto p-8 bg-white flex flex-col md:flex-row gap-5">
      <div className="bg-white">
        <Card id="admin-dashboard" className="w-full">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
        </Card>
        <ScheduleForRotation />
      </div>
    </div>
  );
}
