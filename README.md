# Práctica 7 — API de gimnasio

API construida con NestJS para administrar **Miembros** e **Inscripciones**. La práctica repite para `Miembro` el patrón de dominio, repositorio, token de inyección, servicio, controlador y módulo que ya usa Inscripciones.

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
4. **¿Por qué el Service se inyecta sin token en el Controller y el repositorio sí necesita uno?** `MiembrosService` es una clase existente en tiempo de ejecución y puede ser su propio token. `MiembroRepository` es una interfaz de TypeScript, se borra al ejecutar el programa y por eso requiere el símbolo `MIEMBRO_REPOSITORY` como token.

La evidencia de que Miembros no rompió Inscripciones es la prueba e2e: ejecuta las cinco operaciones de Miembros y, en la misma aplicación, crea, consulta y cancela una inscripción conservando las respuestas esperadas.

## Verificaciones

```bash
npm run build
npm test
npm run test:e2e
npm run lint
```
