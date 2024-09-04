import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [TasksModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
