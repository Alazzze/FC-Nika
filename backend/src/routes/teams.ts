import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі команди
router.get('/', async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        ageGroup: true,
        players: true,
        _count: {
          select: {
            players: true,
            homeMatches: true,
            awayMatches: true
          }
        }
      },
      orderBy: {
        ageGroup: {
          name: 'asc'
        }
      }
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні команд' });
  }
});

// Отримати команду за ID
router.get('/:id', async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
      include: {
        ageGroup: true,
        players: {
          include: {
            stats: true
          }
        },
        photos: {
          take: 10,
          orderBy: {
            createdAt: 'desc'
          }
        },
        videos: {
          take: 5,
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    
    if (!team) {
      return res.status(404).json({ error: 'Команду не знайдено' });
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні команди' });
  }
});

// Створити нову команду
router.post('/', async (req, res) => {
  try {
    const { name, description, ageGroupId, coach, founded } = req.body;
    
    const team = await prisma.team.create({
      data: {
        name,
        description,
        ageGroupId,
        coach,
        founded: founded ? new Date(founded) : null
      },
      include: {
        ageGroup: true
      }
    });
    
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при створенні команди' });
  }
});

// Оновити команду
router.put('/:id', async (req, res) => {
  try {
    const { name, description, ageGroupId, coach, founded } = req.body;
    
    const team = await prisma.team.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        ageGroupId,
        coach,
        founded: founded ? new Date(founded) : null
      },
      include: {
        ageGroup: true
      }
    });
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при оновленні команди' });
  }
});

// Видалити команду
router.delete('/:id', async (req, res) => {
  try {
    await prisma.team.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Команду успішно видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при видаленні команди' });
  }
});

export default router; 