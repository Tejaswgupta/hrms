// "use client"
// import React, { useState, useEffect } from 'react';

// type Junction = {
//   id: string;
//   subJunctions: string[];
// };

// type Personnel = {
//   id: string;
//   name: string;
//   phone?: string;
// };

// type ScheduleDetail = {
//   role: string;
//   name: string;
//   location: string;
//   shift: string; // Added shift property
// };

// const junctions: Junction[] = [
//   { id: 'Vishwakarma Dwar Raatri', subJunctions: ['Vishwakarma Dwar Raatri'] },
//   { id: 'Jajmau Chauraha', subJunctions: ['Bima Chauraha', 'J.K. Chauraha', 'Jajmau Vishwakarma Dwar'] },
//   { id: 'Harjender Nagar', subJunctions: ['Harjender Nagar', 'Purana Thana Chakeri', 'Ma. Vi. Sabha Adhyaksh Aawas Mod Lal Bangla', 'Airforce Station'] },
//   { id: 'Rama Devi Chauraha', subJunctions: ['HAL', 'Rama Devi Chauraha', 'Rama Devi Sabzi Mandi', 'E-Rickshaw Diversion (Rama Devi Ramp ke Peeche Lucknow Side)', 'E-Rickshaw Diversion (Fatehpur Side)', 'Jagdamba Petrol Pump', 'Shivkatra Mod'] },
//   { id: 'Ahirwa', subJunctions: ['Airport Cut', 'Ahirwa'] },
//   { id: 'Shyam Nagar Chauraha', subJunctions: ['Shyam Nagar Chauraha', 'Chhappan Bhog Chauraha', 'PAC Pul Chhappan Bhog Side', 'Dehli Sujanpur Cut (Hans Mandir)'] },
//   { id: 'Manoj International / PAC Mod', subJunctions: ['Manoj International', 'COD Pul Tatmil Side'] },
//   { id: 'Koyla Nagar', subJunctions: ['Koyla Nagar'] },
//   { id: 'Rama Devi Ramp (Nawabasta Side Under Pass)', subJunctions: ['Rama Devi Ramp (Guru Har Rai Side)', 'Rama Devi Ramp (Mangla Vihar Side)'] },
//   { id: 'Rocket Tiraha', subJunctions: ['Rocket Tiraha', '10 No. Canteen', 'Civil Aero Drum', 'Railway Station Gate No. 1 Side'] },
//   { id: 'Mure Company Pul Cantt Side', subJunctions: ['Mure Company Pul Cantt Side'] },
//   { id: 'Narauna Chauraha', subJunctions: ['Narauna Chauraha', 'Mure Company Pul Narauna Side'] },
//   { id: 'Panchakki Chauraha', subJunctions: ['Panchakki Chauraha', 'Jhadibaba Padav'] },
//   { id: 'Charles Chauraha', subJunctions: ['Phoolbagh Chauraha', 'Gilish Bazaar Cut', 'Charles Chauraha'] },
//   { id: 'Kila Tiraha, Meghdoot', subJunctions: ['Meghdoot Tiraha'] },
//   { id: 'Vyayamshala, Sarsaiya Ghat', subJunctions: ['Sarsaiya Ghat'] },
//   { id: 'Police Line Main Gate, Bada Chauraha', subJunctions: ['Bada Chauraha', 'Kotwali Chauraha', 'Landmark', 'Bhargav Hospital Chauraha', 'RO Plant Sabzi Mandi Tiraha One-Way', 'Bada Chauraha se Kotwali Road', 'Ursala Hospital U-turn / Thaggu ke Laddu Road'] },
//   { id: 'Chetna Chauraha', subJunctions: ['Chetna Chauraha One-Way', 'DM Karyalay Gate Samay Pratah: 09.00 se 17.00 Baje Tak', 'Kachhari Gate Tiraha'] },
//   { id: 'DJ Gate', subJunctions: ['DJ Gate Samay Pratah: 09.00 se 17.00 Baje Tak'] },
//   { id: 'Mahila Thana', subJunctions: ['Mahila Thana Pratah: 09.00 se 17.00 Baje Tak', 'Gora Kabristan ke Peeche', 'Mahila Thana se Gora Kabristan Peeche Gast Pratah: 09.00 se 17.00 Baje Tak', 'Mahila Thana se Lathakothi Gast Main Road Side'] },
//   { id: 'Lathakothi', subJunctions: ['Lathakothi Pratah: 09.00 se 17.00 Baje Tak', 'DAV Tiraha Pratah: 09.00 se 17.00 Baje Tak'] },
//   { id: 'Tikonia Park, Green Park', subJunctions: ['VIP Road', 'Green Park Chauraha', 'MG College', 'MG College, Police Office', 'Police Office', 'Police Office Gate One-Way Pratah: 09.00 se 17.00 Baje Tak', 'Police Office Parking Pratah: 09.00 se 17.00 Baje Tak'] },
//   { id: 'Moolganj', subJunctions: ['Moolganj Chauraha U-turn', 'Kuli Bazaar U-turn Moolganj', 'Sharman Enterprises ke Samne Cut', 'Shyam Bihari Mishra Chowk U-turn', 'Ahimsa Chowk Moolganj', 'TSI Shri Rajkumar Singh Tomar 9532883366'] },
//   { id: 'Carset', subJunctions: ['Carset / Parade Chauraha', 'Sadbhavna', 'Yatimkhana', 'Nai Sadak', 'Kitab Market / IMA'] },
//   { id: 'Parade Chauraha', subJunctions: ['Naveen Market', 'Myor Mill Tiraha'] },
//   { id: 'Circuit House', subJunctions: ['Jaipuria Crossing', 'Methodist School', 'Naya Pul Unnao Border', 'Circuit House Pratah: 09.00 se 17.00 Baje Tak'] },
//   { id: 'Ghantaghar Chauraha', subJunctions: ['Ghantaghar Chauraha Din', 'Railway Station Gate No. 02', 'Ghantaghar Chauraha Raatri'] },
//   { id: 'Express Road', subJunctions: ['Express Road', 'Hoolaganj', 'Shanidev Mandir Express Road', 'Malgodam', 'Koparganj'] }
// ];

// const tsis: Personnel[] = [
//   { id: 'TSI1', name: 'TSI श्री सतेन्द्र पाल सिंह 9305104313', phone: '9305104313' },
//   { id: 'TSI2', name: 'TSI श्री भागवत यादव 7565034178', phone: '7565034178' },
//   { id: 'TSI3', name: 'TSI द्वारिका प्रसाद  6261006874', phone: '6261006874' },
//   { id: 'TSI4', name: 'TSI श्री अखिलेेश कुमार दीक्षित 9450589769', phone: '9450589769' },
//   { id: 'TSI5', name: 'TSI श्री सुरेन्द्र नाथ त्रिपाठी 7307902048', phone: '7307902048' },
//   { id: 'TSI6', name: 'SI श्री सत्यप्रकाश सिंह 9450326545', phone: '9450326545' },
//   { id: 'TSI7', name: 'TSI श्री रणविजय सिंह 6394218570', phone: '6394218570' },
//   { id: 'TSI8',name:'SI श्री सत्यप्रकाश सिंह 9450326545',},
//   { id: 'TSI8', name: 'TSI Shree Brijesh Kumar Dwitiya', phone: '8273231434' },
//   { id: 'TSI9', name: 'TSI Shree Rajkumar Singh Tomar', phone: '9532883366' },
//   { id: 'TSI10', name: 'TSI Shree Ranu Singh', phone: '6394561273' },
//   { id: 'TSI11', name: 'TSI Shree Pradeep Sharma', phone: '9910820092' }
// ];

// const constables: Personnel[] = [
//   { id: 'C1', name: 'C 695 Pradeep Kumar', phone: '9129688785' },
//   { id: 'C2', name: 'HC 1128 Sushil Kumar Saroj', phone: '9670740597' },
//   { id: 'C3', name: 'HC 1058 Surya Bhan Singh', phone: '9450263947' },
//   { id: 'C4', name: 'C 2512 Amit Kumar', phone: '9369991847' },
//   { id: 'C5', name: 'C 1254 Vikash Kumar', phone: '9026354891' },
//   { id: 'C6', name: 'C 1758 Ram Kumar', phone: '9123456789' },
//   { id: 'C7', name: 'C 9843 Suraj Singh', phone: '9988776655' },
//   { id: 'C8', name: 'C 5678 Rakesh Gupta', phone: '8765432190' },
//   { id: 'C9', name: 'C 1234 Sanjay Verma', phone: '9898989898' },
//   { id: 'C10', name: 'C 4321 Manoj Tiwari', phone: '7676767676' }
// ];

// const homeGuards: Personnel[] = [
//   { id: 'HG1', name: 'HG 123 Bharat Singh', phone: '9876543210' },
//   { id: 'HG2', name: 'HG 234 Shyam Lal', phone: '9123456780' },
//   { id: 'HG3', name: 'HG 345 Ram Singh', phone: '9988776650' },
//   { id: 'HG4', name: 'HG 456 Ramesh Kumar', phone: '9876543211' },
//   { id: 'HG5', name: 'HG 567 Mohan Lal', phone: '9876543212' },
//   { id: 'HG6', name: 'HG 678 Suresh Kumar', phone: '9876543213' },
//   { id: 'HG7', name: 'HG 789 Rakesh Singh', phone: '9876543214' },
//   { id: 'HG8', name: 'HG 890 Ajay Kumar', phone: '9876543215' },
//   { id: 'HG9', name: 'HG 901 Vijay Kumar', phone: '9876543216' },
//   { id: 'HG10', name: 'HG 012 Kamal Singh', phone: '9876543217' }
// ];

// const rotatePersonnel = (weekNumber: number) => {
//   const schedule: { week: number; details: ScheduleDetail[] } = {
//     week: weekNumber,
//     details: [],
//   };

//   const shifts = ['Morning', 'Evening'];
//   const shuffledTSIs = [...tsis].sort(() => Math.random() - 0.5);
//   const shuffledConstables = [...constables].sort(() => Math.random() - 0.5);
//   const shuffledHomeGuards = [...homeGuards].sort(() => Math.random() - 0.5);

//   shuffledTSIs.forEach((tsi, index) => {
//     const tsiJunction = junctions[index % junctions.length];
//     schedule.details.push({ role: 'TSI', name: tsi.name, location: tsiJunction.id, shift: '' }); // TSI does not get a shift
//   });

//   let personnelIndex = 0;

//   junctions.forEach((junction) => {
//     junction.subJunctions.forEach((subJunction) => {
//       if (personnelIndex < shuffledConstables.length) {
//         const constable = shuffledConstables[personnelIndex];
//         const shift = shifts[personnelIndex % shifts.length];
//         schedule.details.push({ role: 'Constable', name: constable.name, location: subJunction, shift });
//       }

//       if (personnelIndex < shuffledHomeGuards.length) {
//         const homeGuard = shuffledHomeGuards[personnelIndex];
//         const shift = shifts[personnelIndex % shifts.length];
//         schedule.details.push({ role: 'Home Guard', name: homeGuard.name, location: subJunction, shift });
//       }

//       personnelIndex++;
//     });
//   });

//   return schedule;
// };

// const ScheduleForRotation: React.FC = () => {
//   const [schedule, setSchedule] = useState<{ week: number; details: ScheduleDetail[] }[]>([]);
//   const [currentWeek, setCurrentWeek] = useState<number>(1);
//   const [filterPosition, setFilterPosition] = useState<string | null>('All');
//   const [filterName, setFilterName] = useState<string | null>('');
//   const [editedSchedule, setEditedSchedule] = useState<ScheduleDetail[]>([]);

//   useEffect(() => {
//     const newSchedule = [];
//     for (let week = 1; week <= 4; week++) {
//       newSchedule.push(rotatePersonnel(week));
//     }
//     setSchedule(newSchedule);
//   }, []);

//   const handleNextWeek = () => {
//     if (currentWeek < schedule.length) {
//       setCurrentWeek(currentWeek + 1);
//     }
//   };

//   const handlePreviousWeek = () => {
//     if (currentWeek > 1) {
//       setCurrentWeek(currentWeek - 1);
//     }
//   };

//   const handleEditChange = (index: number, field: string, value: string) => {
//     const updatedSchedule = [...editedSchedule];
//     updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
//     setEditedSchedule(updatedSchedule);
//   };

//   const saveChanges = () => {
//     const updatedSchedule = [...schedule];
//     const weekIndex = updatedSchedule.findIndex(week => week.week === currentWeek);
//     updatedSchedule[weekIndex].details = editedSchedule;
//     setSchedule(updatedSchedule);
//   };

//   useEffect(() => {
//     if (currentWeek) {
//       const weekSchedule = schedule.find(week => week.week === currentWeek);
//       if (weekSchedule) {
//         setEditedSchedule(weekSchedule.details);
//       }
//     }
//   }, [currentWeek, schedule]);

//   const filteredSchedule = editedSchedule.filter(detail => {
//     const matchesPosition = !filterPosition || filterPosition === 'All' || detail.role === filterPosition;
//     const matchesName = !filterName || detail.name.toLowerCase().includes(filterName.toLowerCase());
//     return matchesPosition && matchesName;
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded mb-2 md:mb-0"
//           onClick={handlePreviousWeek}
//           disabled={currentWeek === 1}
//         >
//           Previous Week
//         </button>
//         <h3 className="text-xl font-bold mb-2 md:mb-0">Week {currentWeek}</h3>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleNextWeek}
//           disabled={currentWeek === schedule.length}
//         >
//           Next Week
//         </button>
//       </div>
//       <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
//         <label htmlFor="filterPosition" className="font-semibold mb-2 md:mb-0">
//           Filter by Position:
//         </label>
//         <select
//           id="filterPosition"
//           className="px-3 py-1 border border-gray-300 rounded"
//           value={filterPosition || 'All'}
//           onChange={e => setFilterPosition(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="TSI">TSI</option>
//           <option value="Constable">Constable</option>
//           <option value="Home Guard">Home Guard</option>
//         </select>
//         <label htmlFor="filterName" className="font-semibold mb-2 md:mb-0">
//           Filter by Name:
//         </label>
//         <input
//           type="text"
//           id="filterName"
//           className="px-3 py-1 border border-gray-300 rounded"
//           placeholder="Enter name"
//           value={filterName || ''}
//           onChange={e => setFilterName(e.target.value)}
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Location
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Shift
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredSchedule.map((detail, detailIndex) => (
//               <tr key={detailIndex}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   <input
//                     type="text"
//                     value={detail.role}
//                     onChange={(e) => handleEditChange(detailIndex, 'role', e.target.value)}
//                     className="w-full px-2 py-1 border rounded"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <input
//                     type="text"
//                     value={detail.name}
//                     onChange={(e) => handleEditChange(detailIndex, 'name', e.target.value)}
//                     className="w-full px-2 py-1 border rounded"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <input
//                     type="text"
//                     value={detail.location}
//                     onChange={(e) => handleEditChange(detailIndex, 'location', e.target.value)}
//                     className="w-full px-2 py-1 border rounded"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <input
//                     type="text"
//                     value={detail.shift}
//                     onChange={(e) => handleEditChange(detailIndex, 'shift', e.target.value)}
//                     className="w-full px-2 py-1 border rounded"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <button
//                     className="px-4 py-2 bg-green-500 text-white rounded"
//                     onClick={saveChanges}
//                   >
//                     Save
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ScheduleForRotation;
"use client"
import React, { useState, useEffect } from 'react';

interface Personnel {
  id: string;
  name: string;
  phone: string;
}

interface ScheduleDetail {
  role: string;
  name: string;
  location: string;
  shift: string;
}
interface ConstableData {
  'क्रम सं0': string;
  'नाम अधि0/कर्म0': string;
  '__2': string; // Adjust this according to the actual key for phone number
}

interface Constable {
  __1: string; // Assuming '__1' is the key for name
  __2: string; // Assuming '__2' is the key for phone number
}

const fetchConstables = async () => {
  try {
    const response = await fetch('/constable.json');
    const data: Constable[] = await response.json(); // Annotate data with Constable[]
    
    const mappedData = data.map((item: Constable, index: number) => ({
      id: `C${index + 1}`,
      name: item.__1,
      phone: item.__2
    }));

    return mappedData.filter(item => item.name.trim() !== '');
  } catch (error) {
    console.error('Error fetching constables:', error);
    return [];
  }
};


const fetchConstables2 = async () => {
  try {
    const response = await fetch('/constable2.json');
    const data: ConstableData[] = await response.json(); // Annotate data with ConstableData[]
    console.log("const", data);
    const mappedData = data.map((item: ConstableData) => ({
      id: `C2${item['क्रम सं0']}`,
      name: item['नाम अधि0/कर्म0'],
      phone: item['__2'] // Adjust this according to the actual key for phone number
    }));
    return mappedData.filter(item => item.name.trim() !== '');
  } catch (error) {
    console.error('Error fetching constables2:', error);
    return [];
  }
};

interface TSI {
  '': string;   // Assuming '' is the key for name
  '__2': string;  // Assuming '__2' is the key for phone number
}

const fetchTSIs = async () => {
  try {
    const response = await fetch('/tsi.json');
    const data: TSI[] = await response.json(); // Annotate data with TSI[]
    console.log(data);

    const mappedData = data.map((item: TSI, index: number) => ({
      id: `TSI${index + 1}`,
      name: item[''],
      phone: item['__2']
    }));

    console.log("tsi", mappedData);
    
    return mappedData.filter(item => item.name.trim() !== '');
  } catch (error) {
    console.error('Error fetching TSIs:', error);
    return [];
  }
};

const junctions = [
  { id: 'Vishwakarma Dwar Raatri', subJunctions: ['Vishwakarma Dwar Raatri'] },
  { id: 'Jajmau Chauraha', subJunctions: ['Bima Chauraha', 'J.K. Chauraha', 'Jajmau Vishwakarma Dwar'] },
  { id: 'Harjender Nagar', subJunctions: ['Harjender Nagar', 'Purana Thana Chakeri', 'Ma. Vi. Sabha Adhyaksh Aawas Mod Lal Bangla', 'Airforce Station'] },
  { id: 'Rama Devi Chauraha', subJunctions: ['HAL', 'Rama Devi Chauraha', 'Rama Devi Sabzi Mandi', 'E-Rickshaw Diversion (Rama Devi Ramp ke Peeche Lucknow Side)', 'E-Rickshaw Diversion (Fatehpur Side)', 'Jagdamba Petrol Pump', 'Shivkatra Mod'] },
  { id: 'Ahirwa', subJunctions: ['Airport Cut', 'Ahirwa'] },
  { id: 'Shyam Nagar Chauraha', subJunctions: ['Shyam Nagar Chauraha', 'Chhappan Bhog Chauraha', 'PAC Pul Chhappan Bhog Side', 'Dehli Sujanpur Cut (Hans Mandir)'] },
  { id: 'Manoj International / PAC Mod', subJunctions: ['Manoj International', 'COD Pul Tatmil Side'] },
  { id: 'Koyla Nagar', subJunctions: ['Koyla Nagar'] },
  { id: 'Rama Devi Ramp (Nawabasta Side Under Pass)', subJunctions: ['Rama Devi Ramp (Guru Har Rai Side)', 'Rama Devi Ramp (Mangla Vihar Side)'] },
  { id: 'Rocket Tiraha', subJunctions: ['Rocket Tiraha', '10 No. Canteen', 'Civil Aero Drum', 'Railway Station Gate No. 1 Side'] },
  { id: 'Mure Company Pul Cantt Side', subJunctions: ['Mure Company Pul Cantt Side'] },
  { id: 'Narauna Chauraha', subJunctions: ['Narauna Chauraha', 'Mure Company Pul Narauna Side'] },
  { id: 'Panchakki Chauraha', subJunctions: ['Panchakki Chauraha', 'Jhadibaba Padav'] },
  { id: 'Charles Chauraha', subJunctions: ['Phoolbagh Chauraha', 'Gilish Bazaar Cut', 'Charles Chauraha'] },
  { id: 'Kila Tiraha, Meghdoot', subJunctions: ['Meghdoot Tiraha'] },
  { id: 'Vyayamshala, Sarsaiya Ghat', subJunctions: ['Sarsaiya Ghat'] },
  { id: 'Police Line Main Gate, Bada Chauraha', subJunctions: ['Bada Chauraha', 'Kotwali Chauraha', 'Landmark', 'Bhargav Hospital Chauraha', 'RO Plant Sabzi Mandi Tiraha One-Way', 'Bada Chauraha se Kotwali Road', 'Ursala Hospital U-turn / Thaggu ke Laddu Road'] },
  { id: 'Chetna Chauraha', subJunctions: ['Chetna Chauraha One-Way', 'DM Karyalay Gate Samay Pratah: 09.00 se 17.00 Baje Tak', 'Kachhari Gate Tiraha'] },
  { id: 'DJ Gate', subJunctions: ['DJ Gate Samay Pratah: 09.00 se 17.00 Baje Tak'] },
  { id: 'Mahila Thana', subJunctions: ['Mahila Thana Pratah: 09.00 se 17.00 Baje Tak', 'Gora Kabristan ke Peeche', 'Mahila Thana se Gora Kabristan Peeche Gast Pratah: 09.00 se 17.00 Baje Tak', 'Mahila Thana se Lathakothi Gast Main Road Side'] },
  { id: 'Lathakothi', subJunctions: ['Lathakothi Pratah: 09.00 se 17.00 Baje Tak', 'DAV Tiraha Pratah: 09.00 se 17.00 Baje Tak'] },
  { id: 'Tikonia Park, Green Park', subJunctions: ['VIP Road', 'Green Park Chauraha', 'MG College', 'MG College, Police Office', 'Police Office', 'Police Office Gate One-Way Pratah: 09.00 se 17.00 Baje Tak', 'Police Office Parking Pratah: 09.00 se 17.00 Baje Tak'] },
  { id: 'Moolganj', subJunctions: ['Moolganj Chauraha U-turn', 'Kuli Bazaar U-turn Moolganj', 'Sharman Enterprises ke Samne Cut', 'Shyam Bihari Mishra Chowk U-turn', 'Ahimsa Chowk Moolganj', 'TSI Shri Rajkumar Singh Tomar 9532883366'] },
  { id: 'Carset', subJunctions: ['Carset / Parade Chauraha', 'Sadbhavna', 'Yatimkhana', 'Nai Sadak', 'Kitab Market / IMA'] },
  { id: 'Parade Chauraha', subJunctions: ['Naveen Market', 'Myor Mill Tiraha'] },
  { id: 'Circuit House', subJunctions: ['Jaipuria Crossing', 'Methodist School', 'Naya Pul Unnao Border', 'Circuit House Pratah: 09.00 se 17.00 Baje Tak'] },
  { id: 'Ghantaghar Chauraha', subJunctions: ['Ghantaghar Chauraha Din', 'Railway Station Gate No. 02', 'Ghantaghar Chauraha Raatri'] },
  { id: 'Express Road', subJunctions: ['Express Road', 'Hoolaganj', 'Shanidev Mandir Express Road', 'Malgodam', 'Koparganj'] }
];

const rotatePersonnel = (weekNumber: number, tsis: Personnel[], constables: Personnel[], homeGuards: Personnel[]) => {
  const schedule: { week: number; details: ScheduleDetail[] } = {
    week: weekNumber,
    details: [],
  };

  const shifts = ['Morning', 'Evening'];
  const shuffledTSIs = [...tsis].sort(() => Math.random() - 0.5);
  const shuffledConstables = [...constables].sort(() => Math.random() - 0.5);
  const shuffledHomeGuards = [...homeGuards].sort(() => Math.random() - 0.5);

  shuffledTSIs.forEach((tsi, index) => {
    const tsiJunction = junctions[index % junctions.length];
    schedule.details.push({ role: 'TSI', name: tsi.name, location: tsiJunction.id, shift: '' });
  });

  let personnelIndex = 0;

  junctions.forEach((junction) => {
    junction.subJunctions.forEach((subJunction, subIndex) => {
      if (personnelIndex < shuffledConstables.length) {
        const constable = shuffledConstables[personnelIndex];
        const shift = shifts[personnelIndex % shifts.length];
        schedule.details.push({ role: 'Constable', name: constable.name, location: subJunction, shift });
      }

      if (personnelIndex < shuffledHomeGuards.length) {
        const homeGuard = shuffledHomeGuards[personnelIndex];
        const shift = shifts[personnelIndex % shifts.length];
        schedule.details.push({ role: 'Home Guard', name: homeGuard.name, location: subJunction, shift });
      }

      personnelIndex++;
    });
  });

  return schedule;
};

const ScheduleForRotation: React.FC = () => {
  const [schedule, setSchedule] = useState<{ week: number; details: ScheduleDetail[] }[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [editedDetails, setEditedDetails] = useState<{ [key: string]: ScheduleDetail }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [constables1, constables2, tsis] = await Promise.all([fetchConstables(), fetchConstables2(), fetchTSIs()]);

        console.log('Constables:', [...constables1, ...constables2]);
        console.log('TSIs:', tsis);
          const constables = [...constables1, ...constables2];

        const homeGuards = [
          { id: 'HG1', name: 'HG 123 Bharat Singh', phone: '9876543210' },
          { id: 'HG2', name: 'HG 234 Shyam Lal', phone: '9123456780' },
          { id: 'HG3', name: 'HG 345 Ram Singh', phone: '9988776650' },
          { id: 'HG4', name: 'HG 456 Ramesh Kumar', phone: '9876543211' },
          { id: 'HG5', name: 'HG 567 Mohan Lal', phone: '9876543212' },
          { id: 'HG6', name: 'HG 678 Suresh Kumar', phone: '9876543213' },
          { id: 'HG7', name: 'HG 789 Rakesh Singh', phone: '9876543214' },
          { id: 'HG8', name: 'HG 890 Ajay Kumar', phone: '9876543215' },
          { id: 'HG9', name: 'HG 901 Vijay Kumar', phone: '9876543216' },
          { id: 'HG10', name: 'HG 012 Kamal Singh', phone: '9876543217' }
        ];

        const newSchedule = [];
        for (let week = 1; week <= 4; week++) {
          newSchedule.push(rotatePersonnel(week, tsis, constables, homeGuards));
        }
        setSchedule(newSchedule);

        // Save initial fetched schedule to localStorage
        localStorage.setItem('schedule', JSON.stringify(newSchedule));
      } catch (error) {
        console.error('Error fetching or parsing JSON file:', error);
      }
    };

    // Load saved schedule from localStorage if it exists
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    } else {
      fetchData();
    }

    // Load saved edited details from localStorage if it exists
    const savedEditedDetails = localStorage.getItem('editedDetails');
    if (savedEditedDetails) {
      setEditedDetails(JSON.parse(savedEditedDetails));
    }
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

  const handleEdit = (week: number, detailIndex: number, field: keyof ScheduleDetail, value: string) => {
    setEditedDetails(prev => ({
      ...prev,
      [`${week}-${detailIndex}`]: {
        ...prev[`${week}-${detailIndex}`],
        [field]: value,
      }
    }));

    // Save edited details to localStorage
    localStorage.setItem('editedDetails', JSON.stringify({
      ...editedDetails,
      [`${week}-${detailIndex}`]: {
        ...editedDetails[`${week}-${detailIndex}`],
        [field]: value,
      }
    }));
  };

  const saveChanges = () => {
    const newSchedule = schedule.map(weekSchedule => ({
      ...weekSchedule,
      details: weekSchedule.details.map((detail, detailIndex) => ({
        ...detail,
        ...editedDetails[`${weekSchedule.week}-${detailIndex}`],
      }))
    }));
    setSchedule(newSchedule);
    setEditedDetails({});
    localStorage.setItem('schedule', JSON.stringify(newSchedule));
    localStorage.removeItem('editedDetails');
  };

  const filteredSchedule = schedule.map(weekSchedule => ({
    ...weekSchedule,
    details: weekSchedule.details.filter(detail => {
      const matchesPosition = !filterPosition || filterPosition === 'All' || detail.role === filterPosition;
      const matchesName = !filterName || detail.name.toLowerCase().includes(filterName.toLowerCase());
      return matchesPosition && matchesName;
    })
  }));

  const currentWeekSchedule = filteredSchedule.find(weekSchedule => weekSchedule.week === currentWeek);

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
          value={filterPosition ?? 'All'}
          onChange={(e) => setFilterPosition(e.target.value === 'All' ? null : e.target.value)}
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
          value={filterName ?? ''}
          onChange={(e) => setFilterName(e.target.value === '' ? null : e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      {currentWeekSchedule && currentWeekSchedule.details.length > 0 ? (
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
              {currentWeekSchedule.details.map((detail, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{detail.role}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={editedDetails[`${currentWeek}-${index}`]?.name ?? detail.name}
                      onChange={(e) => handleEdit(currentWeek, index, 'name', e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={editedDetails[`${currentWeek}-${index}`]?.location ?? detail.location}
                      onChange={(e) => handleEdit(currentWeek, index, 'location', e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={editedDetails[`${currentWeek}-${index}`]?.shift ?? detail.shift}
                      onChange={(e) => handleEdit(currentWeek, index, 'shift', e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={saveChanges}
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
