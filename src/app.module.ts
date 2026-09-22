import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { InscripcionesModule } from './CodigoBase/inscripciones/inscripciones.module.js';
import { MiembrosModule } from './CodigoBase/miembros/miembros.module.js';
import { HorariosModule } from './CodigoBase/horarios/horarios.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    InscripcionesModule,
    MiembrosModule,
    HorariosModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'gimnasio-api',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
