import React, { useState } from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

const NuevoCliente = () => {

    const[ cliente, setCliente ] = useState({
        nombre:"",
        apellido:"",
        empresa:"",
        email:"",
        telefono:"",
    })

    const handleChange = (e) => {
        e.preventDefault()

        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        clienteAxios.post("/clientes", cliente)
            .then( res => {
                console.log(res)

                if( res.data.code === 11000 ) {
                    console.log("Error de duplicado de mongo")

                    Swal.fire({
                        icon: "error",
                        title: "Error al registrar",
                        text: "Duplicidad en el registro, revise los datos",
                        confirmButtonText: "Aceptar"
                    })

                    return false

                }

                Swal.fire({
                    icon: "success",
                    title: "Registrado",
                    text: res.data.mensaje,
                    confirmButtonText: "Aceptar"
                })
            })

    }

    const isDisabled = () => {

        const { nombre, apellido, empresa, email, telefono } = cliente

        const valido = !nombre.length || !apellido.length || !email.length || !telefono.length || !empresa.length 

        return valido
    }

    return (
        <>
            <h2>Nuevo Cliente</h2>
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
                            value="Agregar Cliente"
                        />
                </div>

            </form>
        </>
    )
}

export default NuevoCliente
