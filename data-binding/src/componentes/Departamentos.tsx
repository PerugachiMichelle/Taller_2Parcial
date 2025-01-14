import React, { useState } from "react";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
  empleados: Empleado[]; // Prop agregado
}

const Departamentos: React.FC<PropsDepartamento> = ({ departamentos, setDepartamentos, empleados }) => {

  const [nombreDepartamento, setNombreDepartamento] = useState<string>("");

  const agregarDepartamento = () => {
    if (nombreDepartamento.trim() !== "") {
      setDepartamentos([
        ...departamentos,
        { id: departamentos.length + 1, nombre: nombreDepartamento },
      ]);
      setNombreDepartamento("");
    }
  };

  const eliminarDepartamento = (id: number) => {
    const empleadosAsociados = empleados.filter((empleado) => empleado.idDepartamento === id);
    if (empleadosAsociados.length > 0) {
      alert("No se puede eliminar este departamento porque tiene empleados asociados.");
      return;
    }

    const nuevosDepartamentos = departamentos.filter((dep) => dep.id !== id);
    setDepartamentos(nuevosDepartamentos);
  };

  const actualizarDepartamento = (id: number) => {
    const nombreNuevo = prompt("Ingrese el nuevo nombre del departamento:");
    if (nombreNuevo) {
      const nuevosDepartamentos = departamentos.map((dep) =>
        dep.id === id ? { ...dep, nombre: nombreNuevo } : dep
      );
      setDepartamentos(nuevosDepartamentos);
    }
  };

  return (
    <div>
      <h1>Departamentos</h1>
      <input
        type="text"
        value={nombreDepartamento}
        onChange={(e) => setNombreDepartamento(e.target.value)}
        placeholder="Nombre del departamento"
      />
      <button onClick={agregarDepartamento}>Agregar Departamento</button>
      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.id}</td>
              <td>{departamento.nombre}</td>
              <td>
                <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
                <button onClick={() => actualizarDepartamento(departamento.id)}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;
