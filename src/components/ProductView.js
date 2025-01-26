import React, { useState } from 'react';
import { fetchUserId, generateHeaders } from '../util/ApplicationUtil';
import './ProductView.css'
import AddProducts from './ui/AddProducts';
import { deleteProduct } from '../util/globalUrl';


function ProductView(props) {
    const { url, name, price, ratings, categoryName, productId, setProducts } = props;

    const [showPopUp, setShowPopUp] = useState("hidden-popup");
    // updatting the show popup value as per the props value provided
    function redirectUpdatePage() {
        setShowPopUp("showPopUp");
    }

    function closePopup() {
        setShowPopUp("hidden-popup");
    }

    async function deleteSelectedProduct() {
        const response = await fetch(deleteProduct + '?id=' + productId, generateHeaders("DELETE"))
        if (response.status === 204) {
            setProducts((initialProduct)=> initialProduct.filter(item => item.productId !== productId));
            alert("Product Deleted Successfully");
        }
    }

    function redirectCartPage() {
        const body = {
            "userId": fetchUserId(),
            "cartItems": [{
                "name": name,
                "price": price,
                "quantity": 1,
                "imageUrl": url,
                "productRating": ratings,
                "brandName": props.brandName,
                "productId": productId
            }]

        }
        fetch("http://localhost:9000/cart/addtocart", {
            "method": "POST",
            "body": JSON.stringify(body),
            "headers": {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}`, // Add the token here,

            }
        })
            .then(function (response) {
                return response.status;
            })
            .then(function (data) {
                alert("Item added");
                console.log(data);

            })
        //window.location.href = "/cart";


    }

    return (
        <React.Fragment>
            <div className={showPopUp} >

                <AddProducts productId={productId} name={name} url={url} price={price} ratings={ratings} buttonName="Update"
                    categoryName={categoryName} closePopup={closePopup} setProducts={setProducts} />

            </div>


            <div className='productContainer'>
                <img className='productImage' src={url} />
                <div className='productDescription' >
                    <label>{name}</label>
                    <label>Price : {price}</label>
                    <label>Ratings {ratings}</label>
                </div>

                <div className='p-7'>
                    <button type="button" className="addtoCartButton btn btn-outline-primary" onClick={redirectCartPage}>Add to Cart</button>
                </div>

                <div className='updateDeleteContainer'>
                    <button className='updateDeleteButton btn btn-secondary' type="button" onClick={redirectUpdatePage}> Update </button>
                    <button className='updateDeleteButton btn btn-danger' type="button" onClick={deleteSelectedProduct}> Delete </button>

                </div>

            </div>


        </React.Fragment>
    )
}

export default ProductView;