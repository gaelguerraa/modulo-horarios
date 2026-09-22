# Práctica 7 — API de gimnasio

API construida con NestJS para administrar **Miembros**, **Horarios** e **Inscripciones**. Los módulos Miembros y Horarios aplican el patrón de dominio, repositorio, token de inyección, servicio, controlador y módulo.

## Ejecutar el proyecto

```bash
npm install
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

## Rutas

### Miembros

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/miembros` | Lista los miembros iniciales. |
| GET | `/miembros/:id` | Busca un miembro por id. |
| POST | `/miembros` | Crea un miembro con `nombre`, `correo` y `membresia`. |
| PATCH | `/miembros/:id` | Actualiza esos campos y/o `activo`. |
| DELETE | `/miembros/:id` | Elimina un miembro (respuesta `204`). |

Ejemplo para crear un miembro:

```json
{
  "nombre": "Elena Cruz",
  "correo": "elena@itson.mx",
  "membresia": "plus"
}
```

### Horarios

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/horarios` | Lista los horarios iniciales. |
| GET | `/horarios/:id` | Busca un horario por id. |
| POST | `/horarios` | Crea un horario con `claseId`, `dia`, `horaInicio`, `cupoMaximo` y `entrenador`. |
| PATCH | `/horarios/:id` | Actualiza cualquiera de esos campos. |
| DELETE | `/horarios/:id` | Elimina un horario (respuesta `204`). |

Ejemplo para crear un horario:

```json
{
  "claseId": 3,
  "dia": "viernes",
  "horaInicio": "18:00",
  "cupoMaximo": 12,
  "entrenador": "Mariana Soto"
}
```

### Inscripciones

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/inscripciones` | Lista inscripciones. |
| GET | `/inscripciones/:id` | Busca una inscripción. |
| POST | `/inscripciones` | Crea una inscripción con `horarioId` y `miembroId`. |
| PATCH | `/inscripciones/:id/cancelar` | Cancela una inscripción. |

Las reglas de cupo, duplicados y existencia de horario/miembro permanecen exclusivamente en `InscripcionesService`.

## Respuestas de la práctica

1. **¿Por qué `MiembroRepository` no menciona Express, NestJS ni memoria?** Porque define el contrato del dominio, no el mecanismo de transporte ni almacenamiento. Así el servicio depende de operaciones de miembros y se puede intercambiar memoria por otra infraestructura sin cambiarlo.
2. **¿Qué palabra promete que la clase en memoria cumple la interfaz?** `implements` en `MiembroMemoriaRepository implements MiembroRepository`.
3. **¿Por qué el Service no sabe qué es una petición HTTP?** Solo recibe DTOs y delega al repositorio; no usa controladores, rutas, códigos de estado ni objetos `Request`/`Response`. El controlador traduce HTTP hacia y desde el servicio.
4. **¿Por qué el Service se inyecta sin token en el Controller y el repositorio sí necesita uno?** `HorariosService` es una clase existente en tiempo de ejecución y puede ser su propio token. `HorarioRepository` es una interfaz de TypeScript, se borra al ejecutar el programa y por eso requiere el símbolo `HORARIO_REPOSITORY` como token.
5. **Si mandas un `claseId` que no es número, ¿qué código de estado esperarías, y por qué este Controller no lo detecta?** Con la implementación actual se responde `201 Created`, porque no hay un `ValidationPipe` ni decoradores de validación en el DTO. Además, los DTO son interfaces y se eliminan al compilar TypeScript, así que el Controller recibe el cuerpo sin comprobar el tipo de `claseId`. Un `400 Bad Request` requeriría añadir validación explícita, lo cual no forma parte de este módulo.

La prueba e2e ejecuta las cinco operaciones de Miembros y Horarios y, en la misma aplicación, crea, consulta y cancela una inscripción conservando las respuestas esperadas.

## Verificaciones

```bash
npm run build
npm test
npm run test:e2e
npm run lint
```
