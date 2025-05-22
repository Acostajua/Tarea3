import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    socket.on('user-count', (count) => {
      setConnectedUsers(count);
    });

    // Limpiar socket al desmontar
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Usuarios conectados: {connectedUsers}</h1>
      {/* Puedes importar aquí ProductList también */}
    </div>
  );
}

export default App;
