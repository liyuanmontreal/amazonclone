import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Thumb from "../Components/Thumb";
import CustomCheckbox from "../Components/CustomCheckbox";
import CustomInput from "../Components/CustomInput";
import CustomSelect from "../Components/CustomSelect";
import UploadImage from "./UploadImage";


function AddProduct() {
  let navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState("");
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState("false");

  const initialValues = {
    name: "",
    brand: "",
    description: "",
    image: "",
    subcategoryNumber: "",
    categoryNumber: "",
    stock: 0,
    price: 0,
    isActive: false,
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("You must input a name!"),
    description: Yup.string().required(),
    image: Yup.string(),
    // need to change image type in database later
    brand: Yup.string().required(),
    subcategoryNumber: Yup.number(),
    categoryNumber: Yup.number(),
    stock: Yup.number().default(0).required(),
    price: Yup.number().required(),
    isActive: Yup.boolean().required(),
  });

  const onSubmit = (values, actions) => {
    
    axios
      .post("http://localhost:4000/api/admin/product/add", values, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        actions.resetForm();
        navigate("/admin/ProductList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
      <UploadImage/>
      </div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="formContainer">
          {/* 
                <label>Upload Image</label>
                <input name="image" type="file" accept='image/*' 
                onChange={(event) => {setFieldValue("image", event.currentTarget.files[0]);
                }} /> */}

          {/* <Thumb file={values.image} /> */}

          <Row>
            <Col>
              <CustomInput
                label="Product Name"
                name="name"
                type="text"
                placeholder="Enter Product name"
                //...props are all from name to placeholder all other adding sources
              />
            </Col>
            <Col>
              <CustomInput
                label="Brand Name"
                name="brand"
                type="text"
                placeholder="Enter Brand"
                //...props are all from name to placeholder all other adding sources
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Description"
                name="description"
                as="textarea"
                placeholder="Enter descrition"
                //...props are all from name to placeholder all other adding sources
              />
            </Col>
          </Row>

          <CustomInput
            label="Image url"
            name="image"
            type="text"
            placeholder="Enter image address"
            //...props are all from name to placeholder all other adding sources
          />

          <CustomSelect label="Sub Category" name="subcategoryNumber" value={values.subcategoryNumber}>
            <option value ="" label ="Select a sub Category">Select a Sub Category {""}</option>
            <option value="11">Bedroom Furniture</option>
            <option value="12">Dining Room Furniture</option>
            <option value="13">Home Office Furniture</option>
            <option value="21">Craft Supplies</option>
            <option value="22">Scrapbooking</option>
            <option value="23">
              Painting &amp; Drawing
            </option>
            <option value="41">Bath Towels</option>
            <option value="32">
              Duvet Covers &amp; Sets
            </option>
            <option value="63">
              Coffee Tea &amp; Espresso
            </option>
            <option value="31">Pillows</option>
            <option value="51">Vacuums</option>
            <option value="52">Vacuum Accessories</option>
          </CustomSelect>

          <CustomSelect label="Category" name="categoryNumber" value ={values.categoryNumber}>
          <option value ="" label ="Select a Category">Select a Category {""}</option>
            <option value="1">Furniture</option>
            <option value="2">Arts Crafts &amp; Serving</option>
            <option value="3">Bedding</option>
            <option value="4">Bath</option>
            
            <option value="5">
              Vacuums &amp; Floor Care
            </option>
            
            <option value="6">Kitchen &amp; Dining</option>
            <option value="7">
              Heating Cooling &amp; Air Quality
            </option>
            <option value="8">Décor</option>
            <option value="9">
              Storage &amp; Organization
            </option>
          </CustomSelect>

          <Row>
            <Col>
              <CustomInput
                label="Stock"
                name="stock"
                type="number"
                placeholder="Enter stock"
                //...props are all from name to placeholder all other adding sources
              />
            </Col>
            <Col>
              <CustomInput
                label="Price"
                name="price"
                placeholder="Enter Price"
                //...props are all from name to placeholder all other adding sources
              />
            </Col>
          </Row>

          <CustomCheckbox type="checkbox" name="isActive" />

          <button disable={isSubmitting} type="submit">
            Add Product
          </button>
        </Form>
      
      )}
    </Formik>
    </div>
  );
}

export default AddProduct;
