// ---------- CUENTA REGRESIVA ----------
const countdownEl = document.getElementById('countdown');
const fechaEvento = new Date(countdownEl.dataset.fecha).getTime();

document.getElementById('fecha-legible').textContent = new Date(fechaEvento).toLocaleString('es-MX', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
});

function actualizarCountdown() {
  const ahora = new Date().getTime();
  const diff = fechaEvento - ahora;

  if (diff <= 0) {
    document.getElementById('cd-dias').textContent = '00';
    document.getElementById('cd-horas').textContent = '00';
    document.getElementById('cd-min').textContent = '00';
    document.getElementById('cd-seg').textContent = '00';
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const min = Math.floor((diff / (1000 * 60)) % 60);
  const seg = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-dias').textContent = String(dias).padStart(2, '0');
  document.getElementById('cd-horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('cd-min').textContent = String(min).padStart(2, '0');
  document.getElementById('cd-seg').textContent = String(seg).padStart(2, '0');
}
actualizarCountdown();
setInterval(actualizarCountdown, 1000);

// ---------- STEPPER DE PASES ----------
const { slug, cantidad_invitados } = window.__INVITADO__;
let cantidadSeleccionada = cantidad_invitados;

const spanCantidad = document.getElementById('cantidad-confirmar');
const btnMas = document.getElementById('btn-mas');
const btnMenos = document.getElementById('btn-menos');

if (btnMas && btnMenos) {
  btnMas.addEventListener('click', () => {
    if (cantidadSeleccionada < cantidad_invitados) {
      cantidadSeleccionada++;
      spanCantidad.textContent = cantidadSeleccionada;
    }
  });

  btnMenos.addEventListener('click', () => {
    if (cantidadSeleccionada > 1) {
      cantidadSeleccionada--;
      spanCantidad.textContent = cantidadSeleccionada;
    }
  });
}

// ---------- CONFIRMAR / CANCELAR ----------
async function enviarRespuesta(estado) {
  const pases = estado === 'cancelado' ? 0 : cantidadSeleccionada;

  const res = await fetch(`/i/${slug}/confirmar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ estado, pases_confirmados: pases }),
  });

  if (!res.ok) {
    alert('Ocurrió un error, intenta de nuevo.');
    return;
  }

  document.getElementById('rsvp-pendiente').classList.add('oculto');

  if (estado === 'cancelado') {
    document.getElementById('rsvp-cancelado').classList.remove('oculto');
  } else {
    document.getElementById('pases-confirmados-texto').textContent = pases;
    document.getElementById('rsvp-confirmado').classList.remove('oculto');
  }
}

const btnConfirmar = document.getElementById('btn-confirmar');
const btnCancelar = document.getElementById('btn-cancelar');

if (btnConfirmar) btnConfirmar.addEventListener('click', () => enviarRespuesta('confirmado'));
if (btnCancelar) {
  btnCancelar.addEventListener('click', () => {
    if (confirm('¿Seguro que no podrás asistir?')) {
      enviarRespuesta('cancelado');
    }
  });
}
