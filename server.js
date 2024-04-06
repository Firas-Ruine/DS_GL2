// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
});

/**
 * This endpoint updates the isCompleted field of a task.
 * 
 * @param {string} id - The id of the task to update.
 * 
 * @param {boolean} isCompleted - The new value of the isCompleted field.
 * 
 * @returns {object} The updated task.
 */
app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { isCompleted: isCompleted }, { new: true });
    res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
