import { formatearFecha } from "../helpers";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoOcio from "../img/icono_ocio.svg";

const Gasto = ({ gasto, setEditarGasto, eliminarGasto }) => {
    const { categoria, concepto, cantidad, id, fecha } = gasto;

    const DiccionarioIconos = {
        ahorro: IconoAhorro,
        casa: IconoCasa,
        gastos: IconoGastos,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones,
        comida: IconoComida,
        ocio: IconoOcio,
    };

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditarGasto(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () =>( 
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={DiccionarioIconos[categoria]} />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{concepto}</p>
                            <div className="fecha-gasto">
                                Agregado el:{" "}
                                <span>{formatearFecha(fecha)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="cantidad-gasto">${cantidad}</div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Gasto;
