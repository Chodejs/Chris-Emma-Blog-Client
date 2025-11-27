import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ImageSlider.css';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

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
                  <img src={slide.image} alt="travel image" className="image" />
                  
                  <div className="slider-overlay">
                    <h2>{slide.title}</h2>
                    <p>{slide.excerpt.substring(0, 100)}...</p>
                    <Link to={`/post/${slide.id}`} className="slider-btn">
                      Read Article
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </AnimatePresence>
      
      {/* Optional: Dots at the bottom */}
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