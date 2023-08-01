import React,{useContext, useState, useRef} from 'react'
import userContext from '../../../context/userContext';
import { FaUserAlt } from "react-icons/fa"
import { toast } from 'react-toastify';

const AddNewPublicationModal = () => {
    const context = useContext(userContext);
    const { addPublication } = context;   // Add New User

     const refClose = useRef(null)
     const [publication, setPublication] = useState({title: "", description: "", link: ""})

     const handleClick = (e)=>{
         e.preventDefault();
         addPublication(publication.title, publication.description, publication.link);
        refClose.current.click();
        setPublication({title: "", description: "", link: ""})
        toast.success("Publication added Successfully");


     }

     const onChange= (e)=>{
        setPublication({...publication,[e.target.name]: e.target.value})
     }

    return (
        <div>
            {/* Button trigger modal  */}
            <div className="container" style={{marginTop:"20px", float: "right"}}>
                <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal"> {<FaUserAlt />}
                    Add New Publication
                </button>
            </div>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Publication Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" name="title" placeholder="Enter title" value={publication.title} className="form-control" id="name" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="description" placeholder="Enter Description"  value={publication.description} className="form-control" id="email" onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" autoComplete={"off"} name="link"  value={publication.link} placeholder="Enter Link to pdf" className="form-control" onChange={onChange} id="password" minLength={8} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Add Publication</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewPublicationModal