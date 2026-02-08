import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ImageSlider.css';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Helper to safely extract the first image URL from a slide
  const getSlideImage = (imgData) => {
    if (!imgData) return 'https://placehold.co/1200x600?text=No+Image';
    try {
        const parsed = JSON.parse(imgData);
        return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (e) {
        return imgData;
    }
  };

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      
      <AnimatePresence>
        {slides.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="slider-content"
                >
                  {/* FIX: Parse the image string before using it */}
                  <img src={getSlideImage(slide.image)} alt="slider visual" className="image" />
                  
                  {slide.title && (
                    <div className="slider-overlay">
                        <h2>{slide.title}</h2>
                        <p>{slide.excerpt ? slide.excerpt.substring(0, 100) + '...' : ''}</p>
                        <Link to={`/post/${slide.id}`} className="slider-btn">
                        Read Article
                        </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </AnimatePresence>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
            <span 
                key={index} 
                className={current === index ? "dot active" : "dot"}
                onClick={() => setCurrent(index)}
            ></span>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;