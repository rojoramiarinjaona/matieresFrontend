import './style.css';
import "font-awesome/css/font-awesome.css";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Context from "../template/Context";


export default function About(props) {
    const { id } = useParams();
    const [classes, setClasses] = useState([]);
    const [nom, setNom] = useState([]);
    const [total, setTotal] = useState([]);

    function getList() {
        axios.get("http://localhost:8000/enseignement/heure/"+id).then(function (response) {
        if (response.status === 200) {
            setClasses(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getNom() {
        axios.get("http://localhost:8000/enseignement/nom/"+id).then(function (response) {
        if (response.status === 200) {
            setNom(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getTot() {
        axios.get("http://localhost:8000/enseignement/total/"+id).then(function (response) {
        if (response.status === 200) {
            setTotal(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    useEffect(() => {
        getList();
        getNom();
        getTot();
    },[])

        return (
         <>
            
            
            <div className="ccontainer"> 
            
                <div className='row mt-5'>
                <Context/>
                    <div className='contain col-3'>
                    
                        <div style={{textAlign:"left", fontFamily:"Cambria"}}>
                        {nom.map((p,index) => (
                        <span>Enseignant: <span style={{fontWeight:"bold"}}>{p.nom}</span></span>
                        ))}
                        </div><br/>

                        <div style={{textAlign:"left", fontFamily:"Cambria"}}>
                        {total.map((t,index) => (
                        <span>Total des heures: <span style={{fontWeight:"bold"}}>{t.tot} heures</span></span>
                        ))}
                        </div>
                    </div>

                    <div className='contain col'>
                        <h6 className='text-center text-info mb-4' style={{fontFamily:"Century Gothic"}}>Liste des matières avec leurs nombres des heures </h6>
                        
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th style={{textAlign:"center",width:"300px"}}>Matières</th>
                                    <th style={{textAlign:"center",width:"250px"}}>Nombre heures</th>
                                </tr>
                            </thead>             

                            <tbody> 
                                {classes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Aucune matière à enseigner</td>
                                    </tr>
                                    ) : (
                                classes.map((list, index) => (
                                    <tr key={index}>
                                        <td style={{textAlign:"center"}}>{list.libelle}</td>
                                        <td style={{textAlign:"center"}}>{list.nb_heure}</td>
                                    </tr>
                                    ))
                                )}
                            </tbody>          
                        </table>
                    </div>
                </div>
            </div>
         </>
        );
}
