import {
  Controller,
  Get,
  HttpCode,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SaludarPipePipe } from './pipe/saludar-pipe/saludar-pipe.pipe';
import { SaludarGuardGuard } from './guard/saludar-guard/saludar-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request, @Res() respose: Response) {
    console.log(request.url);

    respose.status(200).json({
      message: this.appService.getHello(),
    });
  }

  @Get('error')
  @UseGuards(SaludarGuardGuard)
  @HttpCode(404)
  getError() {
    return 'pagina de error... 404';
  }

  // pipe (parsear datos) y guard (validar request )
  @Get('saludar')
  @UseGuards(SaludarGuardGuard)
  usePipe(
    @Query(SaludarPipePipe) { name, age }: { name: string; age: number },
  ) {
    console.log(typeof name);
    console.log(typeof age);

    return `you name is ${name}, you are ${age} years`;
  }
}
