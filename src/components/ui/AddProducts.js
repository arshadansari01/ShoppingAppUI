import React from 'react'
import '../ProductView.css'
import { useState } from 'react';
import { createProduct, updateProduct } from '../../util/globalUrl';
import { generateHeaders } from '../../util/ApplicationUtil';

export default function AddProducts(props) {
    const { closePopup, buttonName, productId, setProducts } = props;
    const [name, setName] = useState(props.name);
    const [url, setUrl] = useState(props.url);
    const [price, setPrice] = useState(props.price);
    const [ratings, setRatings] = useState(props.ratings);
    const [category, setCategory] = useState(props.categoryName);

    function handleName(event) {
        setName(event.target.value);
    }
    function handlePrice(event) {
        setPrice(event.target.value);

    }

    function handleImage(event) {
        setUrl(event.target.value);

    }
    function handleCategoryName(event) {
        setCategory(event.target.value);

    }
    function handleProductRatings(event) {
        setRatings(event.target.value);

    }

    function closeModelPopup() {
        closePopup('hidden-popup');
    }
    const body = {
        name: name,
        price: price,
        imageUrl: url,
        categoryName: category,
        productRating: ratings,
        productId: productId
    }

    async function submitButtonHandler() {
        console.log(body, buttonName, "bbbbbbb");
        const response = await fetch((buttonName === "Update" ? updateProduct : createProduct), generateHeaders((buttonName === "Update" ? "PUT" : "POST"), body));
        console.log(response, "rrrrr")
        if (response.ok) {
            const result = await response.json();
            if (buttonName === "Update") {
                alert("Product " + buttonName+"  d" + " Successfully");

                setProducts((initialValue) => initialValue.map((product) => product.productId === result.productId ? { ...product, ...result } : product));
            }
            else {
                alert("Product Created Successfully");

                setProducts((initialValue) => [...initialValue, result])
            }
            closeModelPopup();
        }
        else {

        }

    }


    return (


        <div className='UpsertFormAlignment'>

            <label >Name</label>
            <input className="input-box" type="text" value={name} onChange={handleName} />
            <br />
            <label  >Product Image Url</label>
            <input className="input-box" type="text" value={url} onChange={handleImage} />
            <br />
            <label > Category Name</label>
            <input className="input-box" type="text" value={category} onChange={handleCategoryName} />
            <br />
            <label> Product Price</label>
            <input className="input-box" type="text" value={price} onChange={handlePrice} />
            <br />
            <label > Product Ratings</label>
            <input className="input-box" type="text" value={ratings} onChange={handleProductRatings} />
            <br />

            <input className="input-button" type="submit" value={buttonName} onClick={submitButtonHandler} />
            <br />
            <input className="input-button" type="button" value="Cancel" onClick={closeModelPopup} />


            {/* <button className='btn-bg-color btn btn-secondary' type="button" onClick={submitButtonHandler}> {buttonName} </button>
             <button className='btn-bg-color btn btn-danger' type="button"onClick={closeModelPopup}> Cancel </button>
 */}

        </div>

    )
}