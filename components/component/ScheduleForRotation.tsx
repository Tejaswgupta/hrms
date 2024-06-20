// components/ScheduleForRotation.tsx
"use client"
import React, { useState, useEffect } from 'react';

type Junction = {
  id: string;
  subJunctions: string[];
};

type Personnel = {
  id: string;
  name: string;
  phone?: string;
};

type Rotation = {
  week: number;
  role: 'TSI' | 'Constable' | 'Home Guard';
  name: string;
  location: string;
};


const junctions: Junction[] = [
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

const tsis: Personnel[] = [
  { id: 'TSI1', name: 'TSI Shree Satendra Pal Singh', phone: '9305104313' },
  { id: 'TSI2', name: 'TSI Shree Bhagwat Yadav', phone: '7565034178' },
  { id: 'TSI3', name: 'TSI Dwarika Prasad', phone: '6261006874' },
  { id: 'TSI4', name: 'TSI Shree Akhilesh Kumar Dixit', phone: '9450589769' },
  { id: 'TSI5', name: 'TSI Shree Surendra Nath Tripathi', phone: '7307902048' },
  { id: 'TSI6', name: 'SI Shree Satyaprakash Singh', phone: '9450326545' },
  { id: 'TSI7', name: 'TSI Shree Ranvijay Singh', phone: '6394218570' },
  { id: 'TSI8', name: 'TSI Shree Brijesh Kumar Dwitiya', phone: '8273231434' },
  { id: 'TSI9', name: 'TSI Shree Rajkumar Singh Tomar', phone: '9532883366' },
  { id: 'TSI10', name: 'TSI Shree Ranu Singh', phone: '6394561273' },
  { id: 'TSI11', name: 'TSI Shree Pradeep Sharma', phone: '9910820092' }
];

const constables: Personnel[] = [
  { id: 'C1', name: 'C 695 Pradeep Kumar', phone: '9129688785' },
  { id: 'C2', name: 'HC 1128 Sushil Kumar Saroj', phone: '9670740597' },
  { id: 'C3', name: 'HC 1058 Surya Bhan Singh', phone: '9450263947' },
  { id: 'C4', name: 'C 2512 Amit Kumar', phone: '9369991847' },
  { id: 'C5', name: 'C 103 AP Sher Singh', phone: '8899250944' },
  { id: 'C6', name: 'C 13 AP Ramesh Kumar', phone: '8935095795' },
  { id: 'C7', name: 'C 1357 Baljeet Singh', phone: '8957993527' },
  { id: 'C8', name: 'HC 204 Jagdish Prasad', phone: '8004259534' },
  { id: 'C9', name: 'C 63 AP Sunil Kumar Yadav', phone: '9044931590' },
  { id: 'C10', name: 'C 1198 AP Raja Ram', phone: '9634637740' }
];

const homeGuards: Personnel[] = [
  { id: 'HG1', name: 'HG Surendra Kumar', phone: '8899817486' },
  { id: 'HG2', name: 'HG Dharmendra', phone: '8299697550' },
  { id: 'HG3', name: 'HG Ravi Kumar', phone: '9519291995' },
  { id: 'HG4', name: 'HG Vikas Kumar', phone: '7007153003' },
  { id: 'HG5', name: 'HG Shiv Narayan', phone: '9140119651' },
  { id: 'HG6', name: 'HG Sushil Kumar', phone: '7524986954' },
  { id: 'HG7', name: 'HG Satendra Kumar', phone: '9140700837' },
  { id: 'HG8', name: 'HG Hari Mohan', phone: '8318420628' },
  { id: 'HG9', name: 'HG Dharmendra Pal', phone: '8874546886' },
  { id: 'HG10', name: 'HG Manish Kumar', phone: '9369709063' }
];

const ScheduleForRotation: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [rotation, setRotation] = useState<Rotation[]>([]);

  useEffect(() => {
    const newRotation: Rotation[] = [];

    junctions.forEach((junction, index) => {
      const tsi = tsis[index % tsis.length];
      const constable = constables[index % constables.length];
      const homeGuard = homeGuards[index % homeGuards.length];

      newRotation.push(
        { week: currentWeek, role: 'TSI', name: tsi.name, location: junction.id },
        { week: currentWeek, role: 'Constable', name: constable.name, location: junction.id },
        { week: currentWeek, role: 'Home Guard', name: homeGuard.name, location: junction.id }
      );
    });

    setRotation(newRotation);
  }, [currentWeek]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Week {currentWeek} Rotation</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Location</th>
            </tr>
          </thead>
          <tbody>
            {rotation.map((duty, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">{duty.role}</td>
                <td className="py-2 px-4">{duty.name}</td>
                <td className="py-2 px-4">{duty.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentWeek(currentWeek + 1)}
        >
          Next Week
        </button>
      </div>
    </div>
  );
  };

export default ScheduleForRotation;
