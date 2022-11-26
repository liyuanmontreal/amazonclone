import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SubCategory() {
    const [SubCategoryList, setSubCatogeryList] = useState([])

    let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000//api/subcategory/:categoryNumber", {
        
      })
      .then((response) => {
        setSubCategoryList(response.data);
        
        console.log(ProductsList)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    return (
   
        <div className='sub'>
            <div>
                <input className="form-control" type="text" placeholder="Search here..." aria-label="Search" />
            </div>
            <div className="hometext bg-info">
                <div className="text-center text-white">
                    <h1 className=" fw-bolder">Best choice!</h1>
                    <p className="lead fw-normal text-white-50 ">Shop now</p>
                </div>
            </div>
            {/* sub category */}
            <div className='homegrid'>
            {SubCategoryList.map((sub)=> {
                <Link to='/product/furniture' className='grid'>
                    <img className='photos' src={sub.img} alt="furniture" />
                    <a>{sub.name}</a>
                </Link>
                
            })}
            <a>Here should have a row of 3 columns which will show the pictures and names of sub category from database; nothing for now</a>
            </div> 
            {/* brand */}
            <div className='brand'>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/ga.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/gap.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/hermes.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/jardan.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/lv.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/polo.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/rolex.png')} alt="GA" />
                </Link>
                <Link to='/product/:name' className='grid'>
                    <img className='brands' src={require('../images/un.png')} alt="GA" />
                </Link>
            </div>

        </div>
    );

}

export default SubCategory;