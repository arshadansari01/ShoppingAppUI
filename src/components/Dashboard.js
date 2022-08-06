import React, { useEffect, useState } from "react";
import { fetchUserId } from "../util/ApplicationUtil";
import './Cart.css';

function Dashboard() {
    const cartItems = [];
    const [orders, setOrders] = useState([]);
    useEffect(function () {
        fetch("http://localhost:9000/order/getOrder?userId=" + fetchUserId())
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setOrders(jsonResponse);
                console.log(jsonResponse)
            })
    }, [])

    function logout() {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }


    return <React.Fragment>
        <div className="orderPage">
            <div className="orderPageHeader">
                <div> <h1>My Orders</h1></div>
                <div className="logout">
                    <input className="button" type="button" value="Logout" onClick={logout} />
                </div>

            </div>
            <div className="cartPage">
                <div className="cartItems">
                    {
                        orders.map(order => {
                            return <div className="cartItem">


                                <div >
                                    <label ><b>OrderId: {order.orderId} </b></label>
                                </div>
                                <div >
                                    <label><b> Total Amount Paid: Rs. {order.orderTotal}</b> </label>
                                </div>



                                {
                                    order.orderItems.map(item => {
                                        return <div className="CartDetails">
                                            <div className="PicAlign">
                                                <img className='pic' src={item.imageUrl} />
                                            </div>
                                            <div className="ProductName">
                                                <label >{item.name}</label>
                                            </div>
                                            <div className="Price">
                                                <label>     Price: Rs. {item.price} </label>
                                            </div>
                                            <div className="Price">
                                                <label>     Quantity: 1 </label>
                                            </div>
                                        </div>
                                    })
                                }


                            </div>

                        })
                    }
                </div>


            </div>
        </div>

    </React.Fragment >



}

export default Dashboard;

