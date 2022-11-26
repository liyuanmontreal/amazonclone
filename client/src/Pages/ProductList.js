import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function ProductsList() {
  const [ProductsList, setProductsList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/product", {
        
      })
      .then((response) => {
        setProductsList(response.data);
        
        // console.log(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




  return (
    <div className="sub">
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Search here..."
          aria-label="Search"
        />
      </div>
      <div className="hometext bg-info">
        <div className="text-center text-white">
          <h1 className=" fw-bolder">Top seller!</h1>
          <p className="lead fw-normal text-white-50 ">
            Price and other details may vary based on product size and colour.
          </p>
        </div>
      </div>
      {/* product list */}
      <div className="productlist">
        <div className="row align-items-center">
        {ProductsList.map((pro) => (
          <div className="col-3" key={pro._id}>
            
              <div className="card w-75" >
                <img
                  className="card-img-top"
                  src={pro.image}
                  alt="product photo"
                />
                <div className="card-body p-4" key={pro._id}>
                  <div className="text-center">
                    <h5 className="fw-bolder">{pro.name}</h5>
                    {pro.price}
                    <p>
                      <span>Stock: </span>
                      {pro.stock}
                    </p>
                  </div>
                 
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center" >
                      <a href={"/product/"+pro._id} 
                        className="btn btn-outline-dark mt-auto">
                        View details 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
