import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './Dtos/create.task.dto';
import { UpdateTaskDto } from './Dtos/update.task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('task')
export class TasksController {
  //   _TaskService: TasksService;

  constructor(private _TaskServices: TasksService) {
    // this._TaskService = taskServices;
  }

  @ApiTags('Tasks')
  @ApiOperation({ summary: 'Get all Tasks' })
  @ApiResponse({ status: 200, description: 'array with all tasks' })
  @Get()
  Obtener(@Query() query: any) {
    console.log(query);
    return this._TaskServices.getTasks();
  }

  @ApiTags('Tasks')
  @ApiOperation({ summary: 'Get one Task by id' })
  @Get('/:id')
  ObtenerPorId(@Param('id') id: string) {
    console.log(id);
    return this._TaskServices.getTasksById(parseInt(id));
  }

  @ApiTags('Tasks')
  @ApiOperation({ summary: 'Create task' })
  @Post()
  Crear(@Body() task: CreateTaskDto) {
    return this._TaskServices.postTasks(task);
  }

  @ApiTags('Tasks')
  @Patch('/:id')
  ActualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ) {
    return this._TaskServices.patchTasks({ task, id });
  }

  @ApiTags('Tasks')
  @Put('/:id')
  ActualizarTotal(@Param('id') id: string, @Body() task: CreateTaskDto) {
    return this._TaskServices.putTasks({ task, id: parseInt(id) });
  }

  @ApiTags('Tasks')
  @Delete('/:id')
  Eliminar(@Param('id') id: string) {
    return this._TaskServices.deleteTasks(parseInt(id));
  }
}
