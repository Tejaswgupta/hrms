"use client";
import { CommandMenu } from "@/components/component/CommandMenu";
import { assignNewAssignments } from "@/components/component/NewRotation";
import { supabase } from "@/components/component/supabase";
import React, { useEffect, useState } from "react";

const SetRotation: React.FC = () => {
  const [junctions, setJunctions] = useState([]);
  const [subJunctions, setSubJunctions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("junction");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedJunctions, setSelectedJunctions] = useState<{ [key: number]: string }>({});

  async function getSchedule() {
    try {
      const { data: junctionsData, error: junctionsError } = await supabase
        .from("junctions")
        .select("*");

      const { data: subJunctionsData, error: subJunctionsError } = await supabase
        .from("sub_junctions")
        .select("*");

      if (junctionsError || subJunctionsError) {
        console.error("Error fetching data:", junctionsError || subJunctionsError);
        return;
      }

      setJunctions(junctionsData);
      setSubJunctions(subJunctionsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const handleInputChange = (index, field, value) => {
    if (field === "num_tsi") {
      const updatedJunctions = [...junctions];
      updatedJunctions[index] = {
        ...updatedJunctions[index],
        num_tsi: parseInt(value),
      };
      setJunctions(updatedJunctions);
      updateJunctionDatabase(updatedJunctions[index]);
    } else {
      const updatedSubJunctions = [...subJunctions];
      updatedSubJunctions[index] = {
        ...updatedSubJunctions[index],
        [field]: parseInt(value),
      };
      setSubJunctions(updatedSubJunctions);
      updateSubJunctionDatabase(updatedSubJunctions[index]);
    }
  };

  const updateJunctionDatabase = async (junction) => {
    try {
      const { error } = await supabase
        .from("junctions")
        .update({
          num_tsi: junction.num_tsi,
        })
        .eq("id", junction.id);

      if (error) {
        throw new Error("Error updating junction:", error.message);
      } else {
        console.log("Junction updated successfully");
      }
    } catch (error) {
      console.error("Error updating junction:", error.message);
    }
  };

  const updateSubJunctionDatabase = async (subJunction) => {
    try {
      const { error } = await supabase
        .from("sub_junctions")
        .update({
          num_constable: subJunction.num_constable,
          num_head_constable: subJunction.num_head_constable,
          num_home_guard: subJunction.num_home_guard,
        })
        .eq("id", subJunction.id);

      if (error) {
        throw new Error("Error updating sub-junction:", error.message);
      } else {
        console.log("Sub-junction updated successfully");
      }
    } catch (error) {
      console.error("Error updating sub-junction:", error.message);
    }
  };

  const handleSelectJunction = (index) => {
    setSelectedIndex(index);
    setOpen(true);
    setSelected("junction");
  };

  const handleCommandSelect = (selectedItem) => {
    if (selectedIndex !== null) {
      const { name } = selectedItem; // Extract the name from the selected item

      const updatedJunctions = [...junctions];
      const selectedJunction = updatedJunctions.find(
        (junction) => junction.name === name
      );

      if (selectedJunction && updatedJunctions[selectedIndex].num_tsi > 0) {
        selectedJunction.num_tsi -= 1;
        updatedJunctions[selectedIndex].num_tsi += 1;

        setJunctions(updatedJunctions);
        updateJunctionDatabase(updatedJunctions[selectedIndex]);
        updateJunctionDatabase(selectedJunction);
      }

      setSelectedJunctions((prev) => ({
        ...prev,
        [selectedIndex]: name, // Store the name instead of the object
      }));

      setOpen(false);
      setSelectedIndex(null); // Reset the selected index
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 mb-10 text-white rounded justify-end"
        onClick={async () => {
          assignNewAssignments();
        }}
      >
        Save Changes
      </button>
      
      <CommandMenu
        open={open}
        setOpen={setOpen}
        showOnlyjunction={selected === "junction"}
        showOnlySubjunction={selected === "subjunction"}
        onSelect={handleCommandSelect}
      />
      
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
                      type="number"
                      className="outline rounded outline-1"
                      value={junction.num_tsi}
                      onChange={(e) =>
                        handleInputChange(index, "num_tsi", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className="py-2 px-4 border-b cursor-pointer text-blue-500"
                    onClick={() => handleSelectJunction(index)}
                  >
                    {selectedJunctions[index]
                      ? selectedJunctions[index]
                      : "Select"}
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
              {subJunctions.map((subJunction, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{subJunction?.name}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      className="outline rounded outline-1"
                      value={subJunction.num_constable}
                      onChange={(e) =>
                        handleInputChange(index, "num_constable", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      className="outline rounded outline-1"
                      value={subJunction.num_head_constable}
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
                      value={subJunction.num_home_guard}
                      onChange={(e) =>
                        handleInputChange(index, "num_home_guard", e.target.value)
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
