function copiarLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert('✅ Link copiado: ' + url);
  });
}

async function abrirEditar(id) {
  const res = await fetch(`/admin/invitados/${id}`);
  if (!res.ok) return alert('No se pudo cargar la invitación');
  const inv = await res.json();

  document.getElementById('edit_id').value = inv.id;
  document.getElementById('edit_nombre').value = inv.nombre;
  document.getElementById('edit_telefono').value = inv.telefono_whatsapp || '';
  document.getElementById('edit_cantidad').value = inv.cantidad_invitados;
  document.getElementById('edit_familiar').checked = inv.es_familiar;
  document.getElementById('edit_mensaje').value = inv.mensaje_personalizado || '';

  document.getElementById('modalEditar').classList.add('abierto');
}

function cerrarEditar() {
  document.getElementById('modalEditar').classList.remove('abierto');
}

async function guardarEdicion() {
  const id = document.getElementById('edit_id').value;

  const body = new URLSearchParams({
    nombre: document.getElementById('edit_nombre').value,
    telefono_whatsapp: document.getElementById('edit_telefono').value,
    cantidad_invitados: document.getElementById('edit_cantidad').value,
    es_familiar: document.getElementById('edit_familiar').checked,
    mensaje_personalizado: document.getElementById('edit_mensaje').value,
  });

  const res = await fetch(`/admin/invitados/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (res.ok) {
    location.reload();
  } else {
    alert('Error al guardar los cambios');
  }
}

async function eliminarInvitado(id) {
  if (!confirm('¿Seguro que quieres eliminar esta invitación? Esta acción no se puede deshacer.')) {
    return;
  }
  const res = await fetch(`/admin/invitados/${id}`, { method: 'DELETE' });
  if (res.ok) {
    location.reload();
  } else {
    const data = await res.json().catch(() => ({}));
    alert('Error al eliminar: ' + (data.error || 'desconocido'));
  }
}