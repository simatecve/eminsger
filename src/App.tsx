import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Branches from './pages/Branches';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="servicios" element={<Services />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="proyectos/:id" element={<ProjectDetails />} />
          <Route path="sucursales" element={<Branches />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
