import { supabase } from "./supabase";

// Sample data structures
// const junctions = [
//   { id: "Vishwakarma Dwar Raatri", subJunctions: ["Vishwakarma Dwar Raatri"] },
//   {
//     id: "Jajmau Chauraha",
//     subJunctions: ["Bima Chauraha", "J.K. Chauraha", "Jajmau Vishwakarma Dwar"],
//   },
//   {
//     id: "Harjender Nagar",
//     subJunctions: [
//       "Harjender Nagar",
//       "Purana Thana Chakeri",
//       "Ma. Vi. Sabha Adhyaksh Aawas Mod Lal Bangla",
//       "Airforce Station",
//     ],
//   },
//   {
//     id: "Rama Devi Chauraha",
//     subJunctions: [
//       "HAL",
//       "Rama Devi Chauraha",
//       "Rama Devi Sabzi Mandi",
//       "E-Rickshaw Diversion (Rama Devi Ramp ke Peeche Lucknow Side)",
//       "E-Rickshaw Diversion (Fatehpur Side)",
//       "Jagdamba Petrol Pump",
//       "Shivkatra Mod",
//     ],
//   },
//   { id: "Ahirwa", subJunctions: ["Airport Cut", "Ahirwa"] },
//   {
//     id: "Shyam Nagar Chauraha",
//     subJunctions: [
//       "Shyam Nagar Chauraha",
//       "Chhappan Bhog Chauraha",
//       "PAC Pul Chhappan Bhog Side",
//       "Dehli Sujanpur Cut (Hans Mandir)",
//     ],
//   },
//   {
//     id: "Manoj International / PAC Mod",
//     subJunctions: ["Manoj International", "COD Pul Tatmil Side"],
//   },
//   { id: "Koyla Nagar", subJunctions: ["Koyla Nagar"] },
//   {
//     id: "Rama Devi Ramp (Nawabasta Side Under Pass)",
//     subJunctions: [
//       "Rama Devi Ramp (Guru Har Rai Side)",
//       "Rama Devi Ramp (Mangla Vihar Side)",
//     ],
//   },
//   {
//     id: "Rocket Tiraha",
//     subJunctions: [
//       "Rocket Tiraha",
//       "10 No. Canteen",
//       "Civil Aero Drum",
//       "Railway Station Gate No. 1 Side",
//     ],
//   },
//   {
//     id: "Mure Company Pul Cantt Side",
//     subJunctions: ["Mure Company Pul Cantt Side"],
//   },
//   {
//     id: "Narauna Chauraha",
//     subJunctions: ["Narauna Chauraha", "Mure Company Pul Narauna Side"],
//   },
//   {
//     id: "Panchakki Chauraha",
//     subJunctions: ["Panchakki Chauraha", "Jhadibaba Padav"],
//   },
//   {
//     id: "Charles Chauraha",
//     subJunctions: [
//       "Phoolbagh Chauraha",
//       "Gilish Bazaar Cut",
//       "Charles Chauraha",
//     ],
//   },
//   { id: "Kila Tiraha, Meghdoot", subJunctions: ["Meghdoot Tiraha"] },
//   { id: "Vyayamshala, Sarsaiya Ghat", subJunctions: ["Sarsaiya Ghat"] },
//   {
//     id: "Police Line Main Gate, Bada Chauraha",
//     subJunctions: [
//       "Bada Chauraha",
//       "Kotwali Chauraha",
//       "Landmark",
//       "Bhargav Hospital Chauraha",
//       "RO Plant Sabzi Mandi Tiraha One-Way",
//       "Bada Chauraha se Kotwali Road",
//       "Ursala Hospital U-turn / Thaggu ke Laddu Road",
//     ],
//   },
//   {
//     id: "Chetna Chauraha",
//     subJunctions: [
//       "Chetna Chauraha One-Way",
//       "DM Karyalay Gate Samay Pratah: 09.00 se 17.00 Baje Tak",
//       "Kachhari Gate Tiraha",
//     ],
//   },
//   {
//     id: "DJ Gate",
//     subJunctions: ["DJ Gate Samay Pratah: 09.00 se 17.00 Baje Tak"],
//   },
//   {
//     id: "Mahila Thana",
//     subJunctions: [
//       "Mahila Thana Pratah: 09.00 se 17.00 Baje Tak",
//       "Gora Kabristan ke Peeche",
//       "Mahila Thana se Gora Kabristan Peeche Gast Pratah: 09.00 se 17.00 Baje Tak",
//       "Mahila Thana se Lathakothi Gast Main Road Side",
//     ],
//   },
//   {
//     id: "Lathakothi",
//     subJunctions: [
//       "Lathakothi Pratah: 09.00 se 17.00 Baje Tak",
//       "DAV Tiraha Pratah: 09.00 se 17.00 Baje Tak",
//     ],
//   },
//   {
//     id: "Tikonia Park, Green Park",
//     subJunctions: [
//       "VIP Road",
//       "Green Park Chauraha",
//       "MG College",
//       "MG College, Police Office",
//       "Police Office",
//       "Police Office Gate One-Way Pratah: 09.00 se 17.00 Baje Tak",
//       "Police Office Parking Pratah: 09.00 se 17.00 Baje Tak",
//     ],
//   },
//   {
//     id: "Moolganj",
//     subJunctions: [
//       "Moolganj Chauraha U-turn",
//       "Kuli Bazaar U-turn Moolganj",
//       "Sharman Enterprises ke Samne Cut",
//       "Shyam Bihari Mishra Chowk U-turn",
//       "Ahimsa Chowk Moolganj",
//       "TSI Shri Rajkumar Singh Tomar 9532883366",
//     ],
//   },
//   {
//     id: "Carset",
//     subJunctions: [
//       "Carset / Parade Chauraha",
//       "Sadbhavna",
//       "Yatimkhana",
//       "Nai Sadak",
//       "Kitab Market / IMA",
//     ],
//   },
//   {
//     id: "Parade Chauraha",
//     subJunctions: ["Naveen Market", "Myor Mill Tiraha"],
//   },
//   {
//     id: "Circuit House",
//     subJunctions: [
//       "Jaipuria Crossing",
//       "Methodist School",
//       "Naya Pul Unnao Border",
//       "Circuit House Pratah: 09.00 se 17.00 Baje Tak",
//     ],
//   },
//   {
//     id: "Ghantaghar Chauraha",
//     subJunctions: [
//       "Ghantaghar Chauraha Din",
//       "Railway Station Gate No. 02",
//       "Ghantaghar Chauraha Raatri",
//     ],
//   },
//   {
//     id: "Express Road",
//     subJunctions: [
//       "Express Road",
//       "Hoolaganj",
//       "Shanidev Mandir Express Road",
//       "Malgodam",
//       "Koparganj",
//     ],
//   },
// ];

// Function to rotate personnel
// function rotatePersonnel(weekNumber) {
// const numSubJunctions = junctions.reduce(
//   (acc, junction) => acc + junction.subJunctions.length,
//   0
// );

//   // Rotate TSI
//   tsis.forEach((tsi, index) => {
//     const tsiJunction = junctions[index % junctions.length];
//     console.log(`Week ${weekNumber}: TSI ${tsi.name} is at ${tsiJunction.id}`);
//   });

//   // Rotate constables and home guards across sub-junctions
//   let personnelIndex = 0;
//   junctions.forEach((junction) => {
//     junction.subJunctions.forEach((subJunction, subIndex) => {
//       // Calculate the index of the constable and home guard for this sub-junction
//       const constableIndex = (weekNumber + subIndex) % constables.length;
//       const homeGuardIndex = (weekNumber + subIndex) % homeGuards.length;

//       // Assign constables and home guards
//       const constable = constables[constableIndex];
//       const homeGuard = homeGuards[homeGuardIndex];
//       console.log(
//         `Week ${weekNumber}: Constable ${constable.name} is at ${subJunction}`
//       );
//       console.log(
//         `Week ${weekNumber}: Home Guard ${homeGuard.name} is at ${subJunction}`
//       );

//       personnelIndex++;
//     });
//   });
// }

export async function populateAssignmentsForOneWeek() {
  try {
    const _currentDate = new Date(2024, 6, 9);
    const endDate = addOneWeek(_currentDate).toISOString();
    const currentDate = _currentDate.toISOString();

    // Fetch previous assignments
    const { data: previousAssignments, error: fetchError } = await supabase
      .from("assignments")
      .select("*")
      .lte("end_date", currentDate);

    if (fetchError) {
      console.error("Error fetching previous assignments:", fetchError);
      throw fetchError;
    }

    // Create a lookup for previous assignments
    const previousAssignmentsLookup = {};
    previousAssignments.forEach((assignment) => {
      if (!previousAssignmentsLookup[assignment.personnel_id]) {
        previousAssignmentsLookup[assignment.personnel_id] = [];
      }
      if (assignment.junction_id) {
        previousAssignmentsLookup[assignment.personnel_id].push({
          type: "junction",
          id: assignment.junction_id,
        });
      }
      if (assignment.sub_junction_id) {
        previousAssignmentsLookup[assignment.personnel_id].push({
          type: "sub_junction",
          id: assignment.sub_junction_id,
        });
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

    // Assign TSIs to junctions (one TSI per junction)
    const newAssignments = [];
    junctions.forEach((junction, index) => {
      // Find a TSI who wasn't assigned to this junction last week
      let tsi = personnelByRole["TSI"][index];
      while (
        previousAssignmentsLookup[tsi.id]?.some(
          (a) => a.type === "junction" && a.id === junction.id
        )
      ) {
        index = (index + 1) % personnelByRole["TSI"].length; // Cycle through TSIs until a suitable one is found
        tsi = personnelByRole["TSI"][index];
      }
      newAssignments.push({
        personnel_id: tsi.id,
        junction_id: junction.id,
        sub_junction_id: null,
        shift: null,
        start_date: currentDate,
        end_date: endDate,
      });
    });

    // Assign non-TSI roles to sub-junctions
    const nonTSIPersonnel = personnel.filter((p) => p.role !== "TSI");
    let personnelIndex = 0;

    // First, ensure each sub-junction has at least one person
    subJunctions.forEach((subJunction) => {
      if (personnelIndex < nonTSIPersonnel.length) {
        let person = nonTSIPersonnel[personnelIndex];
        while (
          previousAssignmentsLookup[person.id]?.some(
            (a) => a.type === "sub_junction" && a.id === subJunction.id
          )
        ) {
          personnelIndex = (personnelIndex + 1) % nonTSIPersonnel.length; // Cycle through personnel until a suitable one is found
          person = nonTSIPersonnel[personnelIndex];
        }
        newAssignments.push({
          personnel_id: person.id,
          junction_id: null,
          sub_junction_id: subJunction.id,
          shift: "morning",
          start_date: currentDate,
          end_date: endDate,
        });
      }
    });

    // Function to get the least assigned sub-junction based on the newAssignments array
    const getLeastAssignedSubJunction = (newAssignments) => {
      return subJunctions.reduce(
        (leastAssigned, subJunction) => {
          const count = newAssignments.filter(
            (a) => a.sub_junction_id === subJunction.id
          ).length;
          return count < leastAssigned.count
            ? { id: subJunction.id, count }
            : leastAssigned;
        },
        { id: subJunctions[0].id, count: Infinity }
      ).id;
    };

    // Then, distribute remaining personnel
    while (personnelIndex < nonTSIPersonnel.length) {
      const subJunctionId = getLeastAssignedSubJunction(newAssignments);
      let person = nonTSIPersonnel[personnelIndex];
      while (
        previousAssignmentsLookup[person.id]?.some(
          (a) => a.type === "sub_junction" && a.id === subJunctionId
        )
      ) {
        personnelIndex = (personnelIndex + 1) % nonTSIPersonnel.length; // Cycle through personnel until a suitable one is found
        person = nonTSIPersonnel[personnelIndex];
      }
      const shift =
        newAssignments.filter((a) => a.sub_junction_id === subJunctionId)
          .length %
          2 ===
        0
          ? "morning"
          : "night";
      newAssignments.push({
        personnel_id: person.id,
        junction_id: null,
        sub_junction_id: subJunctionId,
        shift,
        start_date: currentDate,
        end_date: endDate,
      });
      personnelIndex++;
    }

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

let personnelIndexes = {};

async function getNextAssignment() {
  // Step 1: Fetch data from the database
  const { data: personnelData } = await supabase.from("personnel").select("*");
  const { data: junctionsData } = await supabase.from("junctions").select("*");
  const { data: subJunctionsData } = await supabase
    .from("sub_junctions")
    .select("*");
  const { data: assignmentsData } = await supabase
    .from("assignments")
    .select("*");

  // Step 2: Create separate lists for TSI and non-TSI personnel
  const tsiPersonnel = personnelData.filter((person) => person.role === "TSI");
  const nonTsiPersonnel = personnelData.filter(
    (person) => person.role !== "TSI"
  );

  junctionsData.forEach((junction) => {});

  // return {
  //   personnel_id: personnelId,
  //   junction_id: nextJunctionId,
  //   sub_junction_id: nextSubJunctionId,
  //   shift: "day", // Or any other value based on your requirements
  //   start_date: new Date(), // Or any other date based on your requirements
  //   end_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Or any other date based on your requirements
  // };
}

export async function addMoreWeeks() {
  const currentDate = new Date();
  const endDate = addOneWeek(currentDate);

  // Fetch previous assignments
  const { data: previousAssignments, error: fetchError } = await supabase
    .from("assignments")
    .select("*");

  // Fetch personnel, junctions, and sub-junctions
  const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
    await Promise.all([
      supabase.from("personnel").select("*"),
      supabase.from("junctions").select("*"),
      supabase.from("sub_junctions").select("*"),
    ]);

  const tsiPersonnel = personnel.filter((p) => p.role == "TSI");
  const nonTSIPersonnel = personnel.filter((p) => p.role !== "TSI");

  junctions.forEach((junction) => {
    console.log(junction.name);
  });

  if (fetchError) {
    console.error("Error fetching previous assignments:", fetchError);
    throw fetchError;
  }
}

function addOneWeek(date) {
  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}

// export async function populateAssignmentsForOneWeek() {
//   try {
//     const currentDate = new Date();
//     const endDate = addOneWeek(currentDate);

//     // Fetch ALL previous assignments
//     const { data: previousAssignments, error: fetchError } = await supabase
//       .from("assignments")
//       .select("*")
//       .lt("end_date", currentDate.toISOString())
//       .order("end_date", { ascending: false });

//     if (fetchError) {
//       console.error("Error fetching previous assignments:", fetchError);
//       throw fetchError;
//     }

//     // Create a lookup for previous assignments
//     const previousAssignmentsLookup = {};
//     previousAssignments.forEach((assignment) => {
//       if (!previousAssignmentsLookup[assignment.personnel_id]) {
//         previousAssignmentsLookup[assignment.personnel_id] = [];
//       }
//       if (assignment.junction_id) {
//         previousAssignmentsLookup[assignment.personnel_id].push({
//           type: "junction",
//           id: assignment.junction_id,
//           date: new Date(assignment.end_date),
//         });
//       }
//       if (assignment.sub_junction_id) {
//         previousAssignmentsLookup[assignment.personnel_id].push({
//           type: "sub_junction",
//           id: assignment.sub_junction_id,
//           date: new Date(assignment.end_date),
//         });
//       }
//     });

//     const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
//       await Promise.all([
//         supabase.from("personnel").select("*"),
//         supabase.from("junctions").select("*"),
//         supabase.from("sub_junctions").select("*"),
//       ]);

//     // Group personnel by role
//     const personnelByRole = personnel.reduce((acc, person) => {
//       if (!acc[person.role]) acc[person.role] = [];
//       acc[person.role].push(person);
//       return acc;
//     }, {});

//     const newAssignments = [];

//     // Assign TSIs to junctions
//     junctions.forEach((junction) => {
//       let tsi = getNextSuitablePerson(
//         previousAssignmentsLookup,
//         personnelByRole["TSI"],
//         junction.id,
//         "junction"
//       );
//       newAssignments.push({
//         personnel_id: tsi.id,
//         junction_id: junction.id,
//         sub_junction_id: null,
//         shift: "morning",
//         start_date: currentDate,
//         end_date: endDate,
//       });
//       updatePreviousAssignmentsLookup(
//         previousAssignmentsLookup,
//         tsi.id,
//         "junction",
//         junction.id,
//         endDate
//       );
//     });

//     // Assign non-TSI roles to sub-junctions
//     const nonTSIPersonnel = personnel.filter((p) => p.role !== "TSI");

//     // First, ensure each sub-junction has at least one person
//     subJunctions.forEach((subJunction) => {
//       let nonTsi = getNextSuitablePerson(
//         previousAssignmentsLookup,
//         nonTSIPersonnel,
//         subJunction.id,
//         "sub_junction"
//       );
//       newAssignments.push({
//         personnel_id: nonTsi.id,
//         junction_id: null,
//         sub_junction_id: subJunction.id,
//         shift: "morning",
//         start_date: currentDate,
//         end_date: endDate,
//       });
//       updatePreviousAssignmentsLookup(
//         previousAssignmentsLookup,
//         nonTsi.id,
//         "sub_junction",
//         subJunction.id,
//         endDate
//       );
//     });

//     // Then, distribute remaining personnel
//     while (
//       nonTSIPersonnel.some(
//         (person) =>
//           !newAssignments.some(
//             (assignment) => assignment.personnel_id === person.id
//           )
//       )
//     ) {
//       const subJunctionId = getLeastAssignedSubJunction(
//         subJunctions,
//         newAssignments
//       );
//       if (!subJunctionId) break; // All sub-junctions are full

//       let person = getNextSuitablePerson(
//         previousAssignmentsLookup,
//         nonTSIPersonnel.filter(
//           (p) => !newAssignments.some((a) => a.personnel_id === p.id)
//         ),
//         subJunctionId,
//         "sub_junction"
//       );

//       const shift =
//         newAssignments.filter((a) => a.sub_junction_id === subJunctionId)
//           .length %
//           2 ===
//         0
//           ? "morning"
//           : "night";
//       newAssignments.push({
//         personnel_id: person.id,
//         junction_id: null,
//         sub_junction_id: subJunctionId,
//         shift,
//         start_date: currentDate,
//         end_date: endDate,
//       });

//       updatePreviousAssignmentsLookup(
//         previousAssignmentsLookup,
//         person.id,
//         "sub_junction",
//         subJunctionId,
//         endDate
//       );
//     }

//     // Insert all new assignments at once
//     const { data, error } = await supabase
//       .from("assignments")
//       .insert(newAssignments);

//     if (error) {
//       console.error("Error inserting assignments:", error);
//     } else {
//       console.log("Assignments populated successfully for one week");
//     }

//     // Log assignment statistics
//     console.log(
//       "Junction assignment stats:",
//       junctions
//         .map(
//           (junction) =>
//             `Junction ${junction.id}: ${
//               newAssignments.filter((a) => a.junction_id === junction.id).length
//             } personnel`
//         )
//         .join(", ")
//     );
//     console.log(
//       "Sub-junction assignment stats:",
//       subJunctions
//         .map(
//           (subJunction) =>
//             `Sub-junction ${subJunction.id}: ${
//               newAssignments.filter((a) => a.sub_junction_id === subJunction.id)
//                 .length
//             } personnel`
//         )
//         .join(", ")
//     );
//   } catch (error) {
//     console.error("Error populating assignments:", error);
//   }
// }

// function getNextSuitablePerson(
//   previousAssignmentsLookup,
//   personnelList,
//   locationId,
//   locationType
// ) {
//   return personnelList.sort((a, b) => {
//     const aLastAssigned =
//       previousAssignmentsLookup[a.id]?.find(
//         (assignment) =>
//           assignment.type === locationType && assignment.id === locationId
//       )?.date || new Date(0);
//     const bLastAssigned =
//       previousAssignmentsLookup[b.id]?.find(
//         (assignment) =>
//           assignment.type === locationType && assignment.id === locationId
//       )?.date || new Date(0);
//     return aLastAssigned - bLastAssigned;
//   })[0];
// }

// function getLeastAssignedSubJunction(subJunctions, newAssignments) {
//   return subJunctions.reduce(
//     (leastAssigned, subJunction) => {
//       const count = newAssignments.filter(
//         (a) => a.sub_junction_id === subJunction.id
//       ).length;
//       if (count >= 4) return leastAssigned; // Skip if already has 4 assignments
//       return count < leastAssigned.count
//         ? { id: subJunction.id, count }
//         : leastAssigned;
//     },
//     { id: null, count: Infinity }
//   ).id;
// }

// function updatePreviousAssignmentsLookup(
//   lookup,
//   personId,
//   assignmentType,
//   locationId,
//   date
// ) {
//   if (!lookup[personId]) {
//     lookup[personId] = [];
//   }
//   lookup[personId].unshift({ type: assignmentType, id: locationId, date });
// }

// function addOneWeek(date) {
//   return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
// }
