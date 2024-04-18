import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/card.jsx";
import Navbar from "../components/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_URL } from "../utils/constant.js";
import { updateElectronics } from "../redux/products/index.js"; // Fix import statement

const Container = styled.div`
  .PageContent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
    gap: 20px;
    justify-content: space-around;
  }
`;

function Electronics() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function fetchElectronicsData(dispatch) {
    try {
      const response = await axios.get(`${CATEGORY_URL}/Electronics`);
      console.log("getElectronicsProducts response", response);
      dispatch(updateElectronics(response.data));
    } catch (error) {
      console.log("ERROR FETCHING ELECTRONICS PRODUCTS", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElectronicsData(dispatch);
  }, [dispatch]);

  const Products = useSelector((state) => state.products.Electronics);

  return (
    <Container>
      <Navbar />
      <div className="PageContent">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          Products?.map((item) => <Card key={item._id} productData={item} />)
        )}
      </div>
    </Container>
  );
}

export default Electronics;
