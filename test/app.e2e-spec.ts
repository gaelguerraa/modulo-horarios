import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('API de gimnasio (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('mantiene la ruta principal', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('realiza las cinco operaciones de miembros, horarios y conserva Inscripciones', async () => {
    const servidor = request(app.getHttpServer());

    const listaInicial = await servidor.get('/miembros').expect(200);
    expect(listaInicial.body).toHaveLength(3);

    await servidor
      .get('/miembros/1')
      .expect(200)
      .expect(({ body }) => {
        expect(body.nombre).toBe('Karla Duarte');
      });

    const creado = await servidor
      .post('/miembros')
      .send({
        nombre: 'Elena Cruz',
        correo: 'elena@itson.mx',
        membresia: 'plus',
      })
      .expect(201);
    expect(creado.body).toMatchObject({
      id: 4,
      activo: true,
      nombre: 'Elena Cruz',
    });

    await servidor
      .patch('/miembros/4')
      .send({ membresia: 'premium', activo: false })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          id: 4,
          membresia: 'premium',
          activo: false,
        });
      });

    await servidor.delete('/miembros/4').expect(204);
    await servidor.get('/miembros/4').expect(404);

    const horariosIniciales = await servidor.get('/horarios').expect(200);
    expect(horariosIniciales.body).toHaveLength(3);

    await servidor
      .get('/horarios/1')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ claseId: 1, dia: 'lunes' });
      });

    const horarioCreado = await servidor
      .post('/horarios')
      .send({
        claseId: 3,
        dia: 'viernes',
        horaInicio: '18:00',
        cupoMaximo: 12,
        entrenador: 'Mariana Soto',
      })
      .expect(201);
    expect(horarioCreado.body).toMatchObject({
      id: 4,
      claseId: 3,
      entrenador: 'Mariana Soto',
    });

    await servidor
      .patch('/horarios/4')
      .send({ cupoMaximo: 15, entrenador: 'Rosa Luna' })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ cupoMaximo: 15, entrenador: 'Rosa Luna' });
      });

    await servidor.delete('/horarios/4').expect(204);
    await servidor.get('/horarios/4').expect(404);

    const creada = await servidor
      .post('/inscripciones')
      .send({ horarioId: 1, miembroId: 1 })
      .expect(201);
    expect(creada.body).toMatchObject({
      id: 1,
      horarioId: 1,
      miembroId: 1,
      estado: 'confirmada',
    });
    expect(creada.body.creadaEn).toEqual(expect.any(String));

    await servidor
      .get('/inscripciones/1')
      .expect(200)
      .expect(({ body }) => {
        expect(body.estado).toBe('confirmada');
      });

    await servidor
      .patch('/inscripciones/1/cancelar')
      .expect(200)
      .expect(({ body }) => {
        expect(body.estado).toBe('cancelada');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
