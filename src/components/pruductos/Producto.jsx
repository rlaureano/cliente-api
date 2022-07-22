import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Producto = ({producto, consultarAPI}) => {

    const { nombre, precio, imagen, _id } = producto

    const eliminaProducto = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Un producto eiminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

                clienteAxios.delete(`/productos/${id}`)
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
        <li className="producto">
              <div className="info-producto">
                  <p className="nombre">{nombre}</p>
                  <p className="precio">$ {precio} </p>
                  {
                    imagen && (
                        <img src={`http://localhost:5000/${imagen}`} alt="imagen"/>
                    )
                  }
              </div>
              <div className="acciones">
                  <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                      Editar Producto
                  </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={ () => eliminaProducto(_id)}
                >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                      Eliminar Producto
                  </button>
              </div>
          </li>
  )
}

export default Producto
