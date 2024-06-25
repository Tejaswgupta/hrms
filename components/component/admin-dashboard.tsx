"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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
  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
    setShowDropdown(false); // Close dropdown when toggling navbar
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white flex flex-col md:flex-row gap-5">
      {/* Left Section */}

      {/* <div className="md:hidden w-full">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sticky top-0 md:w-3/4"
          onClick={() => scrollToSection("admin-dashboard")}
        >
          Admin Dashboard
        </button>
        <div className="bg-gray-100 p-4 w-full">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => scrollToSection("leave-tracker")}
                className="text-blue-500 hover:text-blue-700"
              >
                Leave Tracker
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("rotation-schedule")}
                className="text-blue-500 hover:text-blue-700"
              >
                Rotation Schedule
              </button>
            </li>
          </ul>
        </div>
      </div> */}
    
      <div className="bg-white">
        <Card id="admin-dashboard" className="my-4 w-full">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
        </Card>
            <ScheduleForRotation />

      </div>

      {/* <div className="hidden md:flex md:w-1/4 md:flex-col md:sticky md:top-0 md:h-screen md:bg-gray-100 md:p-4 rounded-lg shadow-md">
        <div className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Admin Dashboard
        </div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => scrollToSection("leave-tracker")}
              className="text-blue-500 hover:text-blue-700"
            >
              Leave Tracker
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("rotation-schedule")}
              className="text-blue-500 hover:text-blue-700"
            >
              Rotation Schedule
            </button>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
