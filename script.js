

document.addEventListener('DOMContentLoaded', () => {
    fetchAttendance();
});

function fetchAttendance() {
    fetch('http://localhost:5000/attendance')
        .then(response => response.json())
        .then(data => {
            const studentsDiv = document.getElementById('students');
            studentsDiv.innerHTML = ''; 

            data.forEach(student => {
                const div = document.createElement('div');
                div.classList.add('student-item'); 
                div.setAttribute('id', `student-${student.id}`);

                div.innerHTML = `
                    <p><strong>Name:</strong> ${student.name}</p>
                    <p><strong>ID:</strong> ${student.id}</p>
                    <p><strong>Status:</strong> <span class="status">${student.status}</span></p>
                    <button class="present" onclick='markAttendance(${student.id}, "Present")'>Present</button> 
                    <button class="absent" onclick='markAttendance(${student.id}, "Absent")'>Absent</button>
                `;

                studentsDiv.appendChild(div);
            });
        });
}

function markAttendance(student_id, status) {
    fetch('http://localhost:5000/mark-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id, status })
    })
    .then(response => response.json())
    .then(() => {
        
        const studentDiv = document.getElementById(`student-${student_id}`);
        if (studentDiv) {
            studentDiv.querySelector('.status').innerText = status;
        }
    })
    .catch(error => console.error('Error updating attendance:', error));
}
