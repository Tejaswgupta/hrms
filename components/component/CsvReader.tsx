// // CsvReader.tsx
// "use client"
// import React, { useEffect, useState } from 'react';
// import ScheduleForRotation from './ScheduleForRotation';

// const CsvReader = () => {
//   const [tsiData, setTsiData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/tsi.json'); // Fetch the JSON file from the public folder
//         if (!response.ok) {
//           throw new Error('Failed to fetch JSON file');
//         }
//         const data = await response.json(); // Parse the JSON file
//         parseJson(data); // Extract relevant data
//       } catch (error) {
//         console.error('Error fetching or parsing JSON file:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const parseJson = (jsonData) => {
//     const results = jsonData.map((item, index) => {
//       return {
//         id: `TSI${index + 1}`,
//         name: item[''],
//         pno: item['__1'],
//         phone: item['__2']
//       };
//     });

//     const invalidValues = ['नाम अधिकारी', 'पीएनओ', 'मो0नं0', '']; // List of invalid placeholder values

//     const filteredResults = results.filter(tsi => 
//       tsi.name && 
//       tsi.pno && 
//       tsi.phone && 
//       !invalidValues.includes(tsi.name) && 
//       !invalidValues.includes(tsi.pno) && 
//       !invalidValues.includes(tsi.phone)
//     ); // Filter out invalid entries

//     setTsiData(filteredResults); // Update state with filtered data
//     console.log(filteredResults);
//   };

//   return (
//     <div>
//       <h2>TSI Data from JSON</h2>
//       <ul>
//         {tsiData.map((tsi, index) => (
//           <li key={index}>
//             ID: {tsi.id}, Name: {tsi.name}, PNO: {tsi.pno}, Phone: {tsi.phone}
//           </li>
//         ))}
//       </ul>
//       <ScheduleForRotation tsiData={tsiData} /> {/* Pass tsiData to ScheduleForRotation */}
//     </div>
//   );
// };

// export default CsvReader;
