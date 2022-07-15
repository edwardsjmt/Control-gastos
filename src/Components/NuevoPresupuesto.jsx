import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = e => {
        e.preventDefault()

        if(!(presupuesto) || (presupuesto)<=0) {
            setMensaje("Presupuesto no valido")
            return
        } 

        setIsValidPresupuesto(true)
        setMensaje('')
    }

    return (
        <div className="contenedor-presupuesto sombra contenedor">
            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label>Definir Presupuesto</label>

                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(e.target.value)}
                    />
                </div>

                <input type="submit" value="Añadir Presupuesto" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
