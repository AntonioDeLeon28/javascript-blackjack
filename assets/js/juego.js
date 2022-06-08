

const miModulo = (() => {
    'use strict'

    const tipos      = ['C', 'D', 'H', 'S',],
          especiales = ['A', 'J', 'Q', 'K',];

    let puntosJugadores   = [],
        deck              = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML           = document.querySelectorAll('small');
    
    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for ( let i = 0; i < numJugadores; i++ ) { 
            puntosJugadores.push(0); // Crea el arreglo para guardar los puntos internamente
            puntosHTML[i].innerText = 0; // Borra los puntos visualizados en página web
            divCartasJugadores[i].innerText = '';
        }
        console.clear();
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10 ;i++ ){
            for( let tipo of tipos){ deck.push(`${ i }${ tipo }`); }
        }
        for(let especial of especiales){
            for( let tipo of tipos){ deck.push(`${ especial }${ tipo }`); }
        }
        return _.shuffle( deck ); // Baraja el deck.
    }

    const pedirCarta = () => {
        if ( deck == false ){throw 'No hay cartas en el deck';}
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor) ) ? // Operador ternario anidado
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1 ;
    }

    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta ); // Se hace la operación interna
        puntosHTML[turno].innerText = puntosJugadores[turno]; // Se manda a visulaizarse en la página web
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; // Ubicación de la carta
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta); // Apilamos la carta para que se muestre en pantalla
    }

    const determinarGanador = () => { // puntosMinimos son los puntos del jugador
        setTimeout(() => {
            (puntosJugadores[puntosJugadores.length - 1] > 21) ? alert('Felicitaciones, GANASTE!!!') 
            : (puntosJugadores[0] == puntosJugadores[puntosJugadores.length - 1]) ? alert('Nadie gana, EMPATE') : alert('Lamentablemente, PERDISTE'); 
        }, 100 );
    }

    const turnoComputadora = () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        do {
            const carta = pedirCarta();
            acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta(carta, divCartasJugadores.length-1);
        } while(  (puntosJugadores[0] <= 21) && (puntosJugadores[puntosJugadores.length - 1] < puntosJugadores[0]) );
       determinarGanador();
    }

    // Eventos *************************************************
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        crearCarta(carta, 0);
        if( acumularPuntos( carta, 0) >= 21 ) { turnoComputadora(); }
    });

    btnDetener.addEventListener('click', () => { turnoComputadora(); });
    
    /*
    btnNuevo.addEventListener('click', () => { 
        inicializarJuego();
    });
    */

    return {
        nuevoJuego: inicializarJuego
    };

})()








