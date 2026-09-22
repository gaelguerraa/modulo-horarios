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
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';
import type { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import { MiembrosService } from './miembros.service.js';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Get()
  listar() {
    return this.miembrosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const miembro = await this.miembrosService.buscar(id);
    if (!miembro) throw new NotFoundException(`No existe el miembro ${id}`);
    return miembro;
  }

  @Post()
  crear(@Body() datos: CrearMiembroDto) {
    return this.miembrosService.crear(datos);
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: ActualizarMiembroDto,
  ) {
    const miembro = await this.miembrosService.actualizar(id, cambios);
    if (!miembro) throw new NotFoundException(`No existe el miembro ${id}`);
    return miembro;
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const miembro = await this.miembrosService.eliminar(id);
    if (!miembro) throw new NotFoundException(`No existe el miembro ${id}`);
  }
}
