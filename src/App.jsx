import React, { useState } from 'react';
import { productos } from './productos';
import './App.css';

const TiendaRopa = () => {
  // CONFIGURACIÓN: Reemplaza con tu número real (ej: 54911...)
  const WHATSAPP_NUMBER = "54911XXXXXXXX"; 

  // ESTADO para el filtro de marcas
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");

  // LÓGICA DE FILTROS:
  const marcasUnicas = [
    "Todas", 
    ...new Set(productos.map(p => p.marca).filter(m => m && m !== "-"))
  ].sort();

  const productosFiltrados = marcaSeleccionada === "Todas" 
    ? productos 
    : productos.filter(p => p.marca === marcaSeleccionada);

  return (
    <div className="container-principal" style={{ backgroundColor: '#f4f4f7', minHeight: '100vh' }}>
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="navbar" style={{ backgroundColor: '#ffffff' }}>
        <div className="nav-content">
          <h1 className="logo" style={{ color: '#000000' }}>
            LA VUELTA <span className="logo-alt" style={{ color: '#25d366' }}>FERIA</span>
          </h1>
          <div className="contador-items" style={{ color: '#666666' }}>
            {productosFiltrados.length} productos
          </div>
        </div>
      </nav>

      {/* FILTROS */}
      <header className="hero" style={{ backgroundColor: '#ffffff' }}>
        <h2 style={{ color: '#000000' }}>Catálogo 2026</h2>
        <div className="filtros-container">
          {marcasUnicas.map(marca => (
            <button 
              key={marca}
              onClick={() => setMarcaSeleccionada(marca)}
              className={`btn-filtro ${marcaSeleccionada === marca ? 'active' : ''}`}
              style={marcaSeleccionada === marca ? {} : { color: '#000000' }}
            >
              {marca}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS */}
      <main className="main-content">
        <div className="grid-productos">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="card" style={{ backgroundColor: '#ffffff' }}>
              <div className="card-img">
                {prod.etiqueta?.toLowerCase() === "si" && (
                  <span className="badge">NUEVO</span>
                )}
                <img 
                  src={`/images/foto_${prod.id}.jpg`} 
                  alt={prod.nombre}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x400?text=Foto+${prod.id}`;
                  }}
                />
              </div>
              
              <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                <span className="categoria" style={{ color: '#888888', fontWeight: 'bold' }}>
                  {prod.marca !== "-" ? prod.marca : "Genérico"}
                </span>
                
                <h3 className="titulo-prod" style={{ color: '#000000' }}>
                  {prod.nombre}
                </h3>
                
                <div className="specs" style={{ backgroundColor: '#f8f8f8' }}>
                  <div className="spec-item">
                    <span className="label" style={{ color: '#666666' }}>Talle</span>
                    <span className="value" style={{ color: '#000000', fontWeight: '800' }}>{prod.talle}</span>
                  </div>
                  <div className="spec-item">
                    <span className="label" style={{ color: '#666666' }}>Estado</span>
                    <span className="value" style={{ color: '#000000', fontWeight: '800' }}>
                      {prod.etiqueta?.toLowerCase() === "si" ? "Con Etiqueta" : "Excelente"}
                    </span>
                  </div>
                </div>

                <p className="precio" style={{ color: '#000000', fontWeight: '900' }}>
                  ${Number(prod.precio).toLocaleString('es-AR')}
                </p>
                
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola! Me interesa el producto ${prod.id}: ${prod.nombre}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ color: '#ffffff', backgroundColor: '#25d366' }}
                >
                  Me interesa
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer" style={{ backgroundColor: '#ffffff' }}>
        <p style={{ color: '#000000' }}><strong>LA VUELTA FERIA</strong></p>
        <p style={{ color: '#666666' }}>Buenos Aires, Argentina</p>
      </footer>
    </div>
  );
};

export default TiendaRopa;