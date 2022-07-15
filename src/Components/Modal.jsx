import { useState, useEffect } from "react";
import botonCerrar from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    editarGasto, 
    setEditarGasto
}) => {
    const [concepto, setConcepto] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    const ocultarModal = () => {
        setAnimarModal(false)
        setEditarGasto({})

        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    useEffect(() => {
        if(Object.keys(editarGasto).length > 0) {
            setConcepto(editarGasto.concepto)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setId(editarGasto.id)
            setFecha(editarGasto.fecha)
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([concepto, cantidad, categoria].includes('')) {
            setMensaje("Todos los campos son obligatorios.")

            setTimeout(() => {
                setMensaje("")
            }, 3000)

            return
        }
        
        guardarGasto({concepto, cantidad, categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={botonCerrar}
                    alt="Boton cerrar"
                    onClick={ocultarModal}
                />
            </div>
            
            <form 
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`} 
                onSubmit={handleSubmit}
            >
                <legend>{editarGasto.concepto ? "Editar Gasto" : "Añadir Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="concepto">Concepto</label>
                    <input 
                        type="text"
                        id="concepto"
                        placeholder="Añade el concepto del gasto." 
                        value={concepto}
                        onChange={ e => setConcepto(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number"
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto: ej. 300." 
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                        className="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}    
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value={editarGasto.concepto ? "Guardar Cambios" : "Añadir Gasto"}
                />
            </form>
        </div>
    );
};

export default Modal;
