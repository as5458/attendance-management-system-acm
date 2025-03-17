
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/students').then(response => {
            setAttendance(response.data);
        });
    }, []);

    const markAttendance = (student_id, status) => {
        axios.post('http://localhost:5000/mark-attendance', { student_id, status })
            .then(() => alert('Attendance marked'))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Attendance Management</h1>
            {students.map(student => (
                <div key={student.id}>
                    <span>{student.name}</span>
                    <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
                    <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
                </div>
            ))}
        </div>
    );
}

export default Attendance;
