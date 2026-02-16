
function formatearFechaCompleta(fechaStr) {
    const fecha = new Date(fechaStr);
    

    const opcionesFecha = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    

    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';
    

    horas = horas % 12;
    horas = horas ? horas : 12; 
    
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha)
        .replace(/^\w/, c => c.toUpperCase());
    
    return `${fechaFormateada} - ${horas}:${minutos} ${ampm}`;
}


function obtenerUltimaFecha() {
    if (CARTAS.length === 0) return "Sin cartas aún";
    
  
    const cartasOrdenadas = [...CARTAS].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ultimaCarta = cartasOrdenadas[0];
    
    const fecha = new Date(ultimaCarta.fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function crearCartaHTML(carta) {
    const article = document.createElement('article');
    article.className = 'carta';
    
 
    const fechaFormateada = formatearFechaCompleta(carta.fecha);
    

    let contenidoHTML = carta.contenido;
    
  
    contenidoHTML = contenidoHTML.replace(/\n/g, '<br>');
    
  
    let imagenesHTML = '';
    if (carta.imagenes && Array.isArray(carta.imagenes) && carta.imagenes.length > 0) {
        imagenesHTML = carta.imagenes.map(imgConfig => {
        
            if (typeof imgConfig === 'string') {
                const rutaLimpia = imgConfig.replace(/\\/g, '/');
                return `<img src="${rutaLimpia}" alt="Imagen de la carta" class="carta-imagen imagen-centro imagen-mediana">`;
            }
          
            else {
                const rutaLimpia = imgConfig.ruta.replace(/\\/g, '/');
                const posicion = imgConfig.posicion || 'centro';
                const tamaño = imgConfig.tamaño || 'mediana';
                return `<img src="${rutaLimpia}" alt="Imagen de la carta" class="carta-imagen imagen-${posicion} imagen-${tamaño}">`;
            }
        }).join('');
    }
    
    article.innerHTML = `
        <div class="carta-header">
            <span class="fecha-carta">${fechaFormateada}</span>
            <span class="dedicado">For Rubí</span>
        </div>
        <div class="contenido-carta">
            ${contenidoHTML}
        </div>
        ${imagenesHTML ? `<div class="imagenes-container">${imagenesHTML}</div>` : ''}
        <div class="firma">-☀️</div>
    `;
    
    return article;
}


const CARTAS = [
    {
        fecha: "2025-02-21T15:30:00",  
        contenido: "Voy a luchar por ti, siempre. No me importa que tipos de medios de comunicación tenga que encontrar o si incluso los tenga que inventar.",

    }
]


const TEXTO_FOOTER = "Love U.";  

function cargarCartas() {
    const container = document.getElementById('cartasContainer');
    container.innerHTML = '';
    
    // Ordenar por fecha (más reciente primero)
    CARTAS.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    for (const carta of CARTAS) {
        const cartaElement = crearCartaHTML(carta);
        container.appendChild(cartaElement);
    }
    
    // Actualizar el subtítulo con la última fecha
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const ultimaFecha = obtenerUltimaFecha();
        subtitle.textContent = `Última carta: ${ultimaFecha}`;
    }
    
    // Actualizar el footer
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.textContent = `✦ ${TEXTO_FOOTER} ✦`;
    }
}

document.addEventListener('DOMContentLoaded', cargarCartas);