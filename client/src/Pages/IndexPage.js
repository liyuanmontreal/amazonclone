import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from "react-router-dom";
import axios from "axios";

function IndexPage() {

    const [categoryList, setCategoryList] = useState([]);
    const [term, setTerm] = useState("");

    useEffect(() => {
        axios
        .get("http://localhost:4000/api/category/list",term, {
            headers: {
                "Access-Control-Allow-Headers": "*"
              },
        })
        .then((response) => {
        //  const categories = response?.data;
        //  console.log(categories);
          setCategoryList(response?.data);
         console.log(categoryList);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    


    const getSearch =()=>{
        axios
        .get("http://localhost:4000/api/search",  {
           
        })
        .then((response) => {
        //  const categories = response?.data;
        //  console.log(categories);
          setCategoryList(response?.data);
         console.log(categoryList);
          
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
    
    const handleKeyUp =(e)=>{
        if(e.key ==='Enter'){
            e.preventDefault();
            e.stopPropagation();
            getSearch();
        }
    }

    

    return (
   
        <div className='home'>
            <div className ="form-outline">
            <input className="form-control" id="form1" type="search" placeholder="Search here..." aria-label="Search" onChange ={(e)=>{setTerm(e.target.value);}}
            onKeyUp={handleKeyUp} />
            </div>
            <div className="hometext bg-info">
                <div className="text-center text-white">
                    <h1 className=" fw-bolder">father's day</h1>
                    <p className="lead fw-normal text-white-50 ">Shop now</p>
                </div>
            </div>
            <div className='homegrid'>
            {categoryList.map((category) => (
                <a href = {'/product/category/'+ category.categoryNumber} className='grid' key = {category.categoryNumber}>
                    <img className='photos' src={category.image} alt={category.name} />
                </a>
))}
                           
            </div>      
            
        </div>
    );
}

export default IndexPage;