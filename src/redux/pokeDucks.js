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

    const {offset} = getState().pokemones; // con las llaves {} accedemos a la propiedad
    //const offset = getState().pokemones.offset;

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error) 
    }
}

export const siguientePokemonAccion = (numero) => async (dispatch, getState) => {

    // const offset = getState().pokemones.offset
    // const siguiente = offset + numero
    // const next = getState().pokemones.next
    const {next} = getState().pokemones

    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const atrasPokemonAccion = () => async (dispatch, getState) => {
    const {previous} = getState().pokemones

    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}