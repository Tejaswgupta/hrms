import shuffle from 'lodash.shuffle'; // Importing shuffle function from lodash library

type RotationAssignment = {
  dayOfWeekId: number;
  shiftId: number;
  placeId: number;
  personId: number;
};

// Assume you have arrays of employees, shifts, and places
const employees = ["John Doe", "Jane Smith", "Bob Johnson", ];
const shifts = ["Morning", "Afternoon"];
const places = ["HQ", "Warehouse", "Retail Store"];

// Function to generate rotation schedule
export function generateRotationSchedule(): RotationAssignment[] {
  const schedule: RotationAssignment[] = [];
  let personIndex = 0;

  // Shuffle employees array to introduce randomness
  const shuffledEmployees = shuffle(employees);

  // Loop through each day of week (assuming 7 days for example)
  for (let dayOfWeekId = 1; dayOfWeekId <= 6; dayOfWeekId++) {
    // Loop through each shift and place combination
    for (let shiftId = 1; shiftId <= shifts.length; shiftId++) {
      for (let placeId = 1; placeId <= places.length; placeId++) {
        // Rotate through shuffled employees
        const personId = personIndex % shuffledEmployees.length;
        schedule.push({
          dayOfWeekId,
          shiftId,
          placeId,
          personId
        });
        personIndex++;
      }
    }
  }

  return schedule;
}

// Helper functions to get names based on IDs
export function getDayOfWeekName(dayOfWeekId: number): string {
  // Replace with actual day names if necessary
  return `Day ${dayOfWeekId}`;
}

export function getShiftName(shiftId: number): string {
  return shifts[shiftId - 1] || "";
}

export function getPlaceName(placeId: number): string {
  return places[placeId - 1] || "";
}

export function getPersonName(personId: number): string {
  // Use shuffled employees array to get names
  const shuffledEmployees = shuffle(employees);
  return shuffledEmployees[personId] || "";
}
