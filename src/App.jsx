import React, { useState } from 'react';
import { productos } from './productos';
import './App.css';

const TiendaRopa = () => {
  // CONFIGURACIÓN: Reemplaza con tu número de WhatsApp (sin el +)
  const WHATSAPP_NUMBER = "5491166107222"; 

  // ESTADO para el filtro de marcas
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");

  // LÓGICA DE FILTROS:
  // 1. Extraemos marcas únicas, quitamos las que son "-" y ordenamos alfabéticamente
  const marcasUnicas = [
    "Todas", 
    ...new Set(productos.map(p => p.marca).filter(m => m && m !== "-"))
  ].sort();

  // 2. Filtramos los productos según la marca elegida
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
            {productosFiltrados.length} productos encontrados
          </div>
        </div>
      </nav>

      {/* ENCABEZADO Y FILTROS */}
      <header className="hero">
        <h2>Catálogo de Ropa</h2>
        <p>Filtrar por marca:</p>
        
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

      {/* GRILLA DE PRODUCTOS */}
      <main className="main-content">
        <div className="grid-productos">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="card">
              <div className="card-img">
                {/* Badge si tiene etiqueta */}
                {prod.etiqueta?.toLowerCase() === "si" && (
                  <span className="badge">¡Nuevo!</span>
                )}
                
                {/* Imagen del producto: debe estar en public/images/foto_X.jpg */}
                <img 
                  src={`/images/foto_${prod.id}.jpeg`} 
                  alt={prod.nombre}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x400?text=Foto+${prod.id}`;
                    e.target.onerror = null; // Evita bucle infinito si falla el placeholder
                  }}
                />
              </div>
              
              <div className="card-info">
                <span className="categoria">
                  {prod.marca !== "-" ? prod.marca : "Genérico"}
                </span>
                <h3 className="titulo-prod">{prod.nombre}</h3>
                
                {/* Datos adicionales de la card */}
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
                
                {/* Link dinámico a WhatsApp */}
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola! Me interesa el producto ${prod.id}: ${prod.nombre} (Talle ${prod.talle})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Me interesa este producto
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p><strong>CATU SHOP</strong></p>
        <p>Selección de ropa exclusiva</p>
        <p style={{fontSize: '0.8rem', color: '#888', marginTop: '10px'}}>
          © 2024 - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default TiendaRopa;