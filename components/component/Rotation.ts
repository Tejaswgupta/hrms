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
    const currentDate = new Date();
    const endDate = addOneWeek(currentDate);

    const [{ data: personnel }, { data: junctions }, { data: subJunctions }] =
      await Promise.all([
        supabase.from("personnel").select("*"),
        supabase.from("junctions").select("*"),
        supabase.from("sub_junctions").select("*"),
      ]);

    const newAssignments = [];
    const junctionAssignments = new Map(junctions.map((j) => [j.id, null]));
    const subJunctionAssignments = new Map(
      subJunctions.map((sj) => [sj.id, []])
    );

    // Group personnel by role
    const personnelByRole = personnel.reduce((acc, person) => {
      if (!acc[person.role]) acc[person.role] = [];
      acc[person.role].push(person);
      return acc;
    }, {});

    // Assign TSIs to junctions (one TSI per junction)
    junctions.forEach((junction, index) => {
      if (index < personnelByRole["TSI"].length) {
        const tsi = personnelByRole["TSI"][index];
        newAssignments.push({
          personnel_id: tsi.id,
          junction_id: junction.id,
          sub_junction_id: null,
          shift: "morning",
          start_date: currentDate,
          end_date: endDate,
        });
        junctionAssignments.set(junction.id, tsi.id);
      }
    });

    // Function to get the least assigned sub-junction
    const getLeastAssignedSubJunction = () => {
      return [...subJunctionAssignments.entries()]
        .filter(([_, assignments]) => assignments.length < 4)
        .reduce((a, b) => (a[1].length <= b[1].length ? a : b))[0];
    };

    // Assign non-TSI roles to sub-junctions
    const nonTSIPersonnel = personnel.filter((p) => p.role !== "TSI");
    let personnelIndex = 0;

    // First, ensure each sub-junction has at least one person
    subJunctions.forEach((subJunction) => {
      if (personnelIndex < nonTSIPersonnel.length) {
        const person = nonTSIPersonnel[personnelIndex++];
        newAssignments.push({
          personnel_id: person.id,
          junction_id: null,
          sub_junction_id: subJunction.id,
          shift: "morning",
          start_date: currentDate,
          end_date: endDate,
        });
        subJunctionAssignments.get(subJunction.id).push(person.id);
      }
    });

    // Then, distribute remaining personnel
    while (personnelIndex < nonTSIPersonnel.length) {
      const subJunctionId = getLeastAssignedSubJunction();
      const person = nonTSIPersonnel[personnelIndex++];
      const shift =
        subJunctionAssignments.get(subJunctionId).length % 2 === 0
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
      subJunctionAssignments.get(subJunctionId).push(person.id);
    }

    // Check for unattended junctions/subjunctions
    // Check for unattended junctions/subjunctions
    junctionAssignments.forEach((tsiId, junctionId) => {
      if (tsiId === null) {
        console.warn(`Junction ${junctionId} has no TSI assigned!`);
      }
    });

    subJunctionAssignments.forEach((assignments, subJunctionId) => {
      if (assignments.length === 0) {
        console.warn(
          `Sub-junction ${subJunctionId} has no personnel assigned!`
        );
      } else if (assignments.length > 4) {
        console.warn(
          `Sub-junction ${subJunctionId} has more than 4 personnel assigned!`
        );
      }
    });

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
      [...junctionAssignments.entries()]
        .map(
          ([id, tsiId]) =>
            `Junction ${id}: ${tsiId ? "TSI assigned" : "No TSI"}`
        )
        .join(", ")
    );
    console.log(
      "Sub-junction assignment stats:",
      [...subJunctionAssignments.entries()]
        .map(
          ([id, assignments]) =>
            `Sub-junction ${id}: ${assignments.length} personnel`
        )
        .join(", ")
    );
  } catch (error) {
    console.error("Error populating assignments:", error);
  }
}

function addOneWeek(date) {
  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}
