import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, siguientePokemonAccion, atrasPokemonAccion } from '../redux/pokeDucks'

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    return (
        <div>
            Lista de Pokemones
            <hr />

            {
                pokemones.length === 0 && 
                <button className="m-2" onClick={ () => dispatch(obtenerPokemonesAccion())}>Obtener Pokemones</button>
            }
            {
                previous && 
                <button className='m-2' onClick={ () => dispatch(atrasPokemonAccion(20))}>ATRAS</button>
            }
            {
                next && 
                <button className='m-2' onClick={ () => dispatch(siguientePokemonAccion(20))}>SIGUIENTE</button>
            }
            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name}> {item.name} </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
