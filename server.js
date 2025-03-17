const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/mark-attendance', (req, res) => {
    const { student_id, status } = req.body;
    const query = 'INSERT INTO attendance (student_id, status, date) VALUES (?, ?, CURDATE())';
    db.query(query, [student_id, status], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Attendance marked successfully' });
    });
});


app.get('/attendance', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
