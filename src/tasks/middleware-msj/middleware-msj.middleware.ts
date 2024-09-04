import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MiddlewareMsjMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(['Orgin Url', req.originalUrl]);
    next();
  }
}
