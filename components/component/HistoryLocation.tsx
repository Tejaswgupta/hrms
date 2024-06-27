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
import { CommandMenu } from "./CommandMenu";

export const HistoryLocation: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  const fetchHistory = useCallback(async (location) => {
    try {
      const { data: assignments, error } = await supabase
        .from("assignments")
        .select("id, start_date, end_date, personnel(name, role), junctions(name), sub_junctions(name)")
        .or(`junction_id.eq.${location.id},sub_junction_id.eq.${location.id}`);
      
      if (error) {
        console.error("Error fetching assignments:", error);
      } else {
        setHistory(assignments);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchHistory(selectedLocation);
    }
  }, [selectedLocation, fetchHistory]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSelectedLocationName(location.name);
    setCmdkOpen(false);
  };

  return (
    <div className="py-6">
      <Card id="history" className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className=" mb-4">Location History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mb-6">
            <label htmlFor="locationSelect" className="font-semibold mb-2">
              Select Location:
            </label>
            <input
              type="text"
              value={selectedLocationName}
              readOnly
              onClick={() => setCmdkOpen(true)}
              placeholder="Click to select location"
              className="p-3 border rounded bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <CommandMenu
            open={cmdkOpen}
            setOpen={setCmdkOpen}
            onSelect={handleSelectLocation}
            showOnlyjunction={true}
            showOnlySubjunction={true}
          />
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Personnel Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Junction</TableHead>
                    <TableHead>Sub Junction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((assignment, index) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell>{assignment.personnel.name}</TableCell>
                      <TableCell>{assignment.personnel.role}</TableCell>
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
            <p className="text-gray-500">No history available for the selected location.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
