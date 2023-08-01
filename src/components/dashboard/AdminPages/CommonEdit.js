import React, { useContext, useEffect, useRef, useState } from 'react'
import AddUserModal from './AddUserModal';
import userContext from '../../../context/userContext';
import UserItem from './UserItem';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"



// import  "../AllStyle.css"

const CommonEdit = (props) => {
    // const {title1,description1} = props
  const context = useContext(userContext);
  const { getUsers, editUser } = context;
  const navigate = useNavigate();
  const [user, setUser] = useState({title:props.title,description:props.description})


  useEffect(() => {
    console.log(props.description)
    if(localStorage.getItem('token')){

      getUsers()
    }
    else{
       navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)


  const updateUser = (cureentUser) => {
    ref.current.click();
    setUser({id: cureentUser._id, ename: cureentUser.name, eemail: cureentUser.email, erole: cureentUser.role})
  }

  const handleClick = ()=>{
    console.log("Updating the user...", user)
    editUser(user.id,user.ename, user.eemail, user.erole);
    refClose.current.click();
    toast.success("User updated Successfully");


}

const onChange = (e)=>{
  setUser({...user,[e.target.name]: e.target.value})
  console.log('Onchange working',e.target.value)
}

  //To open edit modal


  return (
    <div>
      
      <div className="container" style={{marginTop:"20px"}}>
                <button type="button" ref={ref} className="btn btn-outline-warning d-none" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                    Add new User
                </button>
            </div>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" name="title" value={user?.title} placeholder='Enter Title' className="form-control" id="title" onChange={onChange} required={true} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" name="description" value={user.description} placeholder="Enter Description" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default CommonEdit;