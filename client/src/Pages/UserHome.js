import { useNavigate, Link, useParams} from "react-router-dom";
import { useState, useEffect} from 'react';
import Profile from './Profile';
import axios from 'axios';

const UserHome = () => {

    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [roles, setRoles] = useState(null);
    const [username, setUsername] = useState("");
    const {id} = useParams();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        setIsAuth(false);
        navigate("/login")
      } else {
        setIsAuth(true);
      }
      
      if(!localStorage.getItem("roles")){
        setRoles(null);
      } else {
        setRoles(localStorage.getItem("roles"))
      }
  
      if (!localStorage.getItem("user")) {
        setUser(null);
      } else {
        setUser(localStorage.getItem("user"));
      }
    }, [isAuth, roles, user]);
  
    useEffect (()=>{
      const user =JSON.parse(localStorage.getItem("user"));
      setUsername(user?.username);
    }, []);
    
    // useEffect (()=>{
    //   axios.get(`http://localhost:4000/api/user/${id}`, {
    //       headers: {
    //         "x-access-token": localStorage.getItem("accessToken"),
    //       },
    //       withCredentials: true,
    //     })
    //     .then((response)=>{
    //       console.log(response.data)
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    // },[]);

    const logoutInUserHome = () => {
      setUser(null);
      setIsAuth(false);
      setRoles(null);
      localStorage.clear();
      navigate("/");
    }

    return (
      <>
        <section className="profilePage">
            <h1>Profile</h1>
            <br />
            <p>Welcome , {username} </p>
            <br />

            <Profile />
            
            
           
            <br />
            <Link to="/index">Go to the Index page</Link>
            <br/>
            <a href={"/user/edit/password/"+id}>Change password</a>
            <div className="flexGrow">
                <button onClick={logoutInUserHome}>Sign out</button>
            </div>
            
        </section>
       
        </>
    )
}

export default UserHome