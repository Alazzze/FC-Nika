import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Отримати всі новини (публічні)
router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні новин' });
  }
});

// Отримати всі новини для адміна (включно з неопублікованими)
router.get('/admin', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні новин' });
  }
});

// Отримати новину за ID
router.get('/:id', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id: req.params.id
      }
    });
    
    if (!news) {
      return res.status(404).json({ error: 'Новину не знайдено' });
    }
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при отриманні новини' });
  }
});

// Створити нову новину
router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, image, published } = req.body;
    
    const news = await prisma.news.create({
      data: {
        title,
        content,
        excerpt,
        image,
        published: published || false,
        publishedAt: published ? new Date() : null
      }
    });
    
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при створенні новини' });
  }
});

// Оновити новину
router.put('/:id', async (req, res) => {
  try {
    const { title, content, excerpt, image, published } = req.body;
    
    const updateData: any = {
      title,
      content,
      excerpt,
      image,
      published
    };
    
    // Якщо публікуємо вперше
    if (published && !req.body.publishedAt) {
      updateData.publishedAt = new Date();
    }
    
    const news = await prisma.news.update({
      where: {
        id: req.params.id
      },
      data: updateData
    });
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при оновленні новини' });
  }
});

// Видалити новину
router.delete('/:id', async (req, res) => {
  try {
    await prisma.news.delete({
      where: {
        id: req.params.id
      }
    });
    
    res.json({ message: 'Новину видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при видаленні новини' });
  }
});

export default router; 