// --- 1. SELECCIÓN DE ELEMENTOS (panel de control) ---
const contenedor = document.getElementById('contenedor-paleta');
const selector = document.getElementById('selector-cantidad');
const btnGenerar = document.getElementById('btn-generar');
const btnGuardar = document.getElementById('btn-guardar');
const btnCargar = document.getElementById('btn-cargar');
const toast = document.getElementById('toast');
const selectorFormato = document.getElementById('selector-formato');

// Esta variable guardará nuestra paleta actual
let paletaActual = [];

// --- 2. FUNCIONES DE GENERACIÓN DE COLOR ---
function generarHEX() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function generarHSL() {
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
}

// --- 3. LÓGICA DE LA PALETA (El Motor) ---
function crearPaleta() {
    const cantidad = parseInt(selector.value);
    
    // Ajustamos el Grid
    contenedor.className = cantidad === 8 ? 'grid-paleta grid-4' : 'grid-paleta grid-3';
    
    // Si faltan colores, los agregamos como objetos vacíos
    while (paletaActual.length < cantidad) {
        paletaActual.push({ hex: "", hsl: "", bloqueado: false });
    }

    // Si sobran, recortamos
    if (paletaActual.length > cantidad) {
        paletaActual = paletaActual.slice(0, cantidad);
    }

    // Generador Inteligente que respeta los candados
    paletaActual = paletaActual.map(color => {
        if (color.bloqueado && color.hex !== "") {
            return color; 
        } else {
            return {
                ...color,
                hex: generarHEX(),
                hsl: generarHSL()
            };
        }
    });

    renderizarDOM();
}

// --- 4. RENDERIZADO VISUAL (La Vitrina) ---
function renderizarDOM() {
    contenedor.innerHTML = ''; // Limpiamos la bodega
    const formatoElegido = selectorFormato.value.toLowerCase(); // ¿HEX o HSL?

    paletaActual.forEach((color, index) => {
        // 1. Creamos la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-color';
        tarjeta.style.backgroundColor = color.hex;
        tarjeta.tabIndex = 0; 
        tarjeta.title = "Clic para copiar";

        // 2. Calculamos qué texto mostrar limpio (HEX o los números de HSL)
        let textoMostrar = "";
        if (formatoElegido === 'hsl') {
            if (color.hsl && color.hsl !== "") {
                const valores = color.hsl.match(/\d+/g); 
                if (valores && valores.length >= 3) {
                    textoMostrar = `${valores[0]}, ${valores[1]}%, ${valores[2]}%`;
                } else {
                    textoMostrar = "Generando...";
                }
            }
        } else {
            textoMostrar = color.hex ? color.hex.toUpperCase() : "Generando...";
        }

        // 3. Evento para copiar el texto que se está mostrando actualmente
        tarjeta.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') copiarAlPortapapeles(textoMostrar);
        });

        // 4. Etiqueta del código (El Párrafo)
        const info = document.createElement('div');
        info.className = 'info-color';
        info.textContent = textoMostrar; // Le inyectamos el cálculo

        // 5. Botón de Candado
        const btnCandado = document.createElement('button');
        btnCandado.className = 'btn-candado';
        btnCandado.textContent = color.bloqueado ? '🔒' : '🔓';
        btnCandado.title = color.bloqueado ? 'Desbloquear color' : 'Bloquear color';
        
        btnCandado.addEventListener('click', () => {
            paletaActual[index].bloqueado = !paletaActual[index].bloqueado;
            renderizarDOM(); 
        });

        // 6. Empacamos todo
        tarjeta.appendChild(info);
        tarjeta.appendChild(btnCandado);
        contenedor.appendChild(tarjeta);
    });
}

// --- 5. FUNCIONES EXTRA ---
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        toast.classList.remove('oculto');
        toast.textContent = `¡Código ${texto} copiado!`;
        setTimeout(() => toast.classList.add('oculto'), 2000);
    });
}

btnGuardar.addEventListener('click', () => {
    localStorage.setItem('paletaGuardadaColorfly', JSON.stringify(paletaActual));
    alert("¡Paleta guardada en el navegador!");
});

btnCargar.addEventListener('click', () => {
    const guardado = localStorage.getItem('paletaGuardadaColorfly');
    if (guardado) {
        paletaActual = JSON.parse(guardado);
        selector.value = paletaActual.length;
        renderizarDOM();
    } else {
        alert("No hay paletas guardadas.");
    }
});

// --- 6. ARRANQUE INICIAL ---
btnGenerar.addEventListener('click', crearPaleta);
selectorFormato.addEventListener('change', renderizarDOM);
selector.addEventListener('change', crearPaleta);

// Arrancamos el motor la primera vez que carga la página
crearPaleta();
