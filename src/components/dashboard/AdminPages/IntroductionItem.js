import React, { useContext } from 'react'
import userContext from '../../../context/userContext';
import { FaUserEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"


const IntroductionItem = (props) => {
    const context = useContext(userContext);
    const {introductions } = context;
    const {updateUser } = props;

    return (
        
        <div>
            <div style={{ marginLeft: "25px" }}>
        <div>
          <table className="table table border shadow table-striped table-md table-hover table-responsive" style={{ marginLeft: '4%', marginTop: '13%', width: '155%' }}>
            <thead className="table-light">
              <tr style={{ color: 'blue', "fontSize": "18px", backgroundColor:"" }}>
            
                <th scope="col">Description</th>
                <th scope="col">Action</th>

                
              </tr>
            </thead>
            <tbody>
            {introductions.map((user, index) => {
              return (
                <tr key={user._id}>
                  
                    <td>{user.description}</td>
                    <td>
                      <button type="submit" onClick={()=> {updateUser(user)}} className="btn btn-warning mx-1">{<FaUserEdit />} Edit</button> 
                      {/* <button type="submit" onClick={() => { deletePublication(user._id) }} className="btn btn-outline-warning mx-1">{<MdDelete />} Delete</button> */}
                    </td>
                  </tr>
                  
                 )
               })}
            </tbody>
          </table>
        </div>
      </div>
        </div >
    )
}

export default IntroductionItem