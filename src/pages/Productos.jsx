import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Producto from '../components/pruductos/Producto'
import Spinner from '../components/layout/Spinner'

const Productos = () => {

  const [ productos, setProductos ] = useState([])

  const consultarAPI = async () => {
    const productosConsulta = await clienteAxios.get('/productos')
    setProductos(productosConsulta.data)
  }

  useEffect(  () => {

    consultarAPI()

  },[])

  if( !productos.length ) return <Spinner/>
 
  return (
    <>
      <h2>Productos</h2>
      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fa fa-plus-circle" aria-hidden="true"></i>
          Nuevo Producto
      </Link>
      <ul className="listado-productos">
          {
            productos.map( producto => (
              <Producto 
                key={producto._id}
                producto={producto}
                consultarAPI={consultarAPI}
              />
            ))
          }
      </ul>
    </>
  )
}

export default Productos
