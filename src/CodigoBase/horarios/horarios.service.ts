import { Inject, Injectable } from '@nestjs/common';
import type { HorarioRepository } from './dominio/horario.repository.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';

@Injectable()
export class HorariosService {
  constructor(
    @Inject(HORARIO_REPOSITORY) private readonly repositorio: HorarioRepository,
  ) {}

  listar() {
    return this.repositorio.listar();
  }

  buscar(id: number) {
    return this.repositorio.buscarPorId(id);
  }

  crear(datos: CrearHorarioDto) {
    return this.repositorio.crear(datos);
  }

  actualizar(id: number, cambios: ActualizarHorarioDto) {
    return this.repositorio.actualizar(id, cambios);
  }

  eliminar(id: number) {
    return this.repositorio.eliminar(id);
  }
}
