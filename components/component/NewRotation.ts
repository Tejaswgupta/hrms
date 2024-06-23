import { supabase } from "./supabase";

function addOneWeek(date) {
  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}

export async function populateAssignmentsForOneWeekWithoutDuplicates() {
  try {
    const _currentDate = new Date(2024, 6, 9);

    const endDate = addOneWeek(_currentDate).toISOString();
    const currentDate = _currentDate.toISOString();

    console.log(_currentDate);
    console.log(endDate);

    // Fetch all previous assignments
    const { data: previousAssignments, error: fetchError } = await supabase
      .from("assignments")
      .select("*");

    if (fetchError) {
      console.error("Error fetching previous assignments:", fetchError);
      throw fetchError;
    }

    // Create a lookup for all previous assignments
    const previousAssignmentsLookup = {};
    previousAssignments.forEach((assignment) => {
      if (!previousAssignmentsLookup[assignment.personnel_id]) {
        previousAssignmentsLookup[assignment.personnel_id] = {
          junctions: new Set(),
          subJunctions: new Set(),
        };
      }
      if (assignment.junction_id) {
        previousAssignmentsLookup[assignment.personnel_id].junctions.add(
          assignment.junction_id
        );
      }
      if (assignment.sub_junction_id) {
        previousAssignmentsLookup[assignment.personnel_id].subJunctions.add(
          assignment.sub_junction_id
        );
      }
    });

    // Fetch personnel, junctions, and sub-junctions
    const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
      await Promise.all([
        supabase.from("personnel").select("*"),
        supabase.from("junctions").select("*"),
        supabase.from("sub_junctions").select("*"),
      ]);

    // Group personnel by role
    const personnelByRole = personnel.reduce((acc, person) => {
      if (!acc[person.role]) acc[person.role] = [];
      acc[person.role].push(person);
      return acc;
    }, {});

    // Assign TSIs to junctions
    const newAssignments = [];
    const assignTSI = (junction) => {
      for (let tsi of personnelByRole["TSI"]) {
        if (!previousAssignmentsLookup[tsi.id]?.junctions.has(junction.id)) {
          newAssignments.push({
            personnel_id: tsi.id,
            junction_id: junction.id,
            sub_junction_id: null,
            shift: null,
            start_date: currentDate,
            end_date: endDate,
          });
          previousAssignmentsLookup[tsi.id].junctions.add(junction.id);
          return true;
        }
      }
      return false;
    };

    for (let junction of junctions) {
      if (!assignTSI(junction)) {
        // If all TSIs have been assigned to all junctions, reset their assignments
        personnelByRole["TSI"].forEach((tsi) => {
          previousAssignmentsLookup[tsi.id].junctions.clear();
        });
        assignTSI(junction);
      }
    }

    // Assign non-TSI roles to sub-junctions
    const nonTSIPersonnel = personnel.filter((p) => p.role !== "TSI");
    const assignToSubJunction = (subJunction, shift) => {
      for (let person of nonTSIPersonnel) {
        if (
          !previousAssignmentsLookup[person.id]?.subJunctions.has(
            subJunction.id
          )
        ) {
          newAssignments.push({
            personnel_id: person.id,
            junction_id: null,
            sub_junction_id: subJunction.id,
            shift,
            start_date: currentDate,
            end_date: endDate,
          });
          previousAssignmentsLookup[person.id].subJunctions.add(subJunction.id);
          return true;
        }
      }
      return false;
    };

    const assignRemainingToSubJunctions = () => {
      for (let subJunction of subJunctions) {
        if (!assignToSubJunction(subJunction, "morning")) {
          // If all personnel have been assigned to all sub-junctions, reset their assignments
          nonTSIPersonnel.forEach((person) => {
            previousAssignmentsLookup[person.id].subJunctions.clear();
          });
          assignToSubJunction(subJunction, "morning");
        }
        if (!assignToSubJunction(subJunction, "night")) {
          // If all personnel have been assigned to all sub-junctions, reset their assignments
          nonTSIPersonnel.forEach((person) => {
            previousAssignmentsLookup[person.id].subJunctions.clear();
          });
          assignToSubJunction(subJunction, "night");
        }
      }
    };

    assignRemainingToSubJunctions();

    // Insert all new assignments at once
    const { data, error } = await supabase
      .from("assignments")
      .insert(newAssignments);

    if (error) {
      console.error("Error inserting assignments:", error);
    } else {
      console.log("Assignments populated successfully for one week");
    }

    // Log assignment statistics
    console.log(
      "Junction assignment stats:",
      junctions
        .map(
          (junction) =>
            `Junction ${junction.id}: ${
              newAssignments.filter((a) => a.junction_id === junction.id).length
            } personnel`
        )
        .join(", ")
    );
    console.log(
      "Sub-junction assignment stats:",
      subJunctions
        .map(
          (subJunction) =>
            `Sub-junction ${subJunction.id}: ${
              newAssignments.filter((a) => a.sub_junction_id === subJunction.id)
                .length
            } personnel`
        )
        .join(", ")
    );
  } catch (error) {
    console.error("Error populating assignments:", error);
  }
}
