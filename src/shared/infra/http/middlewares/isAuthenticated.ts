import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg3ODc4MDgsImV4cCI6MTY1ODg3NDIwOCwic3ViIjoiNWYyNjU2NzYtM2Q5Yy00MDY2LWEwYzctOGI5ZGY3ZTA2MzM5In0.Wl3FxtRZR3WLav5XqK6bfDf_3YZi--r6BzaZwgk_0II
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    /*{
      Timestamp de quando foi criado
      iat: 1658787808,
      Timestamp de quando vai ser expirado
      exp: 1658874208,
      Id do usuário
      sub: '5f265676-3d9c-4066-a0c7-8b9df7e06339'
    }*/
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
