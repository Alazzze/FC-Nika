import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всіх тренерів
router.get('/', async (req, res) => {
  try {
    const coaches = await prisma.coach.findMany({
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      },
      orderBy: [
        { position: 'asc' },
        { lastName: 'asc' }
      ]
    });
    
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні тренерів' });
  }
});

// Отримати тренера за ID
router.get('/:id', async (req, res) => {
  try {
    const coach = await prisma.coach.findUnique({
      where: { id: req.params.id },
      include: {
        team: {
          include: {
            ageGroup: true,
            players: true
          }
        }
      }
    });
    
    if (!coach) {
      return res.status(404).json({ error: 'Тренера не знайдено' });
    }
    
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні тренера' });
  }
});

// Отримати тренерів по позиції
router.get('/position/:position', async (req, res) => {
  try {
    const coaches = await prisma.coach.findMany({
      where: {
        position: {
          contains: req.params.position,
          mode: 'insensitive'
        }
      },
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    });
    
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні тренерів за позицією' });
  }
});

// Створити нового тренера
router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      position, 
      experience, 
      photo, 
      biography, 
      phone, 
      email, 
      dateOfBirth, 
      achievements, 
      teamId 
    } = req.body;
    
    const coach = await prisma.coach.create({
      data: {
        firstName,
        lastName,
        position,
        experience,
        photo,
        biography,
        phone,
        email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        achievements,
        teamId
      },
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      }
    });
    
    res.status(201).json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при створенні тренера' });
  }
});

// Оновити тренера
router.put('/:id', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      position, 
      experience, 
      photo, 
      biography, 
      phone, 
      email, 
      dateOfBirth, 
      achievements, 
      teamId 
    } = req.body;
    
    const coach = await prisma.coach.update({
      where: { id: req.params.id },
      data: {
        firstName,
        lastName,
        position,
        experience,
        photo,
        biography,
        phone,
        email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        achievements,
        teamId
      },
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      }
    });
    
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при оновленні тренера' });
  }
});

// Видалити тренера
router.delete('/:id', async (req, res) => {
  try {
    await prisma.coach.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Тренера успішно видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при видаленні тренера' });
  }
});

export default router; 