import React, { useEffect, useState } from 'react';

function App() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

    fetch(`${backendURL}/libros`)
      .then(response => response.json())
      .then(data => setLibros(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Lista de libros</h1>
      <ul>
        {libros.length === 0 && <li>No hay libros</li>}
        {libros.map(libro => (
          <li key={libro._id}>{libro.titulo} - {libro.autor}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
