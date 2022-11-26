import { Outlet } from "react-router-dom"
import Navbar from './Navbar';
import Footer from './Footer';
import NavSide from './NavSide';
import { useState, useEffect, useContext } from 'react';


const Layout = () => {

    

    return (
        <>
        <Navbar/>
        <div className="mainpart">
            <NavSide />
            <Outlet />
           
        </div>
        <Footer />
        </>
    )
}

export default Layout