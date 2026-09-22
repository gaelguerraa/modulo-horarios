import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import { HorariosService } from './horarios.service.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Get()
  listar() {
    return this.horariosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const horario = await this.horariosService.buscar(id);
    if (!horario) throw new NotFoundException(`No existe el horario ${id}`);
    return horario;
  }

  @Post()
  crear(@Body() datos: CrearHorarioDto) {
    return this.horariosService.crear(datos);
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: ActualizarHorarioDto,
  ) {
    const horario = await this.horariosService.actualizar(id, cambios);
    if (!horario) throw new NotFoundException(`No existe el horario ${id}`);
    return horario;
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const horario = await this.horariosService.eliminar(id);
    if (!horario) throw new NotFoundException(`No existe el horario ${id}`);
  }
}
