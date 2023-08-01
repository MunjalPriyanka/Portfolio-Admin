import React, { useState } from "react";
import userContext from "./userContext";


const UserState = (props) => {

  const host = "http://localhost:5000"

  const userInitial = []
  const courseInitial = []
  const publicationInitial = []
  const projectInitial = []

  const introductionInitial = []



  const [users, setUser] = useState(userInitial)
  const [courses, setCourse] = useState(courseInitial)
  const [publications, setPublication] = useState(publicationInitial)
  const [projects, setProject] = useState(projectInitial)
  const [introductions, setIntroduction] = useState(introductionInitial)



  //fetch  all users...........................................................
  const getUsers =  async () => {
    const response = await fetch(`${host}/api/auth/fetchalluser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json)
    setUser(json)

  }

    //fetch  all courses...........................................................
    const getCourses =  async () => {
      const response = await fetch(`${host}/api/course/getAllCourses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      // console.log(json)
      setCourse(json)
  
    }

      //fetch  all publications...........................................................
      const getPublications =  async () => {
        const response = await fetch(`${host}/api/publication/getAllPublications`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        // console.log(json)
        setPublication(json)
    
      }

        //fetch  all projects...........................................................
        const getProjects =  async () => {
          const response = await fetch(`${host}/api/file/getAllFiles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const json = await response.json();
          // console.log(json)
          setProject(json)
      
        }

            //fetch  all projects...........................................................
            const getIntroductions =  async () => {
              const response = await fetch(`${host}/api/introduction/getIntroductions`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const json = await response.json();
              console.log("Get Introduction is running")
              setIntroduction(json)
          
            }



  //Add new user to the list........................................................................................
  const addUser =  async(name, email, role, password) => {

    // eslint-disable-next-line
    const response = await fetch(`${host}/api/auth/createuser`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name, email, role, password}) // body data type must match "Content-Type" header
    });

   
    // console.log("Adding new user")
    const user = {
      "_id": "_id",
      "name": name,
      "email": email,
      "role": role,
      "password": password
    };
    setUser(users.concat(user))

    

  }

  //Add new course to the list........................................................................................
  const addCourse =  async(title, description, link) => {

    // eslint-disable-next-line
    const response = await fetch(`${host}/api/course/save`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, link}) // body data type must match "Content-Type" header
    });

       // console.log("Adding new user")
       const course = {
        "_id": "_id",
        "title": title,
        "description": description,
        "link": link,
      };
      setCourse(courses.concat(course))
  }


    //Add new course to the list........................................................................................
    const addPublication =  async(title, description, link) => {

      // eslint-disable-next-line
      const response = await fetch(`${host}/api/publication/save`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, link}) // body data type must match "Content-Type" header
      });
  
         // console.log("Adding new user")
         const publication = {
          "_id": "_id",
          "title": title,
          "description": description,
          "link": link,
        };
        setPublication(publications.concat(publication))
    }

       //Add new project to the list........................................................................................
       const addProject =  async(title, description, link) => {

        // eslint-disable-next-line
        const response = await fetch(`${host}/api/file/save`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, description, link}) // body data type must match "Content-Type" header
        });
    
           // console.log("Adding new user")
           const project = {
            "_id": "_id",
            "title": title,
            "description": description,
            "link": link,
          };
          setProject(projects.concat(project))
      }
  

  //Delete users............................................................................................
  const deleteUser = async (id) => {
    //To Do api call
    const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = await response.json();

    const newUser = users.filter((user) => { return user._id !== id });
    setUser(newUser)

  }

    //Delete users............................................................................................
    const deleteCourse = async (id) => {
      //To Do api call
      const response = await fetch(`${host}/api/course/deletecourse/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // eslint-disable-next-line
      const json = await response.json();
  
      const newCourse = courses.filter((course) => { return course._id !== id });
      setCourse(newCourse)
  
    }

        //Delete users............................................................................................
        const deletePublication = async (id) => {
          //To Do api call
          const response = await fetch(`${host}/api/publication/deletepublication/${id}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // eslint-disable-next-line
          const json = await response.json();
      
          const newPublication = publications.filter((publication) => { return publication._id !== id });
          setPublication(newPublication)
      
        }

           //Delete projects............................................................................................
           const deleteProject = async (id) => {
            //To Do api call
            const response = await fetch(`${host}/api/file/deletefile/${id}`, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // eslint-disable-next-line
            const json = await response.json();
        
            const newProject = projects.filter((project) => { return project._id !== id });
            setProject(newProject)
        
          }

  //Edit user...........................................................................................
  const editUser = async (id, name, email, role) => {
    //API call
    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, email, role}) 
    });

    const json = await response.json();
    console.log(json);

    let newUsers = JSON.parse(JSON.stringify(users))
    //logic to edit in client side
    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === id) {
        newUsers[index].name = name;
        newUsers[index].email = email;
        newUsers[index].role = role;
        break;
      } 
    }
    setUser(newUsers);
  }

    //Edit course...........................................................................................
    const editCourse = async (id, title, description, link) => {
      //API call
      const response = await fetch(`${host}/api/course/updatecourse/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, link}) 
      });
  
      const json = await response.json();
      console.log(json);
  
      let newCourses = JSON.parse(JSON.stringify(courses))
      //logic to edit in client side
      for (let index = 0; index < newCourses.length; index++) {
        const element = newCourses[index];
        if (element._id === id) {
          newCourses[index].title = title;
          newCourses[index].description = description;
          newCourses[index].link = link;
          break;
        } 
      }
      setCourse(newCourses);
    }

        //Edit course...........................................................................................
        const editPublication = async (id, title, description, link) => {
          //API call
          const response = await fetch(`${host}/api/publication/updatepublication/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, link}) 
          });
      
          const json = await response.json();
          console.log(json);
      
          let newPublications = JSON.parse(JSON.stringify(publications))
          //logic to edit in client side
          for (let index = 0; index < newPublications.length; index++) {
            const element = newPublications[index];
            if (element._id === id) {
              newPublications[index].title = title;
              newPublications[index].description = description;
              newPublications[index].link = link;
              break;
            } 
          }
          setPublication(newPublications);
        }

          //Edit project...........................................................................................
          const editProject = async (id, title, description, link) => {
            //API call
            const response = await fetch(`${host}/api/file/update/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, description, link}) 
            });
        
            const json = await response.json();
            console.log(json);
        
            let newProjects = JSON.parse(JSON.stringify(projects))
            //logic to edit in client side
            for (let index = 0; index < newProjects.length; index++) {
              const element = newProjects[index];
              if (element._id === id) {
                newProjects[index].title = title;
                newProjects[index].description = description;
                newProjects[index].link = link;
                break;
              } 
            }
            setProject(newProjects);
          }

          const editIntroduction = async (id, description) => {
            //API call
            const response = await fetch(`${host}/api/introduction/update/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ description }) 
            });
        
            const json = await response.json();
            console.log(json);
        
            let newIntroductions = JSON.parse(JSON.stringify(introductions))
            //logic to edit in client side
            for (let index = 0; index < newIntroductions.length; index++) {
              const element = newIntroductions[index];
              if (element._id === id) {
                newIntroductions[index].description = description;
                break;
              } 
            }
            setIntroduction(newIntroductions);
          }

  return (
    <userContext.Provider value={{ users, courses, publications, projects,introductions, addUser,addCourse, addPublication, addProject, deleteUser, deleteCourse, deletePublication,deleteProject, editUser, editCourse,editPublication,editProject,editIntroduction, getUsers,getCourses, getPublications, getProjects,getIntroductions }}>
      {props.children}
    </userContext.Provider>
  )
}


export default UserState;