import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../../context/userContext';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import ProjectItem from './ProjectItem';
import AddNewProjectModal from './AddNewProjectModal';




// import  "../AllStyle.css"

const AllProjects = () => {
  const context = useContext(userContext);
  const { getProjects, editProject } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){

      getProjects()
    }
    else{
       navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [project, setProject] = useState({id: "",title: "", description: "", link: ""})




  const updateUser = (cureentUser) => {
    ref.current.click();
    setProject({id: cureentUser._id, title: cureentUser.title, description: cureentUser.description, link: cureentUser.link})
  }

  const handleClick = ()=>{
    console.log("Updating the project...", project)
    editProject(project.id,project.title, project.description, project.link);
    refClose.current.click();
    toast.success("Project updated Successfully");


}

const onChange = (e)=>{
  setProject({...project,[e.target.name]: e.target.value})
}

  //To open edit modal


  return (
    <div>
      <AddNewProjectModal/>
      <div className="container" style={{marginTop:"20px"}}>
                <button type="button" ref={ref} className="btn btn-outline-warning d-none" data-bs-toggle="modal" data-bs-target="#exampleModa2">
                    Add new
                </button>
            </div>

            {/* Modal  */}
            <div className="modal fade" id="exampleModa2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Project Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" name="title" value={project.title} placeholder="Enter title" className="form-control" id="ename" onChange={onChange} required={true} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="description" value={project.description} placeholder="Enter Description" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="link" value={project.link} placeholder="Enter link to pdf" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Update Project</button>
                        </div>
                    </div>
                </div>
            </div>
         <ProjectItem key={project._id} updateUser={updateUser} project={project} />
      
    </div>
  )
}

export default AllProjects;