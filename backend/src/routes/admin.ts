import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { env } from '../config/env';

const router = Router();
const prisma = new PrismaClient();

// Multer for admin uploads
const uploadsDir = path.resolve(env.UPLOAD_DIR);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = String(req.params.userId || 'admin');
    const userDir = path.join(uploadsDir, userId);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${suffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: env.MAX_FILE_SIZE } });

// All admin routes require auth + admin role
router.use(authMiddleware, adminOnly);

// GET /api/admin/appointments
router.get('/appointments', async (req: Request, res: Response) => {
  try {
    const { status, date, page = '1', limit = '20' } = req.query;
    const where: any = {};
    if (status && typeof status === 'string') where.status = status;
    if (date && typeof date === 'string') where.date = date;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: { user: { select: { id: true, fullName: true, email: true, phone: true } } },
        orderBy: [{ date: 'desc' }, { timeSlot: 'asc' }],
        skip,
        take: parseInt(limit as string),
      }),
      prisma.appointment.count({ where }),
    ]);

    res.json({ appointments, total, page: parseInt(page as string), limit: parseInt(limit as string) });
  } catch (error) {
    console.error('Admin appointments error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// PATCH /api/admin/appointments/:id
router.patch('/appointments/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    const { status, notes } = req.body;
    const data: any = {};
    if (status) data.status = status;
    if (notes !== undefined) data.notes = notes;

    const updated = await prisma.appointment.update({ where: { id }, data });
    res.json(updated);
  } catch (error) {
    console.error('Admin update appointment error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/admin/clients
router.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await prisma.user.findMany({
      where: { role: 'CLIENT' },
      select: {
        id: true, email: true, fullName: true, phone: true, createdAt: true,
        _count: { select: { appointments: true, documents: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(clients);
  } catch (error) {
    console.error('Admin clients error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// POST /api/admin/documents/upload/:userId
router.post('/documents/upload/:userId', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'Файл не надано' }); return; }
    const userId = parseInt(String(req.params.userId));
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) { res.status(404).json({ error: 'Клієнта не знайдено' }); return; }

    const document = await prisma.document.create({
      data: {
        userId,
        filename: req.file.originalname,
        storagePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        description: req.body.description || null,
        uploadedBy: 'ADMIN',
      },
    });
    res.status(201).json(document);
  } catch (error) {
    console.error('Admin upload error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/admin/schedule
router.get('/schedule', async (_req: Request, res: Response) => {
  try {
    const schedule = await prisma.workSchedule.findMany({ orderBy: { dayOfWeek: 'asc' } });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// PUT /api/admin/schedule
router.put('/schedule', async (req: Request, res: Response) => {
  try {
    const { schedules } = req.body; // Array of schedule objects
    for (const s of schedules) {
      await prisma.workSchedule.upsert({
        where: { id: s.id || 0 },
        update: { startTime: s.startTime, endTime: s.endTime, slotDuration: s.slotDuration, isActive: s.isActive },
        create: { dayOfWeek: s.dayOfWeek, startTime: s.startTime, endTime: s.endTime, slotDuration: s.slotDuration, isActive: s.isActive },
      });
    }
    const updated = await prisma.workSchedule.findMany({ orderBy: { dayOfWeek: 'asc' } });
    res.json(updated);
  } catch (error) {
    console.error('Admin schedule error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/admin/blocked-dates
router.get('/blocked-dates', async (_req: Request, res: Response) => {
  try {
    const dates = await prisma.blockedDate.findMany({ orderBy: { date: 'asc' } });
    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// POST /api/admin/blocked-dates
router.post('/blocked-dates', async (req: Request, res: Response) => {
  try {
    const { date, reason } = req.body;
    const blocked = await prisma.blockedDate.create({ data: { date, reason } });
    res.status(201).json(blocked);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// DELETE /api/admin/blocked-dates/:id
router.delete('/blocked-dates/:id', async (req: Request, res: Response) => {
  try {
    await prisma.blockedDate.delete({ where: { id: parseInt(String(req.params.id)) } });
    res.json({ message: 'Видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/admin/stats
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const [totalClients, totalAppointments, pending, confirmed] = await Promise.all([
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'PENDING' } }),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
    ]);
    res.json({ totalClients, totalAppointments, pending, confirmed });
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
