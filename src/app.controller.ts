import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';


interface Clase{
  id: number;
  nombre: string;
}

const clases: Clase[] = [
  { id: 1, nombre: 'Yoga' },
  { id: 2, nombre: 'Pilates' },
  { id: 3, nombre: 'Spinning' },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('clases')
  getClases(): Clase[] {
    return clases;
  }

  @Post('clases')
  crear(@Body() cuerpo: { nombre: string }): Clase {
    const nuevaClase: Clase = {
      id: clases.length + 1,
      nombre: cuerpo.nombre,   
  };
  clases.push(nuevaClase);
  return nuevaClase;
  }   
}
