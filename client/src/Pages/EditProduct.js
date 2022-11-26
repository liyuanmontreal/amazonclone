import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../App.css"
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';

function EditArticle(){
    console.log("`Restarting edit article")
    let navigate = useNavigate();
    const params = useParams();
    console.log(params.id);

    const [product, setProduct] = useState("");
    const [categoryNumber, setCategoryNumber] = useState("");

    const initialValues = {
      name: "",
      description: "",
      image: "",
      brand: "",
      category: "",
      subcategory: "",
      stock: 0,
      price: 0.0,
      isActive: false,
    };
        const [formValues, setFormValues] = useState(initialValues);
        const [formErrors, setFormErrors] = useState({});
        const [isSubmit, setIsSubmit] = useState(false);

    useEffect (()=>{
         console.log("In First UIse Effect going to get the product")
        axios.get(`http://localhost:4000/api/product/${params.id}`,{
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
            withCredentials: true
          })
        .then((response)=>{
            setProduct(response.data);
            setFormValues(response.data);
            const number = response?.data?.categoryNumber;
            setCategoryNumber(number);
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

     useEffect (()=>{
         console.log("in use effect of formerrors and issubmit with values of ", formErrors , isSubmit)
         console.log("putting the values", formErrors.error === false, isSubmit)
            if(formErrors.error === false && isSubmit && localStorage.getItem("accessToken")){

                axios.put(`http://localhost:4000/api/admin/product/edit/${params.id}`, formValues, {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
                    withCredentials: true
                })
                .then(()=>{

                    var successMessage = document.getElementById('successAlert');
                    successMessage.style.display = 'block';
                    // navigate("/");
                })
                .catch((error)=>{
                    var fail = document.getElementById('failAlert');
                    var failMsg = document.getElementById('failAlertMsg');

                    failMsg.innerText = error.response.data;
                    fail.style.display = 'block';
                });
            }
        }, [formErrors, isSubmit]);

    const handleChange = (e) => {
        console.log("HandleChange with e = ", e)
            const { name, value} = e.target;
            setFormValues({ ...formValues, [name]: value });
        };

    const handleSubmit = (e) => {
        console.log("ion handle submit with e = ", e)
            e.preventDefault();
            closeFailAlert();
            closeSuccessAlert();
            const formValidation = validateForm(formValues);
            setFormErrors(formValidation);
            if(localStorage.getItem("accessToken")){
                console.log("Setting issubmit")
                setIsSubmit(true);
            }
            else {
                navigate("/login");
            }
        };

    const closeSuccessAlert = () => {
        console.log("CLose success alert")
        var successMessage = document.getElementById('successAlert');
        successMessage.style.display = 'none';
    }
    const closeFailAlert = () => {
        console.log("CLose fail alert")
        var failMessage = document.getElementById('failAlert');
        failMessage.style.display = 'none';
    }

    const validateForm = (values) => {
                const errors = {}
                errors.error = false
                if (!values.name){
                    errors.name = "Name is required";
                    errors.error = true
                }

                if (!values.description){
                    errors.description = "description cannot be emptied"
                    errors.error = true
                }
                if (!values.brand){
                    errors.brand = "brand cannot be emptied"
                    errors.error = true
                }
                return errors;
            };


    return (
      <div className="createPostPage">

            <h1 className='text-center'>Modify Product</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <label>Product Name: </label>
            <input
              id="inputAddProduct"
              name="name"
              defaultValue={product.name}
              placeholder="(Ex. Name...)"
              onChange={handleChange}
            />
            <label>Description: </label>
            <input
              id="inputAddProduct"
              name="description"
              defaultValue={product.description}
              placeholder="(Ex. Product Des...)"
              onChange={handleChange}
            />

            <label>Image: </label>
            <input
              id="inputAddProduct"
              name="productImage"
              defaultValue={product.image}
              onChange={handleChange}
            />

            <label>Brand: </label>
            <input
              id="inputAddProduct"
              name="brand"
              defaultValue={product.brand}
              placeholder="(Ex. Brand...)"
              onChange={handleChange}
            />

            <label>Category: </label>
            <select
              id="inputAddProduct"
              name="category"
              defaultValue={product.categoryNumber}
              onChange={handleChange}
              as = "select">
                          <option value ="Furniture">Furniture</option>
                          <option value ="Arts Crafts &amp; Serving">Arts Crafts &amp; Serving</option>
                          <option value ="Décor">Décor</option>
                          <option value ="Vacuums &amp; Floor Care">Vacuums &amp; Floor Care</option>
                          <option value ="Bedding">Bedding</option>
                          <option value ="Kitchen &amp; Dining">Kitchen &amp; Dining</option>
                          <option value ="Bath">Bath</option>
                          <option value ="Heating Cooling &amp; Air Quality">Heating Cooling &amp; Air Quality</option>
                          <option value ="Storage &amp; Organization">Storage &amp; Organization</option>
              </select>

            <label>SubCategory: </label>
            <input
              id="inputAddProduct"
              name="subCategory"
              defaultValue={product.setCategoryNumber}
              placeholder="(Ex. Sub Category...)"
              onChange={handleChange}
            />

            <label>Stock: </label>
            <input
              id="inputAddProduct"
              name="stock"
              defaultValue={product.stock}
              placeholder="(Ex. Stock...)"
              onChange={handleChange}
            />

            <label>Price: </label>
            <input
              id="inputAddProduct"
              name="price"
              defaultValue={product.price}
              placeholder="(Ex. Price...)"
              outputFormat="number"
              onChange={handleChange}
            />

            <button  type="submit">Edit product</button>
            <a href="/admin/ProductList" className="btn btn-primary text-center my-3 mx-1" type="submit">Back to List</a>
          </form>

      </div>
    );
}

export default EditArticle;