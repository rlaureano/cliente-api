import React from 'react'
import { Link } from 'react-router-dom'

const Navegacion = () => {
  return (
    <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
            <Link to="/" className="clientes"><i className="fa fa-users" aria-hidden="true"></i> Clientes</Link>
            <Link to="productos" className="productos"><i className="fa fa-cubes" aria-hidden="true"></i> Productos</Link>
            <Link to="pedidos" className="pedidos"><i className="fa fa-book" aria-hidden="true"></i> Pedidos</Link>
        </nav>
    </aside>
  )
}

export default Navegacion
