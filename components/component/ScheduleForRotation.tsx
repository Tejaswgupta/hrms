"use client";
import React, { useEffect, useState } from "react";
import { assignNewAssignments } from "./NewRotation";
import { supabase } from "./supabase";

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

  // const [editedDetails, setEditedDetails] = useState<{
  //   [key: string]: ScheduleDetail;
  // }>({});
  const [junctions, setJunctions] = useState<Junction[]>([]);
  const [subJunctions, setSubJunctions] = useState<SubJunction[]>([]);

  async function getSchedule(currentDate: Date) {
    const utcMidnight = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        20
      )
    );
    console.log("current week", utcMidnight.toISOString());
    const { data: scheduleData, error } = await supabase
      .from("assignments")
      .select(
        "junctions(name),sub_junctions(name),shift,start_date,end_date,personnel(name,role)"
      )
      .lte("start_date", utcMidnight.toISOString())
      .gte("end_date", utcMidnight.toISOString());

    console.log(scheduleData.length);
    setSchedule(scheduleData);
  }

  useEffect(() => {
    getSchedule(currentWeek);
  }, [currentWeek]);

  // const handleEdit = (
  //   week: number,
  //   detailIndex: number,
  //   field: keyof ScheduleDetail,
  //   value: string
  // ) => {
  //   setEditedDetails((prev) => ({
  //     ...prev,
  //     [`${week}-${detailIndex}`]: {
  //       ...prev[`${week}-${detailIndex}`],
  //       [field]: value,
  //     },
  //   }));

  //   // Save edited details to localStorage
  //   localStorage.setItem(
  //     "editedDetails",
  //     JSON.stringify({
  //       ...editedDetails,
  //       [`${week}-${detailIndex}`]: {
  //         ...editedDetails[`${week}-${detailIndex}`],
  //         [field]: value,
  //       },
  //     })
  //   );
  // };

  // const saveChanges = () => {
  //   const newSchedule = schedule.map((weekSchedule) => ({
  //     ...weekSchedule,
  //     details: weekSchedule.details.map((detail, detailIndex) => ({
  //       ...detail,
  //       ...editedDetails[`${weekSchedule.week}-${detailIndex}`],
  //     })),
  //   }));
  //   setSchedule(newSchedule);
  //   setEditedDetails({});
  //   localStorage.setItem("schedule", JSON.stringify(newSchedule));
  //   localStorage.removeItem("editedDetails");
  // };

  // const filteredSchedule = schedule.map((weekSchedule) => ({
  //   ...weekSchedule,
  //   details: weekSchedule.details.filter((detail) => {
  //     const matchesPosition =
  //       !filterPosition ||
  //       filterPosition === "All" ||
  //       detail.role === filterPosition;
  //     const matchesName =
  //       !filterName ||
  //       detail.name.toLowerCase().includes(filterName.toLowerCase());
  //     const matchesLocation =
  //       !filterLocation ||
  //       filterLocation === "All" ||
  //       detail.location === filterLocation;
  //     return matchesPosition && matchesName && matchesLocation;
  //   }),
  // }));

  // const currentWeekSchedule = filteredSchedule.find(
  //   (weekSchedule) => weekSchedule.week === currentWeek
  // );
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2 md:mb-0"
          onClick={() => {
            const newDate = new Date(currentWeek);
            newDate.setDate(currentWeek.getDate() - 7);
            setCurrentWeek(newDate);
          }}
        >
          Previous Week
        </button>

        <button
          onClick={() => {
            // populateAssignmentsForOneWeekWithoutDuplicates();
            assignNewAssignments();
          }}
        >
          Add Data
        </button>
        <h3 className="text-xl font-bold mb-2 md:mb-0">
          Week{" "}
          {currentWeek.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            const newDate = new Date(currentWeek);
            newDate.setDate(currentWeek.getDate() + 7);
            setCurrentWeek(newDate);
          }}
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
          onChange={(e) => {
            setSchedule(
              schedule.filter(
                (s) =>
                  s.junctions?.name.includes(e.target.value) ||
                  s.sub_junctions?.name.includes(e.target.value)
              )
            );
          }}
          className="p-2 border rounded"
        />
      </div>
      {schedule.length > 0 ? (
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
              {schedule.map((detail, index) => {
                console.log(detail);
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {detail.personnel.role}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {detail.personnel.name}
                      {/* <select
                        defaultValue={detail.personnel.name}
                        className="p-2 border rounded w-full"
                      >
                        {personnel.map((person, pIndex) => (
                          <option key={pIndex} value={person.name}>
                            {person.name}
                          </option>
                        ))}
                      </select> */}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {detail.junctions?.name ?? detail.sub_junctions?.name}
                      {/* <select
                        value={
                          detail.junctions?.name ?? detail.sub_junctions?.name
                        }
                        className="p-2 border rounded w-full"
                      >
                        {junctions.map((junction, jIndex) => (
                          <option key={jIndex} value={junction.name}>
                            {junction.name}
                          </option>
                        ))}
                        {subJunctions.map((subJunction, sjIndex) => (
                          <option key={sjIndex} value={subJunction.name}>
                            {subJunction.name}
                          </option>
                        ))}
                      </select> */}
                    </td>
                    <td className="py-2 px-4 border-b ">
                      {detail.shift ?? "All Day"}
                    </td>
                  </tr>
                );
              })}
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
