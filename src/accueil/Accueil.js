// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Context from "../template/Context";
// import './style.css';
// import recette from '../images/bg-1.jpg';
// import { Link } from 'react-router-dom';

// const Accueil = () =>{
//     return(
//         <>
//         <Context/>
//             <div id='fond'>
//             {/* <Context/> */}
//                 <div id='texte'>
//                     <div id='titre'>
//                         <h3>Gestion des matières</h3>
//                     </div>
//                     <div id='para'>
//                         <p>Une application web pour gérer les matières à l'Ecole Nationale d'Informatique.</p>
//                     </div>
//                     <Link id="link" to="/matiere">
//                         <div id='bouton'>
//                             Commencer
//                         </div>
//                     </Link>
                    
//                 </div>
//                 <div id='image'>
//                     <img src={recette} alt="Face"/>
//                 </div>
            
//             </div>
//         </>
//     )
// }

// export default Accueil; 
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from "../template/Context";
import './style.css';
import recette from '../images/bg-1.jpg';
import { Link } from 'react-router-dom';

const Accueil = () => {
  return (
    <div className="page-container">
      <Context />
      <div className="content">
        <div id='fond'>
          <div id='texte'>
            <div id='titre'>
              <h3>Gestion des matières</h3>
            </div>
            <div id='para'>
              <p>Une application web pour gérer les matières à l'Ecole Nationale d'Informatique.</p>
            </div>
            <Link id="link" to="/matiere">
              <div id='bouton'>
                Commencer
              </div>
            </Link>
          </div>
          <div id='image'>
            <img src={recette} alt="Face" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accueil;
