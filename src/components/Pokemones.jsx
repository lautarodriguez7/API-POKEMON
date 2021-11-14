import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { obetenerPokemonesAccion, siguientePokemonAccion } from '../redux/pokeDucks'

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.array)
    return (
        <div>
            Lista de Pokemones
            <button className="m-2" onClick={ () => dispatch(obetenerPokemonesAccion())}>Get Pokemones</button>
            <hr/>
            <button className='m-2' onClick={ () => dispatch(siguientePokemonAccion(-20))}>Atras</button>
            <button className='m-2' onClick={ () => dispatch(siguientePokemonAccion(20))}>Siguiente</button>

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
