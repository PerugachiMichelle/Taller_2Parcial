import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GestionUsuarios from './componentes/GestionUsuarios';
import Navbar from './componentes/Navbar';
import Home from "./componentes/Home";
import Contact from "./componentes/Contact";
import './App.css';
import { useEffect, useState } from "react";
import Departamentos from "./componentes/Departamentos";
import Empleados from "./componentes/Empleados";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

const App: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  // Leer los datos del local storage al cargar la aplicación
  useEffect(() => {
    const storedDepartamentos = localStorage.getItem("departamentos");
    const storedEmpleados = localStorage.getItem("empleados");

    if (storedDepartamentos) {
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if (storedEmpleados) {
      setEmpleados(JSON.parse(storedEmpleados));
    }
  }, []);

  // Guardar en local storage cuando los departamentos cambian
  useEffect(() => {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
  }, [departamentos]);

  // Guardar en local storage cuando los empleados cambian
  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<GestionUsuarios />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/departamentos"
            element={
              <Departamentos
                departamentos={departamentos}
                setDepartamentos={setDepartamentos}
                empleados={empleados} // Pasar empleados como prop
              />
            }
          />
          <Route
            path="/empleados"
            element={
              <Empleados
                departamentos={departamentos}
                empleados={empleados}
                setEmpleados={setEmpleados}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
