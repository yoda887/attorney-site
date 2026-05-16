import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import { env } from '../config/env';

const router = Router();
const prisma = new PrismaClient();

const uploadsDir = path.resolve(env.UPLOAD_DIR);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(uploadsDir, String(req.user?.id || 'guest'));
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${suffix}${path.extname(file.originalname)}`);
  },
});

const allowedMimes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg', 'image/png', 'image/webp',
];

const upload = multer({
  storage,
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Дозволені лише PDF, DOC, DOCX, JPG, PNG, WEBP'));
  },
});

// GET /api/documents
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const docs = await prisma.document.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// POST /api/documents/upload
router.post('/upload', authMiddleware, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'Файл не надано' }); return; }
    const doc = await prisma.document.create({
      data: {
        userId: req.user!.id,
        filename: req.file.originalname,
        storagePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        description: req.body.description || null,
        uploadedBy: 'CLIENT',
      },
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/documents/:id/download
router.get('/:id/download', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) { res.status(404).json({ error: 'Не знайдено' }); return; }
    if (doc.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Немає доступу' }); return;
    }
    if (!fs.existsSync(doc.storagePath)) {
      res.status(404).json({ error: 'Файл не знайдено' }); return;
    }
    res.download(doc.storagePath, doc.filename);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) { res.status(404).json({ error: 'Не знайдено' }); return; }
    if (doc.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Немає доступу' }); return;
    }
    if (fs.existsSync(doc.storagePath)) fs.unlinkSync(doc.storagePath);
    await prisma.document.delete({ where: { id } });
    res.json({ message: 'Видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
