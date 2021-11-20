import axios from "axios"

//Constantes
const dataInicial = {
    // array: [],
    // offset: 0
    count: 0,
    next: null,
    previous: null,
    results: []
}

//Types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

//Reducer
export default function pokeReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload};
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload};
        default: 
            return state;
    }
}

//Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if(localStorage.getItem('offset=0')) {
        console.log('DATOS GUARDADOS');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        });
        return 
    }

    const {offset} = getState().pokemones; // con las llaves {} accedemos a la propiedad
    //const offset = getState().pokemones.offset;

    try {
        console.log('DATOS DESDE LA API')
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0',JSON.stringify(res.data))
    } catch (error) {
        console.log(error) 
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    // const offset = getState().pokemones.offset
    // const siguiente = offset + numero
    // const next = getState().pokemones.next
    const {next} = getState().pokemones

    if(localStorage.getItem(next)) {
        console.log('DATOS GUARDADOS SIGUIENTES');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return 
    }
    try {
        console.log('Datos desde la api')
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next,JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const atrasPokemonAccion = () => async (dispatch, getState) => {
    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)) {
        console.log('DATOS GUARDADOS ANTERIOR');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return 
    }
    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}