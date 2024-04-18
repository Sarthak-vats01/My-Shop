import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar";

function Address() {
  const result = useSelector((state) => state.products);
  const productInfo = result.ProductInfo;
  const { id } = useParams();
  const userId = id;
  const navigate = useNavigate();
  const base64String = btoa(
    new Uint8Array(productInfo.image.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const imageDataUrl = `data:${productInfo.imageType};base64,${
    base64String || ""
  }`;

  console.log(productInfo);

  return (
    <Container>
      <Navbar />
      <ProductContainer>
        <div className="left">
          <div className="leftContent">
            <img src={imageDataUrl} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="order-details">
            <h2>Address</h2>
            <form method="post">
              <StyledInput type="email" placeholder="Email address" />
              <StyledInput type="text" placeholder="Address" />
              <StyledInput type="text" placeholder="Count" />
              <StyledInput type="text" placeholder="Contact Number" />
              <StyledButton onClick={() => navigate(`/home/${userId}`)}>
                Order
              </StyledButton>
            </form>
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
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    justify-content: center;
  }

  .order-details {
    font-family: "Times New Roman", serif;
    font-size: 1.1rem;
    line-height: 1;
    color: #555;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    form {
      display: flex;
      flex-direction: column;
      font-family: "Times New Roman", serif;
      font-size: 1.1rem;
      line-height: 1;
      color: #555;
      padding: 20px;
    }
  }
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  background: #000;
  background-size: 200% 100%;
  font-size: 1.2rem;
  margin-top: 2px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 1s ease;

  &:hover {
    background-position: right;
  }
`;

export default Address;
