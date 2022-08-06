import React, { useEffect, useState } from "react";
import './Cart.css';

function Shipment() {
function openPaymentPage(){
window.location.href='/payment';

}

    return <React.Fragment>
        <div className="paymentPageHeader"><h1>Shipment Details</h1></div>
        <div className="PaymentSection">

            <input className="input-box" type="text" placeholder="Name" />
            <input className="input-box" type="number" placeholder="10-digit Mobile Number" />
            <input className="input-box" type="text" placeholder="Pincode" />
            <input className="input-box" type="text" placeholder="Locality" />
            <input className="input-box" type="text" placeholder="Address(Area and Street)" />
            <input className="input-box" type="text" placeholder="City" />
            <input className="input-box" type="text" placeholder="State" />
            
            <input className="paymentButton" type="button" value="SAVE AND DELIVER HERE" onClick={openPaymentPage} />



        </div>


    </React.Fragment >



}

export default Shipment;

