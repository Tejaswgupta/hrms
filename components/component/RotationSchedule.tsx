
"use client"
import React, { useState, useEffect } from 'react';
import { generateRotationSchedule, getDayOfWeekName, getShiftName, getPlaceName, getPersonName } from './RotationLogic';

interface RotationAssignment {
  dayOfWeekId: number;
  shiftId: number;
  placeId: number;
  personId: number;
}

const RotationSchedule: React.FC = () => {
  const [rotationSchedule, setRotationSchedule] = useState<RotationAssignment[]>([]);

  useEffect(() => {
    const generatedSchedule = generateRotationSchedule();
    setRotationSchedule(generatedSchedule);
  }, []);
    return (
        <div className="container mx-auto py-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rotationSchedule.map((assignment, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{getDayOfWeekName(assignment.dayOfWeekId)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getShiftName(assignment.shiftId)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getPlaceName(assignment.placeId)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getPersonName(assignment.personId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RotationSchedule;
