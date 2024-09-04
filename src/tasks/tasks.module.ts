import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { MiddlewareMsjMiddleware } from './middleware-msj/middleware-msj.middleware';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareMsjMiddleware)
      .forRoutes('/task')
      .apply(MiddlewareMiddleware)
      .forRoutes(
        { path: '/task', method: RequestMethod.DELETE },
        { path: '/task', method: RequestMethod.POST },
      );
  }
}
