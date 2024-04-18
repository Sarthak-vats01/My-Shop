// Seller.jsx
import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import styled from "styled-components";
import axios from "axios";
import { PRODUCT_URL } from "../utils/constant.js";
import { useParams } from "react-router-dom";

const Container = styled.div`
  .pageContent {
    height: 90vh;

    h1 {
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      input {
        width: 41%;
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 10px;
      }

      button {
        width: 41%;
        padding: 4px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #555;
        }
      }
    }
  }
`;

function Seller() {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [color, setColor] = useState("");
  const [count, setCount] = useState("");
  const [img, setImg] = useState(null);

  const { id } = useParams();
  const userId = id;

  function submitProduct(e) {
    e.preventDefault();

    const validCategories = ["Fashion", "Electronics", "Furniture"];

    // Check if the entered category is valid
    if (!validCategories.includes(category)) {
      alert("Category must be Fashion, Electronics, Furniture");
      return;
    }

    if (
      !product ||
      !category ||
      !mrp ||
      !discount ||
      !discountedPrice ||
      !color ||
      !count ||
      !img
    ) {
      alert("All fields must be filled out");
      return;
    }

    const formData = new FormData();
    formData.append("productName", product);
    formData.append("productCategory", category);
    formData.append("mrp", mrp);
    formData.append("discount", discount);
    formData.append("discountedPrice", discountedPrice);
    formData.append("color", color);
    formData.append("count", count);
    formData.append("image", img);

    axios
      .post(`${PRODUCT_URL}/addproduct/${userId}`, formData)
      .then((res) => {
        console.log(`Product Added: ${res}`);
        setProduct("");
        setCategory("");
        setMrp("");
        setDiscount("");
        setDiscountedPrice("");
        setColor("");
        setCount("");
        // setImg("");
      })
      .catch((err) => {
        console.error(`Error adding product:`, err);
      });
  }

  return (
    <Container>
      <Navbar />

      <div className="pageContent">
        <h1>Become a Seller</h1>
        <form action="post" encType="multipart/form-data">
          <input
            type="text"
            placeholder="productName"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="mrp"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
          <input
            type="text"
            placeholder="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            type="text"
            placeholder="discounted price"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button onClick={submitProduct}>Submit</button>
        </form>
      </div>
    </Container>
  );
}

export default Seller;
