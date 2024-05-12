import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Carousel from "react-simply-carousel";
import { getProduct } from '../redux/productData/action';
import { Link, useNavigate } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";

const Home = () => {

  const [activeSlide, setActiveSlide] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const { isLoading, products } = useSelector((store) => store.productReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [newCart, setNewCart] = useState([])
  const initialCart = JSON.parse(localStorage.getItem('cart')) || {};

  console.log(isLoading);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }, [newCart]);


  // Function to handle adding product to the cart
  const addToCart = (ele, productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
    setNewCart(prevCart => [...prevCart, ele]);
  };

  // Function to handle removing product from the cart
  const removeFromCart = (eleId, productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] && updatedCart[productId] > 0) {
        updatedCart[productId]--;
      }
      return updatedCart;
    });
    setNewCart(prevCart => {
      const newupdatedCart = [...prevCart];
      const index = newupdatedCart.findIndex(item => item.id === eleId);
      if (index !== -1) {
        newupdatedCart.splice(index, 1);
      }
      return newupdatedCart;
    });
  };


  useEffect(() => {
    const hasAccepted = localStorage.getItem('hasAccepted');
    if (!hasAccepted) {
      setShowDialog(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hasAccepted', true);
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    dispatch(getProduct())
  }, [])

  function scrolltoTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  return (
    <>
      <div>
        <Carousel
          containerProps={{
            style: {
              width: "80%",
              margin: "auto",
              justifyContent: "space-between",
              userSelect: "none",
            }
          }}
          preventScrollOnSwipe
          swipeTreshold={60}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              background: "rgb(0,171,197)"
            }
          }}
          onRequestChange={setActiveSlide}
          dotsNav={{
            show: true,
            itemBtnProps: {
              style: {
                height: 16,
                width: 16,
                borderRadius: "50%",
                border: 0,
                cursor: "pointer"
              }
            },
            activeItemBtnProps: {
              style: {
                height: 16,
                width: 16,
                borderRadius: "50%",
                border: 0,
                background: "rgb(0,171,197)",
                marginRight: 5,
                marginLeft: 5
              }
            }
          }}
          itemsToShow={2}
          speed={400}
          centerMode
        >
          {Array.from({ length: 5 }).map((item, index) => (
            <div
              style={{
                background: "rgb(0,171,197)",
                width: 900,
                height: 500,
                border: "30px solid white",
                textAlign: "center",
                lineHeight: "240px",
                boxSizing: "border-box"
              }}
              key={index}
            >
            </div>
          ))}
        </Carousel>
      </div>

      {showDialog && (
        <>
          <div className="popup-background"></div>
          <div className="popup">
            <div className="dialog-content">
              <h2>Terms & Conditions</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quidem enim exercitationem modi
                eligendi in soluta excepturi illum consequuntur accusamus suscipit voluptate ipsum quod pariatur
                nesciunt ex quas omnis molestiae recusandae quo beatae, repudiandae culpa? Nemo, qui fugiat? Vel
                soluta saepe accusantium officiis, rerum sunt commodi corporis dicta et asperiores.
              </p>
              <div className='popup-btns'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleAccept}>Accept</button>
              </div>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      <h2 style={{ width: "80%", margin: "auto" }}>Products</h2>
      <br />

      {
        isLoading ? <div className='loading-div'>
        <PropagateLoader
          color={"rgb(0,171,197)"}
          loading={isLoading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div> : <div className='products-div'>
        {products?.map(function (ele, index) {
          return <div key={index}>
            <img src={ele.avatar} alt="" />
            <div>
              <h4 style={{ marginBottom: "-12px" }}>{ele.title}</h4>
              <p style={{ color: "grey", marginBottom: "-10px" }}>{ele.description}</p>
              <p style={{ color: "rgb(0, 171, 197)", fontWeight: "bold" }}>RS. {ele.Price}</p>
              {cart[index] ? (
                <div>

                  <button><span style={{ paddingRight: "50px" }} onClick={() => removeFromCart(ele.id, index)}>-</span>{cart[index]}<span style={{ paddingLeft: "50px" }} onClick={() => addToCart(index)}>+</span></button>
                </div>
              ) : (
                <button onClick={() => addToCart(ele, index)}>Add to Cart</button>
              )}
            </div>
          </div>
        })}
      </div>
      }

  
      <div style={{
        display: "flex",
        width: "65%",
        margin: "auto",
        flexDirection: "row-reverse"
      }}>
        <Link to={"/products"}>
          <button onClick={scrolltoTop}
            style={{
              padding: "6px",
              backgroundColor: "rgb(0,171,197)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}>All Products >></button>
        </Link>
      </div>
      <br />
    </>
  )
}

export default Home