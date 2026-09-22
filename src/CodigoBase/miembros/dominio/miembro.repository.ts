import type { Miembro } from './entidades.js';

// Este contrato pertenece al dominio: no depende de HTTP, NestJS ni de
// la tecnologia que finalmente guarde a los miembros.
export interface MiembroRepository {
  listar(): Promise<Miembro[]>;
  buscarPorId(id: number): Promise<Miembro | null>;
  crear(datos: Omit<Miembro, 'id' | 'activo'>): Promise<Miembro>;
  actualizar(
    id: number,
    cambios: Partial<Omit<Miembro, 'id'>>,
  ): Promise<Miembro | null>;
  eliminar(id: number): Promise<Miembro | null>;
}
