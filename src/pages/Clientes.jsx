import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Cliente from '../components/clientes/Cliente'
import clienteAxios from '../config/axios'

const Clientes = () => {

    const [ clientes, setClientes ] = useState([])

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes')

        setClientes(clientesConsulta.data)
    }

    useEffect(() => {
        consultarAPI() 
    },[])

    return (
        <>
            <h2>Clientes</h2>
            <Link to="clientes/nuevo" className="btn btn-verde nvo-cliente">
                <i class="fa fa-plus-circle" aria-hidden="true"></i> Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {
                    clientes.map( cliente => (
                        <Cliente
                            key={cliente._id}
                            cliente={cliente}
                        />
                    ))
                }
            </ul>
        </>
    )
}

export default Clientes
