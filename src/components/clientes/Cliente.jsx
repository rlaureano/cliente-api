import React from 'react'
import { Link } from 'react-router-dom'

const Cliente = ({cliente}) => {

    const { _id, nombre, apellido, email, empresa, telefono } = cliente

  return (
    <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{nombre} {apellido}</p>
            <p className="empresa">{empresa}</p>
            <p>{email}</p>
            <p>Tel: {telefono}</p>
        </div>
        <div className="acciones">
            <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                Editar Cliente
            </Link>
            <button type="button" className="btn btn-rojo btn-eliminar">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>
  )
}

export default Cliente
