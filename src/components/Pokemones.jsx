import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, siguientePokemonAccion, atrasPokemonAccion, unPokeDetalleAccion} from '../redux/pokeDucks'
import Detalle from './Detalle';

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    //PODEMOS AGREGAR DIRECTAMENTE LOS POKEMONES SIN APRETAR EL BOTON DE OBTENER POKEMONES CON ESTO
    // React.useEffect(() => {
    //     const fetchData = () => {
    //         dispatch(obtenerPokemonesAccion())
    //     }
    //     fetchData()
    //     },[dispatch])

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Lista de Pokemones</h3>
                <div className='d-flex justify-content-between'>
                    {
                        pokemones.length === 0 &&
                        <button className="m-2 btn btn-success" 
                        onClick={() => dispatch(obtenerPokemonesAccion())}
                        >
                            Obtener Pokemones
                        </button>
                    }
                    {
                        previous &&
                        <button className='mr-2 btn btn-primary' 
                        onClick={() => dispatch(atrasPokemonAccion())}>ATRAS</button>
                    }
                    {
                        next &&
                        <button className='m-2 btn-primary' onClick={() => dispatch(siguientePokemonAccion(20))}>SIGUIENTE</button>
                    }
                </div>
                <ul className="list-group mt-3 text-uppercase">
                {
                pokemones.map(item => (
                    <li className="list-group-item" key={item.name} >
                        {item.name}
                        <button 
                            className="btn btn-dark btn-sm float-end"
                            onClick={() => dispatch(unPokeDetalleAccion(item.url))}
                        >
                            Detalle
                        </button>
                    </li>
                ))
            }
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Detalle />
            </div>
        </div>
    )
}

export default Pokemones
