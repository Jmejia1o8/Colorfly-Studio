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

// --- 3. LÓGICA DE LA PALETA ---
function crearPaleta() {
    const cantidad = parseInt(selector.value);
    
    // Configuramos el Grid (3 columnas para 6 y 9, 4 columnas para 8)
    contenedor.className = cantidad === 8 ? 'grid-paleta grid-4' : 'grid-paleta grid-3';
    
    // Si la paleta no tiene colores, la llenamos vacía primero (.fill o from)(DUDA)*********
    if (paletaActual.length !== cantidad) {
        paletaActual = Array.from({ length: cantidad }, () => ({ hex: "", hsl: "", bloqueado: false }));    }
//-----------------------------------------------------------------------------------------------------------
    // ⭐ EXTRA POINT: Bloqueo de colores. 
    // Solo generamos un color NUEVO si el actual NO está bloqueado.
    paletaActual = paletaActual.map(color => {
        if (color.bloqueado) return color; // Si está bloqueado, lo dejamos quieto
        return { hex: generarHEX(), hsl: generarHSL(), bloqueado: false }; // Si no, generamos uno nuevo
    });

    renderizarDOM();
}


function renderizarDOM() {
    contenedor.innerHTML = ''; // Limpiamos la bodega
        const formatoElegido = selectorFormato.value; // ¿HEX o HSL?

paletaActual.forEach((color, index) => {
// Creamos la tarjeta...
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-color';
    tarjeta.style.backgroundColor = color.hex;

// --- EL CAMBIO CLAVE ---
// Elegimos qué texto mostrar según el selector
    const textoColor = formatoElegido === 'hex' ? color.hex : color.hsl;

    tarjeta.innerHTML = `
        <span class="info-color">${textoColor}</span>
        <button class="btn-copiar">Copiar</button>
        <button class="btn-candado ${color.bloqueado ? 'bloqueado' : ''}">
            ${color.bloqueado ? '🔒' : '🔓'}
        </button>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}
