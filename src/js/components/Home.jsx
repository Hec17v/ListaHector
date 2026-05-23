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
            return; // Cortamos la ejecución
        }

        setError("");
        setLista([...lista, tarea.trim()]); 
        setTarea("");

        };

        const ACTIVAR_EDICION = (item, index) => {
        setEnEdicion(true);
        setTarea(item);
        setIdTareaAEditar(index);
    }

    const eliminarTarea = (indiceAEliminar) => {
        const nuevaLista = lista.filter((_, index) => index !== indiceAEliminar);
        setLista(nuevaLista);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            {/* 1. Mover el estilo aquí afuera para que afecte a todos los items */}
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
                <button className="btn btn-primary" type="submit">Añadir</button>
            </form>

             {error && <div className="alert alert-danger text-center py-2">{error}</div>}

            <ul className="list-group">
                {lista.map((item, index) => (
                    // 2. AGREGAR LA CLASE "item-tarea" AQUÍ
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center item-tarea">
                        {item}
                        <button 
                                className="btn btn-sm btn-info me-1 btn-oculto"
                                onClick={() => ACTIVAR_EDICION(item, index)}
                            >
                                ✏️
                            </button>
                        <button 
                            // 3. AGREGAR LA CLASE "btn-oculto" AQUÍ
                            className="btn btn-danger btn-sm btn-oculto"
                            onClick={() => eliminarTarea(index)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            
            {lista.length === 0 && <p className="text-center mt-3">No hay tareas pendientes.</p>}
        </div>
    );
};

export default Home;