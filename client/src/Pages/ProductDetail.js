import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from "react-router-dom";
import { useNavigate, useParams} from 'react-router-dom';
import axios from "axios";



function ProductDetail() {
    let navigate = useNavigate();
    const {id} = useParams();

    

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");

    const [categoryNumber, setCategoryNumber] = useState("");
   
    useEffect (()=>{
        axios.get(`http://localhost:4000/api/product/${id}`,{
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
            withCredentials: true
          })
        .then((response)=>{
            console.log(response.data);
            setProduct(response.data);
            localStorage.setItem("amount", JSON.stringify(response.data.price))
        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);

    

    const getCategoryName = ({categoryNumber})=>{
        axios.get(`http://localhost:4000//api/category/${categoryNumber}`,{
           
          })
        .then((response)=>{
            console.log(response);
            setProduct(response.data);
           
            console.log(product)
        }).catch((error)=>{
            console.log(error);
        });
    }


    return (
        <div className='product'>
            <div>
                <img className='shopping' alt="shopping" src={require('../images/shopping.png')} />
            </div>
            <div className="detail">
                <div className="">
                    <div className="row r1">
                        <div className="col-md-9 abc">
                            <h1>{product.name}</h1>
                        </div>                    
                    </div>
                </div>
                <div className="container-body mt-4">
                    <div className="row r3">
                        <div className="col-md-5 p-0 klo">
                            <ul>
                                <li>category:{product.categoryNumber}</li>
                                <li>Free Shipping</li>
                                <li>Easy Returns</li>
                                <li>Brand: {product.brand}</li>
                                <li>Price: {product.price}</li>
                                <li>Discription: {product.description} </li>
                            </ul>
                        </div>
                        <div className="col-md-7"> 
                            <img src={product.image} width="50%" height="50%" />
                        </div>
                    </div>
                </div>
                <div className="footer d-flex flex-column mt-5">
                    <div className="row r4">
                        <div className="col-md-2 mio offset-md-2">
                            <a href="#">ADD TO WISHLIST</a>
                        </div>  
                        <div className="col-md-2 mio offset-md-1">
                            <a href="#">ADD TO CART</a>
                        </div>
                        <div className="col-md-2 myt offset-md-1">
                            <button type="button" className="btn btn-outline-warning">
                                <Link to={'/payment'}>BUY NOW</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;