# Documentación de Uso de Inteligencia Artificial

Este documento detalla el uso de asistentes de Inteligencia Artificial (IA) durante el desarrollo de **Colorfly Studio**. La IA se utilizó como un "Tutor Técnico" (Pair Programmer) para resolver dudas lógicas, depurar errores (debugging) y optimizar el código, manteniendo siempre el control creativo y estructural por parte del desarrollador.

* **Herramienta utilizada:** Google Gemini (Modelo Avanzado)
* **Rol de la IA:** Asistente de programación, depuración y consultoría técnica.

---

##  Registro de Prompts y Resultados

A continuación, se documentan las interacciones clave que definieron el éxito del proyecto:

Prompt Maestro: Arquitectura de Colorfly Studio

**Rol:** Actúa como mi Desarrollador Frontend Senior de apoyo . Yo seré el Arquitecto de Software y te guiaré paso a paso en la construcción de mi proyecto. Tu trabajo es escribir el código limpio, escalable y resolver los bugs que encontremos en la integración, siguiendo estrictamente mis reglas de arquitectura.

**Proyecto:** "Colorfly Studio" - Un generador y gestor interactivo de paletas de colores profesionales.

###  Stack Tecnológico Autorizado:
- **Estructura:** HTML5 semántico.
- **Estilos:** CSS3 puro (Uso de CSS Grid dinámico, Flexbox, variables nativas y diseño Mobile-First). Cero frameworks externos.
- **Lógica:** Vanilla JavaScript . Manipulación directa del DOM, Array methods , y Web Storage API.

###  Requerimientos del Producto :

1. **Generación Matemática:** El sistema debe generar colores aleatorios tanto en formato `HEX` como en `HSL` usando `Math.random()`.

2. **Sistema de Bloqueo (Lock):** Cada tarjeta de color tendrá un estado "bloqueado" . Al generar una nueva paleta, los colores bloqueados deben permanecer inmutables.

3. **Escalabilidad del Grid:** El usuario podrá elegir entre 6, 8 o 9 colores. El CSS Grid debe adaptarse automáticamente (ej. 3 columnas vs 4 columnas).

4. **Preservación de Estado (Prevención de Bugs):** Al redimensionar la paleta (ej. pasar de 5 a 8 colores), el sistema NO debe vaciar el array actual. Debe rellenar los espacios faltantes o recortar los sobrantes, respetando siempre los colores que ya tenían candado.

5. **Micro-interacciones (UX):** Al hacer clic en un código de color, se debe copiar al portapapeles (`navigator.clipboard`) y mostrar un Toast notification temporal.

6. **Persistencia:** Capacidad de guardar las paletas en el `LocalStorage` del navegador y renderizarlas en una "Bodega" lateral.


### 1. Toma de Decisiones Técnicas (HEX vs HSL)
* **Objetivo:** Comprender la mejor práctica en la industria para manipular colores en el DOM.
* **Prompt utilizado:** *"Actúa como un arquitecto frontend. Necesito que compares el uso de formatos HEX y HSL para manipulación dinámica del DOM en tiempo real. Analiza los pros y contras en términos de rendimiento de renderizado del navegador frente a la accesibilidad y UX para el usuario final."*
* **Resultado de la IA:** Explicación detallada sobre el uso de HEX (`#RRGGBB`) por su rendimiento y compatibilidad universal en navegadores, y el uso de HSL para facilitar la lectura al usuario humano.
* **Captura de pantalla:**
    *(Inserta tu imagen aquí: `![Captura HEX vs HSL](./assets/ia-hex.png)`)*

### 2. Depuración de Lógica (Bug del Candado)
* **Objetivo:** Solucionar un error crítico donde el cambio en la cantidad de colores borraba la memoria de los colores bloqueados.
* **Prompt utilizado:** *"Estoy enfrentando un problema de pérdida de estado en JavaScript. Al redimensionar mi array paletaActual, el sistema sobrescribe y elimina los objetos que tienen la propiedad bloqueado: true. Refactoriza la función generadora utilizando métodos de array inmutables (map, filter, while) para preservar los estados previos al adaptar el tamaño del Grid."*
* **Resultado de la IA:** Diagnóstico del error (`paletaActual = []`) y reestructuración de la función `crearPaleta()` utilizando los métodos `while` para rellenar vacíos y `map` para respetar la propiedad `bloqueado: true` de los objetos existentes.
* **Captura de pantalla:**
    *(Inserta tu imagen aquí: `![Captura Bug Candado](./assets/ia-bug.png)`)*

### 3. Solución de Errores de Sintaxis (ReferenceError)
* **Objetivo:** Encontrar la causa de un fallo que congelaba el botón de "Generar".
* **Prompt utilizado:** La consola del navegador arroja un Uncaught ReferenceError: generarHexAleatorio is not defined en la línea 48 de mi script, específicamente dentro del callback de un Array.map(). ¿Es un problema de error tipográfico en la declaración de la función?*
* **Resultado de la IA:** Identificación rápida de un error de nomenclatura en la llamada a la función (typo) y confirmación del correcto orden de ejecución de las funciones globales.
* **Captura de pantalla:**
    *(Inserta tu imagen aquí: `![Captura Error Consola](./assets/ia-consola.png)`)*

### 4. Implementación de Diseño Responsivo
* **Objetivo:** Adaptar la aplicación para dispositivos móviles tras pruebas iniciales fallidas.
* **Prompt utilizado:** *"La estructura actual basada en CSS Grid no es responsiva y presenta desbordamiento horizontal (overflow) en el viewport móvil. Genera las Media Queries necesarias (max-width: 600px y 900px) para implementar un diseño fluido, transformando el grid-template-columns a '1fr' y optimizando el área táctil (touch target) de los controles UI"*
* **Resultado de la IA:** Generación del bloque CSS con `@media queries` para pantallas de `<900px` y `<600px`, reestructurando el `grid-template-columns` a 1 y 2 fracciones (`1fr`) y optimizando el ancho de los botones al 100% para mejor UX táctil.
* **Captura de pantalla:**
    *(Inserta tu imagen aquí: `![Captura Diseño Movil](./assets/ia-movil.png)`)*

---
*Nota: Todo el código sugerido por la IA fue analizado, probado e integrado manualmente para asegurar la coherencia del proyecto.*