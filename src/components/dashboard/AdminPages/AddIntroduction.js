import React, { useContext, useEffect, useRef, useState } from 'react'
import AddUserModal from './AddUserModal';
import userContext from '../../../context/userContext';
import UserItem from './UserItem';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import IntroductionItem from './IntroductionItem';



// import  "../AllStyle.css"

const AddIntroduction = () => {
  const context = useContext(userContext);
  const { getIntroductions, editIntroduction } = context;
  const navigate = useNavigate();
  const [stop,setStop] = useState(0)

  useEffect(() => {

    if(localStorage.getItem('token')){
      
      if (stop==0) {
        getIntroductions()
        setStop(1)
      }
      console.log('Useeffect of intro running')
     }
     else{
       navigate("/login")
     }
    // eslint-disable-next-line
  },[stop])
  const ref = useRef(null)
  const refClose = useRef(null)
  // const [user, setUser] = useState({id: "",title: "", description: "", link: ""})
  // const [course, setCourse] = useState({id: "",title: "", description: "", link: ""})
  const [introduction, setIntroduction] = useState({id: "", description: ""})



  const updateUser = (cureentUser) => {
    ref.current.click();
    setIntroduction({id: cureentUser._id, description: cureentUser.description})
  }

  const handleClick = ()=>{
    console.log("Updating the introduction...", introduction)
    editIntroduction(introduction.id, introduction.description);
    refClose.current.click();
    toast.success("Introduction updated Successfully");


}

const onChange = (e)=>{
  setIntroduction({...introduction,[e.target.name]: e.target.value})
}

  //To open edit modal


  return (
    <div>
      {/* <AddNewPublicationModal/> */}
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Introduction Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* <div className="mb-3">
                                    <input type="text" name="title" value={publication.title} placeholder="Enter title" className="form-control" id="ename" onChange={onChange} required={true} />
                                </div> */}
                                <div className="mb-9">
                                    <input type="text" name="description" value={introduction.description} placeholder="Enter Description" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                                {/* <div className="mb-3">
                                    <input type="text" name="link" value={publication.link} placeholder="Enter link to pdf" className="form-control" id="eemail" onChange={onChange} required/>
                                </div> */}
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Update Introduction</button>
                        </div>
                    </div>
                </div>
            </div>
         <IntroductionItem key={introduction._id} updateUser={updateUser} introduction={introduction} />
      
    </div>
  )
}

export default AddIntroduction;