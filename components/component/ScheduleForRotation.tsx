"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { supabase } from "./supabase";

interface Personnel {
  id: string;
  name: string;
  phone: string;
  role: string;
}

interface Junction {
  id: number;
  name: string;
  num_people: number;
}

interface SubJunction {
  id: number;
  name: string;
  num_people: number;
}

const startDate = new Date(2024, 5, 24);

const ScheduleForRotation: React.FC = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(startDate);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [junctions, setJunctions] = useState<Junction[]>([]);
  const [subJunctions, setSubJunctions] = useState<SubJunction[]>([]);
  const [commandMenuOpen, setCommandMenuOpen] = useState<boolean>(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  const [clickedCellIndex, setClickedCellIndex] = useState<number | null>(null);
  const [view, setView] = useState<"name" | "junction">("name");

  async function getSchedule(currentDate: Date) {
    const utcMidnight = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      10
    );
    const { data: scheduleData, error } = await supabase
      .from("assignments")
      .select(
        "id,junctions(id,name),sub_junctions(id,name),shift,start_date,end_date,personnel(name,role)"
      )
      .lte("start_date", utcMidnight.toISOString())
      .gte("end_date", utcMidnight.toISOString());

    if (error) {
      console.error("Error fetching schedule:", error);
    } else {
      console.log("schedule", scheduleData);
      setSchedule(scheduleData);
    }
  }

  useEffect(() => {
    getSchedule(currentWeek);
  }, [currentWeek]);

  const filteredSchedule = schedule.filter((detail) => {
    const matchesPosition =
      !filterPosition ||
      filterPosition === "All" ||
      detail.personnel.role === filterPosition;
    const matchesName =
      !filterName ||
      detail.personnel.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesLocation =
      !filterLocation ||
      (typeof filterLocation === "string" &&
        ((detail.junctions?.name &&
          detail.junctions.name.toLowerCase().includes(filterLocation.toLowerCase())) ||
          (detail.sub_junctions?.name &&
            detail.sub_junctions.name.toLowerCase().includes(filterLocation.toLowerCase()))));

    return matchesPosition && matchesName && matchesLocation;
  });

  function getNextWeek() {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + 7);
    return newDate;
  }
  function getPreviousWeek() {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() - 7);
    return newDate;
  }

  const handleLocationClick = (index: number) => {
    setClickedCellIndex(index);
    setCommandMenuOpen(true);
  };

  const handleLocationFilterClick = () => {
    setFilterMenuOpen(true);
  };

  const handleSelection = async (selectedValue: { id: number; name: string; type: string }) => {
    if (clickedCellIndex !== null) {
      const updatedSchedule = [...schedule];
      const detail = updatedSchedule[clickedCellIndex];
      let updatePayload = {};

      if (detail.junctions) {
        detail.junctions.name = selectedValue.name;
        updatePayload = {
          junction_id: getIdFromName(selectedValue.name, junctions),
        };
      } else if (detail.sub_junctions) {
        detail.sub_junctions.name = selectedValue.name;
        updatePayload = {
          sub_junction_id: getIdFromName(selectedValue.name, subJunctions),
        };
      }

      const { data, error } = await supabase
        .from("assignments")
        .update(updatePayload)
        .eq("id", detail.id);

      if (error) {
        console.error("Error updating schedule:", error);
      } else {
        console.log("Schedule updated:", data);
        setSchedule(updatedSchedule);
        setClickedCellIndex(null);
        setCommandMenuOpen(false);
      }
    } else if (filterMenuOpen) {
      setFilterLocation(selectedValue.name);
      setFilterMenuOpen(false);
    }
  };

  const getIdFromName = (name: string, list: Junction[] | SubJunction[]) => {
    const item = list.find((item) => item.name === name);
    return item ? item.id : null;
  };

  useEffect(() => {
    async function fetchJunctions() {
      const { data: junctionData, error: junctionError } = await supabase
        .from("junctions")
        .select("id, name");

      if (junctionError) {
        console.error("Error fetching junctions:", junctionError);
      } else {
        setJunctions(junctionData);
      }
    }

    async function fetchSubJunctions() {
      const { data: subJunctionData, error: subJunctionError } = await supabase
        .from("sub_junctions")
        .select("id, name");

      if (subJunctionError) {
        console.error("Error fetching sub junctions:", subJunctionError);
      } else {
        setSubJunctions(subJunctionData);
      }
    }

    fetchJunctions();
    fetchSubJunctions();
  }, []);

  const junctionViewData = [
    ...junctions.map((junction) => ({
      ...junction,
      num_people: filteredSchedule.filter(
        (detail) => detail.junctions?.name === junction.name
      ).length,
    })),
    ...subJunctions.map((subJunction) => ({
      ...subJunction,
      num_people: filteredSchedule.filter(
        (detail) => detail.sub_junctions?.name === subJunction.name
      ).length,
    })),
  ];

  return (
    <div className="py-3">
      <Card id="rotation-schedule" className="mt-10">
        <CardHeader>
          <CardTitle>Rotation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <CommandMenu
            open={commandMenuOpen}
            setOpen={setCommandMenuOpen}
            onSelect={handleSelection}
            showOnlyjunction={true}
            showOnlySubjunction={true}
          />
          <CommandMenu
            open={filterMenuOpen}
            setOpen={setFilterMenuOpen}
            onSelect={handleSelection}
            showOnlyjunction={true}
            showOnlySubjunction={true}
          />
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2 md:mb-0"
              onClick={() => setCurrentWeek(getPreviousWeek())}
            >
              Previous Week
            </button>
            <h3 className="text-xl mb-2 font-bold md:mb-0">
              {currentWeek.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              {" - "}
              {getNextWeek().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </h3>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setCurrentWeek(getNextWeek())}
            >
              Next Week
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
            <label
              htmlFor="filterPosition"
              className="font-semibold mb-2 md:mb-0"
            >
              Filter by Position:
            </label>
            <select
              id="filterPosition"
              value={filterPosition ?? "All"}
              onChange={(e) =>
                setFilterPosition(
                  e.target.value === "All" ? null : e.target.value
                )
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
              onClick={handleLocationFilterClick}
              readOnly
              className="p-2 border rounded cursor-pointer"
            />
          </div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setView(view === "name" ? "junction" : "name")}
          >
            Change View
          </button>
          {view === "name" ? (
            filteredSchedule.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Role</th>
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Location</th>
                      <th className="py-2 px-4 border-b text-left">Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.map((detail, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">
                          {detail.personnel.role}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {detail.personnel.name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <span
                            onClick={() => handleLocationClick(index)}
                            className="cursor-pointer text-blue-500"
                          >
                            {detail.junctions?.name ??
                              detail.sub_junctions?.name}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">
                          {detail.shift ?? "All Day"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No schedule details available for the current week.</p>
            )
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Location</th>
                    <th className="py-2 px-4 border-b text-left">Number of People</th>
                  </tr>
                </thead>
                <tbody>
                  {junctionViewData.map((detail, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        {detail.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {detail.num_people}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleForRotation;
