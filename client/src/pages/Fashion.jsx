import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/card.jsx";
import Navbar from "../components/navbar.jsx";
import { updateFashion } from "../redux/products/index.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_URL } from "../utils/constant.js";

const Container = styled.div`
  .PageContent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
    grid-gap: 20px;
    justify-content: space-around;
  }
`;

function Fashion() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function fetchFashionData(dispatch) {
    try {
      const response = await axios.get(`${CATEGORY_URL}/Fashion`);
      console.log("getFashionProducts response", response);
      dispatch(updateFashion(response.data));
    } catch (error) {
      console.log("ERROR FETCHING FASHION PRODUCTS", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFashionData(dispatch);
  }, [dispatch]);

  const Products = useSelector((state) => state.products).Fashion;
  console.log(Products);
  return (
    <Container>
      <Navbar />
      <div className="PageContent">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          Products.map((item) => <Card key={item._id} productData={item} />)
        )}
      </div>
    </Container>
  );
}

export default Fashion;
