import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі вікові групи
router.get('/', async (req, res) => {
  try {
    const ageGroups = await prisma.ageGroup.findMany({
      include: {
        teams: true,
        _count: {
          select: {
            teams: true
          }
        }
      },
      orderBy: {
        minAge: 'asc'
      }
    });
    
    res.json(ageGroups);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні вікових груп' });
  }
});

export default router; 