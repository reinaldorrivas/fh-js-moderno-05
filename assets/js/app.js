/*
 * nC = n of Clubs
 * nD = n of Diamonds
 * nH = n of Hearts
 * nS = n of Spades
 */

/*
 * INIT VARS
 */

let mazoCartas = [];
const cartaTipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "K", "Q"];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML

const btnPedirCarta = document.body.querySelector("#btnPedirCarta");
const btnNuevoJuego = document.body.querySelector("#btnNuevoJuego");
const btnDetenerJuego = document.body.querySelector("#btnDetenerJuego");
const tableroPuntosJugador = document.body.querySelectorAll("small")[0];
const tableroPuntosComputadora = document.body.querySelectorAll("small")[1];
const contenedorCartasJugador = document.body.querySelector("#player-cards");
const contenedorCartasComputadora =
  document.body.querySelector("#computer-cards");

/*
 * Funciones
 */

const crearMazoCartas = () => {
  for (let numeroCarta = 2; numeroCarta < 11; numeroCarta++) {
    for (let cartaTipo of cartaTipos) {
      mazoCartas.push(numeroCarta + cartaTipo);
    }
  }

  for (let especial of especiales) {
    for (let cartaTipo of cartaTipos) {
      mazoCartas.push(especial + cartaTipo);
    }
  }

  return _.shuffle(mazoCartas);
};

mazoCartas = crearMazoCartas();

const pedirCarta = () => {
  if (!mazoCartas.length) throw "Se acabaron las cartas.";

  return mazoCartas.pop();
};

const valorCarta = (carta) => {
  const puntosCarta = carta.substring(0, carta.length - 1);

  return isNaN(puntosCarta) ? (puntosCarta === "A" ? 11 : 10) : puntosCarta * 1;
};

/*
 * IA COMPUTER
 */

const turnoComputadora = (minPoints) => {
  do {
    const carta = pedirCarta();

    puntosComputadora += valorCarta(carta);

    tableroPuntosComputadora.innerText = puntosComputadora;

    const imgCartaComputadora = document.createElement("img");
    imgCartaComputadora.src = `./assets/img/${carta}.png`;
    imgCartaComputadora.alt = `Baraja Computadora ${carta}`;
    imgCartaComputadora.classList.add("carta");

    contenedorCartasComputadora.append(imgCartaComputadora);

    if (minPoints > 21) break;
  } while (puntosComputadora < minPoints && puntosComputadora <= 21);

  if (puntosJugador < puntosComputadora && puntosComputadora <= 21) {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;

    setTimeout(() => {
      alert("Lo siento... ¡Perdiste!");
    }, 100);
  } else if (puntosJugador === puntosComputadora) {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;

    setTimeout(() => {
      alert("Nadie gana.");
    }, 100);
  } else if (puntosComputadora > 21) {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;

    setTimeout(() => {
      alert("¡Ganaste!");
    }, 100);
  }
};

/*
 * EVENTOS
 */

btnPedirCarta.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador += valorCarta(carta);

  tableroPuntosJugador.innerText = puntosJugador;

  const imgCartaJugador = document.createElement("img");
  imgCartaJugador.src = `./assets/img/${carta}.png`;
  imgCartaJugador.alt = `Baraja Jugador ${carta}`;
  imgCartaJugador.classList.add("carta");

  contenedorCartasJugador.append(imgCartaJugador);

  if (puntosJugador > 21) {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;
    turnoComputadora(puntosJugador);

    setTimeout(() => {
      alert("Lo siento... ¡Perdiste!");
    }, 100);
  } else if (puntosJugador === 21 && puntosComputadora === 0) {
    turnoComputadora(puntosJugador);
  }
});

btnDetenerJuego.addEventListener("click", () => {
  turnoComputadora(puntosJugador);
});

btnJuegoNuevo.addEventListener("click", () => {
  mazoCartas = [];
  puntosJugador = 0;
  puntosComputadora = 0;

  mazoCartas = crearMazoCartas();

  contenedorCartasJugador.innerHTML = null;
  contenedorCartasComputadora.innerHTML = null;
  tableroPuntosComputadora.innerText = 0;
  tableroPuntosJugador.innerText = 0;

  btnPedirCarta.disabled = false;
  btnDetenerJuego.disabled = false;
});
