import { Inject, Injectable } from '@nestjs/common';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from './dominio/errores.js';
import type { InscripcionRepository } from './dominio/inscripcion.repository.js';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens.js';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repositorio: InscripcionRepository,
  ) {}

  listar() {
    return this.repositorio.listar();
  }

  buscar(id: number) {
    return this.repositorio.buscarPorId(id);
  }

  async crear(datos: CrearInscripcionDto) {
    const horario = await this.repositorio.buscarHorario(datos.horarioId);
    if (!horario) throw new HorarioNoEncontradoError(datos.horarioId);

    const miembro = await this.repositorio.buscarMiembro(datos.miembroId);
    if (!miembro) throw new MiembroNoEncontradoError(datos.miembroId);

    const inscripciones = await this.repositorio.buscarPorHorario(
      datos.horarioId,
    );
    const yaInscrito = inscripciones.some(
      (inscripcion) =>
        inscripcion.miembroId === datos.miembroId &&
        inscripcion.estado === 'confirmada',
    );
    if (yaInscrito)
      throw new InscripcionDuplicadaError(datos.horarioId, datos.miembroId);

    const confirmadas = inscripciones.filter(
      (inscripcion) => inscripcion.estado === 'confirmada',
    );
    if (confirmadas.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(datos.horarioId, horario.cupoMaximo);
    }

    return this.repositorio.guardar(datos);
  }

  cancelar(id: number) {
    return this.repositorio.cancelar(id);
  }
}
