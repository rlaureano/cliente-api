import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Clientes from './pages/Clientes'
import NuevoCliente from './pages/NuevoCliente'

import Productos from './pages/Productos'
import Pedidos from './pages/Pedidos'

import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header/>
          <div className="grid contenedor contenido-principal">
            <Navegacion />

            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/" element={<Clientes/>} />
                <Route path="/clientes/nuevo" element={<NuevoCliente/>} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/pedidos" element={<Pedidos/>} />
              </Routes>
            </main>
          </div>
      </>    
    </BrowserRouter>
  )
}

export default App