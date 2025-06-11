import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всіх гравців
router.get('/', async (req, res) => {
  try {
    const { teamId } = req.query;
    
    const where: any = {};
    if (teamId) where.teamId = teamId;
    
    const players = await prisma.player.findMany({
      where,
      include: {
        team: {
          include: {
            ageGroup: true
          }
        },
        stats: true
      },
      orderBy: [
        { team: { ageGroup: { name: 'asc' } } },
        { number: 'asc' }
      ]
    });
    
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні гравців' });
  }
});

// Створити нового гравця
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, position, number, teamId, photo } = req.body;
    
    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        position,
        number,
        teamId,
        photo
      },
      include: {
        team: {
          include: {
            ageGroup: true
          }
        }
      }
    });
    
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при створенні гравця' });
  }
});

export default router; 