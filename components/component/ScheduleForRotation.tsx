"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { CommandMenu } from "./CommandMenu";
import { EmployeeCmdk } from "./EmployeeCmdk";
interface Personnel {
  id: string;
  name: string;
  phone: string;
}
interface Junction {
  name: string;
}

interface SubJunction {
  name: string;
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

  async function getSchedule(currentDate: Date) {
    const utcMidnight = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        20
      )
    );
    const { data: scheduleData, error } = await supabase
      .from("assignments")
      .select(
        "junctions(name),sub_junctions(name),shift,start_date,end_date,personnel(name,role)"
      )
      .lte("start_date", utcMidnight.toISOString())
      .gte("end_date", utcMidnight.toISOString());

    if (error) {
      console.error("Error fetching schedule:", error);
    } else {
      console.log(scheduleData);
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
      detail.junctions?.name
        .toLowerCase()
        .includes(filterLocation.toLowerCase()) ||
      detail.sub_junctions?.name
        .toLowerCase()
        .includes(filterLocation.toLowerCase());

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

  const handleSelection = (selectedValue: string) => {
    if (clickedCellIndex !== null) {
      const updatedSchedule = [...schedule];
      const detail = updatedSchedule[clickedCellIndex];
      if (detail.junctions) {
        detail.junctions.name = selectedValue;
      } else if (detail.sub_junctions) {
        detail.sub_junctions.name = selectedValue;
      }
      setSchedule(updatedSchedule);
      setClickedCellIndex(null);
      setCommandMenuOpen(false);
    } else if (filterMenuOpen) {
      setFilterLocation(selectedValue);
      setFilterMenuOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      
      <CommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} onSelect={handleSelection} />
      <CommandMenu open={filterMenuOpen} setOpen={setFilterMenuOpen} onSelect={handleSelection} />
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
          onClick={handleLocationFilterClick}
          readOnly
          className="p-2 border rounded cursor-pointer"
        />
      </div>
      {filteredSchedule.length > 0 ? (
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
                  <td className="py-2 px-4 border-b">{detail.personnel.role}</td>
                  <td className="py-2 px-4 border-b">{detail.personnel.name}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      onClick={() => handleLocationClick(index)}
                      className="cursor-pointer text-blue-500"
                    >
                      {detail.junctions?.name ?? detail.sub_junctions?.name}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{detail.shift ?? "All Day"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {}}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <p>No schedule details available for the current week.</p>
      )}
    </div>
  );
};

export default ScheduleForRotation;
