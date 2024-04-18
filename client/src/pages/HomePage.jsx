import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg1 from "../assets/banner_img.png.webp";
import sliderImg2 from "../assets/Phone.png";
import sliderImg3 from "../assets/Fashion.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import { useNavigate } from "react-router-dom";
const saleItems = [
  { image: img1, text: "Sweaters" },
  { image: img2, text: "Dryers" },
  { image: img3, text: "Kettles" },
  { image: img4, text: "Refrigerator" },
  { image: img5, text: "Chairs" },
  { image: img6, text: "IPhones" },
];

function HomePage() {
  const sliderSettings = {
    dots: true,
    infinite: true, // Set to true for continuous sliding
    speed: 5000, // Adjust the speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Set to 0 to control sliding with the speed property
    cssEase: "linear", //
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % saleItems.length);
    }, 2000); // Change the interval time as needed (in milliseconds)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <Container>
        <Navbar />
        <SliderContainer>
          <StyledSlider {...sliderSettings}>
            <div>
              <SliderImage className="img1" src={sliderImg1} alt="Image 1" />
            </div>
            <div>
              <SliderImage className="img2" src={sliderImg2} alt="Image 2" />
            </div>
            <div>
              <SliderImage className="img3" src={sliderImg3} alt="Image 3" />
            </div>
          </StyledSlider>
        </SliderContainer>
        <div className="Sale">
          <img src={saleItems[currentIndex].image} alt="img" />
          <div className="saleText">
            <h2>60% Off On Your First ̅I̅ Order</h2>
            <h2>COD Available</h2>
            <h3>{saleItems[currentIndex].text}</h3>
            <button onClick={() => navigate("/signup")}> Join Us </button>
          </div>
        </div>
        <div className="newsLetter">
          <div className="newsLetterText">
            <p>JOIN OUR NEWSLETTER</p>
            <h2>Get Important Updates</h2>
            <h3>On Your Palm</h3>
          </div>
          <form action="post" id="subscribeForm">
            <input type="email" placeholder="type your email..." />
            <button>Subscribe Now</button>
          </form>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  .Sale {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    width: 41%;

    img {
      width: 150px;
      height: 244px;
    }

    .saleText {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background-color: #f5f5f5; // Light gray background
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow
      margin-top: 20px;

      h2 {
        font-size: 2rem;
        color: #4c4c4c; // Dark gray text
        margin-bottom: 10px;
      }

      h3 {
        font-size: 1.5rem;
        color: #666666; // Slightly darker gray text
        margin-bottom: 10px;
      }

      button {
        background: linear-gradient(
          to right,
          #8b4513,
          #cd853f
        ); // Initial gradient
        background-size: 200% 100%; // Increase the background size for the transition effect
        font-size: 1.8rem;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
        color: white;
        cursor: pointer;
        transition: background 1s ease;

        &:hover {
          background-position: right; // Change the background position on hover
        }
      }
    }
  }

  .newsLetter {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 41%;
    margin: 0 auto;

    .newsLetterText {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      p {
        color: #fe3e93;
      }

      h2 {
        color: #4c4c4c;
      }
      h3 {
        color: #4c4c4c;
        margin-top: -14px;
      }
    }
    form {
      display: flex;
      justify-content: center;
      width: 100%;

      input {
        padding: 1% 5%;
        font-size: 1.2rem;
        border: none;
      }

      button {
        padding: 2% 4%;
        background: linear-gradient(to right, #cd853f, #8b4513);
        background-size: 200% 100%; // Increase the background size for the transition effect
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        transition: background 1s ease;

        &:hover {
          background-position: right; // Change the background position on hover
        }
      }
    }
  }
`;

const SliderContainer = styled.div`
  // border: 2px solid black;
  width: 100%;
  height: 65vh;
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const SliderImage = styled.img`
  &.img1 {
    width: 100%; /* Adjust the width as needed */
    height: 100%;
    object-fit: cover;
    margin-left: 50%;
    margin-top: 12%;
  }
  &.img2 {
    width: 90%; /* Adjust the width as needed */
    height: 100%;
    object-fit: cover;
    margin-right: 50%;
    margin-top: 12%;
  }
  &.img3 {
    width: 100%; /* Adjust the width as needed */
    height: 100%;
    object-fit: cover;
  }
`;
export default HomePage;
