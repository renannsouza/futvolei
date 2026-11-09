(function () {
'use strict';

/* ---------- Chalk player: poses and drawing ---------- */
const P = (o) => Object.assign({ hx: 0, hy: -118, tr: 0, a1: [15, 30], a2: [-15, 30], l1: [0, 0], l2: [0, 0], b: null, tb: null }, o);
const kick = P({ l1: [70, 70], a1: [60, 30], a2: [-40, 30], b: [60, -60] }), kickF = P({ l2: [70, 70], a1: [-40, 30], a2: [60, 30], b: [60, -60] });
const up = P({ a1: [40, 30], a2: [-20, 30], b: [56, -175] });
const thigh = P({ l1: [90, 90], a1: [60, 30], a2: [-30, 30], b: [55, -142] }), thighF = P({ l2: [90, 90], a1: [-30, 30], a2: [60, 30], b: [55, -142] });
const squat = P({ hy: -62, tr: 30, l1: [80, 110], l2: [80, 110], a1: [85, 0], a2: [80, 0] });
const attack = P({ tr: 35, hy: -128, l1: [20, 30], l2: [-10, 30], a1: [-40, 20], a2: [-60, 20], b: [82, -205] });
const plank = { hx: -20, hy: -30, tr: 78, a1: [0, 90], a2: [0, 90], l1: [-78, 0], l2: [-78, 0] };
const side = { hy: -104, tr: 20, l1: [25, 40], l2: [-10, 30], a1: [40, 40], a2: [30, 40] };
const out = { a1: [85, 0], a2: [95, 0] };
const A = (o, b) => P(Object.assign({}, o, b));

const EX = {
  polichinelo: { name: 'Polichinelo', how: 'Saltos leves na ponta dos pés, abrindo braços e pernas, para aquecer o corpo.', per: .35, poses: [P({ a1: [5, 0], a2: [-5, 0] }), P({ hy: -130, a1: [175, 0], a2: [185, 0], l1: [14, 0], l2: [-14, 0] })] },
  skipping: { name: 'Skipping baixo no lugar', how: 'Corrida no lugar com os joelhos subindo até o quadril, braços acompanhando.', per: .3, poses: [P({ hy: -122, l1: [55, 75], a1: [-35, 60], a2: [35, 60] }), P({ hy: -122, l2: [55, 75], a1: [35, 60], a2: [-35, 60] })] },
  quadril: { name: 'Rotação de quadril', how: 'Abra e feche o portão: o joelho sobe, gira para fora e volta. Prepara para o domínio e a chapa.', per: .45, poses: [A(out, { l1: [70, 95] }), A(out, { l1: [95, 70], tr: -5 }), A(out, { l1: [20, 95] })] },
  pendular: { name: 'Chute pendular', how: 'Perna solta balançando para frente e para trás. Dá amplitude para levantar a perna no shark.', per: .5, poses: [P({ l1: [80, 0], a1: [-30, 20], a2: [60, 20] }), P({ l1: [-35, 0], a1: [40, 20], a2: [-20, 20] })] },
  tronco: { name: 'Rotação de tronco e pescoço', how: 'Gire devagar para cada lado sem tirar os pés do chão. Prepara para o cabeceio e o peito.', per: .5, poses: [P({ a1: [90, 90], a2: [-40, 90], tr: 4 }), P({ a1: [-40, 90], a2: [90, 90], tr: -4 })] },
  agachamento: { name: 'Agachamento com pausa', how: 'Desça, segure 2 segundos embaixo e suba. Base baixa e equilíbrio.', per: .8, poses: [P({ a1: [10, 10], a2: [-5, 10] }), squat] },
  toques: { name: 'Toques leves na bola', how: 'Alterne os pés tocando de leve em cima da bola, para pegar o ritmo.', per: .3, poses: [P({ l1: [32, 22], b: [46, -18] }), P({ l2: [32, 22], b: [46, -18] })] },

  embaixadinha: { name: 'Embaixadinha pé forte', how: 'Peito do pé, bola até a altura do joelho, sem deixar girar.', per: .35, poses: [kick, up] },
  pefraco: { name: 'Embaixadinha pé fraco', how: 'Mesmo padrão no pé não dominante: é o que mais vai evoluir.', per: .35, poses: [kickF, up] },
  alternando: { name: 'Alternando os pés', how: 'Um toque em cada pé, em ritmo constante.', per: .35, poses: [kick, up, kickF, up] },
  coxa: { name: 'Coxa alternada', how: 'Coxa paralela ao chão; a bola sobe até a altura do peito.', per: .4, poses: [thigh, P({ b: [50, -230] }), thighF, P({ b: [50, -230] })] },
  pecoxacabeca: { name: 'Pé, coxa e cabeça', how: 'Sequência pé, coxa e cabeça sem deixar cair. Se errar, recomece o ciclo.', per: .45, poses: [kick, thigh, P({ tr: -8, hy: -114, l1: [8, 16], l2: [8, 16], a1: [30, 30], a2: [-10, 30], b: [-15, -266] }), P({ b: [20, -330] })] },
  cabeceio: { name: 'Cabeceio contínuo', how: 'Toque com a testa, olhos abertos e joelhos levemente flexionados.', per: .4, poses: [P({ tr: -12, hy: -112, l1: [10, 20], l2: [10, 20], a1: [30, 30], a2: [-10, 30], b: [-23, -257] }), P({ b: [-15, -350] })] },
  peito: { name: 'Domínio de peito', how: 'Jogue a bola alta, amorteça com o peito e devolva com o pé.', per: .45, poses: [P({ b: [30, -330] }), P({ tr: -20, hy: -114, a1: [40, 60], a2: [-30, 40], l1: [10, 15], l2: [-5, 10], b: [5, -175] }), kick] },
  matar: { name: 'Lançar alto e matar', how: 'Bola acima de 3 m; mate com o pé, a coxa e o peito sem deixar quicar.', per: .5, poses: [P({ a1: [165, 0], a2: [160, 0], b: [18, -275] }), P({ a1: [60, 30], a2: [-20, 30], b: [30, -390] }), kick] },
  ombro: { name: 'Ombro (desafio)', how: 'Toques curtos com o ombro. Ótimo para salvar bolas no jogo.', per: .35, poses: [P({ tr: 12, a1: [-25, 20], a2: [10, 20], b: [26, -228] }), P({ b: [22, -300] })] },

  recpeito: { name: 'Recepção de peito', props: 'wall', how: 'Chute a bola na parede, receba no peito e deixe ela cair à sua frente, não longe.', per: .45, poses: [P({ b: [150, -200] }), P({ tr: -18, hy: -114, a1: [40, 60], a2: [-30, 40], l1: [10, 15], b: [6, -178] }), P({ b: [42, -18] }), P({ l1: [55, 15], a1: [-30, 20], a2: [40, 20], b: [80, -40] })] },
  reccoxa: { name: 'Recepção de coxa', props: 'wall', how: 'A bola vem da parede; a coxa amortece e devolve para cima, não para frente.', per: .5, poses: [P({ b: [150, -150] }), thigh, P({ b: [60, -210] })] },
  levantada: { name: 'Levantada (passe alto)', props: 'wall', how: 'A bola sobe reta acima da cabeça, a 2 ou 3 m: a bola que você daria ao parceiro.', per: .45, poses: [kick, P({ b: [22, -380] })] },
  cabalvo: { name: 'Cabeceio no alvo', props: 'wall', how: 'Cabeceie no alvo e continue sem deixar cair. Versão fácil: deixe quicar uma vez.', per: .45, poses: [P({ b: [150, -240] }), P({ tr: 15, hy: -114, l1: [10, 15], l2: [5, 10], a1: [-20, 20], a2: [-30, 20], b: [46, -232] })] },
  pepeito: { name: 'Peito do pé no alvo', props: 'wall', how: 'Do próprio controle, toque no alvo da parede com precisão.', per: .45, poses: [P({ l1: [70, 25], a1: [-30, 20], a2: [50, 20], b: [100, -72] }), P({ b: [150, -215] })] },
  ataque: { name: 'Ataque de cabeça', props: 'wall', how: 'Levante para você mesmo e cabeceie para baixo, mirando a base da parede.', per: .45, poses: [P({ a1: [60, 30], a2: [-20, 30], b: [20, -335] }), attack, P({ b: [150, -22] })] },
  shark: { name: 'Shark sem salto', props: 'wall', how: 'Levante a bola, gire o quadril e bata com a sola ou a parte interna do pé no alvo baixo. Comece devagar: força vem depois.', per: .5, poses: [P({ hy: -112, l1: [10, 15], l2: [-5, 15], a1: [60, 30], a2: [-20, 30], b: [60, -300] }), P({ tr: -35, l1: [150, 30], a1: [-60, 0], a2: [100, 0], b: [88, -215] }), P({ b: [150, -60] })] },
  sequencia: { name: 'Sequência de jogo', props: 'wall', how: 'Parede, domínio, levantada e ataque, simulando os três toques.', per: .5, poses: [P({ b: [150, -150] }), kick, P({ b: [22, -340] }), attack] },

  agsalto: { name: 'Agachamento com salto', how: 'Desça no agachamento e exploda para cima. Aterrisse macio.', per: .45, poses: [squat, P({ hy: -170, l1: [-5, 10], l2: [5, 10], a1: [170, 0], a2: [175, 0] })] },
  afundo: { name: 'Afundo alternado', how: 'Passo à frente, joelho de trás quase no chão, tronco reto. Alterne as pernas.', per: .5, poses: [P({}), P({ hy: -75, tr: 5, l1: [75, 75], l2: [-20, 60], a1: [10, 20], a2: [-10, 20] }), P({}), P({ hy: -75, tr: 5, l2: [75, 75], l1: [-20, 60], a1: [-10, 20], a2: [10, 20] })] },
  lateral: { name: 'Deslocamento lateral entre cones', props: 'cones', how: 'Deslize de lado entre dois cones a 3 m, com a base baixa.', per: .55, poses: [A(side, { hx: -85 }), A(side, { hx: 85 })] },
  prancha: { name: 'Prancha frontal', how: 'Antebraços no chão e corpo reto da cabeça ao calcanhar.', per: .9, poses: [P(plank), A(plank, { hy: -33 })] },
  prlateral: { name: 'Prancha lateral', how: 'Apoie um antebraço, quadril alto e o outro braço para cima. Faça os dois lados.', per: .8, poses: [A(plank, { a2: [180, 0] }), A(plank, { hy: -38, a2: [172, 0] })] },
  panturrilha: { name: 'Panturrilha unilateral', how: 'Num pé só, suba na ponta e desça devagar.', per: .5, poses: [P({ l2: [-15, 80], a1: [20, 20], a2: [-10, 20] }), P({ hy: -132, l2: [-15, 80], a1: [20, 20], a2: [-10, 20] })] },
  equilibrio: { name: 'Equilíbrio com embaixadinha', how: 'Apoiado num pé só, faça embaixadinhas com o outro.', per: .35, poses: [A(out, { l1: [70, 70], l2: [0, 8], b: [60, -60] }), A(out, { l1: [10, 20], b: [56, -170] })] },
  chutealto: { name: 'Chute alto controlado', how: 'Perna estendida até a altura do ombro, sem perder a postura.', per: .6, poses: [P({ a1: [10, 10], a2: [-10, 10] }), P({ l1: [148, 0], a1: [-40, 0], a2: [90, 0], tr: -5 })] },
  reacao: { name: 'Reação com bola de tênis', props: 'wall', how: 'Jogue a bola de tênis na parede e pegue de volta. Alterne as mãos.', per: .4, poses: [P({ tr: 10, hy: -110, l1: [10, 20], l2: [-5, 20], a1: [85, 10], a2: [20, 40], tb: [108, -206] }), P({ tr: 10, hy: -110, l1: [10, 20], l2: [-5, 20], a1: [60, 30], a2: [20, 40], tb: [165, -240] })] },
};

function joints(p) {
  const r = Math.PI / 180, S = (a) => Math.sin(a * r), C = (a) => Math.cos(a * r);
  const nx = p.hx + 90 * S(p.tr), ny = p.hy - 90 * C(p.tr);
  const leg = (l) => { const kx = p.hx + 60 * S(l[0]), ky = p.hy + 60 * C(l[0]), s = l[0] - l[1]; return [p.hx, p.hy, kx, ky, kx + 58 * S(s), ky + 58 * C(s)]; };
  const arm = (a) => { const ex = nx + 45 * S(a[0]), ey = ny + 45 * C(a[0]), s = a[0] + a[1]; return [nx, ny, ex, ey, ex + 42 * S(s), ey + 42 * C(s)]; };
  return { nx, ny, hx: nx + 22 * S(p.tr), hy: ny - 22 * C(p.tr), l1: leg(p.l1), l2: leg(p.l2), a1: arm(p.a1), a2: arm(p.a2) };
}
function mix(a, b, f) {
  const L = (x, y) => x + (y - x) * f, LA = (x, y) => x.map((v, i) => L(v, y[i]));
  const o = { hx: L(a.hx, b.hx), hy: L(a.hy, b.hy), tr: L(a.tr, b.tr), a1: LA(a.a1, b.a1), a2: LA(a.a2, b.a2), l1: LA(a.l1, b.l1), l2: LA(a.l2, b.l2) };
  o.b = a.b && b.b ? LA(a.b, b.b) : (a.b || b.b);
  o.tb = a.tb && b.tb ? LA(a.tb, b.tb) : (a.tb || b.tb);
  return o;
}
const eio = (x) => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

const figs = new Set();
const slow = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function figure(key) {
  const NS = 'http://www.w3.org/2000/svg';
  const wrap = document.createElement('div');
  wrap.innerHTML = '<svg class="fig" viewBox="-250 -415 500 440" role="img"><title></title>' +
    '<path class="ground" d="M-230 0 H230"/>' +
    '<g data-r="wall"><path class="wall" d="M176 4 V-340"/><path class="bricks" d="M184 -300 h30 M184 -240 h30 M184 -180 h30 M184 -120 h30 M184 -60 h30"/><path class="target" d="M170 -270 V-200"/></g>' +
    '<g data-r="cones"><path class="cone" d="M-140 0 L-118 -46 L-96 0 Z M96 0 L118 -46 L140 0 Z"/></g>' +
    '<g data-r="box"><rect class="pbox" x="70" y="-62" width="110" height="62" rx="6"/></g>' +
    '<g data-r="bench"><rect class="pbox" x="-135" y="-60" width="84" height="14" rx="4"/><path class="bricks" d="M-125 -46 V0 M-61 -46 V0"/></g>' +
    '<g data-r="step"><rect class="pbox" x="-45" y="-22" width="110" height="22" rx="4"/></g>' +
    '<g data-r="pulley"><rect class="pbox" x="-234" y="-360" width="24" height="360" rx="4"/></g>' +
    '<g data-r="ladder"><path class="bricks" d="M-200 -4 H200 M-170 -10 v10 M-110 -10 v10 M-50 -10 v10 M10 -10 v10 M70 -10 v10 M130 -10 v10 M190 -10 v10"/></g>' +
    '<ellipse data-r="bshadow" cy="2" rx="20" ry="6" fill="rgba(0,0,0,.28)"/>' +
    '<path class="limb far" data-r="l2" stroke-width="11"/><path class="limb far" data-r="a2" stroke-width="10"/><path class="limb near" data-r="trunk" stroke-width="13"/>' +
    '<path class="limb near" data-r="l1" stroke-width="12"/><path class="limb near" data-r="a1" stroke-width="11"/><circle class="head" data-r="head" r="19"/>' +
    '<path class="cable" data-r="cable"/><path class="bandp" data-r="band"/><rect class="dbw" data-r="db1" x="-15" y="-7" width="30" height="14" rx="3"/><rect class="dbw" data-r="db2" x="-15" y="-7" width="30" height="14" rx="3"/>' +
    '<g data-r="ball"><circle class="ballc" r="17"/><path class="seam" d="M-16 -4 Q0 6 16 -4 M-6 -16 Q4 0 -6 16"/></g><circle class="tball" data-r="tball" r="9"/></svg>';
  const svg = wrap.firstChild, f = { svg, key, t0: performance.now() };
  svg.querySelectorAll('[data-r]').forEach((n) => { f[n.dataset.r] = n; });
  setFig(f, key);
  figs.add(f);
  draw(f, 0);
  return f;
}
function setFig(f, key) {
  f.key = key; f.t0 = performance.now();
  const ex = EX[key];
  f.svg.querySelector('title').textContent = 'Demonstração: ' + ex.name;
  const pr = (ex.props || '').split(' ');
  ['wall', 'cones', 'box', 'bench', 'step', 'pulley', 'ladder'].forEach((n) => { f[n].style.display = pr.indexOf(n) > -1 ? '' : 'none'; });
}
function draw(f, t) {
  t = Math.max(0, t || 0);
  const ex = EX[f.key], n = ex.poses.length, u = t / ex.per, j = Math.floor(u), m = ((j % n) + n) % n;
  const p = mix(ex.poses[m], ex.poses[(m + 1) % n], eio(u - j)), J = joints(p);
  const d = (s) => 'M' + s[0].toFixed(1) + ' ' + s[1].toFixed(1) + 'L' + s[2].toFixed(1) + ' ' + s[3].toFixed(1) + 'L' + s[4].toFixed(1) + ' ' + s[5].toFixed(1);
  f.l1.setAttribute('d', d(J.l1)); f.l2.setAttribute('d', d(J.l2)); f.a1.setAttribute('d', d(J.a1)); f.a2.setAttribute('d', d(J.a2));
  f.trunk.setAttribute('d', 'M' + p.hx.toFixed(1) + ' ' + p.hy.toFixed(1) + 'L' + J.nx.toFixed(1) + ' ' + J.ny.toFixed(1));
  f.head.setAttribute('cx', J.hx.toFixed(1)); f.head.setAttribute('cy', J.hy.toFixed(1));
  f.db1.style.display = f.db2.style.display = ex.db ? '' : 'none';
  if (ex.db) { f.db1.setAttribute('transform', 'translate(' + J.a1[4].toFixed(1) + ' ' + J.a1[5].toFixed(1) + ')'); f.db2.setAttribute('transform', 'translate(' + J.a2[4].toFixed(1) + ' ' + J.a2[5].toFixed(1) + ')'); }
  f.band.style.display = ex.band ? '' : 'none';
  if (ex.band) f.band.setAttribute('d', 'M' + J.l1[4].toFixed(1) + ' ' + (J.l1[5] - 14).toFixed(1) + 'L' + J.l2[4].toFixed(1) + ' ' + (J.l2[5] - 14).toFixed(1));
  f.cable.style.display = ex.cable ? '' : 'none';
  if (ex.cable) { const e = ex.cableTo === 'foot' ? [J.l1[4], J.l1[5] - 6] : [J.a1[4], J.a1[5]]; f.cable.setAttribute('d', 'M' + ex.cable[0] + ' ' + ex.cable[1] + 'L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1)); }
  f.ball.style.display = p.b ? '' : 'none'; f.bshadow.style.display = p.b ? '' : 'none';
  if (p.b) { f.ball.setAttribute('transform', 'translate(' + p.b[0].toFixed(1) + ' ' + p.b[1].toFixed(1) + ') rotate(' + (t * 220 % 360).toFixed(0) + ')'); f.bshadow.setAttribute('cx', p.b[0].toFixed(1)); f.bshadow.style.opacity = Math.max(.15, 1 + p.b[1] / 400).toFixed(2); }
  f.tball.style.display = p.tb ? '' : 'none';
  if (p.tb) { f.tball.setAttribute('cx', p.tb[0].toFixed(1)); f.tball.setAttribute('cy', p.tb[1].toFixed(1)); }
}
function loop() {
  requestAnimationFrame(loop);
  const now = performance.now();
  figs.forEach((f) => {
    if (!f.svg.isConnected) { figs.delete(f); return; }
    try { draw(f, (now - f.t0) / 1000 * (slow ? .55 : 1)); } catch (e) {}
  });
}
requestAnimationFrame(loop);

/* ---------- Workouts ---------- */
const WK = {
  aq: { letter: 'Aq', name: 'Aquecimento', mins: 10, mode: 'sets', rest: 10, note: 'Faça antes de todo treino.',
    items: [['polichinelo', 1, '1 min', 60], ['skipping', 1, '30 s', 30], ['quadril', 1, '10 cada perna'], ['pendular', 1, '10 cada perna'], ['tronco', 1, '10 cada lado'], ['agachamento', 1, '10 repetições'], ['toques', 1, '1 min', 60]] },
  A: { letter: 'A', name: 'Controle de bola', mins: 40, mode: 'sets', note: 'Quando completar todas as séries sem deixar a bola cair, aumente 20% o volume.',
    items: [['embaixadinha', 3, '50 toques', 0, 45], ['pefraco', 3, '30 toques', 0, 45], ['alternando', 3, '40 toques', 0, 45], ['coxa', 3, '30 toques', 0, 45], ['pecoxacabeca', 3, '10 ciclos', 0, 60], ['cabeceio', 3, '20 toques', 0, 60], ['peito', 3, '10 domínios', 0, 45], ['matar', 3, '10 por parte', 0, 60], ['ombro', 3, '10 toques', 0, 60]] },
  B: { letter: 'B', name: 'Fundamentos com parede', mins: 45, mode: 'sets', note: 'Marque com fita um alvo de 1 × 1 m a 2 m de altura e uma linha no chão a 2,5 m da parede.',
    items: [['recpeito', 3, '15 recepções', 0, 60], ['reccoxa', 3, '15 cada coxa', 0, 60], ['levantada', 3, '20 levantadas', 0, 60], ['cabalvo', 3, '20 cabeceios', 0, 60], ['pepeito', 3, '20 cada pé', 0, 60], ['ataque', 3, '10 ataques', 0, 90], ['shark', 3, '10 cada perna', 0, 90], ['sequencia', 4, '5 ciclos', 0, 90]] },
  C: { letter: 'C', name: 'Físico específico', mins: 35, mode: 'circuit', rounds: 3, rest: 15, roundRest: 90, note: 'Circuito: um exercício atrás do outro, 3 voltas. No fim, alongue posterior de coxa, quadril, panturrilha e lombar por 30 s cada.',
    items: [['agsalto', 1, '10 repetições'], ['afundo', 1, '10 cada perna'], ['lateral', 1, '30 s', 30], ['prancha', 1, '40 s', 40], ['prlateral', 1, '25 s cada lado', 25], ['panturrilha', 1, '15 cada perna'], ['equilibrio', 1, '30 s cada perna', 30], ['chutealto', 1, '10 cada perna'], ['reacao', 1, '1 min', 60]] },
};
const volLabel = (w, it) => w.mode === 'circuit' ? it[2] : (it[1] > 1 ? it[1] + ' × ' + it[2] : it[2]);

function buildSteps(key, warm) {
  const steps = [];
  const add = (wk, label) => {
    const w = WK[wk];
    if (w.mode === 'circuit') {
      for (let r = 1; r <= w.rounds; r++) w.items.map(adapt).forEach((it, i) => steps.push({ k: it[0], block: label, tag: 'Volta ' + r + ' de ' + w.rounds, target: it[2], time: it[3] || 0, rest: i === w.items.length - 1 ? w.roundRest : w.rest }));
    } else {
      w.items.map(adapt).forEach((it) => { for (let s = 1; s <= it[1]; s++) steps.push({ k: it[0], block: label, tag: it[1] > 1 ? 'Série ' + s + ' de ' + it[1] : 'Única', target: it[2], time: it[3] || 0, rest: it[4] || w.rest || 45 }); });
    }
  };
  if (warm && key !== 'aq') add('aq', 'Aquecimento');
  add(key, wTitle(key));
  steps[steps.length - 1].rest = 0;
  return steps;
}

/* Week plan, Monday first */
const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const PLAN = { 1: { w: 'A', txt: 'Treino A', sub: 'Controle de bola · 50 min' }, 2: { w: 'C', txt: 'Treino C', sub: 'Físico específico · 45 min' }, 3: { w: 'B', txt: 'Treino B', sub: 'Fundamentos com parede · 55 min' },
  4: { w: 'A2', txt: 'Treino A', sub: 'Foco no pé fraco e na cabeça · 40 min' }, 5: { w: 'BC', txt: 'Treino B + 1 volta do C', sub: 'Parede e físico · 70 min' }, 6: { w: null, txt: 'Jogo na areia', sub: 'Ou descanso ativo' }, 0: { w: null, txt: 'Descanso', sub: 'Recuperação' } };

const TESTS = [['emb_forte', 'Embaixadinhas seguidas, pé forte'], ['emb_fraco', 'Embaixadinhas seguidas, pé fraco'], ['cabeceio', 'Cabeceios seguidos'], ['ciclos', 'Ciclos pé, coxa e cabeça'], ['alvo', 'Acertos no alvo (de 20)'], ['sequencias', 'Sequências de jogo (de 10)'], ['prancha', 'Prancha frontal (segundos)']];

/* ---------- Analysis: fundamentals and the focused workout ---------- */
const FUND = [
  ['dominio', 'Domínio e controle', 'Embaixadinha, matar a bola e manter no ar'],
  ['pefraco', 'Pé fraco', 'Tocar e dominar com o pé não dominante'],
  ['cabeca', 'Cabeceio', 'Toques de cabeça controlados e com direção'],
  ['recepcao', 'Recepção', 'Amortecer a bola que chega com força'],
  ['levantada', 'Levantada', 'Bola alta e reta para o ataque'],
  ['ataque', 'Ataque', 'Shark e ataque de cabeça'],
  ['defesa', 'Defesa e reação', 'Reflexo e deslocamento curto'],
  ['fisico', 'Físico e equilíbrio', 'Impulsão, core e base firme'],
];
const TIPS = {
  dominio: 'Bola morta no corpo é a base de todo lance: muito volume de embaixadinha e domínio de bola alta.',
  pefraco: 'Quem domina com os dois pés tem o dobro de opções no jogo, então o pé fraco ganha mais séries.',
  cabeca: 'O cabeceio é um dos toques mais usados no futevôlei: testa firme, olhos abertos e joelhos soltos.',
  recepcao: 'A recepção decide a qualidade do segundo toque: amorteça e deixe a bola cair à sua frente.',
  levantada: 'Levantada boa é bola alta e reta, fácil para o parceiro atacar.',
  ataque: 'Ataque pede técnica antes de força: treine shark e cabeça em baixa velocidade primeiro.',
  defesa: 'Defesa é reflexo e deslocamento curto, com a base sempre baixa.',
  fisico: 'Impulsão, core e equilíbrio sustentam todos os outros fundamentos.',
};
const POOLS = {
  dominio: ['embaixadinha', 'matar', 'coxa', 'pecoxacabeca', 'equilibrio'],
  pefraco: ['pefraco', 'alternando', 'pepeito', 'equilibrio'],
  cabeca: ['cabeceio', 'cabalvo', 'ataque', 'pecoxacabeca'],
  recepcao: ['recpeito', 'reccoxa', 'peito', 'matar'],
  levantada: ['levantada', 'pecoxacabeca', 'sequencia', 'embaixadinha'],
  ataque: ['shark', 'ataque', 'chutealto', 'sequencia'],
  defesa: ['reacao', 'lateral', 'ombro', 'agsalto'],
  fisico: ['agsalto', 'prancha', 'afundo', 'prlateral', 'panturrilha'],
};
const NEEDWALL = new Set(['recpeito', 'reccoxa', 'cabalvo', 'pepeito', 'sequencia', 'reacao']);
const PHYS = new Set(['agsalto', 'afundo', 'lateral', 'prancha', 'prlateral', 'panturrilha', 'chutealto', 'reacao']);
const BASE = {
  embaixadinha: [50, 'toques'], pefraco: [30, 'toques'], alternando: [40, 'toques'], coxa: [30, 'toques'], pecoxacabeca: [10, 'ciclos'], cabeceio: [20, 'toques'],
  peito: [10, 'domínios'], matar: [10, 'por parte'], ombro: [10, 'toques'], recpeito: [15, 'recepções'], reccoxa: [15, 'cada coxa'], levantada: [20, 'levantadas'],
  cabalvo: [20, 'cabeceios'], pepeito: [20, 'cada pé'], ataque: [10, 'ataques'], shark: [10, 'cada perna'], sequencia: [5, 'ciclos'], agsalto: [10, 'repetições'],
  afundo: [10, 'cada perna'], lateral: [30, 's', 1], prancha: [40, 's', 1], prlateral: [25, 's cada lado', 1], panturrilha: [15, 'cada perna'],
  equilibrio: [30, 's cada perna', 1], chutealto: [10, 'cada perna'], reacao: [60, 's', 1],
};
const LEVELS = [['iniciante', 'Estou começando'], ['intermediario', 'Jogo às vezes'], ['avancado', 'Jogo sempre']];
const PLAN4 = PLAN[4];
// The week's own variants: Thursday's lighter A and Friday's B plus one lap of C.
WK.A2 = { letter: 'A', name: 'Foco em pé fraco e cabeça', mins: 40, mode: 'sets', note: 'Versão mais curta do Treino A, com mais séries no pé não dominante e no cabeceio.',
  items: [['pefraco', 4, '30 toques', 0, 45], ['alternando', 3, '40 toques', 0, 45], ['cabeceio', 4, '20 toques', 0, 60], ['pecoxacabeca', 3, '10 ciclos', 0, 60], ['embaixadinha', 2, '50 toques', 0, 45]] };
WK.BC = { letter: 'B+C', name: 'Parede e uma volta do físico', mins: 70, mode: 'sets', note: 'O Treino B completo e, no fim, uma volta do circuito do Treino C, com 15 s entre os exercícios.',
  items: WK.B.items.concat(WK.C.items.map((it) => [it[0], 1, it[2], it[3] || 0, 15])) };
const fname = (k) => FUND.find((f) => f[0] === k)[1];
const listJoin = (a) => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
const wTitle = (k) => k === 'aq' ? 'Aquecimento' : k === 'F' ? 'Treino focado' : k === 'BC' ? 'Treino B + C' : 'Treino ' + WK[k].letter;
function lastAnalysis() { return store.analyses && store.analyses.length ? store.analyses[store.analyses.length - 1] : null; }
function buildFocus(a) {
  const counts = { 30: [3, 2, 1], 45: [3, 2, 2], 60: [4, 3, 2] }[a.mins] || [3, 2, 2], ok = (k) => a.wall || !NEEDWALL.has(k), used = new Set(), picks = [];
  a.focus.forEach((f, i) => { let c = counts[i]; for (const k of POOLS[f]) { if (!c) break; if (used.has(k) || !ok(k)) continue; used.add(k); picks.push({ k, pri: i }); c--; } });
  let e = a.mins === 30 ? 0 : 1;
  for (const k of ['embaixadinha', 'prancha', 'alternando', 'agsalto']) { if (!e) break; if (used.has(k)) continue; used.add(k); picks.push({ k, pri: 9 }); e--; }
  picks.sort((x, y) => (PHYS.has(x.k) ? 1 : 0) - (PHYS.has(y.k) ? 1 : 0));
  const L = { iniciante: [2, .6, 60], intermediario: [3, 1, 45], avancado: [4, 1.3, 40] }[a.level] || [3, 1, 45];
  const items = picks.map(({ k: k0, pri }) => {
    const k = adaptK(k0), b = BASE[k], timed = !!b[2]; let n = b[0] * L[1];
    n = timed ? Math.max(15, Math.round(n / 5) * 5) : (n >= 10 ? Math.max(10, Math.round(n / 5) * 5) : Math.max(3, Math.round(n)));
    const target = timed && n % 60 === 0 && b[1] === 's' ? n / 60 + ' min' : n + ' ' + b[1];
    return [k, Math.min(4, L[0] + (pri === 0 ? 1 : 0)), target, timed ? n : 0, L[2] + (['ataque', 'shark', 'sequencia'].includes(k) ? 30 : 0)];
  });
  return { letter: 'F', name: 'Treino focado', mins: a.mins, mode: 'sets', note: 'Montado a partir da sua análise, com mais séries no seu foco principal. Refaça a análise a cada quatro semanas.', items };
}
function applyProfile() {
  const a = lastAnalysis();
  if (!a) { delete WK.F; PLAN[4] = PLAN4; return; }
  WK.F = buildFocus(a);
  PLAN[4] = { w: 'F', txt: 'Treino focado', sub: listJoin(a.focus.map(fname)) + ' · ' + a.mins + ' min' };
}

/* ---------- Suggested ratings from tests and logged sets ---------- */
const TS = { emb_forte: [10, 25, 50, 100], emb_fraco: [5, 15, 30, 60], cabeceio: [5, 10, 20, 40], ciclos: [2, 4, 7, 10], alvo: [5, 9, 13, 17], sequencias: [2, 4, 6, 8], prancha: [20, 40, 60, 90] };
const TSHORT = { emb_forte: 'embaixadinhas seguidas', emb_fraco: 'embaixadinhas com o pé fraco', cabeceio: 'cabeceios seguidos', ciclos: 'ciclos pé, coxa e cabeça', alvo: 'acertos no alvo de 20', sequencias: 'sequências de jogo de 10', prancha: 's de prancha' };
const TEST2F = { dominio: ['emb_forte', 'ciclos'], pefraco: ['emb_fraco'], cabeca: ['cabeceio'], levantada: ['alvo'], recepcao: ['sequencias'], ataque: ['sequencias'], fisico: ['prancha'] };
function suggestions() {
  const out = {}, lastT = (k) => { for (let i = store.tests.length - 1; i >= 0; i--) if (store.tests[i].v[k] != null) return +store.tests[i].v[k]; return null; };
  const lv = (x, th) => 1 + th.filter((t) => x >= t).length;
  FUND.forEach(([f]) => {
    const parts = [], scores = [];
    (TEST2F[f] || []).forEach((t) => { const x = lastT(t); if (x != null) { scores.push(lv(x, TS[t])); parts.push(x + ' ' + TSHORT[t]); } });
    if (scores.length) { out[f] = { v: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length), why: 'Teste: ' + listJoin(parts) }; return; }
    const pool = new Set(POOLS[f].concat(POOLS[f].map((k) => GYM[k]).filter(Boolean))), ratios = [];
    for (let i = store.history.length - 1; i >= 0 && ratios.length < 12; i--) (store.history[i].sets || []).forEach((s) => { if (pool.has(s.k) && s.g > 0) ratios.push(s.v / s.g); });
    if (ratios.length >= 2) { const r = ratios.reduce((a, b) => a + b, 0) / ratios.length; out[f] = { v: lv(r, [.4, .6, .85, 1.1]), why: 'Seus treinos: ' + Math.round(r * 100) + '% da meta nas séries' }; }
  });
  return out;
}

/* ---------- Gym versions of the physical work ---------- */
Object.assign(EX, {
  g_box: { name: 'Salto no caixote', props: 'box', how: 'Agache, salte e aterrisse macio em cima do caixote. Desça caminhando, sem pular de volta.', per: .5,
    poses: [P({ hx: -70, hy: -62, tr: 30, l1: [80, 110], l2: [80, 110], a1: [-40, 0], a2: [-40, 0] }), P({ hx: 20, hy: -200, tr: 10, l1: [60, 90], l2: [60, 90], a1: [160, 0], a2: [160, 0] }), P({ hx: 115, hy: -137, tr: 25, l1: [60, 90], l2: [60, 90], a1: [70, 0], a2: [70, 0] }), P({ hx: 115, hy: -180 })] },
  g_bulgaro: { name: 'Agachamento búlgaro com halteres', props: 'bench', db: true, how: 'Pé de trás apoiado no banco, halteres nas mãos. Desça até o joelho de trás quase tocar o chão.', per: .7,
    poses: [P({ hy: -116, l1: [10, 10], l2: [-20, 80], a1: [0, 5], a2: [0, 5] }), P({ hy: -78, tr: 10, l1: [70, 90], l2: [-30, 100], a1: [0, 5], a2: [0, 5] })] },
  g_band: { name: 'Deslocamento lateral com miniband', band: true, how: 'Elástico nos tornozelos e base baixa. Dê passos laterais sem juntar os pés.', per: .55,
    poses: [P({ hx: -60, hy: -104, tr: 15, l1: [25, 40], l2: [-15, 35], a1: [50, 60], a2: [40, 60] }), P({ hx: 60, hy: -104, tr: 15, l1: [25, 40], l2: [-15, 35], a1: [50, 60], a2: [40, 60] })] },
  g_pallof: { name: 'Pallof press na polia', props: 'pulley', cable: [-222, -180], how: 'De lado para a polia, empurre o cabo à frente do peito sem deixar o tronco girar. Faça os dois lados.', per: .7,
    poses: [P({ hy: -112, l1: [10, 15], l2: [-5, 15], a1: [60, 110], a2: [60, 110] }), P({ hy: -112, l1: [10, 15], l2: [-5, 15], a1: [85, 5], a2: [85, 5] })] },
  g_lenhador: { name: 'Lenhador na polia', props: 'pulley', cable: [-222, -330], how: 'Puxe o cabo de cima para baixo cruzando o corpo, girando o tronco junto com o quadril.', per: .6,
    poses: [P({ tr: -10, a1: [-160, 0], a2: [-150, 0] }), P({ tr: 20, hy: -108, l1: [15, 25], l2: [-10, 20], a1: [45, 0], a2: [45, 0] })] },
  g_pant: { name: 'Panturrilha no step com peso', props: 'step', db: true, how: 'Na borda do step, segurando um halter, suba na ponta dos pés e desça abaixo da linha do degrau.', per: .55,
    poses: [P({ hy: -140, a1: [0, 5], a2: [0, 5] }), P({ hy: -154, a1: [0, 5], a2: [0, 5] })] },
  g_polia: { name: 'Elevação de perna na polia', props: 'pulley', cable: [-222, -20], cableTo: 'foot', how: 'Caneleira presa no cabo. Leve a perna estendida à frente com controle e volte devagar.', per: .6,
    poses: [P({ l1: [-5, 0], a1: [30, 30], a2: [-20, 30] }), P({ l1: [65, 0], a1: [30, 30], a2: [-20, 30], tr: -4 })] },
  g_escada: { name: 'Escada de agilidade', props: 'ladder', how: 'Dois pés em cada quadrado, o mais rápido que conseguir, olhando para frente.', per: .3,
    poses: [P({ hx: -120, hy: -120, l1: [45, 60], a1: [-30, 60], a2: [30, 60] }), P({ hx: -40, hy: -120, l2: [45, 60], a1: [30, 60], a2: [-30, 60] }), P({ hx: 40, hy: -120, l1: [45, 60], a1: [-30, 60], a2: [30, 60] }), P({ hx: 120, hy: -120, l2: [45, 60], a1: [30, 60], a2: [-30, 60] }), P({ hx: 40, hy: -120, l1: [45, 60], a1: [-30, 60], a2: [30, 60] }), P({ hx: -40, hy: -120, l2: [45, 60], a1: [30, 60], a2: [-30, 60] })] },
});
const GYM = { agsalto: 'g_box', afundo: 'g_bulgaro', lateral: 'g_band', prancha: 'g_pallof', prlateral: 'g_lenhador', panturrilha: 'g_pant', chutealto: 'g_polia', reacao: 'g_escada' };
const GT = { g_box: ['8 saltos'], g_bulgaro: ['8 cada perna'], g_band: ['30 s', 30], g_pallof: ['10 cada lado'], g_lenhador: ['10 cada lado'], g_pant: ['15 repetições'], g_polia: ['12 cada perna'], g_escada: ['1 min', 60] };
Object.assign(BASE, { g_box: [8, 'saltos'], g_bulgaro: [8, 'cada perna'], g_band: [30, 's', 1], g_pallof: [10, 'cada lado'], g_lenhador: [10, 'cada lado'], g_pant: [15, 'repetições'], g_polia: [12, 'cada perna'], g_escada: [60, 's', 1] });
['g_box', 'g_bulgaro', 'g_pant', 'g_escada'].forEach((k) => PHYS.add(k)); ['g_band', 'g_pallof', 'g_lenhador', 'g_polia'].forEach((k) => PHYS.add(k));
const place = () => (store.profile && store.profile.place) || 'casa';
const adaptK = (k) => place() === 'academia' && GYM[k] ? GYM[k] : k;
function adapt(it) {
  if (place() !== 'academia' || !GYM[it[0]]) return it;
  const g = GYM[it[0]];
  return [g, it[1], GT[g][0], GT[g][1] || 0, it[4]];
}
function placeToggle() {
  const p = place();
  return '<fieldset class="rate"><legend><b>Exercícios físicos</b><span>' + (p === 'academia' ? 'Na academia: caixote, halteres, banco, step, miniband, polia e escada de agilidade.' : 'Em casa: só com o peso do corpo, cones e uma bola de tênis.') + '</span></legend>' +
    '<div class="seg c2" data-place>' + [['casa', 'Em casa'], ['academia', 'Na academia']].map(([v, l]) => '<button type="button" data-v="' + v + '" aria-pressed="' + (p === v) + '">' + l + '</button>').join('') + '</div></fieldset>';
}
function wirePlace(cb) {
  const g = document.querySelector('#app [data-place]'); if (!g) return;
  g.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b || b.dataset.v === place()) return;
    store.profile = Object.assign({ name: '', place: 'casa' }, store.profile, { place: b.dataset.v });
    save(); applyProfile(); cb();
  });
}

/* ---------- Storage ---------- */
let store = { history: [], tests: [], analyses: [], profile: { name: '', place: 'casa' } }, ref = null, saving = Promise.resolve();
const LS = 'futevolei-casa-v1', VER = 1;
// Normaliza qualquer dado salvo ou importado para o formato atual; migrações futuras entram aqui, pela versão d.v.
function migrate(d) {
  d = d && typeof d === 'object' ? d : {};
  const arr = (x) => (Array.isArray(x) ? x.filter((i) => i && typeof i === 'object') : []);
  return { v: VER, history: arr(d.history), tests: arr(d.tests), analyses: arr(d.analyses),
    profile: Object.assign({ name: '', place: 'casa' }, d.profile && typeof d.profile === 'object' ? d.profile : {}) };
}
let saveFailed = false;
function warnSave(on) {
  saveFailed = on;
  const w = document.getElementById('warn'); if (!w) return;
  w.hidden = !on;
}
try { const s = localStorage.getItem(LS); if (s) store = migrate(JSON.parse(s)); } catch (e) {}
// Pede ao navegador para não apagar os dados sozinho quando faltar espaço.
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) {}
function save() {
  store.v = VER;
  try { localStorage.setItem(LS, JSON.stringify(store)); if (saveFailed) warnSave(false); } catch (e) { warnSave(true); }
  if (ref) { const data = JSON.parse(JSON.stringify(store)); saving = saving.then(() => ref.set(data)).catch(() => {}); }
}
(async function connect() {
  try {
    if (!window.claude || !window.claude.use) return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id();
    if (!id) return;
    ref = db.doc('data/users/' + id + '/state');
    const snap = await Promise.race([ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
    if (snap.exists) {
      const d = snap.data() || {};
      store = { history: Array.isArray(d.history) ? d.history.slice() : [], tests: Array.isArray(d.tests) ? d.tests.slice() : [], analyses: Array.isArray(d.analyses) ? d.analyses.slice() : [], profile: Object.assign({ name: '', place: 'casa' }, d.profile && typeof d.profile === 'object' ? d.profile : {}) };
      applyProfile();
      try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {}
      render();
    } else if (store.history.length || store.tests.length || store.analyses.length) save();
  } catch (e) { ref = null; }
})();

/* ---------- Helpers ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ymd = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const mmss = (s) => Math.floor(s / 60) + ':' + String(Math.max(0, Math.ceil(s) % 60 === 60 ? 0 : Math.ceil(s) % 60)).padStart(2, '0');
function fmt(sec) { sec = Math.max(0, Math.ceil(sec)); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
function weekStart(d) { const x = new Date(d); const k = (x.getDay() + 6) % 7; x.setDate(x.getDate() - k); x.setHours(0, 0, 0, 0); return x; }
let audio = null, sched = [], ka = null;
function ctx() { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended' && audio.resume) audio.resume().catch(() => {}); return audio; }
function tones(at, n, list) {
  const a = ctx();
  for (let i = 0; i < n; i++) {
    const o = a.createOscillator(), g = a.createGain(), t = at + i * .22;
    o.frequency.value = 880; o.type = 'sine'; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + .18);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + .2);
    if (list) list.push(g);
  }
}
const vib = () => { try { navigator.vibrate && navigator.vibrate(150); } catch (e) {} };
function beep(times) { try { const a = ctx(); if (times) tones(a.currentTime, times); } catch (e) {} if (times) vib(); }
// The end-of-timer beep is booked in the audio clock when the timer starts, so it does not depend on page timers that the phone slows down in the background.
function clearSched() { sched.forEach((g) => { try { g.disconnect(); } catch (e) {} }); sched = []; }
function scheduleEnd(sec) { clearSched(); try { const a = ctx(); tones(a.currentTime + Math.max(0, sec), 2, sched); return true; } catch (e) { return false; } }
function keepAlive(on) {
  try {
    if (on && !ka) { const a = ctx(), g = a.createGain(); ka = a.createOscillator(); g.gain.value = 0.0001; ka.connect(g).connect(a.destination); ka.start(); }
    else if (!on && ka) { ka.stop(); ka = null; }
  } catch (e) {}
}
function requestLock() {
  try {
    if (!navigator.wakeLock || !S) return;
    navigator.wakeLock.request('screen').then((l) => { if (!S) { l.release(); return; } S.lock = l; l.addEventListener('release', () => { if (S && S.lock === l) S.lock = null; }); }).catch(() => { if (S) S.lock = null; });
  } catch (e) {}
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && S) { requestLock(); try { ctx(); } catch (e) {} onTick(); } });
const live = (msg) => { $('#live').textContent = msg; };

/* ---------- Views ---------- */
let tab = 'treino', view = { name: 'home' };
const app = $('#app');

function render() {
  document.querySelectorAll('.nav button').forEach((b) => b.setAttribute('aria-current', b.dataset.tab === tab ? 'page' : 'false'));
  app.innerHTML = '';
  if (tab === 'treino') view.name === 'detail' ? renderDetail(view.key) : renderHome();
  else if (tab === 'analise') renderAnalysis();
  else if (tab === 'semana') renderWeek();
  else renderTests();
  window.scrollTo(0, 0);
}

function renderHome() {
  const now = new Date(), plan = PLAN[now.getDay()];
  const dateTxt = DAYS[now.getDay()] + ', ' + now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const key = plan.w || 'A';
  app.innerHTML = '<div class="top"><h1>Futevôlei em casa</h1><span class="date">' + esc(dateTxt) + '</span></div>' +
    '<section class="board hero"><div class="kicker">' + (plan.w ? 'Treino de hoje' : 'Hoje é dia de ' + esc(plan.txt.toLowerCase())) + '</div>' +
    '<h2>' + (plan.w ? esc(plan.txt) : 'Quer treinar mesmo assim?') + '</h2><p>' + esc(plan.w ? plan.sub : 'Escolha um treino abaixo ou comece o Treino A.') + '</p>' +
    '<div class="hero-fig"></div><div class="actions"><button class="btn btn-ball" data-start="' + key + '">Começar ' + (key === 'F' ? 'treino focado' : wTitle(key)) + '</button>' +
    '<button class="btn btn-ghost" data-open="' + key + '">Ver exercícios</button></div></section>' +
    '<h2 class="section-title">Treinos</h2><div class="wk">' +
    (WK.F ? '' : '<button class="wk-card" data-tab-go="analise"><span class="wk-letter">?</span><span><h3>Faça sua análise</h3><span class="meta">Diga onde quer melhorar e receba um treino focado</span></span><span class="go" aria-hidden="true">›</span></button>') +
    (WK.F ? ['F', 'aq', 'A', 'B', 'C'] : ['aq', 'A', 'B', 'C']).map((k) => { const w = WK[k]; return '<button class="wk-card" data-open="' + k + '"><span class="wk-letter">' + w.letter + '</span><span><h3>' + (k === 'aq' || k === 'F' ? wTitle(k) : 'Treino ' + w.letter + ': ' + esc(w.name)) + '</h3><span class="meta">' + (k === 'F' ? 'Foco: ' + esc(listJoin(lastAnalysis().focus.map(fname))) + ' · ' : '') + w.mins + ' min · ' + w.items.length + ' exercícios' + (w.mode === 'circuit' ? ' · 3 voltas' : '') + '</span></span><span class="go" aria-hidden="true">›</span></button>'; }).join('') +
    '</div><p class="note">Treine 4 a 5 vezes por semana. Qualidade antes de quantidade: se a bola cair, recomece a série com calma.</p>';
  const heroKey = key === 'F' ? WK.F.items[0][0] : { A: 'embaixadinha', A2: 'pefraco', B: 'shark', BC: 'shark', C: 'agsalto', aq: 'polichinelo' }[key];
  $('.hero-fig').appendChild(figure(adaptK(heroKey)).svg);
}

function renderDetail(key) {
  const w = WK[key], title = wTitle(key);
  app.innerHTML = '<button class="back" data-home>‹ Voltar</button><div class="detail-head"><h2>' + esc(title) + (key === 'aq' || key === 'F' ? '' : ': ' + esc(w.name)) + '</h2>' +
    '<p>' + w.mins + ' min · ' + w.items.length + ' exercícios' + (w.mode === 'circuit' ? ' em circuito, 3 voltas, 90 s de descanso entre voltas' : '') + '</p></div>' +
    (key === 'aq' ? '' : '<label class="toggle"><input type="checkbox" id="warm" checked> Incluir aquecimento de 10 min antes</label>') +
    (key === 'C' || key === 'F' || key === 'BC' ? placeToggle() : '') +
    '<div class="ex-list">' + w.items.map(adapt).map((it, i) => '<div class="ex"><button class="ex-btn" aria-expanded="false" data-ex="' + i + '"><span class="ex-num">' + (i + 1) + '</span><span class="ex-name">' + esc(EX[it[0]].name) + '</span><span class="ex-vol">' + esc(volLabel(w, it)) + '</span></button></div>').join('') + '</div>' +
    '<p class="note">' + esc(w.note) + ' Toque num exercício para ver o exemplo.</p>' +
    '<div class="sticky-go"><button class="btn btn-ball" data-start="' + key + '">Começar ' + (key === 'aq' ? 'aquecimento' : esc(title)) + '</button></div>';
  app.querySelectorAll('.ex-btn').forEach((b) => b.addEventListener('click', () => {
    const box = b.parentElement, open = b.getAttribute('aria-expanded') === 'true';
    app.querySelectorAll('.ex-btn[aria-expanded="true"]').forEach((o) => { o.setAttribute('aria-expanded', 'false'); const x = o.parentElement.querySelector('.ex-open'); if (x) x.remove(); });
    if (open) return;
    b.setAttribute('aria-expanded', 'true');
    const it = adapt(w.items[+b.dataset.ex]), div = document.createElement('div');
    div.className = 'ex-open';
    div.innerHTML = '<div class="board"></div><p>' + esc(EX[it[0]].how) + '</p>';
    div.firstChild.appendChild(figure(it[0]).svg);
    box.appendChild(div);
  }));
  wirePlace(() => renderDetail(key));
}

let draft = null;
function renderAnalysis() {
  const last = lastAnalysis(), sug = suggestions(), nSug = Object.keys(sug).length;
  if (!draft && last) return renderResult(last);
  if (!draft) draft = { ratings: Object.fromEntries(FUND.map((f) => [f[0], sug[f[0]] ? sug[f[0]].v : 3])), level: 'intermediario', mins: 45, wall: true };
  const LBL = ['', 'Preciso melhorar muito', 'Fraco', 'Regular', 'Bom', 'Domino bem'];
  const seg = (name, opts, cur, cls) => '<div class="seg ' + (cls || '') + '" role="group" data-g="' + name + '">' + opts.map(([v, l]) => '<button type="button" data-v="' + v + '" aria-pressed="' + (String(cur) === String(v)) + '">' + esc(l) + '</button>').join('') + '</div>';
  let h = (last ? '<button class="back" id="cancelA">‹ Voltar ao resultado</button>' : '') +
    '<div class="top"><h1>Análise</h1></div><p class="note" style="margin-top:0">Arraste cada barra até a nota que mostra como você está hoje. As notas mais baixas viram o foco do seu treino.</p>' +
    (nSug ? '<div class="sugbox"><p>' + nSug + ' de ' + FUND.length + ' notas têm sugestão a partir dos seus testes e das séries registradas. Ajuste se não refletirem o seu jogo.</p>' + (FUND.some((f) => sug[f[0]] && sug[f[0]].v !== draft.ratings[f[0]]) ? '<button type="button" class="btn btn-ghost" data-useall>Usar todas as sugestões</button>' : '') + (nSug < FUND.length ? '<p class="sugg" style="margin:0">Para ter sugestão em mais fundamentos, faça os <button type="button" class="link" data-tab-go="perfil">testes de habilidade</button> no Perfil.</p>' : '') + '</div>'
      : '<div class="sugbox"><p>Faça os testes de habilidade no Perfil e o app sugere as notas para você, com base nos seus números.</p><button type="button" class="btn btn-ghost" data-tab-go="perfil">Ir para os testes</button></div>');
  FUND.forEach(([k, n, d]) => {
    const v = draft.ratings[k] || 3, s = sug[k];
    h += '<fieldset class="rate"><legend class="fl"><span><b>' + esc(n) + '</b><span>' + esc(d) + '</span></span><output id="o-' + k + '"><b>' + v + '</b>' + LBL[v] + '</output></legend>' +
      '<input class="rng" type="range" min="1" max="5" step="1" value="' + v + '" data-k="' + k + '" aria-label="' + esc(n) + '" aria-valuetext="' + v + ', ' + LBL[v] + '" style="--p:' + (v - 1) * 25 + '%">' +
      '<div class="ticks" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>' +
      (s ? '<div class="sugg">Sugestão: <b>' + s.v + '</b>. ' + esc(s.why) + '.' + (s.v !== v ? ' <button type="button" class="link" data-use="' + k + '">Usar</button>' : '') + '</div>' : '') + '</fieldset>';
  });
  h += '<h2 class="section-title">Sobre você</h2>' +
    '<fieldset class="rate"><legend><b>Seu nível</b></legend>' + seg('level', LEVELS, draft.level, 'c3') + '</fieldset>' +
    '<fieldset class="rate"><legend><b>Tempo por treino</b></legend>' + seg('mins', [[30, '30 min'], [45, '45 min'], [60, '60 min']], draft.mins, 'c3') + '</fieldset>' +
    '<fieldset class="rate"><legend><b>Tem uma parede livre para treinar?</b><span>Sem parede, os exercícios que precisam dela ficam de fora.</span></legend>' + seg('wall', [['1', 'Tenho'], ['0', 'Não tenho']], draft.wall ? '1' : '0', 'c2') + '</fieldset>' +
    '<div class="sticky-go"><button class="btn btn-ball" id="gen">Gerar meu treino</button></div><div class="warn" id="genMsg" role="status"></div>';
  app.innerHTML = h;
  const reAn = () => { const y = window.scrollY; renderAnalysis(); window.scrollTo(0, y); };
  app.querySelectorAll('[data-use]').forEach((b) => b.addEventListener('click', () => { draft.ratings[b.dataset.use] = sug[b.dataset.use].v; reAn(); }));
  const ua = $('[data-useall]'); if (ua) ua.addEventListener('click', () => { Object.keys(sug).forEach((k) => { draft.ratings[k] = sug[k].v; }); reAn(); });
  app.querySelectorAll('.rng').forEach((r) => r.addEventListener('input', () => {
    const v = +r.value, k = r.dataset.k;
    draft.ratings[k] = v;
    r.style.setProperty('--p', (v - 1) * 25 + '%');
    r.setAttribute('aria-valuetext', v + ', ' + LBL[v]);
    $('#o-' + k).innerHTML = '<b>' + v + '</b>' + LBL[v];
  }));
  app.querySelectorAll('.seg').forEach((g) => g.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const name = g.dataset.g, v = b.dataset.v;
    g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (name.indexOf('r:') === 0) draft.ratings[name.slice(2)] = +v; else if (name === 'level') draft.level = v; else if (name === 'mins') draft.mins = +v; else draft.wall = v === '1';
  }));
  const c = $('#cancelA'); if (c) c.addEventListener('click', () => { draft = null; render(); });
  $('#gen').addEventListener('click', () => {
    const miss = FUND.filter((f) => !draft.ratings[f[0]]);
    if (miss.length) { $('#genMsg').textContent = 'Falta dar nota para: ' + listJoin(miss.map((f) => f[1])) + '.'; return; }
    const order = FUND.map((f, i) => ({ k: f[0], v: draft.ratings[f[0]], i })).sort((x, y) => x.v - y.v || x.i - y.i);
    const a = { date: ymd(new Date()), ratings: Object.assign({}, draft.ratings), level: draft.level, mins: draft.mins, wall: draft.wall, focus: order.slice(0, 3).map((o) => o.k) };
    store.analyses = (store.analyses || []).concat([a]);
    save(); applyProfile(); draft = null; render();
  });
}
function renderResult(a) {
  const prev = store.analyses.length > 1 ? store.analyses[store.analyses.length - 2] : null, w = WK.F, lvl = (LEVELS.find((l) => l[0] === a.level) || LEVELS[1])[1];
  let h = '<div class="top"><h1>Sua análise</h1><span class="date">' + new Date(a.date + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) + '</span></div>' +
    '<section class="board hero"><div class="kicker">Seu foco</div><h2>' + esc(listJoin(a.focus.map(fname))) + '</h2><p>Treino focado de ' + a.mins + ' min com ' + w.items.length + ' exercícios. Nível: ' + esc(lvl.toLowerCase()) + (a.wall ? '' : ', sem parede') + '.</p>' +
    '<div class="hero-fig"></div><div class="actions"><button class="btn btn-ball" id="startF">Começar treino focado</button><button class="btn btn-ghost" id="openF">Ver exercícios</button></div></section>' +
    '<h2 class="section-title">Suas notas</h2><div class="board bars">' + FUND.map(([k, n]) => {
      const v = a.ratings[k], pv = prev && prev.ratings[k], d = pv ? v - pv : 0;
      return '<div class="bar-row' + (a.focus.indexOf(k) > -1 ? ' focus' : '') + '"><div class="lab"><span>' + esc(n) + '</span><span>' + v + ' de 5' + (d ? ' (' + (d > 0 ? '+' : '') + d + ')' : '') + '</span></div><div class="track"><i style="width:' + v * 20 + '%"></i>' + (pv ? '<span class="prev" style="left:calc(' + pv * 20 + '% - 2px)"></span>' : '') + '</div></div>';
    }).join('') + '<p class="bars-key">' + (prev ? 'Em laranja, o seu foco. A marca clara mostra a nota da análise anterior.' : 'Em laranja, os fundamentos que viraram o seu foco.') + '</p></div>' +
    '<h2 class="section-title">Por que esse treino</h2><ul class="tips">' + a.focus.map((k, i) => '<li><b>' + (i + 1) + 'º foco: ' + esc(fname(k)) + '</b>' + esc(TIPS[k]) + '</li>').join('') + '</ul>' +
    '<p class="note">O treino focado entra na quinta-feira da sua semana. Refaça a análise a cada quatro semanas para ver sua evolução e ajustar o foco.</p>' +
    '<button class="btn btn-ghost" id="redo" style="width:100%;margin-top:6px">Refazer análise</button>';
  app.innerHTML = h;
  $('.hero-fig').appendChild(figure(w.items[0][0]).svg);
  $('#startF').addEventListener('click', () => startWorkout('F'));
  $('#openF').addEventListener('click', () => { tab = 'treino'; view = { name: 'detail', key: 'F' }; render(); });
  $('#redo').addEventListener('click', () => { draft = { ratings: Object.assign({}, a.ratings), level: a.level, mins: a.mins, wall: a.wall }; render(); });
}

function profileHead() {
  const p = store.profile || {}, name = (p.name || '').trim(), a = lastAnalysis(), now = new Date(), ws = weekStart(now);
  const initials = name ? name.split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase() : '?';
  const total = store.history.length, week = store.history.filter((h) => new Date(h.date + 'T12:00') >= ws).length;
  const mins = store.history.reduce((s, h) => s + (+h.mins || 0), 0);
  const counts = [];
  for (let i = 7; i >= 0; i--) { const s = new Date(ws); s.setDate(ws.getDate() - i * 7); const e = new Date(s); e.setDate(s.getDate() + 7); counts.push({ s, c: store.history.filter((h) => { const d = new Date(h.date + 'T12:00'); return d >= s && d < e; }).length }); }
  let streak = 0; for (let i = counts.length - 1; i >= 0; i--) { if (counts[i].c) streak++; else if (i !== counts.length - 1) break; }
  const mx = Math.max(3, ...counts.map((c) => c.c));
  const chart = '<svg viewBox="0 0 320 132" role="img" aria-label="Treinos por semana nas últimas 8 semanas">' + counts.map((c, i) => {
    const x = 8 + i * 39, h = c.c / mx * 86, y = 104 - h;
    return '<rect' + (i === 7 ? ' class="cur"' : '') + ' x="' + x + '" y="' + (c.c ? y : 102).toFixed(1) + '" width="28" height="' + (c.c ? h : 2).toFixed(1) + '" rx="5"/>' +
      (c.c ? '<text class="n" x="' + (x + 14) + '" y="' + (y - 5).toFixed(1) + '" text-anchor="middle">' + c.c + '</text>' : '') +
      '<text x="' + (x + 14) + '" y="124" text-anchor="middle">' + (i === 7 ? 'agora' : c.s.getDate() + '/' + (c.s.getMonth() + 1)) + '</text>';
  }).join('') + '</svg>';
  const lvl = a ? (LEVELS.find((l) => l[0] === a.level) || LEVELS[1])[1] : '';
  let h = '<div class="prof"><div class="avatar" aria-hidden="true">' + esc(initials) + '</div><div class="pinfo"><label class="sr" for="pname">Seu nome</label><input id="pname" class="pname" placeholder="Seu nome" maxlength="40" value="' + esc(name) + '">' +
    '<span class="meta">' + (a ? esc(lvl) + ', foco em ' + esc(listJoin(a.focus.map(fname)).toLowerCase()) : 'Faça a análise para definir seu foco') + '</span></div></div>' +
    placeToggle() +
    '<div class="stats4"><div class="board stat"><b>' + total + '</b><span>treinos no total</span></div><div class="board stat"><b>' + week + '</b><span>nesta semana</span></div>' +
    '<div class="board stat"><b>' + streak + '</b><span>' + (streak === 1 ? 'semana seguida' : 'semanas seguidas') + '</span></div><div class="board stat"><b>' + (mins / 60).toFixed(1).replace('.', ',') + ' h</b><span>de treino</span></div></div>' +
    '<h2 class="section-title">Treinos por semana</h2><div class="board chartbox">' + chart + '</div>' +
    '<h2 class="section-title">Evolução dos fundamentos</h2>';
  const an = store.analyses || [];
  if (!an.length) h += '<div class="board empty"><p>Faça sua primeira análise para acompanhar como cada fundamento evolui.</p><button class="btn btn-ball" data-tab-go="analise">Fazer análise</button></div>';
  else {
    const first = an[0], last = an[an.length - 1];
    h += '<p class="note" style="margin-top:0">' + (an.length === 1 ? 'Primeira análise em ' + new Date(first.date + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) + '. Refaça em quatro semanas para comparar.' : an.length + ' análises desde ' + new Date(first.date + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) + '. Comparação entre a primeira e a mais recente.') + '</p><div class="wk">';
    FUND.forEach(([k, n]) => {
      const vals = an.map((x) => x.ratings[k]).filter((v) => v != null), d = last.ratings[k] - first.ratings[k];
      let spark = '';
      if (vals.length > 1) spark = '<svg class="spark" viewBox="0 0 110 28" aria-hidden="true"><path d="' + vals.map((v, i) => (i ? 'L' : 'M') + (4 + i * 102 / (vals.length - 1)).toFixed(1) + ' ' + (25 - (v - 1) / 4 * 22).toFixed(1)).join('') + '"/></svg>';
      h += '<div class="evo"><b>' + esc(n) + '</b><span class="d' + (d > 0 ? ' up' : '') + '">' + (an.length > 1 ? first.ratings[k] + ' → ' + last.ratings[k] + (d ? ' (' + (d > 0 ? '+' : '') + d + ')' : '') : last.ratings[k] + ' de 5') + '</span>' +
        (spark ? '<div class="sub"><span>' + (d > 0 ? 'Melhorou' : d < 0 ? 'Caiu' : 'Estável') + '</span>' + spark + '</div>' : '') + '</div>';
    });
    h += '</div>';
  }
  return h;
}
function profileTail() {
  const per = {};
  store.history.forEach((h, hi) => {
    const by = {};
    (h.sets || []).forEach((s) => { (by[s.k] = by[s.k] || []).push(s); });
    Object.keys(by).forEach((k) => {
      const l = by[k], avg = l.reduce((a, s) => a + s.v, 0) / l.length, o = per[k] = per[k] || { best: 0, avgs: [], u: l[0].u };
      o.avgs.push(avg); o.goal = l[0].g; o.last = hi; o.best = Math.max(o.best, ...l.map((s) => s.v));
    });
  });
  const ks = Object.keys(per).filter((k) => EX[k]).sort((a, b) => per[b].last - per[a].last);
  let nums = '<h2 class="section-title">Seus números por exercício</h2>';
  if (!ks.length) nums += '<p class="note" style="margin-top:0">Durante o treino, registre quantos toques ou repetições fez em cada série. Seus recordes e médias aparecem aqui.</p>';
  else nums += '<div class="wk">' + ks.map((k) => {
    const o = per[k], u = o.u === 's' ? ' s' : '', av = o.avgs, la = Math.round(av[av.length - 1]);
    let spark = '';
    if (av.length > 1) { const mx = Math.max(...av), mn = Math.min(...av), rg = mx - mn || 1; spark = '<svg class="spark" viewBox="0 0 110 28" aria-hidden="true"><path d="' + av.map((v, i) => (i ? 'L' : 'M') + (4 + i * 102 / (av.length - 1)).toFixed(1) + ' ' + (24 - (v - mn) / rg * 20).toFixed(1)).join('') + '"/></svg>'; }
    return '<div class="evo"><b>' + esc(EX[k].name) + '</b><span class="d up">Recorde: ' + o.best + u + '</span><div class="sub"><span>Última média: ' + la + u + ' de ' + o.goal + u + (av.length > 1 ? ', em ' + av.length + ' treinos' : '') + '</span>' + spark + '</div></div>';
  }).join('') + '</div>';
  const rec = store.history.slice(-8).reverse();
  return nums + '<h2 class="section-title">Treinos recentes</h2>' + (rec.length ? '<div class="days">' + rec.map((x) => {
    const d = new Date(x.date + 'T12:00');
    return '<div class="day"><span class="dn">' + d.getDate() + '/' + (d.getMonth() + 1) + '</span><span><span class="pl">' + esc(x.w === 'F' || x.w === 'aq' || !WK[x.w] ? wTitle(x.w) : 'Treino ' + WK[x.w].letter + ': ' + WK[x.w].name) + '</span><br><span class="sub">' + (x.mins || 1) + ' min</span></span><span class="st' + (x.partial ? '' : ' ok') + '">' + (x.partial ? 'Parcial' : '✓ Feito') + '</span></div>';
  }).join('') + '</div>' : '<p class="note" style="margin-top:0">Seus treinos concluídos aparecem aqui.</p>') + backupBox();
}
function backupBox() {
  return '<h2 class="section-title">Seus dados</h2><p class="note" style="margin-top:0">Tudo fica salvo só neste aparelho. Exporte um backup de vez em quando para não perder o histórico se trocar de celular ou limpar o navegador.</p>' +
    '<div class="bk"><button class="btn btn-ghost" type="button" id="bkExp">Exportar backup</button><button class="btn btn-ghost" type="button" id="bkImp">Importar backup</button>' +
    '<input type="file" id="bkFile" accept="application/json,.json" hidden></div><div class="saved" id="bkMsg" role="status"></div>';
}
function wireBackup() {
  const msg = (t) => { const m = $('#bkMsg'); if (m) m.textContent = t; };
  $('#bkExp').addEventListener('click', () => {
    try {
      const out = { app: 'futevolei-em-casa', v: VER, exportedAt: new Date().toISOString(), data: store };
      const url = URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'futevolei-backup-' + ymd(new Date()) + '.json';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      msg('Backup exportado: ' + store.history.length + ' treinos.');
    } catch (e) { msg('Não foi possível exportar o backup.'); }
  });
  const file = $('#bkFile');
  $('#bkImp').addEventListener('click', () => file.click());
  file.addEventListener('change', () => {
    const f = file.files && file.files[0]; file.value = ''; if (!f) return;
    const r = new FileReader();
    r.onerror = () => msg('Não foi possível ler o arquivo.');
    r.onload = () => {
      let d; try { d = JSON.parse(r.result); } catch (e) { return msg('Arquivo inválido: não é um backup do app.'); }
      if (d && d.app === 'futevolei-em-casa' && d.data) d = d.data;
      if (!d || typeof d !== 'object' || !['history', 'tests', 'analyses'].some((k) => Array.isArray(d[k]))) return msg('Arquivo inválido: não é um backup do app.');
      if (+d.v > VER) return msg('Esse backup é de uma versão mais nova do app.');
      const n = migrate(d);
      if (!confirm('Substituir seus dados atuais (' + store.history.length + ' treinos) pelo backup (' + n.history.length + ' treinos)? Isso não pode ser desfeito.')) return;
      store = n; save(); applyProfile(); renderTests(); msg('Backup importado: ' + n.history.length + ' treinos.');
    };
    r.readAsText(f);
  });
}
function wireProfile() {
  wireBackup();
  const inp = $('#pname');
  inp.addEventListener('change', () => { store.profile = Object.assign({ name: '', place: 'casa' }, store.profile, { name: inp.value.trim().slice(0, 40) }); save(); const y = window.scrollY; renderTests(); window.scrollTo(0, y); });
  wirePlace(() => { const y = window.scrollY; renderTests(); window.scrollTo(0, y); });
}

function renderWeek() {
  const now = new Date(), ws = weekStart(now), done = new Set(store.history.map((h) => h.date));
  const thisWeek = store.history.filter((h) => new Date(h.date + 'T12:00') >= ws).length;
  let html = '<div class="top"><h1>Sua semana</h1></div><div class="stat-row"><div class="board stat"><b>' + thisWeek + '</b><span>treinos nesta semana</span></div><div class="board stat"><b>' + store.history.length + '</b><span>treinos no total</span></div></div><div class="days">';
  for (let i = 0; i < 7; i++) {
    const d = new Date(ws); d.setDate(ws.getDate() + i);
    const dow = d.getDay(), p = PLAN[dow], isToday = ymd(d) === ymd(now), ok = done.has(ymd(d));
    html += '<div class="day' + (isToday ? ' today' : '') + '"' + (p.w ? ' data-open="' + p.w + '" role="button" tabindex="0" aria-label="Ver ' + esc(p.txt) + ' de ' + DAYS[dow] + '"' : '') + '><span class="dn">' + DAYS[dow].slice(0, 3) + '</span><span><span class="pl">' + esc(p.txt) + '</span><br><span class="sub">' + esc(p.sub) + '</span></span><span class="st' + (ok ? ' ok' : '') + '">' + (ok ? '✓ Feito' : isToday ? 'Hoje' : (p.w ? '<span class="go">Ver ›</span>' : '')) + '</span></div>';
  }
  html += '</div><p class="note">Se tiver só quatro dias, tire a quinta-feira. Refaça os testes de evolução a cada duas semanas.</p>';
  app.innerHTML = html;
}

function renderTests() {
  const last = (k) => { for (let i = store.tests.length - 1; i >= 0; i--) if (store.tests[i].v[k] != null) return store.tests[i]; return null; };
  let html = profileHead() + '<h2 class="section-title">Testes de habilidade</h2><p class="note" style="margin-top:0">Faça cada teste três vezes e anote o melhor resultado. Repita a cada duas semanas. Os resultados também sugerem as notas da sua análise.</p><div class="wk">';
  TESTS.forEach(([k, label]) => {
    const vals = store.tests.filter((t) => t.v[k] != null).map((t) => +t.v[k]), l = last(k), best = vals.length ? Math.max.apply(null, vals) : null;
    let spark = '';
    if (vals.length > 1) { const mx = Math.max.apply(null, vals), mn = Math.min.apply(null, vals), rg = mx - mn || 1; spark = '<svg class="spark" viewBox="0 0 110 28" aria-hidden="true"><path d="' + vals.map((v, i) => (i ? 'L' : 'M') + (4 + i * 102 / (vals.length - 1)).toFixed(1) + ' ' + (24 - (v - mn) / rg * 20).toFixed(1)).join('') + '"/></svg>'; }
    html += '<div class="test"><label for="t-' + k + '">' + esc(label) + '</label><input id="t-' + k + '" type="number" inputmode="numeric" min="0" placeholder="—">' +
      '<div class="hist"><span>' + (l ? 'Último: <b>' + l.v[k] + '</b> em ' + new Date(l.date + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) + ' · Melhor: <b>' + best + '</b>' : 'Nenhum resultado ainda') + '</span>' + spark + '</div></div>';
  });
  html += '</div><button class="btn btn-ball" id="saveTests" style="width:100%;margin-top:12px">Salvar resultados de hoje</button><div class="saved" id="savedMsg" role="status"></div>' + profileTail();
  app.innerHTML = html;
  wireProfile();
  $('#saveTests').addEventListener('click', () => {
    const v = {};
    TESTS.forEach(([k]) => { const x = $('#t-' + k).value; if (x !== '' && !isNaN(+x)) v[k] = +x; });
    if (!Object.keys(v).length) { $('#savedMsg').textContent = 'Preencha pelo menos um resultado para salvar.'; return; }
    const date = ymd(new Date()), ex = store.tests.find((t) => t.date === date);
    if (ex) Object.assign(ex.v, v); else store.tests.push({ date, v });
    save(); renderTests(); $('#savedMsg').textContent = 'Resultados salvos.';
  });
}

/* ---------- Player ---------- */
const pl = $('#player');
let S = null, tick = null;
function startWorkout(key) {
  const warm = $('#warm') ? $('#warm').checked : key !== 'aq';
  S = { key, steps: buildSteps(key, warm), i: 0, phase: 'work', started: Date.now(), timer: null, exitArmed: false, logs: {}, done: new Set(), saved: false };
  pl.hidden = false; document.body.style.overflow = 'hidden';
  requestLock(); keepAlive(true);
  renderPlayer();
  clearInterval(tick); tick = setInterval(onTick, 200);
}
function closePlayer() {
  clearInterval(tick); tick = null;
  clearSched(); keepAlive(false);
  logSession();
  try { S && S.lock && S.lock.release(); } catch (e) {}
  S = null; pl.hidden = true; pl.innerHTML = ''; document.body.style.overflow = '';
  render();
}
function remaining() { const t = S.timer; if (!t) return 0; return t.running ? (t.end - Date.now()) / 1000 : t.left; }
function startTimer(sec) { S.timer = { total: sec, end: Date.now() + sec * 1000, running: true, left: sec }; S.timer.sched = scheduleEnd(sec); }
function goWork(i) { clearSched(); S.i = i; S.phase = 'work'; S.timer = null; renderPlayer(); }
const LOGQ = {
  embaixadinha: ['Quantos toques sem deixar cair?', 'toques'], pefraco: ['Quantos toques sem deixar cair?', 'toques'], alternando: ['Quantos toques sem deixar cair?', 'toques'],
  coxa: ['Quantos toques sem deixar cair?', 'toques'], cabeceio: ['Quantos toques sem deixar cair?', 'toques'], ombro: ['Quantos toques sem deixar cair?', 'toques'],
  pecoxacabeca: ['Quantos ciclos completos?', 'ciclos'], sequencia: ['Quantos ciclos completos?', 'ciclos'],
  peito: ['Quantos domínios limpos?', 'domínios'], matar: ['Quantos domínios sem quicar?', 'domínios'],
  recpeito: ['Quantas recepções boas?', 'recepções'], reccoxa: ['Quantas recepções boas?', 'recepções'], levantada: ['Quantas levantadas boas?', 'levantadas'],
  cabalvo: ['Quantos acertaram o alvo?', 'acertos'], pepeito: ['Quantos acertaram o alvo?', 'acertos'], ataque: ['Quantos ataques no alvo?', 'ataques'], shark: ['Quantos sharks no alvo?', 'acertos'],
};
const loggable = (st) => st.block !== 'Aquecimento';
const goalOf = (st) => st.time > 0 ? st.time : (parseInt(st.target, 10) || 0);
const logQ = (st) => st.time > 0 ? ['Quantos segundos você aguentou?', 's'] : (LOGQ[st.k] || ['Quantas repetições você fez?', 'repetições']);
function bestFor(k) { let b = null; store.history.forEach((h) => (h.sets || []).forEach((s) => { if (s.k === k && s.v != null && (b == null || s.v > b)) b = s.v; })); return b; }
function logBox() {
  const st = S.steps[S.i];
  if (!loggable(st) || !S.done.has(S.i)) return '';
  const q = logQ(st), best = bestFor(st.k), btn = (d) => '<button type="button" data-act="lg" data-d="' + d + '" aria-label="' + (d > 0 ? 'Mais ' : 'Menos ') + Math.abs(d) + '">' + (d > 0 ? '+' : '−') + Math.abs(d) + '</button>';
  return '<div class="logbox"><div class="lq">' + esc(q[0]) + '</div><div class="lex">' + esc(EX[st.k].name) + ', ' + esc(st.tag.toLowerCase()) + '</div>' +
    '<div class="stepper">' + btn(-5) + btn(-1) + '<output class="lv" aria-live="polite">' + S.logs[S.i] + '</output>' + btn(1) + btn(5) + '</div>' +
    '<div class="lmeta">Meta: ' + goalOf(st) + ' ' + q[1] + (best != null ? '. Seu recorde: ' + best + ' ' + q[1] + '.' : '.') + '</div></div>';
}
function summary() {
  const by = {};
  S.done.forEach((i) => { const st = S.steps[i]; if (!loggable(st) || S.logs[i] == null) return; (by[st.k] = by[st.k] || { g: goalOf(st), u: logQ(st)[1], v: [] }).v.push(S.logs[i]); });
  const keys = Object.keys(by); if (!keys.length) return '';
  const met = keys.filter((k) => by[k].v.every((x) => x >= by[k].g));
  return '<div class="sum">' + keys.map((k) => {
    const o = by[k], ok = o.v.every((x) => x >= o.g), best = bestFor(k), rec = best != null && Math.max.apply(null, o.v) > best;
    return '<div class="sum-row"><span>' + esc(EX[k].name) + (rec ? '<em>Novo recorde</em>' : '') + '</span><span class="v' + (ok ? ' ok' : '') + '">' + o.v.join(' · ') + ' <small>de ' + o.g + (o.u === 's' ? ' s' : '') + '</small></span></div>';
  }).join('') + '</div>' + (met.length ? '<p>Meta batida em todas as séries de ' + esc(listJoin(met.map((k) => EX[k].name.toLowerCase()))) + '. Na próxima, aumente cerca de 20%.</p>' : '');
}
function finishStep() {
  const st = S.steps[S.i];
  S.done.add(S.i);
  if (S.logs[S.i] === undefined) {
    if (st.time > 0) { const t = S.timer; S.logs[S.i] = t ? Math.max(1, Math.round(t.total - Math.max(0, remaining()))) : st.time; }
    else S.logs[S.i] = goalOf(st);
  }
  if (S.i >= S.steps.length - 1) { S.phase = 'done'; S.timer = null; renderPlayer(); beep(3); return; }
  S.phase = 'rest'; startTimer(st.rest || 10); renderPlayer();
}
function logSession() {
  if (!S || S.saved || !S.done.size) return;
  S.saved = true;
  const sets = [];
  Array.from(S.done).sort((a, b) => a - b).forEach((i) => { const st = S.steps[i]; if (!loggable(st) || S.logs[i] == null) return; sets.push({ k: st.k, v: S.logs[i], g: goalOf(st), u: st.time > 0 ? 's' : '' }); });
  const e = { date: ymd(new Date()), w: S.key, mins: Math.max(1, Math.round((Date.now() - S.started) / 60000)), sets };
  if (S.phase !== 'done') e.partial = true;
  store.history.push(e);
  if (store.history.length > 150) store.history.slice(0, store.history.length - 150).forEach((h) => { delete h.sets; });
  save();
}
function onTick() {
  if (!S || !S.timer) return;
  const r = remaining(), t = S.timer;
  if (t.running && r <= 0) {
    t.running = false; t.left = 0;
    if (S.phase === 'rest') { if (t.sched) vib(); else beep(2); goWork(S.i + 1); live('Descanso terminado. ' + EX[S.steps[S.i].k].name); return; }
    if (S.phase === 'work') { if (t.sched) vib(); else beep(2); finishStep(); return; }
  }
  const lbl = $('.p-time', pl); if (lbl) lbl.textContent = fmt(r);
  const prg = $('.prg', pl); if (prg) prg.style.strokeDashoffset = (628.3 * (1 - Math.max(0, r) / t.total)).toFixed(1);
}
function renderPlayer() {
  const st = S.steps[S.i], ex = EX[st.k], pct = ((S.i + (S.phase === 'work' ? 0 : 1)) / S.steps.length * 100).toFixed(1);
  let body = '<div class="player-in"><div class="p-top"><button class="icon-btn" data-act="exit">' + (S.exitArmed ? 'Sair mesmo?' : 'Sair') + '</button><span class="block">' + esc(st.block) + ' · ' + (S.i + 1) + ' de ' + S.steps.length + '</span>' +
    '<button class="icon-btn" data-act="prev" aria-label="Exercício anterior"' + (S.i === 0 ? ' disabled' : '') + '>‹</button><button class="icon-btn" data-act="next" aria-label="Pular para o próximo"' + (S.phase === 'done' ? ' disabled' : '') + '>›</button></div>' +
    '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"><i style="width:' + pct + '%"></i></div>';
  if (S.phase === 'work') {
    const timed = st.time > 0, t = S.timer;
    const best = loggable(st) ? bestFor(st.k) : null;
    body += '<div class="p-stage"></div><h2 class="p-name">' + esc(ex.name) + '</h2><div class="chips"><span class="chip hot">' + esc(st.tag) + '</span><span class="chip">' + esc(st.target) + '</span>' + (best != null ? '<span class="chip">Recorde: ' + best + (timed ? ' s' : '') + '</span>' : '') + '</div><p class="p-how">' + esc(ex.how) + '</p><div class="p-main">';
    if (timed) {
      body += '<div class="big-time p-time" aria-live="off">' + fmt(t ? remaining() : st.time) + '</div>';
      body += !t ? '<button class="btn btn-ball" data-act="tstart">Iniciar cronômetro</button><button class="btn btn-ghost" data-act="done">Já fiz</button>'
        : t.running ? '<button class="btn btn-ghost" data-act="tpause">Pausar</button><button class="btn btn-ball" data-act="done">Terminei</button>'
        : '<button class="btn btn-ball" data-act="tresume">Continuar</button><button class="btn btn-ghost" data-act="done">Terminei</button>';
    } else body += '<button class="btn btn-ball" data-act="done">Série feita</button>';
    body += '<div class="hint">' + (st.rest && S.i < S.steps.length - 1 ? 'Depois vem ' + fmt(st.rest) + ' de descanso.' : 'Último exercício.') + '</div></div>';
  } else if (S.phase === 'rest') {
    const nx = S.steps[S.i + 1];
    body += '<div class="rest">' + logBox() + '<h2>Descanso</h2><div class="ring"><svg viewBox="0 0 220 220"><circle class="trk" cx="110" cy="110" r="100"/><circle class="prg" cx="110" cy="110" r="100" stroke-dasharray="628.3" stroke-dashoffset="0"/></svg><div class="lbl p-time">' + fmt(remaining()) + '</div></div>' +
      '<div class="nx">Próximo: <b>' + esc(EX[nx.k].name) + '</b><br>' + esc(nx.tag) + ' · ' + esc(nx.target) + '</div><div class="p-stage" style="width:100%;max-width:200px"></div>' +
      '<div class="row"><button class="btn btn-ghost" data-act="plus">+15 s</button><button class="btn btn-ball" data-act="skip">Pular descanso</button></div>' +
      '<div class="hint">' + (S.lock ? 'A tela fica ligada até o fim do treino.' : 'Deixe a tela ligada para ouvir o aviso do fim do descanso.') + '</div></div>';
  } else {
    const mins = Math.max(1, Math.round((Date.now() - S.started) / 60000));
    body += '<div class="done"><h2>Treino concluído</h2><p>' + S.done.size + ' séries em ' + mins + ' min.</p>' + logBox() + summary() +
      '<p>Desaqueça com 5 min de alongamento: posterior de coxa, quadril, panturrilha e lombar.</p><button class="btn btn-ball" data-act="close">Salvar treino</button></div>';
  }
  body += '</div>';
  pl.innerHTML = body;
  const stage = $('.p-stage', pl);
  if (stage) stage.appendChild(figure(S.phase === 'rest' ? S.steps[S.i + 1].k : st.k).svg);
  if (S.phase === 'rest') onTick();
  live(S.phase === 'work' ? ex.name + ', ' + st.tag + ', ' + st.target : S.phase === 'rest' ? 'Descanso' : 'Treino concluído');
}
pl.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b || !S) return;
  const a = b.dataset.act;
  if (a === 'lg') {
    S.logs[S.i] = Math.max(0, (S.logs[S.i] || 0) + (+b.dataset.d));
    if (S.phase === 'done') { const y = pl.scrollTop; renderPlayer(); pl.scrollTop = y; }
    else { const o = $('.lv', pl); if (o) o.textContent = S.logs[S.i]; }
    return;
  }
  if (a !== 'exit') S.exitArmed = false;
  if (a === 'exit') { if (S.phase === 'done' || S.exitArmed) return closePlayer(); S.exitArmed = true; return renderPlayer(); }
  if (a === 'close') return closePlayer();
  if (a === 'done' || a === 'skip') { if (a === 'skip') return goWork(S.i + 1); return finishStep(); }
  if (a === 'next') { if (S.phase === 'rest') return goWork(S.i + 1); if (S.i < S.steps.length - 1) return goWork(S.i + 1); return finishStep(); }
  if (a === 'prev') { if (S.phase === 'rest') return goWork(S.i); return goWork(Math.max(0, S.i - 1)); }
  if (a === 'tstart') { beep(1); startTimer(S.steps[S.i].time); return renderPlayer(); }
  if (a === 'tpause') { S.timer.left = remaining(); S.timer.running = false; clearSched(); return renderPlayer(); }
  if (a === 'tresume') { S.timer.end = Date.now() + S.timer.left * 1000; S.timer.running = true; S.timer.sched = scheduleEnd(S.timer.left); return renderPlayer(); }
  if (a === 'plus') { S.timer.end += 15000; S.timer.total += 15; S.timer.sched = scheduleEnd(remaining()); return onTick(); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && S && S.phase === 'done') closePlayer(); });

/* ---------- Wiring ---------- */
app.addEventListener('click', (e) => {
  const s = e.target.closest('[data-start]'); if (s) { beep(0); return startWorkout(s.dataset.start); }
  const o = e.target.closest('[data-open]'); if (o) { tab = 'treino'; view = { name: 'detail', key: o.dataset.open }; return render(); }
  const g = e.target.closest('[data-tab-go]'); if (g) { tab = g.dataset.tabGo; view = { name: 'home' }; return render(); }
  if (e.target.closest('[data-home]')) { view = { name: 'home' }; render(); }
});
document.querySelectorAll('.nav button').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; view = { name: 'home' }; render(); }));
app.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][data-open]')) { e.preventDefault(); e.target.click(); } });
applyProfile();
render();
})();

/* ---------- Offline (service worker) ---------- */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
