import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductInfo } from "../redux/products";
import axios from "axios";
import { PRODUCT_URL } from "../utils/constant";
import Navbar from "../components/navbar";

function Product() {
  const location = useLocation();
  const productId = location.state?.productId;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;
  const userId = id;
  async function getProductById() {
    try {
      const response = await axios.post(`${PRODUCT_URL}/getproductById`, {
        productId: productId,
      });
      dispatch(updateProductInfo(response.data));
    } catch (error) {
      console.log("Error in getProductById");
    } finally {
      setLoading(true);
    }
  }

  useEffect(() => {
    getProductById();
  }, []);

  const productInfo = useSelector((state) => state.products);
  const result = productInfo.ProductInfo;

  let imageDataUrl = "";
  if (loading && result) {
    const base64String = btoa(
      new Uint8Array(result.image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    // Convert the Base64 image string to a Data URL
    imageDataUrl = `data:${result.imageType};base64,${base64String || ""}`;
  }

  return (
    <Container>
      <Navbar />
      <ProductContainer>
        <div className="left">
          <div className="leftContent">
            {loading ? <img src={imageDataUrl} alt="" /> : <p>Loading...</p>}

            <button onClick={() => navigate(`/address/${userId}`)}>
              Buy Now
            </button>
          </div>
        </div>
        <div className="right">
          <div className="product-details">
            <h2>{result.productName}</h2>
            <p>{result.productCategory}</p>
            <hr />
            <p>
              <strong>Seller:</strong> {result.sellerName}
            </p>
            <p>
              <strong>Price:</strong> ₹{result.discountedPrice}
            </p>
            <p>
              <strong>Discount:</strong>
              <span className="blue">{result.discount}%</span>
            </p>
            <p>
              <strong>Mrp:</strong>
              <span className="crossed">₹{result.mrp}</span>
            </p>
            {/* Add more product details as needed */}
          </div>
        </div>
      </ProductContainer>
    </Container>
  );
}

const Container = styled.div``;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  height: 87vh;

  .left {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    justify-content: center;

    .leftContent {
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        height: 20rem;
        width: 20rem;
        border: 2px solid black;
      }

      button {
        background: #000;
        background-size: 200% 100%;
        font-size: 1.2rem;
        margin-top: 2px;
        padding: 5px 10px;
        border-radius: 8px;
        border: none;
        color: white;
        cursor: pointer;
        transition: background 1s ease;

        &:hover {
          background-position: right;
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    justify-content: center;
  }

  .product-details {
    font-family: "Times New Roman", serif;
    font-size: 1.1rem;
    line-height: 1;
    color: #555;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .product-details h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .product-details p {
    margin-bottom: 10px;

    .crossed {
      text-decoration: line-through;
      color: red;
    }
  }

  .product-details hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 20px 0;
  }
`;

export default Product;
