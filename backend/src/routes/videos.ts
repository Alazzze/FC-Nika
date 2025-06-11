import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Отримати всі відео
router.get('/', async (req, res) => {
  try {
    const { category, teamId, published } = req.query

    const where: any = {}
    if (category) where.category = category
    if (teamId) where.teamId = teamId
    if (published !== undefined) where.published = published === 'true'

    const videos = await prisma.video.findMany({
      where,
      include: {
        team: {
          select: {
            id: true,
            name: true,
            ageGroup: {
              select: {
                name: true
              }
            }
          }
        },
        match: {
          select: {
            id: true,
            homeTeam: { select: { name: true } },
            awayTeam: { select: { name: true } },
            matchDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
})

// Отримати відео за ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            ageGroup: {
              select: {
                name: true
              }
            }
          }
        },
        match: {
          select: {
            id: true,
            homeTeam: { select: { name: true } },
            awayTeam: { select: { name: true } },
            matchDate: true
          }
        }
      }
    })

    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }

    res.json(video)
  } catch (error) {
    console.error('Error fetching video:', error)
    res.status(500).json({ error: 'Failed to fetch video' })
  }
})

// Створити нове відео
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      type,
      thumbnail,
      teamId,
      matchId,
      category,
      duration,
      published
    } = req.body

    const video = await prisma.video.create({
      data: {
        title,
        description,
        url,
        type: type || 'UPLOAD',
        thumbnail,
        teamId: teamId || null,
        matchId: matchId || null,
        category: category || 'general',
        duration,
        published: published !== undefined ? published : true
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            ageGroup: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    res.status(201).json(video)
  } catch (error) {
    console.error('Error creating video:', error)
    res.status(500).json({ error: 'Failed to create video' })
  }
})

// Оновити відео
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      url,
      type,
      thumbnail,
      teamId,
      matchId,
      category,
      duration,
      published
    } = req.body

    const video = await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        url,
        type,
        thumbnail,
        teamId: teamId || null,
        matchId: matchId || null,
        category,
        duration,
        published
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            ageGroup: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    res.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    res.status(500).json({ error: 'Failed to update video' })
  }
})

// Видалити відео
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.video.delete({
      where: { id }
    })

    res.json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error('Error deleting video:', error)
    res.status(500).json({ error: 'Failed to delete video' })
  }
})

export default router 