import {Field, Form, Formik} from "formik";
import CustomInput from "../Components/CustomInput";
import * as yup from "yup";
import React from 'react';
import axios from 'axios';
import Thumb from "../Components/Thumb";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import CustomSelect from "../Components/CustomSelect";
import CustomCheckbox from "../Components/CustomCheckbox";

const AddSubcategory = () => {
    const FILE_SIZE = 1024*1024*100;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    let navigate = useNavigate();
    const [serverState, SetServerState] = useState('');
    const HandleServerResponse = (ok, Msg) => {
        SetServerState({ok, Msg});
      };

    //validation
    const subcategorySchema = yup.object().shape({
        name: yup.string().required(),

        image: yup.mixed().required(),
        // .test("FILE_SIZE", "Uploaded file is too big.", 
        // value => !value || (value && value.size <= FILE_SIZE))
        // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
        // value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),

        category:yup.string().oneOf(["Furniture","Arts Crafts & Serving","Décor","Bedding","Bath",
        "Vacuums & Floor Care","Kitchen & Dining","Heating Cooling & Air Quality","Storage & Organization"]),

        isActive: yup.boolean()
    })

//    //handle submit
//    const onSubmit = (values, actions) => {
//     axios({
//       method: "POST",
//       url: "http://localhost:4000//api/admin/subcategory/add",
//       headers: {
//         "x-access-token": localStorage.getItem("token"),
//     },
//       data: values})
//     .then(response=>{
//         actions.setSubmitting(false);
//         actions.resetForm();
//         HandleServerResponse(true, "Thanks!");
//         navigate("/login");
//     })
//     .catch(error => {
//         actions.setSubmitting(false);
//         HandleServerResponse(false, Error.response.data.error);
       
//     });
//   };


  return (
    <Formik initialValues = {{
                name: "",
                image: null,
                category: "",
                isActive: false,
            }}
            validationSchema = {subcategorySchema}
            onSubmit={(values, actions) => {
               
                setTimeout(() => {
                    console.log(JSON.stringify({ 
                        name: values.name,
                        category: values.category,
                        isActive: values.isActive,
                        fileName: values.image.name, 
                        type: values.image.type,
                        size: `${values.image.size} bytes`
                      }, null, 2));
                    
                }, 1000);
                
                actions.resetForm();
            }}
            
    >
        {({isSubmitting, values, handleSubmit, setFieldValue}) => (
            <Form onSubmit={handleSubmit}>
                <label>Upload Image</label>
                <input name="image" type="file" accept='image/*' 
                onChange={(event) => {setFieldValue("image", event.currentTarget.files[0]);
                }} />

                <Thumb file={values.image} />


                <CustomInput
                    label = "Subcategory Name"
                    name = "name"
                    type = "text"
                    placeholder = "Enter subcategory name"
                    //...props are all from name to placeholder all other adding sources
                    />
               
                <CustomSelect
                    label = "Category"
                    name = "category">
                        <option value ="Furniture">Furniture</option>
                        <option value ="Arts Crafts &amp; Serving">Arts Crafts &amp; Serving</option>
                        <option value ="Décor">Décor</option>
                        <option value ="Vacuums &amp; Floor Care">Vacuums &amp; Floor Care</option>
                        <option value ="Bedding">Bedding</option>
                        <option value ="Kitchen &amp; Dining">Kitchen &amp; Dining</option>
                        <option value ="Bath">Bath</option>
                        <option value ="Heating Cooling &amp; Air Quality">Heating Cooling &amp; Air Quality</option>
                        <option value ="Storage &amp; Organization">Storage &amp; Organization</option>
                    </CustomSelect>

                    <CustomCheckbox type="checkbox" name ="isActive"/>
                    
                <button disable = {isSubmitting} type ="submit">AddSubcategory</button>


            </Form>
        )}


    </Formik>
  )
}

export default AddSubcategory
