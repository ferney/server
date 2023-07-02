const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Obtener una tarea específica
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Agregar una nueva tarea
app.post('/api/tasks', (req, res) => {
  const task = req.body;
  task.id = Date.now();
  tasks.push(task);
  res.status(201).json(task);
});

// Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const task = tasks.splice(index, 1);
    res.json(task[0]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
