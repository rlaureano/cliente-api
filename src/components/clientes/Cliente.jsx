import React from 'react'

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
            <a href="#" className="btn btn-azul">
                <i class="fa fa-pencil" aria-hidden="true"></i>
                Editar Cliente
            </a>
            <button type="button" className="btn btn-rojo btn-eliminar">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>
  )
}

export default Cliente
