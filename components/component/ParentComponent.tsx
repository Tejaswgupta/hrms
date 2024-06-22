"use client"
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Personnel {
  id: string;
  name: string;
  role: string;
}

interface ScheduleDetail {
  junctions: { name: string }[] | null;
  sub_junctions: { name: string }[] | null;
  shift: string;
  personnel: Personnel;
}

const ParentComponent: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleDetail[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);

  useEffect(() => {
    async function getSchedule() {
      const { data, error } = await supabase
        .from("assignments")
        .select(
          "junctions(name), sub_junctions(name), shift, start_date, end_date, personnel(id, name, role)"
        );

      if (error) {
        console.error("Error fetching schedule data:", error.message);
      } else {
        // Transforming data to match ScheduleDetail interface
        const formattedData = data.map((item: any) => ({
          junctions: item.junctions ? [item.junctions] : null,
          sub_junctions: item.sub_junctions ? [item.sub_junctions] : null,
          shift: item.shift,
          personnel: {
            id: item.personnel.id,
            name: item.personnel.name,
            role: item.personnel.role,
          },
        }));

        setSchedule(formattedData);
        console.log("Fetched Schedule Data:", formattedData); // Log fetched data here
      }
    }

    getSchedule();
  }, []);

  const handleNextWeek = () => {
    if (currentWeek < schedule.length) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const filteredSchedule = schedule.filter((detail) => {
    const matchesPosition =
      !filterPosition || filterPosition === "All" || detail.personnel.role === filterPosition;
    const matchesName =
      !filterName || detail.personnel.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesLocation =
      !filterLocation ||
      (detail.junctions?.some((j) => j.name.toLowerCase().includes(filterLocation.toLowerCase())) ||
        detail.sub_junctions?.some((sj) => sj.name.toLowerCase().includes(filterLocation.toLowerCase())));

    return matchesPosition && matchesName && matchesLocation;
  });

  return (
    <div className="container mx-auto p-4" style={{ color: "black" }}>
      <Card className="my-4">
        <CardHeader>
          <CardTitle>Employee dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 ">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mb-2 md:mb-0"
            onClick={handlePreviousWeek}
            disabled={currentWeek === 1}
          >
            Previous Week
          </button>
          <h3 className="text-xl font-bold mb-2 md:mb-0">Week {currentWeek}</h3>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNextWeek}
            disabled={currentWeek === schedule.length}
          >
            Next Week
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
          <label htmlFor="filterPosition" className="font-semibold mb-2 md:mb-0">
            Filter by Position:
          </label>
          <select
            id="filterPosition"
            value={filterPosition ?? "All"}
            onChange={(e) =>
              setFilterPosition(e.target.value === "All" ? null : e.target.value)
            }
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="TSI">TSI</option>
            <option value="Constable">Constable</option>
            <option value="Home Guard">Home Guard</option>
          </select>
          <input
            type="text"
            placeholder="Filter by Name"
            value={filterName ?? ""}
            onChange={(e) =>
              setFilterName(e.target.value === "" ? null : e.target.value)
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by Location"
            value={filterLocation ?? ""}
            onChange={(e) =>
              setFilterLocation(e.target.value === "" ? null : e.target.value)
            }
            className="p-2 border rounded"
          />
        </div>
        {filteredSchedule.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Location</th>
                  <th className="py-2 px-4 border-b">Shift</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule.map((detail, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{detail.personnel.role}</td>
                    <td className="py-2 px-4 border-b">{detail.personnel.name}</td>
                    <td className="py-2 px-4 border-b">
                      {detail.junctions?.map((j) => j.name).join(", ") ||
                        detail.sub_junctions?.map((sj) => sj.name).join(", ") ||
                        "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{detail.shift ?? "All Day"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No schedule details available for the current week.</p>
        )}
      </Card>
    </div>
  );
};

export default ParentComponent;
