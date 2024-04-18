import React, { useState } from "react";
import styled from "styled-components";
import { FaCartArrowDown } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_URL } from "../utils/constant";

const Container = styled.div`
  // position: sticky;
  // position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 60vw;

  h1 {
    cursor: pointer;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;

    div {
      cursor: pointer;
      position: relative;
      color: black;

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 293%;
        background-color: white;
        box-shadow: 0 10px 5px 0 rgba(0, 0, 0, 0.8);
        z-index: 1;
        flex-direction: column;
        border-radius: 0.5rem;

        a {
          padding: 10px;
          cursor: pointer;
          list-style: none;
          text-decoration: none;
          color: #666666;

          &:hover {
            background-color: #f2f2f2;
            color: black;
          }
        }
      }
    }

    div.active .dropdown {
      display: flex;
    }

    div.active {
      color: #666666;
    }
  }

  button {
    border: none;
    background-color: inherit;
    cursor: pointer;
  }
`;

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  function logOut() {
    axios
      .get(`${USER_URL}/signout`)
      .then(() => {
        console.log("LoggedOut");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/signin");
  }
  const navigate = useNavigate();

  const { id } = useParams();
  const userId = id;
  return (
    <Container>
      <h1 onClick={() => navigate(`/home/${userId}`)}>My Shop</h1>

      <div className="menu">
        <div
          className={activeDropdown === 1 ? "active" : ""}
          onClick={() => handleDropdownClick(1)}
        >
          Pages
          <div className={`dropdown ${activeDropdown === 1 ? "active" : ""}`}>
            <a href={`/electronics/${userId}`}>Electronics</a>
            <a href={`/fashion/${userId}`}>Fashion</a>
            <a href={`/furniture/${userId}`}>Furniture</a>
            <a href={`/myorders/${userId}`}>My Orders</a>
            <a href={`/seller/${userId}`}>Sell Products</a>
          </div>
        </div>
        <div>Blog</div>
        <div
          className={activeDropdown === 2 ? "active" : ""}
          onClick={() => handleDropdownClick(2)}
        >
          Contact Us
          <div className={`dropdown ${activeDropdown === 2 ? "active" : ""}`}>
            <li>sarthakvats@gmail.com</li>
            <li>(+91) 7906031020</li>
          </div>
        </div>
      </div>
      <button>
        <FaCartArrowDown />
      </button>
      <button onClick={logOut}>
        <RiLogoutCircleRLine />
      </button>
    </Container>
  );
}

export default Navbar;
