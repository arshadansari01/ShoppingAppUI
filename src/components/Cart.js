import React, { useEffect, useState } from "react";
import { fetchUserId } from "../util/ApplicationUtil";
import './Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    useEffect(function () {
        fetch("http://localhost:9000/cart/getCart?userId=" + fetchUserId())
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setCartItems(jsonResponse.cartItems);
                setCartTotal(jsonResponse.cartTotal);
                console.log(jsonResponse.cartTotal)
            })
    }, [])


    function deleteCartLine(productId) {
        fetch("http://localhost:9000/cart/deleteCartLine?userId=" + fetchUserId() + "&productId=" + productId)
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setCartItems(jsonResponse.cartItems);
                setCartTotal(jsonResponse.cartTotal);
                console.log(jsonResponse.cartTotal)
            })
    }

    function increment(productId) {
        fetch("http://localhost:9000/cart/incrementQuantity?userId=" + fetchUserId() + "&productId=" + productId)
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setCartItems(jsonResponse.cartItems);
                setCartTotal(jsonResponse.cartTotal);
                console.log(jsonResponse.cartTotal)
            })

    }

    function decrement(productId) {
        fetch("http://localhost:9000/cart/decrementQuantity?userId=" + fetchUserId() + "&productId=" + productId)
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setCartItems(jsonResponse.cartItems);
                setCartTotal(jsonResponse.cartTotal);
                console.log(jsonResponse.cartTotal)
            })
    }

    function openShipmentPage() {
        window.location.href = '/shipment'
    }

    return <React.Fragment>
        <div className="cartPageHeader"><h1>My Cart</h1></div>
        <div className="cartPage">
            <div className="cartItems">

                {
                    cartItems.length > 0 ?
                        cartItems.map(cartItem => {
                            return <div className="cartItem">





                                <div className="CartDetails">
                                    <div className="PicAlign">
                                        <img className='pic' src={cartItem.imageUrl} />
                                    </div>
                                    <div className="ProductName">
                                        <label > {cartItem.name}</label>
                                    </div>
                                    <div className="Price">
                                        <label>{cartItem.price} </label>
                                    </div>
                                    <div className="Buttons">
                                        <input className='QuantityUpdater' type="button" onClick={() => { decrement(cartItem.productId) }} value="-" />

                                        <input className="Quantity" type="number" value={cartItem.quantity} />
                                        <input className='QuantityUpdater' type="button" onClick={() => { increment(cartItem.productId) }} value="+" />
                                    </div>


                                </div>
                                <div className="DeleteButtonContainer">
                                    <input className="DeleteButton" type="button" value="Delete Item" onClick={() => { deleteCartLine(cartItem.productId) }} />
                                </div>


                            </div >
                        })
                        :
                        <div className="empty-cart">Your cart is empty!</div>
                }

            </div>


            {cartItems.length > 0 && <div className="PlaceOrder">

                <div className="OrderDetails">
                    <label>PRICE DETAILS</label>

                    <label>Price ({cartItems.length} items)   <span>Rs. {cartTotal} </span></label>
                    <label> Delivery Charges   <span className="deliveryCost"> FREE </span> </label>
                    <label><b>Total Amount <span>  Rs. {cartTotal} </span></b></label>

                </div>


                <input className="button PlaceOrderButton" type="button" value="Place Order" onClick={openShipmentPage} />



            </div>
            }
        </div>


    </React.Fragment >



}

export default Cart;

