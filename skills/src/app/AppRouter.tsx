import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Build from "../pages/Build";
import Works from "../pages/Works";
import ToolKit from "../pages/ToolKit";
import Beyond from "../pages/Beyond";
import Contact from "../pages/Contact";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/build" element={<Build />} />
          <Route path="/work" element={<Works />} />
          <Route path="/skills" element={<ToolKit />} />
          <Route path="/beyond" element={<Beyond />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}