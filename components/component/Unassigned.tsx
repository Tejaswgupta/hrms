import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CommandMenu } from "./CommandMenu";
import { supabase } from "./supabase";

const startDate = new Date(2024, 5, 24);
export function Unassigned() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(startDate);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);

  const [commandMenuOpen, setCommandMenuOpen] = useState<boolean>(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  const [clickedCellIndex, setClickedCellIndex] = useState<number | null>(null);
  const [unAssigned, setUnAssigned] = useState([]);

  async function getUnassigned(currentDate) {
    const utcMidnight = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        20
      )
    );

    const { data: assignedPersonnel, error } = await supabase
      .from("assignments")
      .select("*,personnel(*)")
      .lte("start_date", utcMidnight.toISOString())
      .gte("end_date", utcMidnight.toISOString());

    const { data: personnel, error: personnelError } = await supabase
      .from("personnel")
      .select("*");

    const assignedPersonnelIds = new Set(
      assignedPersonnel.map((assignment) => assignment.personnel.id)
    );
    // Filter out the assigned personnel from the list of all personnel
    const unassignedPersonnel = personnel.filter(
      (person) => !assignedPersonnelIds.has(person.id)
    );

    console.log("unassigned", unassignedPersonnel);

    setUnAssigned(unassignedPersonnel);
  }

  useEffect(() => {
    getUnassigned(currentWeek);
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

  if (unAssigned.length == 0) {
    return <p>Loading...</p>;
  }

  return (
    <Card id="unassigned">
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
        {unAssigned.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Role</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {unAssigned.map((detail, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{detail.role}</td>
                    <td className="py-2 px-4 border-b">{detail.name}</td>
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
      </CardContent>
    </Card>
  );
}
