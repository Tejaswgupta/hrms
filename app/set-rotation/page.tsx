"use client";
import { CommandMenu } from "@/components/component/CommandMenu";
import { supabase } from "@/components/component/supabase";
import React, { useEffect, useState } from "react";

const SetRotation: React.FC = () => {
  const [junctions, setJunctions] = useState([]);
  const [subJunctions, setSubJunctions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("junction");

  async function getSchedule() {
    const { data: junctions, error: junctionsError } = await supabase
      .from("junctions")
      .select("*");

    const { data: subJunctions, error: subJunctionssError } = await supabase
      .from("sub_junctions")
      .select("*");

    setJunctions([...junctions]);
    setSubJunctions([...subJunctions]);
  }

  const handleInputChange = (index, field, value) => {
    console.log(index, field, value);
    if (field == "num_tsi") {
      const updatedJunctions = [...junctions];
      updatedJunctions[index][field] = parseInt(value);
      setJunctions(updatedJunctions);
      updateJunctionDatabase(updatedJunctions[index]);
    } else {
      const updatedSubJunctions = [...subJunctions];
      updatedSubJunctions[index][field] = parseInt(value);
      setSubJunctions(updatedSubJunctions);
      updateSubJunctionDatabase(updatedSubJunctions[index]);
    }
  };

  const updateJunctionDatabase = async (junction) => {
    const { error } = await supabase
      .from("junctions")
      .update({
        num_tsi: junction.num_tsi,
      })
      .eq("id", junction.id);

    if (error) {
      console.error("Error updating junction:", error);
    } else {
      console.log("Junction updated successfully");
    }
  };

  const updateSubJunctionDatabase = async (junction) => {
    const { error } = await supabase
      .from("sub_junctions")
      .update({
        num_constable: junction.num_constable,
        num_head_constable: junction.num_head_constable,
        num_home_guard: junction.num_home_guard,
      })
      .eq("id", junction.id);

    if (error) {
      console.error("Error updating junction:", error);
    } else {
      console.log("Junction updated successfully");
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  // const [filterLocation, setFilterLocation] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 mb-10 text-white rounded justify-end"
        onClick={async () => {
          // await notAssigned();
          // await deleteAllRows();
          // populateAssignmentsForOneWeekWithoutDuplicates();
        }}
      >
        Save Changes
      </button>
      <CommandMenu
        open={open}
        setOpen={setOpen}
        showOnlyjunction={selected == "junction"}
        showOnlySubjunction={selected == "subjunction"}
        onSelect={(e) => {
          //TODO: Add logic store selected name
        }}
      ></CommandMenu>
      <div className="overflow-x-auto text-black">
        {junctions && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Junction</th>
                <th className="py-2 px-4 border-b text-left">TSIs</th>
                <th className="py-2 px-4 border-b text-left">
                  Add from another junction
                </th>
              </tr>
            </thead>

            <tbody>
              {junctions.map((junction, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{junction?.name}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      readOnly
                      type="number"
                      className="outline rounded outline-1"
                      value={junction.num_tsi}
                      onChange={(e) =>
                        handleInputChange(index, "num_tsi", e.target.value)
                      }
                    />
                  </td>

                  <td
                    onClick={() => {
                      setOpen(true);
                      setSelected("junction");
                    }}
                  >
                    //TODO: Show the selected name instead of `Select` select
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {subJunctions && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Sub Junction</th>
                <th className="py-2 px-4 border-b text-left">Constables</th>
                <th className="py-2 px-4 border-b text-left">
                  Head Constables
                </th>
                <th className="py-2 px-4 border-b text-left">Home Guards</th>
              </tr>
            </thead>

            <tbody>
              {subJunctions?.map((junction, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{junction?.name}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      className="outline rounded outline-1"
                      value={junction.num_constable}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "num_constable",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      className="outline rounded outline-1"
                      value={junction.num_head_constable}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "num_head_constable",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      className="outline rounded outline-1"
                      value={junction.num_home_guard}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "num_home_guard",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SetRotation;
