# Colorfly Studio

Colorfly Studio: Es una herramienta web profesional diseñada para la generación, gestión y exportación de paletas de colores. Desarrollada con un enfoque en la eficiencia del flujo de trabajo creativo, permite a diseñadores y desarrolladores encontrar la combinación perfecta para sus proyectos de identidad visual.

---

## Funcionalidades Principales

- **Generación Inteligente:** Algoritmos para crear colores aleatorios en formatos HEX y HSL.
- **Sistema de Bloqueo (Locking):** Permite proteger colores específicos mientras se regenera el resto de la paleta.
- **Persistencia de Datos:** Integración con `LocalStorage` para guardar y recuperar paletas personalizadas, incluso después de cerrar el navegador.
- **Microfeedback de Usuario:** Notificaciones tipo "Toast" al copiar códigos al portapapeles.
- **Diseño Responsivo:** Interfaz adaptable optimizada para smartphones, tablets y desktop.

## Demo Visual y Flujo de la App

Para ver el funcionamiento de la aplicación en tiempo real y capturas de la interfaz en diferentes dispositivos, puedes acceder a nuestra carpeta compartida de recursos:

📂 [Acceder a la Galería de Capturas y GIFs (Google Drive)](https://drive.google.com/drive/folders/1R7UnZ6iGqdO4XLSl2FEmO2iy_Rz8AtML?usp=drive_link)

### El flujo principal incluye:
1. **Generación Inicial:** Carga de paleta automática al abrir la web.
2. **Personalización:** Bloqueo de colores y cambio de formato HEX/HSL.
3. **Adaptabilidad:** Vista en dispositivos móviles (Responsive Design).
4. **Persistencia:** Demostración de guardado y carga de datos.

## Decisiones Técnicas

Para este proyecto se optó por una arquitectura de **Vanilla JavaScript** (JS puro) por las siguientes razones:

1.  **Rendimiento:** Al no depender de librerías externas, la carga es instantánea y el consumo de memoria es mínimo.

2.  **Manipulación Directa del DOM:** Se utilizó la técnica de `appendChild` para construir la interfaz dinámicamente, garantizando un control total sobre cada elemento.

3.  **Lógica de "Rellenar el Cupo":** Se implementó un motor de generación basado en `while` y `map` que respeta los estados bloqueados, permitiendo una experiencia de usuario fluida al cambiar el tamaño de la paleta (de 6 a 9 colores).

4.  **CSS Grid Moderno:** Uso de cuadrículas dinámicas para mantener la simetría visual en cualquier dispositivo.

## Instrucciones de Uso

1.  **Generar:** Haz clic en el botón "Generar" para crear una nueva paleta.
2.  **Bloquear:** Pulsa el icono del candado en cualquier color para protegerlo.
3.  **Copiar:** Haz clic en cualquier tarjeta de color para copiar el código HEX/HSL automáticamente.
4.  **Guardar/Cargar:** Utiliza los botones de la bodega para almacenar tus paletas favoritas en el navegador.

##  Ejecución y Despliegue

### Local
Solo necesitas clonar el repositorio y abrir el archivo `index.html` en cualquier navegador moderno.

### Despliegue (GitHub Pages)
1.  Sube tu código a un repositorio de GitHub.
2.  Ve a **Settings > Pages**.
3.  En "Branch", selecciona `main` y la carpeta `/ (root)`.
4.  Guarda y en pocos minutos tu aplicación estará en vivo.

