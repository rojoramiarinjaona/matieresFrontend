// import { Link } from "react-router-dom";
// import './Context.css';

// export default function Context() {
//   return (
//     <>
//       <header>
//         <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//         {/* <nav className="navbar navbar-expand-md bg-light"> */}
          
//             <div id="logo">
//               <Link className="link" to="/accueil">
//               <h6>MAT</h6>
//               </Link>
//             </div>
          
//           <div className="navbar-nav ms-auto d-flex align-items-right">
//             <div className="navbar-brand">
//               <Link className="link" to="/matiere">
//               <div className="align-items-center acc">
//                   MATIERES
//                 </div>
//               </Link>
//             </div>

//             <div className="navbar-brand">
//               <Link className="link" to="/classe">
//               <div className="align-items-center acc">
//                   CLASSES
//                 </div>
//               </Link>
//             </div>

//             <div className="navbar-brand">
//               <Link className="link" to="/enseignant">
//               <div className="align-items-center acc">
//                   ENSEIGNANTS
//                 </div>
//               </Link>
//             </div>

//             <div className="navbar-brand">
//               <Link className="link" to="/enseignement">
//               <div className="align-items-center acc">
//                   ENSEIGNEMENTS
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }
import { Link } from "react-router-dom";
import './Context.css';

export default function Context() {
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link className="link" to="/accueil">
            <div className="align-items-center acc">MAT</div>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="link" to="/matiere">
            <div className="align-items-center acc">MATIERES</div>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="link" to="/classe">
            <div className="align-items-center acc">CLASSES</div>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="link" to="/enseignant">
            <div className="align-items-center acc">ENSEIGNANTS</div>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="link" to="/enseignement">
            <div className="align-items-center acc">ENSEIGNEMENTS</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

