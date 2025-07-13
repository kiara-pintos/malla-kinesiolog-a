const materias = [
  { id: 'filosofia', nombre: 'Filosofía', desbloquea: ['fund_teologia'] },
  { id: 'quimica_bio', nombre: 'Química Biológica', desbloquea: ['fisioterapia', 'farmacologia'] },
  { id: 'anatomia', nombre: 'Anatomía y Fisiología', desbloquea: ['biomecanica', 'semioclinica', 'tecnicas1', 'kinefilaxia', 'ortopedia'] },
  { id: 'biologia', nombre: 'Biología Celular, Histología y Embriología', desbloquea: ['biomecanica', 'semioclinica', 'kinefilaxia', 'farmacologia', 'ortopedia'] },
  { id: 'fisica', nombre: 'Física Biológica', desbloquea: ['fisioterapia'] },
  { id: 'salud', nombre: 'Salud Colectiva', desbloquea: ['modulo1', 'fund_teologia', 'kinefilaxia'] },
  { id: 'modulo1', nombre: 'Módulo de Integración Disciplinar I', desbloquea: ['modulo2'] },
  { id: 'psicologia', nombre: 'Psicología General y del Desarrollo', desbloquea: ['psicomotricidad'] },

  { id: 'biomecanica', nombre: 'Biomecánica y Ergonomía', requisitos: ['anatomia', 'biologia'], desbloquea: ['tecnicas2', 'psicomotricidad', 'deportiva', 'ocupacional', 'electiva'] },
  { id: 'semioclinica', nombre: 'Semiopatología Clínica', requisitos: ['anatomia', 'biologia'], desbloquea: ['tecnicas2', 'ocupacional', 'semioquir', 'pps1', 'clinica_medica', 'electiva'] },
  { id: 'tecnicas1', nombre: 'Técnicas Kinésicas I', requisitos: ['anatomia'], desbloquea: ['tecnicas2', 'deportiva', 'ocupacional', 'semioquir', 'pps1', 'electiva'] },
  { id: 'modulo2', nombre: 'Módulo de Integración Disciplinar II', requisitos: ['modulo1'], desbloquea: ['pps1', 'metodologia', 'electiva'] },
  { id: 'kinefilaxia', nombre: 'Kinefilaxia y APS', requisitos: ['anatomia', 'biologia', 'salud'], desbloquea: ['legal', 'tecnicas2', 'psicomotricidad', 'deportiva', 'ocupacional', 'electiva'] },
  { id: 'farmacologia', nombre: 'Farmacología', requisitos: ['quimica_bio', 'biologia'], desbloquea: ['cosmiatrica', 'electiva'] },
  { id: 'fisioterapia', nombre: 'Fisioterapia', requisitos: ['quimica_bio', 'fisica'], desbloquea: ['cosmiatrica', 'tecnicas2', 'deportiva', 'semioquir', 'electiva'] },
  { id: 'ortopedia', nombre: 'Ortopedia y Traumatología', requisitos: ['anatomia', 'biologia'], desbloquea: ['legal', 'deportiva', 'semioquir', 'electiva', 'pps3'] },
  { id: 'fund_teologia', nombre: 'Fundamentos de Teología', requisitos: ['filosofia', 'salud'], desbloquea: ['teo_dogmatica', 'electiva'] },

  // Tercer año (continúa igual, por espacio lo completamos si querés)
];

const estadoMaterias = {};

function crearMateria(m) {
  const div = document.createElement('div');
  div.className = 'materia';
  div.id = m.id;

  const btn = document.createElement('button');
  btn.textContent = m.nombre;
  btn.disabled = m.requisitos && m.requisitos.length > 0;
  btn.onclick = () => aprobarMateria(m.id);

  div.appendChild(btn);
  document.getElementById('contenedor-materias').appendChild(div);

  estadoMaterias[m.id] = {
    aprobado: false,
    requisitos: m.requisitos || [],
    desbloquea: m.desbloquea || [],
    btn: btn
  };
}

function aprobarMateria(id) {
  const materia = estadoMaterias[id];
  if (materia.aprobado) return;

  materia.aprobado = true;
  materia.btn.disabled = true;
  materia.btn.style.backgroundColor = '#4caf50';

  materia.desbloquea.forEach(depId => {
    const desbloquear = estadoMaterias[depId];
    if (desbloquear) {
      const requisitosCumplidos = desbloquear.requisitos.every(req => estadoMaterias[req].aprobado);
      if (requisitosCumplidos) desbloquear.btn.disabled = false;
    }
  });
}

materias.forEach(crearMateria);

