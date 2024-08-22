const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Directory where static files are located
const taskHtmlPath = 'D:/task4';

// Middleware to serve static files
app.use(express.static(taskHtmlPath));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to serve task.html
app.get('/', (req, res) => {
    res.sendFile(path.join(taskHtmlPath, 'task.html'));
});

// Route to get tasks from tasks.txt
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        const tasks = data ? JSON.parse(data) : [];
        res.json(tasks);
    });
});

// Route to save tasks to tasks.txt
app.post('/tasks', (req, res) => {
    const tasks = req.body;
    fs.writeFile('tasks.txt', JSON.stringify(tasks), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save tasks' });
        }
        res.json({ message: 'Tasks saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
