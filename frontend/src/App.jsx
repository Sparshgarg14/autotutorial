// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import QAView from "./pages/QAView";

import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./index.css"
import Layout from "./components/layout";

export default function App() {
  return (
    <div>
     
     <Navbar/>
     <Layout>
      <Dashboard />
    </Layout>
     
      
    </div>
  );
}
