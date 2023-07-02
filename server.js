const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Obtener la lista de tareas
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        res.json(JSON.parse(data));
    });
});

// Agregar una nueva tarea
app.post('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const tasks =JSON.parse(data);
        const newTask = req.body;
        tasks.push(newTask);
        
        fs.writeFile('tasks.json', JSON.stringify(tasks), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            res.json({ message: 'Task added successfully' });
        });
    });
    
});

// Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
const taskId = req.params.id;
const updatedTask = req.body;
fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

    fs.writeFile('tasks.json', JSON.stringify(tasks), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Task updated successfully' });
    });
});
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
const taskId = req.params.id;
fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    if (tasks.length === updatedTasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }

    fs.writeFile('tasks.json', JSON.stringify(updatedTasks), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Task deleted successfully' });
    });
});
});

app.listen(PORT, () => {
console.log('Server running on port "${PORT}"');
});