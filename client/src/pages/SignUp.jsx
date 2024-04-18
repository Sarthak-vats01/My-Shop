import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img1 from "../assets/signupimg1.jpg";
import img2 from "../assets/signupimg2.jpg";
import img3 from "../assets/signupimg3.jpg";
import img4 from "../assets/signupimg4.jpg";
import img5 from "../assets/signupimg5.jpg";
import img6 from "../assets/signupimg6.jpg";
import { USER_URL } from "../utils/constant.js";

const Container = styled.div`
  border: 2px solid #333;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Arial", sans-serif;

  h1 {
    height: 10vh;
    text-align: center;
    line-height: 10vh;
    margin: 0;
  }

  .pageContent {
    display: flex;
    flex-direction: row;
    height: 90vh;
  }

  .img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 90%;
      height: 90%;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      width: 80%;
      padding: 10px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      width: 80%;
      padding: 10px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #555;
      }
    }
  }
`;

const SignupImages = [
  { img: img1 },
  { img: img2 },
  { img: img3 },
  { img: img4 },
  { img: img5 },
  { img: img6 },
];

function SignUp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % SignupImages.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  function register(e) {
    e.preventDefault();

    axios
      .post(`${USER_URL}/signup`, {
        name: name,
        username: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setName("");
        setEmail("");
        setPassword("");
        navigate(`/home/${res.data.userId}`);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <h1>My Shop</h1>

      <div className="pageContent">
        <div className="img">
          <img src={SignupImages[currentIndex].img} alt="" />
        </div>
        <form action="">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={register}>
            Sign Up
          </button>
          <p>
            Already have an account ? <a href={`/signin`}>Sign in</a>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
