import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, Link, useParams} from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {id} = useParams()
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);


  const changePassword = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/api/admin/user/edit/password/${id}`,
        {
          oldPassword: oldPassword,
          password: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response)

      })
      .catch((error)=>{
        console.log(error)
      })
  };

  return (
    <div>
      <form>
      <h2>Change Your Password</h2>
      
      <input
        type="text"
        placeholder="Old Password..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="New Password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}> Save Changes</button>
      </form>
    </div>
  );
}

export default ChangePassword;