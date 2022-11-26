import React from "react";
import { Link } from "react-router-dom"
import { useEffect} from "react";
import axios from "axios";

const Success = () => {

  useEffect(() => {
    const sum = JSON.parse(localStorage.getItem("amount"));
    const data = { "amount": sum };
    console.log(data);
    axios
      .post("http://localhost:4000/api/order/create",data, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
        withCredentials: false,
      })
      .then((response) => {        
        console.log("success");
        localStorage.removeItem("amount");
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("amount");
      });
  }, []);
  
  return (
    <div> 
        <div> 
          <p>Your Payment success.</p>    
          <Link to="/">Continue Shopping</Link>          
        </div>
        <div> 
            <Link to="/orderhistory">View Order History</Link>   
        </div>
     </div>
  )
}

export default Success
