import React, { useContext, useEffect, useRef, useState } from 'react'
import AddUserModal from './AddUserModal';
import userContext from '../../../context/userContext';
import UserItem from './UserItem';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import CourseItem from './CourseItem';
import AddNewProjectModal from './AddNewProjectModal';
import AddNewCourseModal from './AddNewCourseModal';



// import  "../AllStyle.css"

const AllCourses = () => {
  const context = useContext(userContext);
  const { getCourses, editCourse } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
        console.log('Courses useeffect running...')
      getCourses()
    }
    else{
       navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
//   useEffect(() => {
//     const getFilesList = async () => {
//       try {
//         const { data } = await axios.get(`${host}/api/file/getAllFiles`);
//         setErrorMsg('');
//         setFilesList(data);
//       } catch (error) {
//         error.response && setErrorMsg(error.response.data);
//       }
//     };

//     getFilesList();
//   }, []);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [user, setUser] = useState({id: "",title: "", description: "", link: ""})
  const [course, setCourse] = useState({id: "",title: "", description: "", link: ""})


  const updateUser = (cureentUser) => {
    ref.current.click();
    setUser({id: cureentUser._id, title: cureentUser.title, description: cureentUser.description, link: cureentUser.link})
  }

  const handleClick = ()=>{
    console.log("Updating the user...", user)
    editCourse(user.id,user.title, user.description, user.link);
    refClose.current.click();
    toast.success("Course updated Successfully");


}

const onChange = (e)=>{
  setUser({...user,[e.target.name]: e.target.value})
}

  //To open edit modal


  return (
    <div>
      <AddNewCourseModal/>
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" name="title" value={user.title} placeholder="Enter title" className="form-control" id="ename" onChange={onChange} required={true} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="description" value={user.description} placeholder="Enter Description" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="link" value={user.link} placeholder="Enter link to pdf" className="form-control" id="eemail" onChange={onChange} required/>
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Update Course</button>
                        </div>
                    </div>
                </div>
            </div>
         <CourseItem key={course._id} updateUser={updateUser} course={course} />
      
    </div>
  )
}

export default AllCourses;