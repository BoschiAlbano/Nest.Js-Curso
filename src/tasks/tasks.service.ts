import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './Dtos/create.task.dto';
import { UpdateTaskDto } from './Dtos/update.task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks() {
    return await this.prisma.task.findMany();
  }

  async getTasksById(id: number) {
    const find = await this.prisma.task.findUnique({ where: { id } });

    if (!find) {
      return new HttpException(
        `Error, tarea ${id} no encontrada...`,
        HttpStatus.NOT_FOUND,
      );
    }

    return find;
  }
  postTasks(task: CreateTaskDto) {
    return this.prisma.task.create({ data: task });
  }
  async deleteTasks(id: number) {
    const find = await this.prisma.task.findUnique({ where: { id } });

    if (!find) {
      return new HttpException(
        `Error, tarea ${id} no encontrada...`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.task.delete({ where: { id: find.id } });
  }

  async patchTasks({ task, id }: { task: UpdateTaskDto; id: number }) {
    const find = await this.prisma.task.findUnique({ where: { id } });

    if (!find) {
      return new HttpException(
        `Error, tarea ${id} no encontrada...`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.task.update({ where: { id }, data: task });
  }
  async putTasks({ task, id }: { task: CreateTaskDto; id: number }) {
    const find = await this.prisma.task.findUnique({ where: { id } });

    if (!find) {
      return new HttpException(
        `Error, tarea ${id} no encontrada...`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.task.update({ where: { id }, data: task });
  }
}
