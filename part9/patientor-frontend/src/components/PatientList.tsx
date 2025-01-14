import React from 'react';
import { Patient } from '../types';

const PatientList = ({ patients }: { patients: Patient[] }) => (
    <div>
        <h2>Patients</h2>
        <ul>
            {patients.map(patient => (
                <li key={patient.id}>{patient.name}</li>
            ))}
        </ul>
    </div>
);

export default PatientList;
