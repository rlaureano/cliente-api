import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import clienteAxios from '../config/axios'
import FormBuscarProducto from '../components/pedidos/FormBuscarProducto'
import FormCantidadProducto from '../components/pedidos/FormCantidadProducto'
import Swal from 'sweetalert2'

const NuevoPedido = () => {

    // optener el id del cliente
    const { id } = useParams()

    // state 
    const [ cliente, setCliente ] = useState({})
    const [ busqueda, setBusqueda ] = useState('')
    const [ productos, setProductos ] = useState([])

    useEffect(  () => {

        const consultarAPI = async () => {

            const resultado = await clienteAxios.get(`/clientes/${id}`)
            setCliente(resultado.data)
            
        }

        consultarAPI()
    },[])

    const buscarProducto = async e => {
        e.preventDefault()

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
        console.log(resultadoBusqueda)

        if( resultadoBusqueda.data.length ) {

            let productoResultado = resultadoBusqueda.data[0]

            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0

            setProductos([...productos, productoResultado])

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No hay resultados',
                text: 'No se encontraron conincidencias, intende de nuevo'
            })
        }
    }

    const restarCantidad = index => {

        if( productos[index].cantidad === 0 ) return false

        let nuevoProductos = [...productos]

        nuevoProductos[index].cantidad--

        setProductos(nuevoProductos)

    }

    const sumarCantidad = index => {
        
        let nuevoProductos = [...productos]

        nuevoProductos[index].cantidad++
    
        setProductos(nuevoProductos)

    }

    const leerDatosBuqueda = e => {
        setBusqueda( e.target.value )
    }

    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente?.nombre} {cliente.apellido}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBuqueda={leerDatosBuqueda}
            />
            
            <ul className="resumen">
               
                {
                    productos.map( (producto, index ) => 
                        <FormCantidadProducto 
                            key={producto.producto} 
                            producto={producto}
                            restarCantidad={restarCantidad}
                            sumarCantidad={sumarCantidad}
                            index={index}
                        /> 
                    )
                }
                    
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readOnly />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
            </div>
        
        </>
    )
}

export default NuevoPedido
