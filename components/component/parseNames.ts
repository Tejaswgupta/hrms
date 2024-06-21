import { promises as fs } from 'fs';
import path from 'path';

interface Employee {
  id: string;
  name: string;
  phone: string;
}

export const parseCsv = async (filePath: string): Promise<Employee[]> => {
  const employees: Employee[] = [];
  const data = await fs.readFile(filePath, 'utf-8');
  console.log('File data:', data); // Log file content
  const lines = data.split('\n').filter(line => line.trim() !== '');

  lines.forEach((line, index) => {
    const parts = line.trim().split(' ');
    const id = `E${index + 1}`;
    const phone = parts.pop() || '';
    const name = parts.join(' ');

    employees.push({
      id,
      name,
      phone
    });
  });

  console.log('Parsed employees:', employees); // Log parsed employees
  return employees;
};
