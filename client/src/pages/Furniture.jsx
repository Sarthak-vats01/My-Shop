import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/card.jsx";
import Navbar from "../components/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateFurniture } from "../redux/products/index.js";
import { CATEGORY_URL } from "../utils/constant.js";

const Container = styled.div`
  .PageContent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(196px, 1fr)); /* Adjust the minimum and maximum width as needed */
    gap: 20px; /* Adjust the gap between cards as needed */
    justify-content: space-around; /* Adjust as needed *
  }
`;

function Furniture() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function fetchFurnitureData(dispatch) {
    try {
      const response = await axios.get(`${CATEGORY_URL}/Furniture`);
      console.log("getFashionProducts response", response);
      dispatch(updateFurniture(response.data));
    } catch (error) {
      console.log("ERROR FETCHING FASHION PRODUCTS", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFurnitureData(dispatch);
  }, [dispatch]);

  const Products = useSelector((state) => state.products).Furniture;
  console.log(Products);

  return (
    <Container>
      <Navbar />
      <div className="PageContent">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          Products?.map((item) => <Card key={item._id} productData={item} />)
        )}
      </div>
    </Container>
  );
}

export default Furniture;
