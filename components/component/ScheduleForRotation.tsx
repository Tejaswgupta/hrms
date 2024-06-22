"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

interface Personnel {
  id: string;
  name: string;
  phone: string;
}

const ScheduleForRotation: React.FC = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  // const [editedDetails, setEditedDetails] = useState<{
  //   [key: string]: ScheduleDetail;
  // }>({});

  useEffect(() => {
    // populateAssignmentsForOneWeek();
    async function getSchedule() {
      const { data: scheduleData, error } = await supabase
        .from("assignments")
        .select(
          "junctions(name),sub_junctions(name),shift,start_date,end_date,personnel(name,role)"
        );

      console.log(scheduleData);

      setSchedule(scheduleData);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
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
          // value={filterLocation ?? ""}
          onChange={(e) => {
            // setFilterLocation(e.target.value === "" ? null : e.target.value)

            setSchedule(
              schedule.filter(
                (s) =>
                  s.junctions?.name.includes(e.target.value) ??
                  s.sub_junctions?.name.includes(e.target.value)
              )
            );
          }}
          className="p-2 border rounded"
        />
      </div>
      {schedule ? (
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
              {schedule.map((detail, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {detail.personnel.role}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={detail.personnel.name}
                        // onChange={(e) =>
                        //   handleEdit(currentWeek, index, "name", e.target.value)
                        // }
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={
                          // editedDetails[`${currentWeek}-${index}`]?.location ??
                          detail.junctions?.name ?? detail.sub_junctions?.name
                        }
                        // onChange={(e) =>
                        //   handleEdit(
                        //     currentWeek,
                        //     index,
                        //     "location",
                        //     e.target.value
                        //   )
                        // }
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      {detail.shift ?? "All Day"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            // onClick={saveChanges}
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
