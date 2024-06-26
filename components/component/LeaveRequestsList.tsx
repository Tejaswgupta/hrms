"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Adjust the path to your supabase.js file
import { EmployeeCmdk } from "./EmployeeCmdk";

interface LeaveRequest {
  id: number;
  personnel_id: number;
  start_date: string;
  end_date: string;
  reason: string | null;
  replacement: number | null; // Storing employee ID as replacement
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
    personnel_id: 0,
    start_date: "",
    end_date: "",
    reason: null,
    replacement: null,
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
            personnel_id: data[0].id,
          }));
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase.from("personnel_leaves").select("*");

      if (error) {
        console.error("Error fetching leave requests:", error);
      } else {
        setLeaveRequests(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLeaveRequest({
      ...newLeaveRequest,
      [name]: value,
    });
  };

  const addNewEmployeeOnLeave = async () => {
    const { personnel_id, start_date, end_date, reason, replacement } = newLeaveRequest;
    
    // Get current timestamp
    const createdAt = new Date().toISOString();
  
    // Log the data being sent
    console.log("Data to be inserted:", {
      personnel_id,
      start_date,
      end_date,
      reason,
      replacement,
      created_at: createdAt, // Include created_at field
    });
  
    try {
      const { data, error } = await supabase
        .from("personnel_leaves")
        .insert([{ 
          personnel_id, 
          start_date, 
          end_date, 
          reason, 
          replacement, 
          created_at: createdAt 
        }]);
  
      if (error) {
        console.error("Error inserting leave request:", error);
      } else {
        console.log("Leave request inserted:", data);
        fetchLeaveRequests(); // Refresh the leave requests list
        setNewLeaveRequest({
          id: 0,
          personnel_id: employees.length > 0 ? employees[0].id : 0,
          start_date: "",
          end_date: "",
          reason: null, // Reset the reason field
          replacement: null, // Reset the replacement field
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
        personnel_id: employee.id,
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
        replacement: employee.id, // Set replacement to employee ID
      });
      setSelectedReplacementName(selectedReplacement);
    }
    setRepMenuOpen(false);
  };

  return (
    <div className="py-6">
      <Card id="leave-tracker" className="">
        <CardHeader>
          <CardTitle>Leave Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeCmdk open={empMenuOpen} setOpen={setEmpMenuOpen} onSelect={handleSelectEmployee} />
          <EmployeeCmdk open={repMenuOpen} setOpen={setRepMenuOpen} onSelect={handleReplacementEmployee} />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Replacement</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {employees.find((e) => e.id === request.personnel_id)?.name}
                  </TableCell>
                  <TableCell>{request.start_date}</TableCell>
                  <TableCell>{request.end_date}</TableCell>
                  <TableCell>
                    {request.replacement
                      ? employees.find((e) => e.id === request.replacement)?.name
                      : "Not specified"}
                  </TableCell>
                  <TableCell>{request.reason}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  {selectedEmployeeName ? (
                    <span onClick={() => setEmpMenuOpen(true)} className="cursor-pointer text-blue-500">
                      {selectedEmployeeName}
                    </span>
                  ) : (
                    <span onClick={() => setEmpMenuOpen(true)} className="cursor-pointer text-blue-500">
                      Select Employee
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    name="start_date"
                    value={newLeaveRequest.start_date}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Start Date"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    name="end_date"
                    value={newLeaveRequest.end_date}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="End Date"
                  />
                </TableCell>
                <TableCell>
                  {selectedReplacementName ? (
                    <span onClick={() => setRepMenuOpen(true)} className="cursor-pointer text-blue-500">
                      {selectedReplacementName}
                    </span>
                  ) : (
                    <span onClick={() => setRepMenuOpen(true)} className="cursor-pointer text-blue-500">
                      Select Replacement
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="reason"
                    value={newLeaveRequest.reason || ""}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                    placeholder="Reason for Leave"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={addNewEmployeeOnLeave}
              disabled={
                !newLeaveRequest.personnel_id ||
                !newLeaveRequest.start_date ||
                !newLeaveRequest.end_date ||
                !newLeaveRequest.replacement ||
                !newLeaveRequest.reason // Ensure reason is not empty
              }
            >
              Add Employee on Leave
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequestsList;
