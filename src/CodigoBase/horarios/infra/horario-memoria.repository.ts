import { Injectable } from '@nestjs/common';
import type { Horario } from '../dominio/entidades.js';
import type { HorarioRepository } from '../dominio/horario.repository.js';

@Injectable()
export class HorarioMemoriaRepository implements HorarioRepository {
  private horarios: Horario[] = [
    {
      id: 1,
      claseId: 1,
      dia: 'lunes',
      horaInicio: '07:00',
      cupoMaximo: 2,
      entrenador: 'Ana Robles',
    },
    {
      id: 2,
      claseId: 1,
      dia: 'miercoles',
      horaInicio: '07:00',
      cupoMaximo: 3,
      entrenador: 'Ana Robles',
    },
    {
      id: 3,
      claseId: 2,
      dia: 'martes',
      horaInicio: '19:00',
      cupoMaximo: 4,
      entrenador: 'Luis Fierro',
    },
  ];

  private siguienteId = 4;

  async listar(): Promise<Horario[]> {
    return this.horarios;
  }

  async buscarPorId(id: number): Promise<Horario | null> {
    return this.horarios.find((horario) => horario.id === id) ?? null;
  }

  async crear(datos: Omit<Horario, 'id'>): Promise<Horario> {
    const horario: Horario = { id: this.siguienteId++, ...datos };
    this.horarios.push(horario);
    return horario;
  }

  async actualizar(
    id: number,
    cambios: Partial<Omit<Horario, 'id'>>,
  ): Promise<Horario | null> {
    const horario = await this.buscarPorId(id);
    if (!horario) return null;

    Object.assign(horario, cambios);
    return horario;
  }

  async eliminar(id: number): Promise<Horario | null> {
    const indice = this.horarios.findIndex((horario) => horario.id === id);
    if (indice === -1) return null;

    return this.horarios.splice(indice, 1)[0];
  }
}
