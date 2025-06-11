import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';

// Routes
import teamsRoutes from './routes/teams';
import playersRoutes from './routes/players';
import matchesRoutes from './routes/matches';
import tournamentsRoutes from './routes/tournaments';
import newsRoutes from './routes/news';
import photosRoutes from './routes/photos';
import videosRoutes from './routes/videos';

import trainingsRoutes from './routes/trainings';
import ageGroupsRoutes from './routes/ageGroups';
import coachesRoutes from './routes/coaches';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
})

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      mediaSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статичні файли для uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/teams', teamsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/videos', videosRoutes);

app.use('/api/trainings', trainingsRoutes);
app.use('/api/age-groups', ageGroupsRoutes);
app.use('/api/coaches', coachesRoutes);
app.use('/api/upload', uploadRoutes);

// Photo upload endpoint
app.post('/api/upload/photos', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const uploadedPhotos = []

    for (const file of req.files) {
      const photoData = {
        title: req.body.title || file.originalname.split('.')[0],
        description: req.body.description || '',
        category: req.body.category || 'Загальні',
        url: `/uploads/${file.filename}`
      }

      const photo = await prisma.photo.create({
        data: photoData
      })

      uploadedPhotos.push(photo)
    }

    res.json({ 
      message: `Successfully uploaded ${uploadedPhotos.length} photos`,
      photos: uploadedPhotos 
    })
  } catch (error) {
    console.error('Photo upload error:', error)
    res.status(500).json({ error: 'Failed to upload photos' })
  }
})

// Video upload endpoint
app.post('/api/upload/videos', upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const uploadedVideos = []

    for (const file of req.files) {
      const videoData = {
        title: req.body.title || file.originalname.split('.')[0],
        description: req.body.description || '',
        category: req.body.category || 'general',
        url: `/uploads/${file.filename}`,
        type: 'UPLOAD' as const,
        published: req.body.published !== undefined ? req.body.published === 'true' : true
      }

      const video = await prisma.video.create({
        data: videoData
      })

      uploadedVideos.push(video)
    }

    res.json({ 
      message: `Successfully uploaded ${uploadedVideos.length} videos`,
      videos: uploadedVideos 
    })
  } catch (error) {
    console.error('Video upload error:', error)
    res.status(500).json({ error: 'Failed to upload videos' })
  }
})

// Update photo endpoint
app.put('/api/photos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category } = req.body

    const photo = await prisma.photo.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category
      }
    })

    res.json(photo)
  } catch (error) {
    console.error('Photo update error:', error)
    res.status(500).json({ error: 'Failed to update photo' })
  }
})

// Delete photo endpoint
app.delete('/api/photos/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Get photo info before deleting
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) }
    })

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    // Delete photo from database
    await prisma.photo.delete({
      where: { id: parseInt(id) }
    })

    // Delete file from filesystem if it's an uploaded file
    if (photo.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', 'uploads', photo.url.replace('/uploads/', ''))
      try {
        await fs.unlink(filePath)
      } catch (fileError) {
        console.warn('Could not delete file:', filePath)
      }
    }

    res.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Photo delete error:', error)
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API root endpoint - показує доступні endpoints
app.get('/api', (req, res) => {
  res.json({
    message: 'Ніка Football Club API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      teams: '/api/teams',
      players: '/api/players', 
      coaches: '/api/coaches',
      matches: '/api/matches',
      tournaments: '/api/tournaments',
      news: '/api/news',
      photos: '/api/photos',
      videos: '/api/videos',

      trainings: '/api/trainings',
      ageGroups: '/api/age-groups'
    },
    documentation: 'Дитячий футбольний клуб "Ніка" - API для управління командами, гравцями та турнірами'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Щось пішло не так!' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Сервер Nika Football Club запущено на порті ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 