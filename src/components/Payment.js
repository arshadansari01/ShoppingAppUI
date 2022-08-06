import React, { useEffect, useState } from "react";
import { fetchUserId } from "../util/ApplicationUtil";
import './Cart.css';

function Payment() {

    function orderPlaced(){
        fetch("http://localhost:9000/order/createOrder?userId=" + fetchUserId(), {
            "method": "POST"
        })
            .then(function (response) { return response.text() })
            .then(function (data) {
                alert("Your order is placed successfully");
                window.location.href='/';
            })
    }

    return <React.Fragment>
        <div className="paymentPageHeader"><h1>Payment Details</h1></div>
        <div className="PaymentSection">

            <input className="input-box" type="text" placeholder="Enter Card Number" />
            <div className="cardExpiry">
            <input className="input-box" type="text" placeholder="MM" />    
            <input className="input-box" type="text" placeholder="YY" />
            <input className="input-box" type="password" placeholder="CVV" />

            </div>
            <input className="paymentButton" type="button" value="PAY" onClick={orderPlaced} />



        </div>


    </React.Fragment >



}

export default Payment;

