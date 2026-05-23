import React, { useState } from 'react';

const Home = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]); 
    const [error, setError] = useState("");
    const [enEdicion, setEnEdicion] = useState(false);
    const [idTareaAEditar, setIdTareaAEditar] = useState(null);

    const agregarTarea = (e) => {
        e.preventDefault();

        if (tarea.trim() === "") {
            setError("El campo está vacío, rellene el campo.");
            return;
        }

        if (tarea.trim().length <= 3) {
            setError("Requiere más de tres caracteres para ese campo.");
            return; 
        }

        setError("");

      
        if (enEdicion) {
            // 1. Si estamos editando, recorremos la lista y modificamos solo la tarea seleccionada
            const listaActualizada = lista.map((item, index) => 
                index === idTareaAEditar ? tarea.trim() : item
            );
            setLista(listaActualizada);
            setEnEdicion(false);        // Apagamos el modo edición
            setIdTareaAEditar(null);    // Limpiamos el índice
        } else {
            // 2. Si NO estamos editando, añadimos la tarea como siempre
            setLista([...lista, tarea.trim()]); 
        }

        setTarea(""); 
    };

    const ACTIVAR_EDICION = (item, index) => {
        setEnEdicion(true);
        setTarea(item);
        setIdTareaAEditar(index);
    };

    const eliminarTarea = (indiceAEliminar) => {
        const nuevaLista = lista.filter((_, index) => index !== indiceAEliminar);
        setLista(nuevaLista);
        
      
        if (idTareaAEditar === indiceAEliminar) {
            setEnEdicion(false);
            setTarea("");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <style>{`
                .item-tarea .btn-oculto {
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .item-tarea:hover .btn-oculto {
                    opacity: 1;
                }
            `}</style>

            <h2 className="text-center">Mis Tareas</h2>
            
            <form onSubmit={agregarTarea} className="d-flex mb-3">
                <input 
                    type="text" 
                    className="form-control me-2"
                    placeholder="Escribe una tarea..."
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                /> 
               
                <button 
                    className={`btn ${enEdicion ? 'btn-warning' : 'btn-primary'}`} 
                    type="submit"
                >
                    {enEdicion ? 'Editar' : 'Añadir'}
                </button>
            </form>

            {error && <div className="alert alert-danger text-center py-2">{error}</div>}

            <ul className="list-group">
                {lista.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center item-tarea">
                        <span>{item}</span>
                        <div>
                            <button 
                                className="btn btn-sm btn-info btn-oculto me-1"
                                onClick={() => ACTIVAR_EDICION(item, index)}
                            >
                                ✏️
                            </button>
                            <button 
                                className="btn btn-danger btn-sm btn-oculto"
                                onClick={() => eliminarTarea(index)}
                            >
                                X
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            
            {lista.length === 0 && <p className="text-center mt-3">No hay tareas pendientes.</p>}
        </div>
    );
};

export default Home;