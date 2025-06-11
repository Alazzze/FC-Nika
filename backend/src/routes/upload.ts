import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Налаштування multer для завантаження файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    
    // Створюємо папку якщо вона не існує
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Генеруємо унікальне ім'я файлу
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Фільтр для типів файлів
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mov|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Дозволені тільки зображення та відео файли!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB максимум
  },
  fileFilter: fileFilter
});

// Завантаження одного файлу
router.post('/single', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не було завантажено' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Файл успішно завантажено',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при завантаженні файлу' });
  }
});

// Завантаження кількох файлів
router.post('/multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'Файли не було завантажено' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.json({
      message: 'Файли успішно завантажено',
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при завантаженні файлів' });
  }
});

// Видалення файлу
router.delete('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Файл видалено' });
    } else {
      res.status(404).json({ error: 'Файл не знайдено' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка при видаленні файлу' });
  }
});

// Endpoint для завантаження фото з адмін панелі
router.post('/photos', upload.single('files'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не надіслано' });
    }

    // Перевірка типу файлу
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Потрібен файл зображення' });
    }

    const { title, description, category } = req.body;
    const filePath = `/uploads/${req.file.filename}`;
    
    // Створюємо запис в базі даних
    const { prisma } = require('../index');
    const photo = await prisma.photo.create({
      data: {
        title: title || req.file.originalname,
        description: description || '',
        url: filePath,
        category: category || 'Загальні'
      }
    });

    res.json({ 
      message: 'Фото завантажено успішно',
      photo: photo
    });
  } catch (error) {
    console.error('Помилка завантаження фото:', error);
    res.status(500).json({ error: 'Помилка завантаження фото' });
  }
});

// Endpoint для завантаження відео з адмін панелі
router.post('/videos', upload.single('files'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не надіслано' });
    }

    // Перевірка типу файлу
    if (!req.file.mimetype.startsWith('video/')) {
      return res.status(400).json({ error: 'Потрібен відео файл' });
    }

    const { title, description, category, teamId, published } = req.body;
    const filePath = `http://localhost:3001/uploads/${req.file.filename}`;
    
    // Створюємо запис в базі даних
    const { prisma } = require('../index');
    const video = await prisma.video.create({
      data: {
        title: title || req.file.originalname,
        description: description || '',
        url: filePath,
        type: 'UPLOAD',
        category: category || 'general',
        teamId: teamId || null,
        published: published === 'true' || published === true || true
      }
    });

    res.json({ 
      message: 'Відео завантажено успішно',
      video: video
    });
  } catch (error) {
    console.error('Помилка завантаження відео:', error);
    res.status(500).json({ error: 'Помилка завантаження відео' });
  }
});

export default router; 