import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/slots?date=YYYY-MM-DD
router.get('/', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      res.status(400).json({ error: 'Параметр date обов\'язковий (YYYY-MM-DD)' });
      return;
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      res.status(400).json({ error: 'Невірний формат дати. Використовуйте YYYY-MM-DD' });
      return;
    }

    const dateObj = new Date(date + 'T00:00:00');
    // JS: 0=Sun, 1=Mon ... 6=Sat → our schema: 0=Mon ... 6=Sun
    const jsDay = dateObj.getDay();
    const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

    // Check if date is blocked
    const blocked = await prisma.blockedDate.findFirst({ where: { date } });
    if (blocked) {
      res.json({ date, slots: [], blocked: true, reason: blocked.reason });
      return;
    }

    // Get schedule for this day
    const schedule = await prisma.workSchedule.findFirst({
      where: { dayOfWeek, isActive: true },
    });

    if (!schedule) {
      res.json({ date, slots: [], dayOff: true });
      return;
    }

    // Generate time slots
    const slots = generateTimeSlots(schedule.startTime, schedule.endTime, schedule.slotDuration);

    // Get existing appointments for this date
    const appointments = await prisma.appointment.findMany({
      where: {
        date,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      select: { timeSlot: true },
    });

    const bookedSlots = new Set(appointments.map((a) => a.timeSlot));

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dateObj < today;

    const availableSlots = slots.map((slot) => ({
      time: slot,
      available: !bookedSlots.has(slot) && !isPast,
      booked: bookedSlots.has(slot),
    }));

    res.json({ date, slots: availableSlots });
  } catch (error) {
    console.error('Slots error:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

function generateTimeSlots(startTime: string, endTime: string, durationMinutes: number): string[] {
  const slots: string[] = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes + durationMinutes <= endMinutes) {
    const fromH = Math.floor(currentMinutes / 60);
    const fromM = currentMinutes % 60;
    const toMinutes = currentMinutes + durationMinutes;
    const toH = Math.floor(toMinutes / 60);
    const toM = toMinutes % 60;

    const from = `${String(fromH).padStart(2, '0')}:${String(fromM).padStart(2, '0')}`;
    const to = `${String(toH).padStart(2, '0')}:${String(toM).padStart(2, '0')}`;
    slots.push(`${from}-${to}`);

    currentMinutes += durationMinutes;
  }

  return slots;
}

export default router;
