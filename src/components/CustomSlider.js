import React, { useState,useEffect } from 'react';

import '../App.css'; // Import your custom styles

const CustomSlider = ({ itemsToShow, data,category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toShow, setToShow] = useState(itemsToShow);

  useEffect(() => {
    // Update itemsToShow based on the window width
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setToShow(itemsToShow);
      } else {
       
        // Set the number of items you want to show for widths less than 600px
        setToShow(1);
      }
    };

    // Set initial itemsToShow
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - toShow
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data.length - toShow ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="custom-slider-container">
      <h2 className='title'>{data.length>0&&category}</h2>
    {data.length>0&& < div className="buttons"><button className="prev-button" onClick={handlePrev}>
            &lt;
          </button>
            <button className="next-button" onClick={handleNext}>
            &gt;
          </button></div>}
      <div className="custom-slider">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / toShow)}%)`,
          }}
        >
          {
          data.map((item, index) =>{
          
             return(
            <div className="slider-item" onClick={()=>{
              window.location.href=item.url
            }}  data-text={`Click to visit ${item.source.name}`}
           key={index}>
              
                 
              <img className='logoImage' src={item.logoUrl} />
              <h2>{item.title}</h2>
              <img className='mainImage' src={item.urlToImage} alt={item.title} />
            
            </div>
          )})}
        </div>

      </div>
    
    </div>
  );
};

export default CustomSlider;
