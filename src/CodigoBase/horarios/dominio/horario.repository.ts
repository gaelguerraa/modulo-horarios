import type { Horario } from './entidades.js';

// Este contrato pertenece al dominio: no depende de HTTP, NestJS ni de
// la tecnologia que finalmente guarde a los horarios.
export interface HorarioRepository {
  listar(): Promise<Horario[]>;
  buscarPorId(id: number): Promise<Horario | null>;
  crear(datos: Omit<Horario, 'id'>): Promise<Horario>;
  actualizar(
    id: number,
    cambios: Partial<Omit<Horario, 'id'>>,
  ): Promise<Horario | null>;
  eliminar(id: number): Promise<Horario | null>;
}
