import React, { useEffect, useState } from 'react'
import Carousel from "react-simply-carousel";

const Home = () => {

  const [activeSlide, setActiveSlide] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

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


  return (
    <>
      <div>
        <Carousel
          containerProps={{
            style: {
              width: "80%",
              margin: "auto",
              justifyContent: "space-between",
              userSelect: "none"
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
            <div>
              <h2>Products</h2>
            </div>
    </>
  )
}

export default Home