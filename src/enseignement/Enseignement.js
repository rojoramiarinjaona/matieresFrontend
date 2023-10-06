import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    id_p:0,
    id_m:0,
    id_c:0,
    nb_heure:0
 }

export default function Enseignement() {
    const [state,setState] = useState(initialState);
    const {id_p,id_m,id_c,nb_heure} = state;
    const [enseignements, setEnseignements] = useState([]);
    const [enseignants, setEnseignants] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [classes, setClasses] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nb_heure){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:8000/enseignement/add',{  
              id_p,
              id_m,
              id_c,
              nb_heure
           }).then(()=>{
            setState({id_p:0, id_m:0, id_c:0, nb_heure:0});
              handleClose();
              toast.success("Ajout avec succès!");
              // Mettre à jour l'état enseignements avec les nouvelles données
            getList();
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!nb_heure){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:8000/enseignement/edit/"+numItem,{   
              nb_heure
           }).then((response)=>{
              if (response.status === 200) {
                setState({nb_heure:0});
                toast.success("Modification avec succès")
                onClose();
                getList();
              }
              else{
                toast.error("Il y a sûrement une erreur");
              } 
           })
        }
     }

     function onClose() {
        closeEditModal();
      }

     useEffect(() => {
        getList();
        getProf();
        getMatiere();
        getClasse();
    },[]);
  
     const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
     }

     const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

      const handleSelectChange2 = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

      const handleSelectChange3 = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

     //SUPPRESSION
     const deleteVendeur = (id) => {
        axios.delete("http://localhost:8000/enseignement/delete/"+id).then(function (response) {
          setDisplayConfirmationModal(false);
          toast.success(`Suppression bien réussie`);
          getList();
      });
  
    };

    const [displayConfirmationModal, setDisplayConfirmationModal] =
		useState(false);

	const [deleteMessage, setDeleteMessage] = useState(null);

    const [id, setId] = useState(null);

	const showDeleteModal = (id) => {
		setId(id);
		setDeleteMessage(
			`Voulez-vous vraiment supprimer cette ligne?`
		);
		setDisplayConfirmationModal(true);
	};

	const hideConfirmationModal = () => {
		setDisplayConfirmationModal(false);
	};

    function getList() {
        axios.get("http://localhost:8000/enseignement/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignements(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getProf() {
        axios.get("http://localhost:8000/enseignant/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignants(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getMatiere() {
        axios.get("http://localhost:8000/matiere/liste").then(function (response) {
        if (response.status === 200) {
            setMatieres(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    function getClasse() {
        axios.get("http://localhost:8000/classe/liste").then(function (response) {
        if (response.status === 200) {
            setClasses(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://localhost:8000/enseignement/about/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

        return (
         <>
            <Modal show={show} onHide={handleClose}>
                <form  onSubmit={handleSubmit}>
                <ModalBody>
                    <ModalTitle className='text-center'>
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Ajout</h5><br/>
                    </ModalTitle>

                    <select
                        id="id_p"
                        name="id_p"
                        className='form-control'
                        value={state.id_p}
                        onChange={handleSelectChange}
                        >
                        <option value="">Sélectionnez un enseignant:</option>
                         {enseignants.map((enseignant,index) => (
                        <option value={enseignant.id}>{enseignant.nom}</option>
                     ))}
                    </select><br/>

                    <select
                        id="id_m"
                        name="id_m"
                        className='form-control'
                        value={state.id_m}
                        onChange={handleSelectChange2}
                        >
                        <option value="">Sélectionnez une matière</option>
                         {matieres.map((matiere,index) => (
                        <option value={matiere.id}>{matiere.libelle}</option>
                     ))}
                    </select><br/>

                    <select
                        id="id_c"
                        name="id_c"
                        className='form-control'
                        value={state.id_c}
                        onChange={handleSelectChange3}
                        >
                        <option value="">Sélectionnez un niveau:</option>
                         {classes.map((classe,index) => (
                        <option value={classe.id}>{classe.design} {classe.parcours}</option>
                     ))}
                    </select><br/>

                    <input 
                    type='number' 
                    className='form-control' 
                    id="nb_heure"
                    name="nb_heure"
                    placeholder="Nombres des heures"
                    value={nb_heure}
                    onChange={handleInputChange}/><br/>
                </ModalBody>
            
                <ModalFooter>
                    <Button variant='secondary' style={{fontFamily: "Century gothic"}} onClick={handleClose}>
                        Fermer
                    </Button>

                    <Button type="submit" style={{fontFamily: "Century gothic"}} variant='primary'>
                        Ajouter
                    </Button>
                </ModalFooter>
                </form>
            </Modal>

            <Modal
                size="md"
                show={showEdit}
                onHide={closeEditModal}
                backdrop="static"
                keyboard={false}
            >

                <ModalBody>
                    <ModalTitle className='text-center'>
                        <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Modification</h5><br/>
                    </ModalTitle>
                    <form onSubmit={handleSubmitEdit}
                    >

                    <label>Nombre heures:</label>
                    <input 
                    type='number' 
                    className='form-control' 
                    id="nb_heure"
                    name="nb_heure"
                    placeholder="Nombres des heures"
                    value={nb_heure || 0}
                    onChange={handleInputChange}/><br/>
                   

                    <ModalFooter>
                        <Button variant='secondary' style={{fontFamily: "Century gothic"}} onClick={closeEditModal}>
                            Fermer
                        </Button>

                        <Button type="submit" style={{fontFamily: "Century gothic"}} variant='primary'>
                            Modifier
                        </Button>
                    </ModalFooter>
                    </form>   
                </ModalBody>
            </Modal>

            <ModalDelete
                showModal={displayConfirmationModal}
                confirmModal={deleteVendeur}
                hideModal={hideConfirmationModal}
                id={id}
                message={deleteMessage}
            />
            <div style={{ display: 'flex' }}>
            <Context/>
            
            <div className="container"> 
            <div className='row mt-5'>
                <div className='col-1'>
                <div id='btn_ajouter' onClick={handleShow}>
                        AJOUTER &nbsp; <i className='fa fa-plus'></i>
                    </div>
                </div>
                <div className='col'>
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th style={{textAlign:"center",width:"50px"}}>N°</th>
                        <th style={{textAlign:"center",width:"100px"}}>Niveau</th>
                        <th style={{textAlign:"center",width:"200px"}}>Matière</th>
                        <th style={{textAlign:"center",width:"250px"}}>Enseignant</th>
                        <th style={{textAlign:"center",width:"50px"}}>Nombre heures</th>
                        <th style={{textAlign:"center",width:"100px"}}><i className="fa fa-cog"></i></th>
                    </tr>
                    </thead> 

                    <tbody> 
                        {enseignements.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Aucun donnée pour le moment...</td>
                        </tr>
                        ) : (
                        enseignements.map((enseignement,index) => (
                            <tr key={index}>
                                <td style={{textAlign:"center"}}>{index+1}</td>
                                <td style={{textAlign:"center"}}>{enseignement.design} {enseignement.parcours}</td>
                                <td style={{textAlign:"center"}}>{enseignement.libelle}</td>
                                <td style={{textAlign:"center"}}>{enseignement.nom}</td>
                                <td style={{textAlign:"center"}}>{enseignement.nb_heure}</td>
                                <td>
                                    <button className="btn btn-view" onClick={() => showDeleteModal(enseignement.id)}><i className="fa fa-trash"></i></button> 
    
                                    <button className="btn btn-edit" onClick={() => showEditModal(enseignement.id)}><i className="fa fa-edit"></i></button> 
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>          
               </table>
                </div>
            </div>
                
               
            </div>
            </div>
         </>
        );
}
