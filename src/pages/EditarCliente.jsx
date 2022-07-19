import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

const EditarCliente = () => {

    const navigate = useNavigate()
    // obtener id
    const { id } = useParams()

    const[ cliente, setCliente ] = useState({
        nombre:"",
        apellido:"",
        empresa:"",
        email:"",
        telefono:"",
    })

    useEffect( () => {

        if( id ){
            consultarAPI()
        }

    },[])

    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`)

        setCliente(clienteConsulta.data)
    }

    const handleChange = (e) => {
        e.preventDefault()

        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then( res => {
                if( res.data.code === 11000 ) {
                    console.log("Error de duplicado de mongo")

                    Swal.fire({
                        icon: "error",
                        title: "Error al registrar",
                        text: "Duplicidad en el registro, revise los datos",
                        confirmButtonText: "Aceptar"
                    })

                } else {

                    Swal.fire({
                        icon: "success",
                        title: "Actualizado",
                        text: "se actualizó correctamente",
                        confirmButtonText: "Aceptar"
                    })

                    // redireccionar
                    navigate("/")
                    
                }            
            })
    }

    const isDisabled = () => {

        const { nombre, apellido, empresa, email, telefono } = cliente

        const valido = !nombre.length || !apellido.length || !email.length || !telefono.length || !empresa.length 

        return valido
    }


    return (
            <>
                <h2>Editar Cliente</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Nombre:</label>
                        <input 
                            type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            value={cliente.nombre}
                            onChange={ e => handleChange(e)}
                        />
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input 
                            type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            value={cliente.apellido}
                            onChange={ e => handleChange(e)}
                        />
                    </div>
                
                    <div className="campo">
                        <label>Empresa:</label>
                        <input 
                            type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa"
                            value={cliente.empresa}
                            onChange={ e => handleChange(e)}
                        />
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            value={cliente.email}
                            onChange={ e => handleChange(e)}
                        />
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input 
                            type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            value={cliente.telefono}
                            onChange={ e => handleChange(e)}
                        />
                    </div>

                    <div className="enviar">
                            <input 
                                disabled={isDisabled()}
                                type="submit" 
                                className="btn btn-azul" 
                                value="Guardar Cambios"
                            />
                    </div>

                </form>
            </>
    )
}

export default EditarCliente
