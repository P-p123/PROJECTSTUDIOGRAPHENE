import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, '../data/tasks.json');

const readTasks = async () => {
  const fileContent = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContent);
};

const writeTasks = async (tasks) => {
  await fs.writeFile(dataFilePath, JSON.stringify(tasks, null, 2));
};

const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: createId(),
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    tasks[index] = {
      ...tasks[index],
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate || null,
    };

    await writeTasks(tasks);
    res.json(tasks[index]);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    tasks[index].completed = !tasks[index].completed;
    await writeTasks(tasks);

    res.json(tasks[index]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const [deletedTask] = tasks.splice(index, 1);
    await writeTasks(tasks);

    res.json(deletedTask);
  } catch (error) {
    next(error);
  }
});

export default router;
