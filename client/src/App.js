
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import UserHome from './Pages/UserHome';
import Layout from './Components/Layout';
import SellerHome from './Pages/SellerHome';
import Admin from './Pages/Admin';
import PageNotFound from './Pages/PageNotFound';
import Unauthorized from './Pages/Unauthorized';
import IndexPage from './Pages/IndexPage';

import AddSubcategory from './Pages/AddSubcategory';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import "./App.css";
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import AddProduct from './Pages/AddProduct';
import NavBar from './Components/Navbar';
import ProductsList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import CategoryProducts from './Pages/CategoryProducts';
import SubCategoryProducts from './Pages/SubCategoryProducts';
import Success from './Pages/Success';
import Payment from './Pages/Payment';
import OrderHistory from './Pages/OrderHistory';
import { UserContext, RoleContext, IsAuthContext } from "./context/UserContext";
import AdminProductList from './Pages/AdminProductList';
import EditProduct from './Pages/EditProduct';
import UploadImage from './Pages/UploadImage';
import ChangePassword from './Pages/ChangePassword';

import TestApp from './Components/TestApp';


function App() {
  const ROLES = {
    'User': 'ROLE_USER',
    'Seller': 'ROLE_SELLER',
    'Admin': 'ROLE_ADMIN'
  }
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [roles, setRoles] = useState(null);


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
    
    if(!localStorage.getItem("roles")){
      setRoles(null);
    } else {
      setRoles(localStorage.getItem("roles"))
    }

    if (!localStorage.getItem("user")) {
      setUser(null);
    } else {
      setUser(localStorage.getItem("user"));
    }
  }, [isAuth, roles, user]);

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setRoles(null);
    localStorage.clear();
  }
  
  return (
    <>
   

   <IsAuthContext.Provider value={{isAuth, setIsAuth}}>
        <UserContext.Provider value={{user, setUser}}>
          <RoleContext.Provider value={{roles, setRoles}}>
   
    <Routes>
      
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        
        <Route index element = {<IndexPage/>}/>
        <Route path="test" element={<TestApp/>}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="index" element={<IndexPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="productsList" element={<ProductsList/>}/>
        <Route path="product/:id" element={<ProductDetail/>}/>
        <Route path="product/category/:categoryNumber" element ={<CategoryProducts/>} />
        <Route path="product/subcategory/:categoryNumber/:subcategoryNumber" element = {<SubCategoryProducts/>}/>
        {/* we want to protect these routes */}
        <Route path ="user/:id" element={(isAuth)? <UserHome/> : <Login/>}/>
        <Route path="uploadImage" element={(isAuth)? <UploadImage/> : <Login/>}/>

        <Route path="payment" element={(isAuth)? <Payment/> :<Login/>}/>
        <Route path="success" element={(isAuth)? <Success/> :<Login/>} />
        <Route path="orderhistory" element={(isAuth)? <OrderHistory/> :<Login/>} />
        <Route path ="user/edit/password/:id" element={(isAuth)? <ChangePassword/> : <Login/>}/>
        
        <Route path ="seller" element={(isAuth && roles === '["ROLE_SELLER"]')? <SellerHome/> : <Login/>}/>

        
        <Route path ="admin" element={(isAuth && roles === '["ROLE_ADMIN"]')? <Admin /> : <Unauthorized/>}/>
        <Route path ="admin/ProductList" element={(isAuth && roles === '["ROLE_ADMIN"]')? <AdminProductList /> : <Unauthorized/>}/>
        <Route path="addSubcategory"  element={(isAuth && roles === '["ROLE_ADMIN"]')? <AddSubcategory /> : <Unauthorized/>}/>
        <Route path="addProduct" element={(isAuth && roles === '["ROLE_ADMIN"]')? <AddProduct/>: <Unauthorized/>}/>
        <Route path="editProduct/:id" element={(isAuth && roles === '["ROLE_ADMIN"]')? <EditProduct />: <Unauthorized/>}/>
        
        

      

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </RoleContext.Provider>
      </UserContext.Provider>
        </IsAuthContext.Provider>
    </>
  );
}

export default App;
