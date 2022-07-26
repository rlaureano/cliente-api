import { useState, useEffect } from 'react'

const NuevoPedido = () => {
    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Juan De la torre</p>
            </div>


            <form action="/productos" method="POST">
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input type="text" placeholder="Nombre Productos" name="productos" />
                </div>

                <ul className="resumen">
                    
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fa fa-minus" aria-hidden="true"></i>
                                <input type="text" name="cantidad" />
                                <i className="fa fa-plus"></i>
                            </div>
                            <button type="button" className="btn btn-rojo">
                                <i className="fas fa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                    
                </ul>
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readOnly />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
            </form>
        </>
    )
}

export default NuevoPedido
