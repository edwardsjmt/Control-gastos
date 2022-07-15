import {useState, useEffect} from "react"

import Header from "./Components/Header"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./Components/Modal"
import {generarId} from "./helpers/index"
import Filtros from "./Components/Filtros"
import ListadoGastos from"./Components/ListadoGastos"

function App() {
	// Se crean las variables del presupuesto
	const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    )
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
	const [modal, setModal] = useState(false)
	const [animarModal, setAnimarModal] = useState(false)
	const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )
    const [editarGasto, setEditarGasto] = useState({}) 
    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

	const handleNuevoGasto = () => {
        setEditarGasto({})
		setModal(true)

		setTimeout(() => {
			setAnimarModal(true)
		}, 500);
	}

	const guardarGasto = gasto => {
        if(gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            // console.log(gastosActualizados)
            setGastos(gastosActualizados)
            setEditarGasto({})
        } else {
            //Nuevo gasto
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }
		
		setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
	}

    useEffect(() => {
        if(Object.keys(editarGasto).length > 0) {
            setModal(true)

            setTimeout(() => {
                setAnimarModal(true)
            }, 500);
        }
    }, [editarGasto])

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter(gasto => gasto.id === id)
        setGastos(gastosActualizados)
    }

    useEffect(() => {
        if(filtro) {
            // Filtrar los gastos
            const gastosActualizados = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastosActualizados)
        }
    }, [filtro])

    useEffect(() => {
        localStorage.setItem("presupuesto", presupuesto ?? 0)
    }, [presupuesto])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0

        if(presupuestoLS > 0) setIsValidPresupuesto(true)
    }, [])

    useEffect(()=> {
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
    } ,[gastos])

    return (
        <div className={modal ? "fijar" : ''}>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
				gastos={gastos}
                setGastos={setGastos}
            />
            {isValidPresupuesto && (
                <>
					<main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos 
                            gastos={gastos} 
                            setEditarGasto={setEditarGasto} 
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
					</main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    editarGasto={editarGasto}
                    setEditarGasto={setEditarGasto}
                />
            )}
        </div>
    );
}

export default App;
