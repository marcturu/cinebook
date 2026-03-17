# ⚡ PEC 1 - Desarrollo Frontend con Framework JavaScript

![JavaScript](https://img.shields.io/badge/JavaScript-ES5-yellow)  
<sub>🗓️ Desarrollado en marzo del 2026</sub>

| Campo | Valor |
|---|---|
| **Login UOC** | mturur |
| **Nombre** | Marc Turu Roca |
| **Máster** | Desarrollo de Sitios y Aplicaciones Web |

--- 

## Decisiones técnicas generales

Este proyecto usa ES5 de forma intencionada, lo que implica:

- Concatenación de strings con `+` en vez de template literals.
- `var` en vez de `const` / `let`.
- Funciones declaradas con `function` en vez de arrow functions.

### Estructura de ramas

Se ha trabajado con ramas Git a pesar de ser un proyecto individual, con el objetivo de mantener un historial limpio y organizado. Los merges se han realizado con `--no-ff` para preservar el commit de merge aunque la rama base no hubiera cambiado.

## Ejercicios

### PEC1_Ej2_1 - Formulario con validación
- Validación extra: máximo de 15 caracteres para el `username`.
- El campo `age` se trata como `text` en vez de `number` para poder validar correctamente desde JavaScript (`value` devuelve `''` cuando contiene letras).
- Se comprueba que los campos no estén vacíos antes de las validaciones más específicas, para mejorar la comunicación con el usuario.

### PEC1_Ej2_2 - Calculadora de tipo de cambio
- Con `Shift+Ctrl+R` se puede apreciar mejor el estado de carga con imagen animada.

### PEC1_Ej2_3 - Reserva de asientos
- Los precios base están en EUR. Al cambiar de moneda se consulta la API en tiempo real y se actualizan tanto los labels del select de películas como el precio total.
- Se excluyen decimales para monedas que no los usan convencionalmente (JPY, KRW, CLP...).
- El indicador de carga es un mensaje de texto, a diferencia del **PEC1_Ej2_2** que usa una imagen animada.

### Hotfixes
Rama dedicada a correcciones menores transversales: variables globales, diseño responsive, comentarios en el código y mejoras de UI.

---

> Marc Turu Roca · Máster Universitario de Desarrollo de Sitios y Aplicaciones Web