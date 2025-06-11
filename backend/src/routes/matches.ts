import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі матчі
router.get('/', async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: {
          include: {
            ageGroup: true
          }
        },
        awayTeam: {
          include: {
            ageGroup: true
          }
        }
      },
      orderBy: {
        matchDate: 'desc'
      }
    });
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні матчів' });
  }
});

export default router; 