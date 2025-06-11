import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати турнірні таблиці за віковою групою
router.get('/tables/:ageGroupId', async (req, res) => {
  try {
    const tables = await prisma.tournamentTable.findMany({
      where: {
        ageGroupId: req.params.ageGroupId
      },
      include: {
        tournament: true,
        ageGroup: true,
        standings: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні турнірних таблиць' });
  }
});

// Отримати поточні турнірні таблиці для всіх вікових груп
router.get('/tables/current', async (req, res) => {
  try {
    const currentSeason = '2023-2024';
    
    const tables = await prisma.tournamentTable.findMany({
      include: {
        tournament: {
          where: {
            season: currentSeason
          }
        },
        ageGroup: true,
        standings: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні поточних турнірних таблиць' });
  }
});

// Створити турнірну таблицю
router.post('/tables', async (req, res) => {
  try {
    const { tournamentId, ageGroupId, standings } = req.body;
    
    const table = await prisma.tournamentTable.create({
      data: {
        tournamentId,
        ageGroupId,
        standings: {
          create: standings.map((standing: any, index: number) => ({
            ...standing,
            position: index + 1
          }))
        }
      },
      include: {
        tournament: true,
        ageGroup: true,
        standings: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при створенні турнірної таблиці' });
  }
});

// Оновити турнірну таблицю
router.put('/tables/:id', async (req, res) => {
  try {
    const { standings } = req.body;
    
    // Спочатку видаляємо всі старі записи
    await prisma.tournamentStanding.deleteMany({
      where: {
        tableId: req.params.id
      }
    });
    
    // Створюємо нові записи
    const table = await prisma.tournamentTable.update({
      where: { id: req.params.id },
      data: {
        standings: {
          create: standings.map((standing: any, index: number) => ({
            ...standing,
            position: index + 1
          }))
        }
      },
      include: {
        tournament: true,
        ageGroup: true,
        standings: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при оновленні турнірної таблиці' });
  }
});

// Отримати всі турніри
router.get('/', async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        ageGroup: true,
        tournamentTeams: true,
        tournamentTable: {
          include: {
            standings: {
              orderBy: {
                position: 'asc'
              }
            }
          }
        }
      },
      orderBy: {
        startDate: 'desc'
      }
    });
    
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні турнірів' });
  }
});

export default router; 