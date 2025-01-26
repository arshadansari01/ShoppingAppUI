
import React, { useEffect, useState } from 'react';
import ProductView from '../ProductView';
import './Home.css';
import '../Cart'
import Navbar from './Navbar';
import { getAllProducts } from '../../util/globalUrl';
import { generateHeaders } from '../../util/ApplicationUtil';
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const response = await fetch(getAllProducts+'?name= ', generateHeaders('GET'));
        if (response.ok) {
            const result = await response.json();
            console.log(result, "Res");
            setProducts(result);
        }
    }, [])

    function removeQuote(input) {
        if ((input.startsWith('"') || input.startsWith("'")) && (input.endsWith('"') || input.endsWith('"'))) {

        }
    }


    return (
        <React.Fragment>
            <Navbar setProducts={setProducts} />
            {/* <div className='header'>
                <div className='searchbox'>
                    <input className="input-box" value={searchtext} onKeyDown={fetchProduct} type="text" onChange={handleSearchInput} placeholder="Enter item to search" />
                    <input className="button" type="button" value="Search" onClick={fetchProductByUserInput} />
                </div>
                <div className='loginButton'>
                    <div className='ButtonCart' onClick={openCartPage}>
                        <svg width="25" height="25" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" ></path></svg>
                        <span><b>Cart</b></span>
                    </div>
                    {
                        currentUser.firstName != undefined ? <div className="username" onClick={openDashBoard}> Hi {currentUser.firstName}</div> :
                            <input className="button" type="button" value="Login" onClick={openLoginForm} />
                    }
                </div>
            </div> */}

            <div className='categories'>
                <div className='categoryName' onClick={() => fetchProductByBrand('clothing')}>Clothing</div>
                <div className='categoryName' onClick={() => fetchProductByBrand('shoe')}>Shoe</div>
                <div className='categoryName' onClick={() => fetchProductByBrand('grocery')} >Grocery</div>
                <div className='categoryName' onClick={() => fetchProductByBrand('stationary')} >Stationary</div>
                <div className='categoryName' onClick={() => fetchProductByBrand('electronics')} >Electronics</div>
                <div className='categoryName' onClick={() => fetchProductByBrand('furniture')} >Furniture</div>
            </div>

            {products.length > 0 &&

                <div className='productListContainer'>
                    {
                        (
                            products.map(function (product) {
                                return <ProductView key={product.productId} url={product.imageUrl} name={product.name} categoryName={product.categoryName}
                                    productId={product.productId} brandName={product.brandName} price={product.price} ratings={product.productRating} setProducts={setProducts}>
                                </ProductView>
                            }))
                    }
                </div>
            }

        </React.Fragment>
    )
    function fetchProductByBrand(brandName) {
        fetch("http://localhost:9000/product/brand?name=" + brandName)
            .then(function (response) { return response.json() })
            .then(function (jsonResponse) {
                setProducts(jsonResponse);
            })
    }

}

export default Home;