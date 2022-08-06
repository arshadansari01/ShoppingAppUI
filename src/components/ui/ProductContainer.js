
import React, { useState, useEffect } from 'react';
// import ProductView from './components/ProductView';
import { upload } from '@testing-library/user-event/dist/upload';
// import LoginForm from './components/ui/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from '../ProductView';
import './Home.css';
import '../Cart'
function ProductContainer({products=[]}) {

    return (
        <React.Fragment>
            

            {<div className='productListContainer'>
                {
                    (
                        products.map(function (product) {
                            return <ProductView url={product.imageUrl} name={product.name} productId={product.productId} brandName={product.brandName} price={product.price} ratings={product.ratings}> </ProductView>
                        }))


                }


            </div> }




        </React.Fragment>




    )

}

export default ProductContainer;
