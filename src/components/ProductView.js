import React, { isValidElement } from 'react';
import { fetchUserId } from '../util/ApplicationUtil';
import './ProductView.css'



function ProductView(props) {
    const { url, name, price, ratings } = props;

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
                "productId": props.productId
            }] 

        }             
        fetch("http://localhost:9000/cart/addtocart", {
            "method": "POST",
            "body": JSON.stringify(body),
            "headers": {
                'Content-Type': 'application/json'
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

            <div className='productContainer'>
                <img className='productImage' src={url} />
                <div className='productDescription' >
                    <label>{name}</label>
                    <label>Price : {price}</label>
                    <label>Ratings {ratings}</label>
                </div>

                <div className='addtoCartButtonContainer'>
                    <input className='addtoCartButton' type="button" onClick={redirectCartPage} value="Add to Cart" />


                </div>
            </div>



        </React.Fragment>
    )
}

export default ProductView;