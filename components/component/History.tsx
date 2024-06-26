"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "./supabase";
import { EmployeeCmdk } from "./EmployeeCmdk";

export const History: React.FC = () => {
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedPersonnelName, setSelectedPersonnelName] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  const fetchHistory = useCallback(async (personnelId) => {
    const { data: assignments, error } = await supabase
      .from("assignments")
      .select("start_date, end_date, junctions, sub_junctions")
      .eq("personnel_id", personnelId);

    if (error) {
      console.error("Error fetching assignments:", error);
    } else {
      setHistory(assignments);
    }
  }, []);

  useEffect(() => {
    if (selectedPersonnel) {
      fetchHistory(selectedPersonnel);
    }
  }, [selectedPersonnel, fetchHistory]);

  const handleSelectPersonnel = async (name) => {
    const { data: personnel, error } = await supabase
      .from("personnel")
      .select("id")
      .eq("name", name)
      .single();

    if (error) {
      console.error("Error fetching personnel ID:", error);
    } else {
      setSelectedPersonnel(personnel.id);
      setSelectedPersonnelName(name);
    }
    setCmdkOpen(false);
  };

  return (
    <div className="py-6">
      <Card id="history" className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className=" mb-4">Personnel History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mb-6">
            <label htmlFor="personnelSelect" className="font-semibold mb-2">
              Select Personnel:
            </label>
            <input
              type="text"
              value={selectedPersonnelName}
              readOnly
              onClick={() => setCmdkOpen(true)}
              placeholder="Click to select personnel"
              className="p-3 border rounded bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <EmployeeCmdk open={cmdkOpen} setOpen={setCmdkOpen} onSelect={handleSelectPersonnel} />
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Junction</TableHead>
                    <TableHead>Sub Junction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((assignment, index) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell>{new Date(assignment.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(assignment.end_date).toLocaleDateString()}</TableCell>
                      <TableCell>{assignment.junctions ? assignment.junctions.name : "-"}</TableCell>
                      <TableCell>{assignment.sub_junctions ? assignment.sub_junctions.name : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500">No history available for the selected personnel.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

