import { supabase } from "./supabase";

function addWeeks(date: Date, weeks: number): Date {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
}

interface NewAssignment {
  personnel_id: string;
  junction_id?: string;
  sub_junction_id?: string;
  shift?: string;
  start_date: Date;
  end_date: Date;
}

// export async function populateAssignmentsForOneWeekWithoutDuplicates() {
//   try {
//     const _currentDate = new Date(Date.UTC(2024, 5, 24));

//     const currentDate = _currentDate.toISOString();
//     const endDate = addWeeks(_currentDate, 1).toISOString();

//     console.log("start", currentDate);
//     console.log("end", endDate);

//     // Fetch all previous assignments
//     const { data: previousAssignments, error: fetchError } = await supabase
//       .from("assignments")
//       .select("*");

//     if (fetchError) {
//       console.error("Error fetching previous assignments:", fetchError);
//       throw fetchError;
//     }

//     // Fetch personnel, junctions, and sub-junctions
//     const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
//       await Promise.all([
//         supabase.from("personnel").select("*").order("id"),
//         supabase.from("junctions").select("*").order("id"),
//         supabase.from("sub_junctions").select("*").order("id"),
//       ]);

//     const TSIS = personnel.filter((e) => e.role == "TSI");

//     // console.log(personnel.filter((e) => e.role == "TSI"));
//     // console.log(personnel.filter((e) => e.role != "TSI"));
//     // console.log(junctions);
//     // console.log(subJunctions);

//     const newAssignments = [];
//     let tsiIndex = 0;

//     for (var junction of junctions) {
//       newAssignments.push({
//         personnel_id: TSIS[tsiIndex].id,
//         junction_id: junction.id,
//         sub_junction_id: null,
//         shift: null,
//         start_date: currentDate,
//         end_date: endDate,
//       });

//       tsiIndex = (tsiIndex + 1) % TSIS.length;
//     }

//     const CONSTABLES = personnel.filter((e) => e.role == "Constable");
//     const MAX_CONSTABLES = 3;
//     const HEAD_CONSTABLES = personnel.filter((e) => e.role == "Head Constable");

//     let constableIndex = 0;
//     let headConstableIndex = 0;

//     for (var subjunction of subJunctions) {
//       for (var shift in ["morning", "night"]) {
//         // Assign 3 constables
//         for (let i = 0; i < MAX_CONSTABLES; i++) {
//           console.log(
//             `Subjunction: ${subjunction}, Shift: ${shift}, Constable: ${CONSTABLES[constableIndex].name}`
//           );
//           newAssignments.push({
//             personnel_id: CONSTABLES[constableIndex].id,
//             junction_id: null,
//             sub_junction_id: subjunction.id,
//             shift: shift,
//             start_date: currentDate,
//             end_date: endDate,
//           });

//           constableIndex = (constableIndex + 1) % CONSTABLES.length;
//         }

//         // Assign 1 head constable
//         console.log(
//           `Subjunction: ${subjunction}, Shift: ${shift}, Head Constable: ${HEAD_CONSTABLES[headConstableIndex].name}`
//         );

//         newAssignments.push({
//           personnel_id: HEAD_CONSTABLES[headConstableIndex].id,
//           junction_id: null,
//           sub_junction_id: subjunction.id,
//           shift: shift,
//           start_date: currentDate,
//           end_date: endDate,
//         });
//         headConstableIndex = (headConstableIndex + 1) % HEAD_CONSTABLES.length;
//       }
//     }
//     console.log(newAssignments);

//     // Insert all new assignments at once
//     const { data, error } = await supabase
//       .from("assignments")
//       .insert(newAssignments);
//   } catch (error) {
//     console.error("Error populating assignments:", error);
//   }
// }

export async function populateAssignmentsForOneWeekWithoutDuplicates() {
  try {
    const _currentDate = new Date(Date.UTC(2024, 5, 24));

    const currentDate = _currentDate.toISOString();
    const endDate = addWeeks(_currentDate, 1).toISOString();

    console.log("start", currentDate);
    console.log("end", endDate);

    // Fetch all previous assignments
    const { data: previousAssignments, error: fetchError } = await supabase
      .from("assignments")
      .select("*");

    if (fetchError) {
      console.error("Error fetching previous assignments:", fetchError);
      throw fetchError;
    }

    // Fetch personnel, junctions, and sub-junctions
    const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
      await Promise.all([
        supabase.from("personnel").select("*").order("id"),
        supabase.from("junctions").select("*").order("id"),
        supabase.from("sub_junctions").select("*").order("id"),
      ]);

    // Create a map to store existing assignments for each personnel
    const personnelAssignments = new Map();

    // Populate the map with existing assignments
    previousAssignments.forEach((assignment) => {
      personnelAssignments.set(assignment.personnel_id, assignment);
    });

    const newAssignments = [];

    const TSIS = personnel.filter((e) => e.role == "TSI");
    const CONSTABLES = personnel.filter((e) => e.role == "Constable");
    const HEAD_CONSTABLES = personnel.filter((e) => e.role == "Head Constable");
    const HOME_GUARDS = personnel.filter((e) => e.role == "Home Guard");

    console.log(HOME_GUARDS);

    let tsiIndex = 0;
    let constableIndex = 0;
    let headConstableIndex = 0;
    let homeGuardIndex = 0;

    for (var junction of junctions) {
      const MAX_TSI = junction.num_tsi;

      for (let i = 0; i < MAX_TSI; i++) {
        const personnelId = TSIS[tsiIndex].id;

        // Check if the personnel already has an assignment
        if (!personnelAssignments.has(personnelId)) {
          newAssignments.push({
            personnel_id: personnelId,
            junction_id: junction.id,
            sub_junction_id: null,
            shift: null,
            start_date: currentDate,
            end_date: endDate,
          });

          // Update the map with the new assignment
          personnelAssignments.set(
            personnelId,
            newAssignments[newAssignments.length - 1]
          );
        }

        tsiIndex = (tsiIndex + 1) % TSIS.length;
      }
    }

    for (var subjunction of subJunctions) {
      const MAX_CONSTABLES = subjunction.num_constable;
      const MAX_HEAD_CONSTABLES = subjunction.num_head_constable;
      const MAX_HOME_GUARDS = 0; //subjunction.num_home_guard;

      for (var shift of ["morning", "night"]) {
        // Assign constables
        for (let i = 0; i < MAX_CONSTABLES; i++) {
          const personnelId = CONSTABLES[constableIndex].id;

          // Check if the personnel already has an assignment
          if (!personnelAssignments.has(personnelId)) {
            newAssignments.push({
              personnel_id: personnelId,
              junction_id: null,
              sub_junction_id: subjunction.id,
              shift: shift,
              start_date: currentDate,
              end_date: endDate,
            });

            // Update the map with the new assignment
            personnelAssignments.set(
              personnelId,
              newAssignments[newAssignments.length - 1]
            );
          }

          constableIndex = (constableIndex + 1) % CONSTABLES.length;
        }

        //Assign Head Constable
        for (let i = 0; i < MAX_HEAD_CONSTABLES; i++) {
          const personnelId = HEAD_CONSTABLES[headConstableIndex].id;

          // Check if the personnel already has an assignment
          if (!personnelAssignments.has(personnelId)) {
            newAssignments.push({
              personnel_id: personnelId,
              junction_id: null,
              sub_junction_id: subjunction.id,
              shift: shift,
              start_date: currentDate,
              end_date: endDate,
            });

            // Update the map with the new assignment
            personnelAssignments.set(
              personnelId,
              newAssignments[newAssignments.length - 1]
            );
          }

          headConstableIndex =
            (headConstableIndex + 1) % HEAD_CONSTABLES.length;
        }

        //Assign home guard
        for (let i = 0; i < MAX_HOME_GUARDS; i++) {
          const personnelId = HOME_GUARDS[homeGuardIndex].id;

          // Check if the personnel already has an assignment
          if (!personnelAssignments.has(personnelId)) {
            newAssignments.push({
              personnel_id: personnelId,
              junction_id: null,
              sub_junction_id: subjunction.id,
              shift: shift,
              start_date: currentDate,
              end_date: endDate,
            });

            // Update the map with the new assignment
            personnelAssignments.set(
              personnelId,
              newAssignments[newAssignments.length - 1]
            );
          }

          homeGuardIndex = (homeGuardIndex + 1) % HOME_GUARDS.length;
        }
      }
    }

    console.log(newAssignments);

    // Insert all new assignments at once
    const { data, error } = await supabase
      .from("assignments")
      .insert(newAssignments);
  } catch (error) {
    console.error("Error populating assignments:", error);
  }
}

export function getLastMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysSinceMonday = (dayOfWeek + 6) % 7; // Calculate days since last Monday
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);
  return lastMonday;
}

// export async function reCalculateCurrentWeek() {
//   try {
//     const _lastMonday = getLastMonday();

//     const currentDate = _lastMonday.toISOString();
//     const endDate = addWeeks(_lastMonday, 1).toISOString();

//     console.log("start", currentDate);
//     console.log("end", endDate);

//     // Fetch all previous assignments
//     const { data: previousAssignments, error: fetchError } = await supabase
//       .from("assignments")
//       .select("*");

//     if (fetchError) {
//       console.error("Error fetching previous assignments:", fetchError);
//       throw fetchError;
//     }

//     // Fetch personnel, junctions, and sub-junctions
//     const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
//       await Promise.all([
//         supabase.from("personnel").select("*").order("id"),
//         supabase.from("junctions").select("*").order("id"),
//         supabase.from("sub_junctions").select("*").order("id"),
//       ]);

//     // Create a map to store existing assignments for each personnel
//     const personnelAssignments = new Map();

//     // Populate the map with existing assignments
//     previousAssignments.forEach((assignment) => {
//       personnelAssignments.set(assignment.personnel_id, assignment);
//     });

//     const newAssignments = [];

//     const TSIS = personnel.filter((e) => e.role == "TSI");
//     const CONSTABLES = personnel.filter((e) => e.role == "Constable");
//     const HEAD_CONSTABLES = personnel.filter((e) => e.role == "Head Constable");
//     const HOME_GUARDS = personnel.filter((e) => e.role == "Home Guard");

//     let tsiIndex = 0;
//     let constableIndex = 0;
//     let headConstableIndex = 0;
//     let homeGuardIndex = 0;

//     for (var junction of junctions) {
//       const MAX_TSI = junction.num_tsi;

//       for (let i = 0; i < MAX_TSI; i++) {
//         const personnelId = TSIS[tsiIndex].id;

//         // Check if the personnel already has an assignment
//         if (!personnelAssignments.has(personnelId)) {
//           newAssignments.push({
//             personnel_id: personnelId,
//             junction_id: junction.id,
//             sub_junction_id: null,
//             shift: null,
//             start_date: currentDate,
//             end_date: endDate,
//           });

//           // Update the map with the new assignment
//           personnelAssignments.set(
//             personnelId,
//             newAssignments[newAssignments.length - 1]
//           );
//         }

//         tsiIndex = (tsiIndex + 1) % TSIS.length;
//       }
//     }

//     for (var subjunction of subJunctions) {
//       const MAX_CONSTABLES = subjunction.num_constable;
//       const MAX_HEAD_CONSTABLES = subjunction.num_head_constable;
//       const MAX_HOME_GUARDS = subjunction.num_home_guard;

//       for (var shift of ["morning", "night"]) {
//         // Assign constables
//         for (let i = 0; i < MAX_CONSTABLES; i++) {
//           const personnelId = CONSTABLES[constableIndex].id;

//           // Check if the personnel already has an assignment
//           if (!personnelAssignments.has(personnelId)) {
//             newAssignments.push({
//               personnel_id: personnelId,
//               junction_id: null,
//               sub_junction_id: subjunction.id,
//               shift: shift,
//               start_date: currentDate,
//               end_date: endDate,
//             });

//             // Update the map with the new assignment
//             personnelAssignments.set(
//               personnelId,
//               newAssignments[newAssignments.length - 1]
//             );
//           }

//           constableIndex = (constableIndex + 1) % CONSTABLES.length;
//         }

//         //Assign Head Constable
//         for (let i = 0; i < MAX_HEAD_CONSTABLES; i++) {
//           const personnelId = HEAD_CONSTABLES[headConstableIndex].id;

//           // Check if the personnel already has an assignment
//           if (!personnelAssignments.has(personnelId)) {
//             newAssignments.push({
//               personnel_id: personnelId,
//               junction_id: null,
//               sub_junction_id: subjunction.id,
//               shift: shift,
//               start_date: currentDate,
//               end_date: endDate,
//             });

//             // Update the map with the new assignment
//             personnelAssignments.set(
//               personnelId,
//               newAssignments[newAssignments.length - 1]
//             );
//           }

//           headConstableIndex =
//             (headConstableIndex + 1) % HEAD_CONSTABLES.length;
//         }

//         //Assign home guard
//         for (let i = 0; i < MAX_HOME_GUARDS; i++) {
//           const personnelId = HOME_GUARDS[homeGuardIndex].id;

//           // Check if the personnel already has an assignment
//           if (!personnelAssignments.has(personnelId)) {
//             newAssignments.push({
//               personnel_id: personnelId,
//               junction_id: null,
//               sub_junction_id: subjunction.id,
//               shift: shift,
//               start_date: currentDate,
//               end_date: endDate,
//             });

//             // Update the map with the new assignment
//             personnelAssignments.set(
//               personnelId,
//               newAssignments[newAssignments.length - 1]
//             );
//           }

//           homeGuardIndex = (homeGuardIndex + 1) % HOME_GUARDS.length;
//         }
//       }
//     }

//     console.log(newAssignments);
//     return;

//     // Insert all new assignments at once
//     const { data, error } = await supabase
//       .from("assignments")
//       .insert(newAssignments);
//   } catch (error) {
//     console.error("Error populating assignments:", error);
//   }
// }

export async function fetchPreviousAssignments(startDate: Date, endDate: Date) {
  try {
    // Fetch all previous assignments
    console.log("prevS", startDate.toISOString());
    console.log("prevE", endDate.toISOString());

    const { data: previousAssignments, error: fetchError } = await supabase
      .from("assignments")
      .select("*,personnel(role)")
      .gte("start_date", startDate.toISOString())
      .lte("end_date", endDate.toISOString());

    if (fetchError) {
      console.error("Error fetching previous assignments:", fetchError);
      throw fetchError;
    }
    console.log("prev", previousAssignments);
    return previousAssignments;
  } catch (error) {
    console.error("Error fetching previous assignments:", error);
  }
}

export async function assignNewAssignments() {
  try {
    // Current date
    const _currentDate = new Date(Date.UTC(2024, 6, 29));
    const currentDate = _currentDate.toISOString();

    const _endDate = addWeeks(_currentDate, 1);
    const endDate = _endDate.toISOString();

    console.log("currentDate:", currentDate);
    console.log("endDate:", endDate);

    // Fetch previous assignments
    const previousAssignments = await fetchPreviousAssignments(
      addWeeks(_currentDate, -1),
      _currentDate
    );

    // Fetch personnel, junctions, and sub-junctions
    const [{ count: junctions }, { count: subJunctions }] = await Promise.all([
      supabase.from("junctions").select("*", { count: "exact", head: true }),
      supabase
        .from("sub_junctions")
        .select("*", { count: "exact", head: true }),
    ]);

    console.log(junctions, subJunctions);

    const newAssignments = [];

    for (var prevAssignment of previousAssignments) {
      delete prevAssignment.personnel;
      delete prevAssignment.id;

      if (prevAssignment.junction_id) {
        const junctionID =
          prevAssignment.junction_id == junctions
            ? 1
            : (prevAssignment.junction_id % junctions) + 1;

        newAssignments.push({
          ...prevAssignment,
          junction_id: junctionID,
          start_date: currentDate,
          end_date: endDate,
        });
      } else {
        const subjunctionID =
          (prevAssignment.subjunction_id % subJunctions) + 1;
        newAssignments.push({
          ...prevAssignment,
          junction_id: subjunctionID,
          start_date: currentDate,
          end_date: endDate,
        });
      }
    }

    console.log(newAssignments);

    // Insert all new assignments at once
    const { data, error } = await supabase
      .from("assignments")
      .insert(newAssignments);

    if (error) {
      console.error("Error inserting new assignments:", error);
      throw error;
    }

    console.log("New assignments inserted successfully:", data);
  } catch (error) {
    console.error("Error assigning new assignments:", error);
  }
}

// export async function assignNewAssignments() {
//   try {
//     // Current date
//     const _currentDate = new Date(Date.UTC(2024, 6, 1));
//     const currentDate = _currentDate.toISOString();

//     const _endDate = addWeeks(_currentDate, 1);
//     const endDate = _endDate.toISOString();

//     console.log("currentDate:", currentDate);
//     console.log("endDate:", endDate);

//     // Fetch previous assignments
//     const previousAssignments = await fetchPreviousAssignments(
//       addWeeks(_currentDate, -1),
//       _currentDate
//     );

//     // Fetch personnel, junctions, and sub-junctions
//     const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
//       await Promise.all([
//         supabase.from("personnel").select("*").order("id"),
//         supabase.from("junctions").select("*").order("id"),
//         supabase.from("sub_junctions").select("*").order("id"),
//       ]);

//     const TSIS = personnel.filter((e) => e.role == "TSI");
//     const CONSTABLES = personnel.filter((e) => e.role == "Constable");
//     const HEAD_CONSTABLES = personnel.filter((e) => e.role == "Head Constable");

//     // Round robin logic for assignments

//     const newAssignments = [];

//     for (var junction of junctions) {
//       // Check if TSI has been assigned to this junction in the previous week
//       const previousTSIAssignment = previousAssignments.find(
//         (a) => a.junction_id === junction.id
//       );

//       const junction_id = (junction.id % junctions.length) + 1;

//       const newAssignment = {
//         personnel_id: previousTSIAssignment.personnel_id,
//         junction_id: junction_id,
//         sub_junction_id: null,
//         shift: null,
//         start_date: currentDate,
//         end_date: endDate,
//       };
//       newAssignments.push(newAssignment);
//     }

//     for (var subjunction of subJunctions) {
//       for (var shift of ["morning", "night"]) {
//         // Assign 3 constables
//         // Check if constable has been assigned to this sub-junction and shift in the previous week
//         const previousConstableAssignment = previousAssignments.filter(
//           (a) =>
//             a.sub_junction_id == subjunction.id &&
//             a.personnel.role == "Constable"
//         );

//         const sub_junction_id = (subjunction.id % 1) + 1;

//         for (var prevConstable of previousConstableAssignment) {
//           newAssignments.push({
//             personnel_id: prevConstable.personnel_id,
//             junction_id: null,
//             sub_junction_id: sub_junction_id,
//             shift: shift,
//             start_date: currentDate,
//             end_date: endDate,
//           });
//         }

//         // Assign 1 head constable
//         // Check if head constable has been assigned to this sub-junction and shift in the previous week
//         const previousHeadConstableAssignment = previousAssignments.find(
//           (a) =>
//             a.sub_junction_id == subjunction.id &&
//             a.personnel.role == "Head Constable"
//         );

//         if (previousHeadConstableAssignment) {
//           newAssignments.push({
//             personnel_id: previousHeadConstableAssignment.personnel_id,
//             junction_id: null,
//             sub_junction_id: sub_junction_id,
//             shift: shift,
//             start_date: currentDate,
//             end_date: endDate,
//           });
//         }
//       }
//     }

//     // Insert all new assignments at once
//     const { data, error } = await supabase
//       .from("assignments")
//       .insert(newAssignments);

//     if (error) {
//       console.error("Error inserting new assignments:", error);
//       throw error;
//     }

//     console.log("New assignments inserted successfully:", data);
//   } catch (error) {
//     console.error("Error assigning new assignments:", error);
//   }
// }
