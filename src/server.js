require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// CRUD
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' }});
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = await prisma.task.create({ data: { title, description }});
  res.status(201).json(task);
});

app.patch('/tasks/:id/toggle', async (req, res) => {
  const id = Number(req.params.id);
  const task = await prisma.task.findUnique({ where: { id }});
  if (!task) return res.status(404).json({ error: 'not found' });
  const newStatus = task.status === 'done' ? 'pending' : 'done';
  const updated = await prisma.task.update({ where: { id }, data: { status: newStatus }});
  res.json(updated);
});

app.delete('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.task.delete({ where: { id }});
  res.status(204).end();
});

// Global error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal' });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on", PORT);
});

