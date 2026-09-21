import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const slides = [
  {
    id: 1,
    category: "New Season Fashion",
    title: "Discover Your Everyday Style",
    description:
      "Explore fresh fashion collections designed to make every day look better.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 2,
    category: "Tech & Electronics",
    title: "Upgrade Your Everyday Life",
    description:
      "Discover smart gadgets and modern electronics made for your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 3,
    category: "Home & Lifestyle",
    title: "Make Your Space Better",
    description:
      "Find beautiful products that bring comfort, style and personality to your home.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (previousSlide + 1) % slides.length;
    });
  };

  const previousSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (previousSlide - 1 + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, 3000);

    return () => {
      clearInterval(slideTimer);
    };
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[620px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={activeSlide.image}
              alt={activeSlide.title}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 sm:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-primary-content">
                {activeSlide.category}
              </p>

              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
                {activeSlide.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                {activeSlide.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary rounded-full px-7"
                >
                  Shop Now
                  <FiArrowRight size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline rounded-full border-white px-7 text-white hover:border-white hover:bg-white hover:text-black"
                >
                  Explore Products
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 bg-primary"
                  : "w-2.5 bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:right-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={previousSlide}
            className="btn btn-circle border-white/30 bg-black/30 text-white backdrop-blur-md hover:bg-white hover:text-black"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={22} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={nextSlide}
            className="btn btn-circle border-white/30 bg-black/30 text-white backdrop-blur-md hover:bg-white hover:text-black"
            aria-label="Next slide"
          >
            <FiChevronRight size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;