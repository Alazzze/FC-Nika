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

export default router; 