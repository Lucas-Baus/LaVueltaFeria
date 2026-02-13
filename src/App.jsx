import React, { useState } from 'react';
import { productos } from './productos';
import './App.css';

const TiendaRopa = () => {

  const WHATSAPP_NUMBER = "5491166107222"; 

  // ESTADO para el filtro de marcas
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");

  // LÓGICA DE FILTROS:
  // Extraemos marcas únicas, quitamos "-" y vacíos, y ordenamos
  const marcasUnicas = [
    "Todas", 
    ...new Set(productos.map(p => p.marca).filter(m => m && m !== "-"))
  ].sort();

  // Filtramos los productos según la marca elegida
  const productosFiltrados = marcaSeleccionada === "Todas" 
    ? productos 
    : productos.filter(p => p.marca === marcaSeleccionada);

  return (
    <div className="container-principal">
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo">LA VUELTA <span className="logo-alt">FERIA</span></h1>
          <div className="contador-items">
            {productosFiltrados.length} items
          </div>
        </div>
      </nav>

      {/* FILTROS */}
      <header className="hero">
        <h2>Catálogo 2026</h2>
        <div className="filtros-container">
          {marcasUnicas.map(marca => (
            <button 
              key={marca}
              onClick={() => setMarcaSeleccionada(marca)}
              className={`btn-filtro ${marcaSeleccionada === marca ? 'active' : ''}`}
            >
              {marca}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS RESPONSIVE */}
      <main className="main-content">
        <div className="grid-productos">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="card">
              <div className="card-img">
                {prod.etiqueta?.toLowerCase() === "si" && (
                  <span className="badge">NUEVO</span>
                )}
                <img 
                  src={`/images/foto_${prod.id}.jpg`} 
                  alt={prod.nombre}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x400?text=Foto+${prod.id}`;
                  }}
                />
              </div>
              
              <div className="card-info">
                <span className="categoria">
                  {prod.marca !== "-" ? prod.marca : "Genérico"}
                </span>
                <h3 className="titulo-prod">{prod.nombre}</h3>
                
                <div className="specs">
                  <div className="spec-item">
                    <span className="label">Talle</span>
                    <span className="value">{prod.talle}</span>
                  </div>
                  <div className="spec-item">
                    <span className="label">Estado</span>
                    <span className="value">
                      {prod.etiqueta?.toLowerCase() === "si" ? "Con Etiqueta" : "Excelente"}
                    </span>
                  </div>
                </div>

                <p className="precio">
                  ${Number(prod.precio).toLocaleString('es-AR')}
                </p>
                
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola! Me interesa el producto ${prod.id}: ${prod.nombre} (Talle ${prod.talle})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Me interesa
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p><strong>LA VUELTA FERIA</strong></p>
        <p>© 2026 - Buenos Aires, Argentina</p>
      </footer>
    </div>
  );
};

export default TiendaRopa;