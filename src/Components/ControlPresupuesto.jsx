import { useEffect } from "react";
import { useState } from "react";
import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const controlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
	const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );

        const totalDisponible = presupuesto - totalGastado;

		const porcentajeActual = (( (presupuesto - totalDisponible)) / presupuesto * 100).toFixed(2)

        setDisponible(totalDisponible);
        setGastado(totalGastado);

		setTimeout(() => {
			setPorcentaje(porcentajeActual)
		}, 1500)
    }, [gastos]);

	const handleResetApp = () => {
		const resultado = confirm("Deseas reiniciar presupuesto y gastos?")

		if(resultado) {
			setGastos([])
			setPresupuesto(0)
			setIsValidPresupuesto(false)
		} 
	}

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
					value={porcentaje}
					styles={buildStyles({
						pathColor: disponible < 0 ? '#dc2626' : "3b82f6",
						trailColor: "#f5f5f5",
						textColor: disponible < 0 ? '#dc2626' : "3b82f6"
					})}
					text={`${porcentaje}% Gastado`}
				/>
            </div>

            <div className="contenido-presupuesto">
				<button className="reset-app" type="button" onClick={handleResetApp}>
					Resetear App
				</button>
                <p>
                    {/* <span>Presupuesto: </span>{formatearCantidad(presupuesto)} */}
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span >Disponible: </span>
                    {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>
                    {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    );
};

export default controlPresupuesto;
