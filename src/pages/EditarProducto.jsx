import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../config/axios'
import Spinner from '../components/layout/Spinner'

const EditarProducto = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [ producto, setProducto ] = useState({
    nombre: '',
    precio: '',
  })

  const [ archivo, setArchivo ] = useState('')


  const { nombre, precio, imagen } = producto

  const consultarAPI = async () => {
    const productoConsulta = await clienteAxios.get(`productos/${id}`)

    setProducto(productoConsulta.data)
  }

  useEffect(  () => {
    consultarAPI()
  },[])

  const editarProducto = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('imagen', archivo)

    try {

      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form/data'}
      })

      Swal.fire({
        icon: 'success',
        title: 'Hecho',
        text: res.data.mensaje
      })

      navigate('/productos')

    } catch (err) {
      console.log(err)

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo'
      })
    }
  }

  const leerInformacionProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const leerArchivo = e => {
    setArchivo(e.target.files[0])
  }

  return (
    <>
      <h2>Editar Producto</h2>

      <form
        onSubmit={editarProducto}
      >
          <legend>Llena todos los campos</legend>

          <div className="campo">
              <label>Nombre:</label>
              <input 
                type="text" 
                placeholder="Nombre Producto" 
                name="nombre"
                defaultValue={nombre}
                onChange={leerInformacionProducto}
              />
          </div>

          <div className="campo">
              <label>Precio:</label>
              <input 
                type="number" 
                name="precio" 
                min="0.00" 
                step="0.01" 
                placeholder="Precio" 
                defaultValue={precio}
                onChange={leerInformacionProducto}
              />
          </div>

          <div className="campo">
              <label>Imagen:</label>
              {
                imagen && (
                  <img src={`http://localhost:5000/${imagen}`} alt="imagen" with="300"/>
                )
              }
              <input 
                type="file"  
                name="imagen" 
                onChange={leerArchivo}
              />
          </div>

          <div className="enviar">
            <input 
              type="submit" 
              className="btn btn-azul" 
              value="Editar Producto"
            />
          </div>
      </form>
    </>
  )
}

export default EditarProducto
