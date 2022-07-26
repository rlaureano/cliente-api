import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Cliente = ({cliente,consultarAPI}) => {

    const { _id, nombre, apellido, email, empresa, telefono } = cliente

    const eliminarCliente = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Un cliente eiminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

                clienteAxios.delete(`/clientes/${id}`)
                    .then((result) => {
                        if( result.status === 200 ) {
                            Swal.fire(
                                'Eliminado!',
                                result.data.mensaje,
                                'success'
                            )
                            consultarAPI()
                        }
                    })

              
            }
          })
    }

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

                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    Nuevo Pedido
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={ () => eliminarCliente(_id) }
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Cliente
