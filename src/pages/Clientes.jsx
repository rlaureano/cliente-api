import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Cliente from '../components/clientes/Cliente'
import clienteAxios from '../config/axios'
import Spinner from '../components/layout/Spinner'

const Clientes = () => {

    const [ clientes, setClientes ] = useState([])

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes')

        setClientes(clientesConsulta.data)
    }

    useEffect(() => {
        consultarAPI() 
    },[])

    if( !clientes.length ) return <Spinner/>

    return (
        <>
            <h2>Clientes</h2>
            <Link to="clientes/nuevo" className="btn btn-verde nvo-cliente">
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {
                    clientes.map( cliente => (
                        <Cliente
                            key={cliente._id}
                            cliente={cliente}
                            consultarAPI={consultarAPI}
                        />
                    ))
                }
            </ul>
        </>
    )
}

export default Clientes
