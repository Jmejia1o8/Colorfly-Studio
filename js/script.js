// --- 1. SELECCIÓN DE ELEMENTOS (panel de control)---
const contenedor = document.getElementById('contenedor-paleta');
const selector = document.getElementById('selector-cantidad');
const btnGenerar = document.getElementById('btn-generar');
const btnGuardar = document.getElementById('btn-guardar');
const btnCargar = document.getElementById('btn-cargar');
const toast = document.getElementById('toast');

// Esta variable guardará nuestra paleta actual en la memoria temporal(array vacio)
let paletaActual = [];

// --- 2. FUNCIONES DE GENERACIÓN DE COLOR ---
// toString= Base 16
// Requerimiento: HEX y HSL(total de colores en hexadecimal 16777215)
function generarHEX() {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function generarHSL() {
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
}
