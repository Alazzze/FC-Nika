import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі тренування
router.get('/', async (req, res) => {
  try {
    const trainings = await prisma.training.findMany({
      orderBy: {
        date: 'asc'
      }
    });
    
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні тренувань' });
  }
});

// Створити тренування
router.post('/', async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location, teamId, ageGroupId } = req.body;
    
    const training = await prisma.training.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        startTime,
        endTime,
        location,
        teamId: teamId || null,
        ageGroupId: ageGroupId || null
      }
    });
    
    res.status(201).json(training);
  } catch (error) {
    console.error('Помилка створення тренування:', error);
    res.status(500).json({ error: 'Помилка при створенні тренування' });
  }
});

// Оновити тренування
router.put('/:id', async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location, teamId, ageGroupId } = req.body;
    
    const training = await prisma.training.update({
      where: { id: req.params.id },
      data: {
        title,
        description: description || null,
        date: new Date(date),
        startTime,
        endTime,
        location,
        teamId: teamId || null,
        ageGroupId: ageGroupId || null
      }
    });
    
    res.json(training);
  } catch (error) {
    console.error('Помилка оновлення тренування:', error);
    res.status(500).json({ error: 'Помилка при оновленні тренування' });
  }
});

// Видалити тренування
router.delete('/:id', async (req, res) => {
  try {
    await prisma.training.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Тренування видалено' });
  } catch (error) {
    console.error('Помилка видалення тренування:', error);
    res.status(500).json({ error: 'Помилка при видаленні тренування' });
  }
});

export default router; 