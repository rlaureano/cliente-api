import React from 'react'

const FormCantidadProducto = ({producto, restarCantidad, sumarCantidad, index }) => {

    const { nombre, precio, cantidad } = producto

  return (
    <li>
        <div className="texto-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">${precio}</p>
        </div>
        <div className="acciones">
            <div className="contenedor-cantidad">
                <i 
                    className="fa fa-minus" 
                    aria-hidden="true"
                    onClick={ () => restarCantidad(index) }
                ></i>
                <p>{cantidad}</p>
                <i 
                    className="fa fa-plus"
                    onClick={ () => sumarCantidad(index) }
                ></i>
            </div>
            <button type="button" className="btn btn-rojo">
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
    </li>
  )
}

export default FormCantidadProducto
