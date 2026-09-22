import { Injectable } from '@nestjs/common';
import type { Miembro } from '../dominio/entidades.js';
import type { MiembroRepository } from '../dominio/miembro.repository.js';

@Injectable()
export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    {
      id: 1,
      nombre: 'Karla Duarte',
      correo: 'karla@itson.mx',
      membresia: 'premium',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Omar Valdez',
      correo: 'omar@itson.mx',
      membresia: 'plus',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Sofia Ibarra',
      correo: 'sofia@itson.mx',
      membresia: 'basica',
      activo: true,
    },
  ];

  private siguienteId = 4;

  async listar(): Promise<Miembro[]> {
    return this.miembros;
  }

  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.miembros.find((miembro) => miembro.id === id) ?? null;
  }

  async crear(datos: Omit<Miembro, 'id' | 'activo'>): Promise<Miembro> {
    const miembro: Miembro = { id: this.siguienteId++, ...datos, activo: true };
    this.miembros.push(miembro);
    return miembro;
  }

  async actualizar(
    id: number,
    cambios: Partial<Omit<Miembro, 'id'>>,
  ): Promise<Miembro | null> {
    const miembro = await this.buscarPorId(id);
    if (!miembro) return null;

    Object.assign(miembro, cambios);
    return miembro;
  }

  async eliminar(id: number): Promise<Miembro | null> {
    const indice = this.miembros.findIndex((miembro) => miembro.id === id);
    if (indice === -1) return null;

    return this.miembros.splice(indice, 1)[0];
  }
}
