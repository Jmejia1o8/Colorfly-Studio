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
    
    // 1. Ajustamos el Grid (Esto no cambia)
    contenedor.className = cantidad === 8 ? 'grid-paleta grid-4' : 'grid-paleta grid-3';
    
    // 2. REGLA DE ORO: Si faltan colores, los agregamos como objetos vacíos
    while (paletaActual.length < cantidad) {
        paletaActual.push({ hex: "", hsl: "", bloqueado: false });
    }

    // 3. Si sobran (porque bajamos el número), recortamos
    if (paletaActual.length > cantidad) {
        paletaActual = paletaActual.slice(0, cantidad);
    }

    // 4. EL GENERADOR INTELIGENTE:
    // Recorremos la lista y solo cambiamos los que NO están bloqueados
    paletaActual = paletaActual.map(color => {
        if (color.bloqueado && color.hex !== "") {
            return color; // Si está bloqueado y tiene color, déjelo quieto
        } else {
            // Si no está bloqueado (o está vacío), generamos color nuevo
            return {
                ...color,
                hex: generarHEX(),
                hsl: generarHSL()
            };
        }
    });



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

// --- 4. RENDERIZADO VISUAL ---
function renderizarDOM() {
    contenedor.innerHTML = ''; // Limpiamos la vitrina

    paletaActual.forEach((color, index) => {
        // Creamos la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-color';
        tarjeta.style.backgroundColor = color.hex;

     // ⭐ EXTRA POINT: Copiar al portapapeles
        // Accesibilidad: Agregamos title y tabindex(Tab)
        tarjeta.tabIndex = 0; 
        tarjeta.title = "Clic para copiar";
        tarjeta.addEventListener('click', (e) => {
            // Evitamos que copiar active el candado si le dimos clic al botón del candado...
            if(e.target.tagName !== 'BUTTON') copiarAlPortapapeles(color.hex);
        });
// Etiqueta del código
        const info = document.createElement('div');
        info.className = 'info-color';
        info.textContent = color.hex; // Mostramos HEX como pidió el cliente

        // ⭐ EXTRA POINT: Botón de Bloqueo
        const btnCandado = document.createElement('button');
        btnCandado.className = 'btn-candado';
        btnCandado.textContent = color.bloqueado ? '🔒' : '🔓';
        btnCandado.title = color.bloqueado ? 'Desbloquear color' : 'Bloquear color';
        
        // Evento para bloquear/desbloquear
        btnCandado.addEventListener('click', () => {
            paletaActual[index].bloqueado = !paletaActual[index].bloqueado;
            renderizarDOM(); // Refrescamos para mostrar el candado cerrado/abierto
        });

        tarjeta.appendChild(info);
        tarjeta.appendChild(btnCandado);
        contenedor.appendChild(tarjeta);
    });
}


// --- 5. FUNCIONES EXTRA (LOS PUNTOS ADICIONALES) ---

// ⭐ EXTRA POINT: Copiar al portapapeles y Microfeedback
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Mostramos el Toast
        toast.classList.remove('oculto');
        toast.textContent = `¡Código ${texto} copiado!`;
        // Lo ocultamos después de 2 segundos
        setTimeout(() => toast.classList.add('oculto'), 2000);
    });
}

// ⭐ EXTRA POINT: Guardado en LocalStorage
// LocalStorage es como la bodega a largo plazo del navegador.
btnGuardar.addEventListener('click', () => {
    // Convertimos nuestra lista (Array) a texto (JSON) para poder guardarlo
    localStorage.setItem('paletaGuardadaColorfly', JSON.stringify(paletaActual));
    alert("¡Paleta guardada en el navegador!");
});
btnCargar.addEventListener('click', () => {
    // Buscamos si hay algo guardado
    const guardado = localStorage.getItem('paletaGuardadaColorfly');
    if (guardado) {
        paletaActual = JSON.parse(guardado); // Lo volvemos a convertir en lista
        selector.value = paletaActual.length; // Ajustamos el select
        renderizarDOM();
    } else {
        alert("No hay paletas guardadas.");
    }
});

// --- 6. ARRANQUE INICIAL ---
btnGenerar.addEventListener('click', crearPaleta);

selectorFormato.addEventListener('change', () => {
    renderizarDOM(); // Simplemente volvemos a dibujar con el nuevo formato
});

// Al cambiar el selector, generamos una paleta nueva para adaptarnos al tamaño(Corregir)
selector.addEventListener('change', crearPaleta);

