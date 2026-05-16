import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  if (err.name === 'ZodError') {
    res.status(400).json({
      error: 'Помилка валідації',
      details: JSON.parse(err.message),
    });
    return;
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    res.status(409).json({
      error: 'Конфлікт даних',
      message: 'Запис з такими даними вже існує',
    });
    return;
  }

  res.status(500).json({
    error: 'Внутрішня помилка сервера',
    ...(process.env.NODE_ENV === 'development' && { message: err.message }),
  });
}
