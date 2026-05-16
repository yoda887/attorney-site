import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, optionalAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

const appointmentSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Невірний формат дати'),
  timeSlot: z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, 'Невірний формат слоту'),
  service: z.string().min(1, 'Оберіть послугу'),
  notes: z.string().optional(),
});

const guestAppointmentSchema = appointmentSchema.extend({
  guestName: z.string().min(2, 'Введіть ім\'я'),
  guestPhone: z.string().min(10, 'Введіть номер телефону'),
  guestEmail: z.string().email('Невірний email').optional(),
});

// POST /api/appointments — authenticated client
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const data = appointmentSchema.parse(req.body);

    // Check if slot is available
    const existing = await prisma.appointment.findFirst({
      where: {
        date: data.date,
        timeSlot: data.timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existing) {
      res.status(409).json({ error: 'Цей слот вже зайнятий' });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...data,
        userId: req.user!.id,
        status: 'PENDING',
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Помилка валідації', details: error.errors });
      return;
    }
    console.error('Appointment create error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// POST /api/appointments/guest — unauthenticated
router.post('/guest', async (req: Request, res: Response) => {
  try {
    const data = guestAppointmentSchema.parse(req.body);

    const existing = await prisma.appointment.findFirst({
      where: {
        date: data.date,
        timeSlot: data.timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existing) {
      res.status(409).json({ error: 'Цей слот вже зайнятий' });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: data.date,
        timeSlot: data.timeSlot,
        service: data.service,
        notes: data.notes,
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail,
        status: 'PENDING',
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Помилка валідації', details: error.errors });
      return;
    }
    console.error('Guest appointment error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// GET /api/appointments — my appointments
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user!.id },
      orderBy: [{ date: 'desc' }, { timeSlot: 'desc' }],
    });

    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// PATCH /api/appointments/:id/cancel
router.patch('/:id/cancel', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id), 10);

    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) {
      res.status(404).json({ error: 'Запис не знайдено' });
      return;
    }

    // Only owner or admin can cancel
    if (appointment.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Немає доступу' });
      return;
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    res.json(updated);
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
