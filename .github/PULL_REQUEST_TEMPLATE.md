# Pull Request

## Descripción

Describe los cambios realizados en este PR de forma clara y concisa.

## Tipo de cambio

Marca con una `x` la opción que aplica:

- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de bug (bugfix)
- [ ] Refactoring de código
- [ ] Mejora de performance
- [ ] Actualización de documentación
- [ ] Cambios en configuración/setup
- [ ] Tests

## Motivación y Contexto

¿Por qué es necesario este cambio? ¿Qué problema resuelve?

Fixes #(issue number)

## Testing

Describe cómo se probaron estos cambios:

- [ ] Tests unitarios añadidos/actualizados
- [ ] Tests de integración añadidos/actualizados
- [ ] Tests E2E añadidos/actualizados
- [ ] Probado manualmente en local
- [ ] Probado en staging

## Screenshots (si aplica)

Si hay cambios visuales, adjunta screenshots o GIFs.

### Antes
<!-- Screenshot del estado anterior -->

### Después
<!-- Screenshot del nuevo estado -->

## Checklist

Marca con una `x` cada item completado:

### Code Quality
- [ ] El código sigue las convenciones del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado áreas complejas del código
- [ ] ESLint pasa sin errores (`npm run lint`)
- [ ] TypeScript compila sin errores (`npm run type-check`)
- [ ] Prettier formateó el código (`npm run format`)

### Testing
- [ ] Tests pasan exitosamente (`npm run test`)
- [ ] Coverage de tests mantiene/mejora el estándar (>80%)
- [ ] Build de producción exitoso (`npm run build`)

### Documentation
- [ ] Actualicé la documentación relevante
- [ ] Actualicé los comentarios de código si fue necesario
- [ ] Actualicé el CHANGELOG.md (si aplica)

### Performance & Accessibility
- [ ] Consideré el impacto en performance
- [ ] Verifiqué accesibilidad (WCAG 2.1 AA)
- [ ] Probé en mobile/responsive

### Security
- [ ] No hay secrets hardcodeados
- [ ] Inputs están validados
- [ ] No hay vulnerabilidades de seguridad

## Impacto en otras áreas

¿Este cambio afecta otras partes del proyecto?

- [ ] No hay breaking changes
- [ ] Hay breaking changes (describe abajo)

### Breaking Changes

Si hay breaking changes, describe:
- Qué se rompe
- Cómo migrar
- Alternativas disponibles

## Información Adicional

Cualquier información adicional relevante para los reviewers.

## Deployment Notes

¿Hay algo especial que se debe hacer al deployar?

- [ ] Requiere migraciones de base de datos
- [ ] Requiere nuevas variables de entorno
- [ ] Requiere cambios en configuración
- [ ] Requiere invalidación de cache

### Variables de Entorno

Si se requieren nuevas env vars, listarlas aquí:

```
NUEVA_VAR=valor
```

## Reviewers

Tag a las personas relevantes: @username

---

**Nota para reviewers**: Por favor verificar el checklist antes de aprobar.
