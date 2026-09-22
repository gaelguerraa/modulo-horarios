import { Inject, Injectable } from '@nestjs/common';
import type { MiembroRepository } from './dominio/miembro.repository.js';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';
import type { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY) private readonly repositorio: MiembroRepository,
  ) {}

  listar() {
    return this.repositorio.listar();
  }

  buscar(id: number) {
    return this.repositorio.buscarPorId(id);
  }

  crear(datos: CrearMiembroDto) {
    return this.repositorio.crear(datos);
  }

  actualizar(id: number, cambios: ActualizarMiembroDto) {
    return this.repositorio.actualizar(id, cambios);
  }

  eliminar(id: number) {
    return this.repositorio.eliminar(id);
  }
}
