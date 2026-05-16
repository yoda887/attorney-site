import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@merkovich.law' },
    update: {},
    create: {
      email: 'admin@merkovich.law',
      fullName: 'Меркович Богдан Валерійович',
      passwordHash: adminPassword,
      phone: '+380501234567',
      role: 'ADMIN',
    },
  });
  console.log('Admin created:', admin.email);

  // Create demo client
  const clientPassword = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      fullName: 'Іван Петренко',
      passwordHash: clientPassword,
      phone: '+380671234567',
      role: 'CLIENT',
    },
  });
  console.log('Demo client created:', client.email);

  // Create work schedule (Mon-Fri 9:00-18:00)
  for (let day = 0; day < 5; day++) {
    await prisma.workSchedule.upsert({
      where: { id: day + 1 },
      update: {},
      create: {
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '18:00',
        slotDuration: 60,
        isActive: true,
      },
    });
  }
  // Sat 10:00-14:00
  await prisma.workSchedule.upsert({
    where: { id: 6 },
    update: {},
    create: {
      dayOfWeek: 5,
      startTime: '10:00',
      endTime: '14:00',
      slotDuration: 60,
      isActive: true,
    },
  });
  // Sun - off
  await prisma.workSchedule.upsert({
    where: { id: 7 },
    update: {},
    create: {
      dayOfWeek: 6,
      startTime: '00:00',
      endTime: '00:00',
      slotDuration: 60,
      isActive: false,
    },
  });
  console.log('Work schedule seeded');

  // Create demo appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  await prisma.appointment.create({
    data: {
      userId: client.id,
      date: dateStr,
      timeSlot: '10:00-11:00',
      service: 'Консультація з цивільного права',
      status: 'CONFIRMED',
      notes: 'Демо-запис для тестування',
    },
  });
  console.log('Demo appointment created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
