import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from './dominio/errores.js';
import { InscripcionesService } from './inscripciones.service.js';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Get()
  async listar() {
    return (await this.inscripcionesService.listar()).map(aInscripcionDto);
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const inscripcion = await this.inscripcionesService.buscar(id);
    if (!inscripcion)
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    return aInscripcionDto(inscripcion);
  }

  @Post()
  async crear(@Body() datos: CrearInscripcionDto) {
    try {
      return aInscripcionDto(await this.inscripcionesService.crear(datos));
    } catch (error) {
      if (
        error instanceof HorarioNoEncontradoError ||
        error instanceof MiembroNoEncontradoError
      ) {
        throw new NotFoundException(error.message);
      }
      if (
        error instanceof CupoLlenoError ||
        error instanceof InscripcionDuplicadaError
      ) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id/cancelar')
  async cancelar(@Param('id', ParseIntPipe) id: number) {
    const inscripcion = await this.inscripcionesService.cancelar(id);
    if (!inscripcion)
      throw new NotFoundException(`No existe la inscripcion ${id}`);
    return aInscripcionDto(inscripcion);
  }
}
