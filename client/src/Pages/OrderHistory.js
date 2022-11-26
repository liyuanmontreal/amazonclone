import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import { Link } from "react-router-dom"



function OrderHistory() {
  const [orderList, setOrderList] = useState([]);

 

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/order", {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      })
      .then((response) => {
        setOrderList(response.data);
        
        // console.log(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="sub">
      {/* order history */}
      <h1>Order History</h1>
      <table className="table  table-striped table-bordered border border-5 my-5" id="todos-table">
                <thead className="text-center">
                <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Paid At</th>
                </tr>
                </thead>
                <tbody>
                    {orderList.map((item) => (
                        <tr key={item._id}>                        
                            <td>{item._id}</td>
                            <td>${item.amount}</td>
                            <td>{item.paidAt}</td>                                                 
                        </tr>
                    ))}
                </tbody>
            </table>   
            <Link to="/">Continue Shopping</Link>   
    </div>
  );
}

export default OrderHistory;
