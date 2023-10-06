import './style.css';
import "font-awesome/css/font-awesome.css";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import Context from "../template/Context";
import ModalDelete from "../template/ModalDelete";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

 
const initialState = {
    nom:""
 }

export default function Enseignant() {
    const [state,setState] = useState(initialState);
    const {nom} = state;
    const [enseignants, setEnseignants] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nom){
           toast.error("Complétez les champs!")
        }
        else{
           axios.post('http://localhost:8000/enseignant/add',{  
              nom
           }).then(()=>{
              setState({nom:""});
              handleClose();
              toast.success("Ajout avec succès!")
           }).catch((err) => {handleClose();toast.error(err.response.data)});
        }
     }

     const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!nom){
           toast.error("Complétez tous les champs")
        }
        else{
           axios.put("http://localhost:8000/enseignant/edit/"+numItem,{   
              nom
           }).then((response)=>{
              if (response.status === 200) {
                setState({nom:""});
                toast.success("Modification avec succès")
                onClose();
              }
              else{
                toast.error("Il y a sûrement une erreur")
              } 
           })
        }
     }

     function onClose() {
        closeEditModal();
      }

     useEffect(() => {
        getList();
    })
  
     const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
     }

     //SUPPRESSION
     const deleteItem = (id) => {
        axios.delete("http://localhost:8000/enseignant/delete/"+id).then(function (response) {
          setDisplayConfirmationModal(false);
          toast.success(`Suppression bien réussie`);
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
        axios.get("http://localhost:8000/enseignant/liste").then(function (response) {
        if (response.status === 200) {
            setEnseignants(response.data);
        } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
        }
        });
    }

    const [numItem, setNumItem] = useState(1);
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (id) => {
        axios.get("http://localhost:8000/enseignant/about/"+id).then((res) => setState({...res.data}));
		setNumItem(id);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		setShowEdit(false);
	};

    const [filterText, setFilterText] = useState('');
    const enseignants2 = enseignants.filter((enseignant) =>
    enseignant.nom.toLowerCase().includes(filterText.toLowerCase())
  );
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
      };

        return (
         <>
            <Modal show={show} onHide={handleClose}>
                <form  onSubmit={handleSubmit}>
                    <ModalBody>
                        <ModalTitle className='text-center'>
                            <h5 className="card-title" style={{fontFamily: "Century gothic",color:"#008cba",fontWeight:"bold"}}>Nouveau enseignant</h5><br/>
                        </ModalTitle>

                        <input 
                        type='text' 
                        className='form-control' 
                        id="nom"
                        name="nom"
                        placeholder="Nom de l'enseignant"
                        value={nom}
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
                    <form style={{
                    margin:"auto",
                    padding:"15px",
                    maxWidth:"450px",
                    fontFamily:"cambria",
                    fontSize:"13pt",
                    alignContent:"center"
                    }}
                    onSubmit={handleSubmitEdit}
                    >
                    <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Nom de l'enseignant"
                    className="form-control"
                    value={nom || ""}
                    onChange={handleInputChange}
                    /><br/>

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
                confirmModal={deleteItem}
                hideModal={hideConfirmationModal}
                id={id}
                message={deleteMessage}
            />

            <div style={{ display: 'flex' }}>
            <Context/>
            
            <div className="container"> 
                <h6 className='text-center text-info mt-4' style={{fontFamily:"Century Gothic"}}>Liste de tous les enseignants</h6>

                <div className='row mt-5'>
                    <div className='col-1'>
                        <div id='btn_ajouter' onClick={handleShow}>
                            AJOUTER &nbsp; <i className='fa fa-plus'></i>
                        </div>
                    </div>

                    <div className='col'>
                        <table className="styled-table2">
                            <thead>
                                <tr className='bg-light'>
                                    <th colspan="3">
                                    <Form.Group>
                                        <Form.Control
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={filterText}
                                        onChange={handleFilterChange}
                                        style={{width:"450px"}}
                                        className='form-control form-control-sm'
                                        />
                                    </Form.Group>
                                    </th>
                                </tr>
                            </thead>
                        </table><br/>

                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th style={{textAlign:"center",width:"50px"}}>N°</th>
                                    <th style={{textAlign:"center",width:"300px"}}>Nom</th>
                                    <th style={{textAlign:"center",width:"150px"}}><i className="fa fa-cog"></i></th>
                                </tr>
                            </thead>

                            <tbody> 
                                {enseignants2.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>Il n'y a pas de données sur les enseignants pour le moment...</td>
                                </tr>
                                ) : (
                                enseignants2.map((enseignant,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td style={{textAlign:"center"}}>{enseignant.nom}</td>
                                        <td>
                                                <Link className="link"  to={`/about/${enseignant.id}`}>
                                                    <button className="btn btn-info"><i className="fa fa-eye"></i></button>
                                                </Link>
                                                
                                                <button className="btn btn-view" onClick={() => showDeleteModal(enseignant.id)}><i className="fa fa-trash"></i></button> 
    
                                                <button className="btn btn-edit" onClick={() => showEditModal(enseignant.id)}><i className="fa fa-edit"></i></button> 
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
