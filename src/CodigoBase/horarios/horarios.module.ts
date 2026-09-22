import { Module } from '@nestjs/common';
import { HorarioMemoriaRepository } from './infra/horario-memoria.repository.js';
import { HorariosController } from './horarios.controller.js';
import { HorariosService } from './horarios.service.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    { provide: HORARIO_REPOSITORY, useClass: HorarioMemoriaRepository },
  ],
})
export class HorariosModule {}
