import React from 'react'

import {Form, Button,Row, Col, Toast, ToastContainer} from'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect,useRef } from 'react';
import axios from "axios";

const Profile = () => {
  let navigate = useNavigate();
  const {id} = useParams();

  const initialValues = {
    firstName:"",
    lastName:"",
    address:"",
    city:"",
    province:"",
    postalCode:"",
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [errMsg, setErrMsg] = useState({});
  const errRef = useRef();
  const sucRef = useRef();
  const [sucMsg, setSucMsg] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userPro, setUserPro] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userid, setId] = useState({id});

  useEffect (()=>{
    axios.get(`http://localhost:4000/api/user/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      })
      .then((response)=>{
        console.log(response.data)
        setUserPro(response?.data);
      })
      .catch((err)=>{
        console.log(err)
      })
  },[]);

  useEffect (()=>{
    const user =JSON.parse(localStorage.getItem("user"));
    if(user?.firstName){
      setUserFirstName(user?.firstName);
    }else{
      setUserFirstName(null);
    } 
  }, []);

    const handleSaveProfile =(e) =>{
      e.preventDefault();
      console.log(userid)
      axios.put(`http://localhost:4000/api/admin/user/edit/info/${id}`,formValues, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      })
      .then(()=>{
        setUserPro({formValues})
        setSucMsg("You changed successfully")
        setShow(true)
      })
      .catch((err)=>{
        console.log(err);
        setErrMsg("Oops, something wrong")
        setShow(true)
      })
    }


    const handleChange = (e) => {
      const { name, value} = e.target;
      setFormValues({ ...formValues, [name]: value });
  };


  return (
    <>
    <div>
    {show ? (
        <Toast
            className="d-inline-block m-1"
            bg="info"
            position="top-center"
            onClose={() => setShow(false)}
            delay={5000}
            show={show}
            autohide
          >
            <Toast.Body ref={sucRef} aria-live="assertive">
              {" "}
              {sucMsg}{" "}
            </Toast.Body>
          </Toast>
       
      ) : (
        <p></p>
      )}
    </div>
    
    
  <Form className="profileForm">
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" name = "firstName" placeholder={userPro.username} value ={formValues.firstName} onChange ={handleChange}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Last Name</Form.Label>
      <Form.Control name ="lastName" type="text" placeholder={userPro.lastName} value ={formValues.lastName} onChange ={handleChange}/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control as = "textarea" name="address" rows= {2} placeholder={userPro.address} value ={formValues.address} onChange ={handleChange}/>
  </Form.Group>


  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control type ="text" name="city" placeholder = {userPro.city} value ={formValues.city} onChange ={handleChange}  />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Province</Form.Label>
      <Form.Select defaultValue="Choose your province" name="province" value ={formValues.province} onChange = {handleChange}>
        <option>{userPro.province}</option>
        <option value = "British Columbia">British Columbia</option>
        <option>Alberta</option>
        <option>Saskatchewan</option>
        <option>Manitoba</option>
        <option>New Brunswick</option>
        <option>Nova Scotia</option>
        <option>Quebec</option>
        <option>Ontario</option>
        <option>P.E.I</option>
        <option>Newfoundland and Labrador</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Postal Code</Form.Label>
      <Form.Control type ="text" name="postalCode" placeholder ={userPro.postalCode} value ={formValues.postalCode} onChange ={handleChange}/>
    </Form.Group>
  </Row>
<Row>
  <Col>
  <Button variant="info" type="submit" size="lg" onClick={handleSaveProfile}>
    Save
  </Button>
  </Col>
</Row>
 
</Form>
</>
  )
}

export default Profile
