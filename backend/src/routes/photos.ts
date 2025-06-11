import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі фото
router.get('/', async (req, res) => {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні фото' });
  }
});

export default router; 