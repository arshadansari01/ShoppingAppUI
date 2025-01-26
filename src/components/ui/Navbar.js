
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import AddProducts  from "./AddProducts";

export default function Navbar(props) {
    const setProducts = props.setProducts;
    const navigate = useNavigate();
    const [searchtext, setSearchText] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [showPopUp, setShowPopUp] = useState("hidden-popup");


    useEffect(() => {
        const username = localStorage.getItem("username");
        const authToken = localStorage.getItem("auth-token");
        console.log(authToken, "aaaaaaaaaaaaaa")
        if (!!username && !!authToken) {
            findUserByUsername(username, authToken);
            // fetchProductByUserInput();
            console.log(currentUser, "Ccccccccccccccccccc")
        }
    }, []);


    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={homePage}>MyShopingKart</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <form className="d-flex searchbar">
                            <input className="form-control me-2" type="search" value={searchtext} onKeyDown={fetchProduct} onChange={handleSearchInput} placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" onClick={fetchProductByUserInput}>Search</button>
                        </form>


                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                {
                                    currentUser.firstName != undefined ? <div className="cart">   <svg width="25" height="25" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" ></path></svg>
                                        <button className="nav-link active" aria-current="page" onClick={openCartPage}>Cart</button> </div> : ''
                                }

                            </li>
                            {/*  show add products  */}
                            <li className="nav-item">
                                {
                                    currentUser.username == 'stark' ?
                                        <div className="add-item">
                                            <button className="nav-link active" aria-current="page" onClick={openAddProductPage}>Add Products</button>
                                        </div> : ''
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    currentUser.firstName != undefined ? <div className="username" onClick={openDashBoard}> Hi {currentUser.firstName}</div> :
                                        <button className="btn btn-secondary" type="submit" onClick={openLoginForm} >Sign In</button>
                                }

                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className={showPopUp} >

            <AddProducts closePopup={setShowPopUp} setProducts={setProducts}/>

            </div>
        </>
    )



    function handleSearchInput(event) {
        const keypressedvalue = event.target.value;
        setSearchText(keypressedvalue);
        // alert(event.target.value  )
    }

    async function findUserByUsername(username, authToken) {
        const response = await fetch("http://localhost:9000/api/user/getUserDetail/" + username, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, // Add the token here,

            }
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data);
        }
        else {
            console.log("error found in api ", response)
        }


    }

    function fetchProductByUserInput() {
        fetch("http://localhost:9000/product?name=" + searchtext)
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setProducts(jsonResponse);
            })
    }




    function fetchProduct(event) {
        if (event.key == 'Enter') {
            fetchProductByUserInput();
        }
    }



    function openLoginForm() {
        navigate('/login');
    }

    function openCartPage() {
        navigate('/cart');

    }
    function openDashBoard() {
        navigate("/dashboard");

    }
    function homePage() {
        navigate('/')
    }
    function openAddProductPage() {
        setShowPopUp('showPopUp');
    }
}
