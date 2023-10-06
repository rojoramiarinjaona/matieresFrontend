import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Accueil from './accueil/Accueil';
import About from './about/About';
import Matiere from './matiere/Matiere';
import Classe from './classe/Classe';
import Enseignant from './enseignant/Enseignant';
import Enseignement from './enseignement/Enseignement';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil/>} />
          <Route path="accueil" element={<Accueil/>}/>
          <Route path="about/:id" element={<About/>}/>
          <Route path="matiere" element={<Matiere/>}/>
          <Route path="classe" element={<Classe/>}/>
          <Route path="enseignant" element={<Enseignant/>}/>
          <Route path="enseignement" element={<Enseignement/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
