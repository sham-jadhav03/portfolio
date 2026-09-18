import Layout from "./Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Build from "../pages/Build";
import Works from "../pages/Works";
import ToolKit from "../pages/ToolKit";
import Beyond from "../pages/Beyond";
import Contact from "../pages/Contact";

export default function App() {
  return (
    <Layout>
      <Home />
      <About />
      <Build />
      <Works />
      <ToolKit />
      <Beyond />
      <Contact />
    </Layout>
  );
}