"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Adjust the path to your supabase.js file
import { EmployeeCmdk } from "./EmployeeCmdk";
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

const LeaveRequestsList: React.FC = () => {
  const [empMenuOpen, setEmpMenuOpen] = useState(false);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedReplacementName, setSelectedReplacementName] = useState("");
  const [repMenuOpen, setRepMenuOpen] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newLeaveRequest, setNewLeaveRequest] = useState<LeaveRequest>({
    id: 0,
    employeeId: 0,
    start: "",
    end: "",
    replacement: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase.from("personnel").select("id, name");
      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(data);
        if (data.length > 0) {
          setNewLeaveRequest((prevState) => ({
            ...prevState,
            employeeId: data[0].id,
          }));
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase.from("personnel").select(`
        id,
        on_leave
      `);

      if (error) {
        console.error("Error fetching leave requests:", error);
      } else {
        const formattedData = data
          .filter((request: any) => request.on_leave?.start && request.on_leave?.end && request.on_leave?.replacement)
          .map((request: any) => ({
            id: request.id,
            employeeId: request.id,
            start: request.on_leave.start,
            end: request.on_leave.end,
            replacement: request.on_leave.replacement,
          }));
        setLeaveRequests(formattedData);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewLeaveRequest({
      ...newLeaveRequest,
      [name]: value,
    });
  };

  const addNewEmployeeOnLeave = async () => {
    const { employeeId, start, end, replacement } = newLeaveRequest;

    // Log the data being sent
    console.log("Data being sent:", {
      on_leave: { start, end, replacement },
      employeeId,
    });

    try {
      const { data, error } = await supabase
        .from("personnel")
        .update({ on_leave: { start, end, replacement } })
        .eq("id", employeeId);

      if (error) {
        console.error("Error updating leave request:", error);
      } else {
        console.log("Leave request updated:", data);
        fetchLeaveRequests(); // Refresh the leave requests list
        setNewLeaveRequest({
          id: 0,
          employeeId: employees.length > 0 ? employees[0].id : 0,
          start: "",
          end: "",
          replacement: "",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSelectEmployee = (selectedEmployee) => {
    const employee = employees.find((e) => e.name === selectedEmployee);
    if (employee) {
      setNewLeaveRequest({
        ...newLeaveRequest,
        employeeId: employee.id,
      });
      setSelectedEmployeeName(selectedEmployee); // Set the selected employee name
    }
    setEmpMenuOpen(false);
  };
  const handleReplacementEmployee = (selectedReplacement) => {
    const employee = employees.find((e) => e.name === selectedReplacement);
    if (employee) {
      setNewLeaveRequest({
        ...newLeaveRequest,
        replacement: employee.name
      });
      setSelectedReplacementName(selectedReplacement); // Set the selected employee name
    }
    setRepMenuOpen(false);
  };
  return (
    <div>
      <EmployeeCmdk open={empMenuOpen} setOpen={setEmpMenuOpen} onSelect={handleSelectEmployee} />
      <EmployeeCmdk open={repMenuOpen} setOpen={setRepMenuOpen} onSelect={handleReplacementEmployee} />

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
          {leaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {employees.find((e) => e.id === request.employeeId)?.name}
              </TableCell>
              <TableCell>{request.start}</TableCell>
              <TableCell>{request.end}</TableCell>
              <TableCell>{request.replacement}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              {selectedEmployeeName ? (
                <span  onClick={() => setEmpMenuOpen(true)}
                className="cursor-pointer text-blue-500">{selectedEmployeeName}</span>
              ) : (
                <span
                  onClick={() => setEmpMenuOpen(true)}
                  className="cursor-pointer text-blue-500"
                >
                  Select Employee
                </span>
              )}
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
              {/* <select
                name="replacement"
                value={newLeaveRequest.replacement}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Select Replacement</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select> */}
               {selectedReplacementName ? (
                <span onClick={() => setRepMenuOpen(true)}
                className="cursor-pointer text-blue-500">{selectedReplacementName}</span>
              ) : (
                <span
                  onClick={() => setRepMenuOpen(true)}
                  className="cursor-pointer text-blue-500"
                >
                  Select Replacement
                </span>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addNewEmployeeOnLeave}
          disabled={
            !newLeaveRequest.employeeId ||
            !newLeaveRequest.start ||
            !newLeaveRequest.end ||
            !newLeaveRequest.replacement
          }
        >
          Add Employee on Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestsList;
