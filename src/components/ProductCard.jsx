import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-base-200">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-content">
          -{Math.round(product.discountPercentage)}%
        </span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn btn-circle btn-sm absolute right-3 top-3 bg-base-100/90 shadow-md"
          aria-label="Add to wishlist"
        >
          <FiHeart size={17} />
        </motion.button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {product.category}
        </p>

        <h2 className="mt-2 line-clamp-1 text-lg font-bold">
          {product.title}
        </h2>

        <div className="mt-3 flex items-center gap-1 text-sm">
          <FiStar className="fill-current text-warning" size={16} />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-base-content/50">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-xl font-black text-primary">
            ${discountedPrice.toFixed(2)}
          </span>

          <span className="text-sm text-base-content/40 line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-primary mt-5 w-full rounded-xl"
        >
          <FiShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;