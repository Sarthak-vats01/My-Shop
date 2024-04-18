import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

function Card(props) {
  const product = props.productData;
  const productId = product._id;
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id;

  function handleClick() {
    navigate(`/product/${userId}`, { state: { productId } });
  }

  const base64String = btoa(
    new Uint8Array(product.image.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  // Convert the Base64 image string to a Data URL
  const imageDataUrl = `data:${product.imageType};base64,${base64String || ""}`;

  return (
    <Container onClick={handleClick}>
      <ProductImage>
        <img src={imageDataUrl} alt="productimg" />
        <div className="details">
          <h3>Seller: {product?.sellerName}</h3>
          <p>Count: {product?.count}</p>
          <p>MRP: {product?.mrp}</p>
          <p>Discount: {product?.discount}%</p>
        </div>
      </ProductImage>
      <ProductDetails>
        <div className="productDetails">
          <h2>{product?.productName}</h2>
          <h3> ₹{product?.discountedPrice}</h3>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
            alert("Added to cart");
          }}
        >
          <FaCartArrowDown />
        </button>
      </ProductDetails>
    </Container>
  );
}

const Container = styled.div`
  width: 12rem;
  border: 2px solid #d1c0a5;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .details {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      opacity: 0;
    }

    p {
      margin: 0.2rem 0;
      font-size: 1rem;
      opacity: 0;
    }
  }
  &:hover {
    img {
      filter: brightness(0.5);
    }
    h3 {
      opacity: 1;
    }
    p {
      opacity: 1;
    }
  }
`;

const ProductDetails = styled.div`
  background-color: #e1d9cc;
  color: #333;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.4rem;
    color: #2c6e49;
  }

  h3 {
    margin-top: 0.2rem;
    font-size: 1.2rem;
  }

  button {
    border: none;
    background: inherit;
    cursor: pointer;
  }
`;
export default Card;
