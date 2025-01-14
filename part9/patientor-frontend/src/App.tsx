import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientList from './components/PatientList';
import { Patient } from './types';

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        axios.get<Patient[]>('http://localhost:3001/api/patients')
            .then(response => setPatients(response.data));
    }, []);

    return (
        <div>
            <h1>Patientor</h1>
            <PatientList patients={patients} />
        </div>
    );
};

export default App;
