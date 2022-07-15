import Gasto from "./Gasto";

const ListadoGastos = ({
    gastos,
    setEditarGasto,
    eliminarGasto,
    filtro,
    gastosFiltrados,
}) => {
    return (
        <div className="contenedor listado-gastos">
            {filtro ? (
                <>
                    {gastosFiltrados.length ? (
                        <h2>Gastos</h2>
                    ) : (
                        <h2>Aun no hay gastos en esta categoria</h2>
                    )}
                    {gastosFiltrados.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setEditarGasto={setEditarGasto}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
                    {gastos.length ? (
                        <h2>Gastos</h2>
                    ) : (
                        <h2>Aun no hay gastos en esta categoria</h2>
                    )}

                    {gastos.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setEditarGasto={setEditarGasto}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ListadoGastos;
