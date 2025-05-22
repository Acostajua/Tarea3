import React, { useEffect, useState } from 'react';
import socket from '../config/sockets';

const ProductsList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));

    socket.on('producto-agregado', (producto) => {
      setProductos(prev => [...prev, producto]);
    });

    socket.on('producto-actualizado', (productoActualizado) => {
      setProductos(prev =>
        prev.map(p => (p.id === productoActualizado.id ? productoActualizado : p))
      );
    });

    socket.on('producto-eliminado', (id) => {
      setProductos(prev => prev.filter(p => p.id !== id));
    });

    return () => {
      socket.off('producto-agregado');
      socket.off('producto-actualizado');
      socket.off('producto-eliminado');
    };
  }, []);

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
