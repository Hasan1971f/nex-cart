<<<<<<< HEAD
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import SortFilter from "../components/SortFilter";
=======
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronDown,
  FiFilter,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
>>>>>>> 13435bf (products page with filter and load more)

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  const fetchProducts = (url) => {
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });
  };

  useEffect(() => {
    fetchProducts("https://dummyjson.com/products");
    fetchCategories();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSelectedCategory("all");

    if (value.trim() === "") {
      fetchProducts("https://dummyjson.com/products");
      return;
    }

    fetchProducts(
      `https://dummyjson.com/products/search?q=${value.trim()}`
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    fetchProducts("https://dummyjson.com/products");
=======

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortOption, setSortOption] = useState("default");

  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=194"
        );

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const searchValue = searchTerm.toLowerCase();

      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    result = result.filter((product) => {
      const discountedPrice =
        product.price -
        (product.price * product.discountPercentage) / 100;

      return discountedPrice <= maxPrice;
    });

    if (sortOption === "price-low") {
      result.sort((a, b) => {
        const priceA =
          a.price - (a.price * a.discountPercentage) / 100;

        const priceB =
          b.price - (b.price * b.discountPercentage) / 100;

        return priceA - priceB;
      });
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => {
        const priceA =
          a.price - (a.price * a.discountPercentage) / 100;

        const priceB =
          b.price - (b.price * b.discountPercentage) / 100;

        return priceB - priceA;
      });
    }

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortOption === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, searchTerm, selectedCategory, maxPrice, sortOption]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(8);
>>>>>>> 13435bf (products page with filter and load more)
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
<<<<<<< HEAD
    setSearchTerm("");

    if (category === "all") {
      fetchProducts("https://dummyjson.com/products");
      return;
    }

    fetchProducts(
      `https://dummyjson.com/products/category/${category}`
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filteredProducts = products.filter(
    (product) => product.price <= selectedPrice
  );

  const sortedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortOption === "price-low") {
      return firstProduct.price - secondProduct.price;
    }

    if (sortOption === "price-high") {
      return secondProduct.price - firstProduct.price;
    }

    if (sortOption === "rating") {
      return secondProduct.rating - firstProduct.rating;
    }

    if (sortOption === "name") {
      return firstProduct.title.localeCompare(secondProduct.title);
    }

    return 0;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black sm:text-4xl">All Products</h1>

        <p className="mt-2 text-base-content/60">
          Explore our latest products and discover something you love.
        </p>
      </div>

      <div className="mb-8 max-w-2xl">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>

      <div className="mb-8 space-y-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <PriceFilter
            minPrice={0}
            maxPrice={1000}
            selectedPrice={selectedPrice}
            onPriceChange={handlePriceChange}
          />

          <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <SortFilter
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">No products found</h2>

          <p className="mt-2 text-base-content/60">
            Try changing your filters or search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
=======
    setVisibleCount(8);
  };

  const handlePriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
    setVisibleCount(8);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setVisibleCount(8);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setMaxPrice(1500);
    setSortOption("default");
    setVisibleCount(8);
  };

  return (
    <main className="min-h-screen bg-base-200/40">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-base-100">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
              NEXCART COLLECTION
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Explore Our{" "}
              <span className="text-primary">Products</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base-content/60">
              Discover quality products, compare prices, and find
              everything you need in one smart cart.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <FiSearch
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/40"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="input input-lg h-16 w-full rounded-2xl border-base-300 bg-base-100 pl-14 pr-14 shadow-sm focus:border-primary focus:outline-none"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="btn btn-circle btn-ghost btn-sm absolute right-3 top-1/2 -translate-y-1/2"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiFilter size={20} />
              </div>

              <div>
                <h2 className="font-bold">Filter Products</h2>
                <p className="text-xs text-base-content/50">
                  Refine your shopping experience
                </p>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm rounded-xl"
            >
              Clear All
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Category
              </label>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(event) =>
                    handleCategoryChange(event.target.value)
                  }
                  className="select select-bordered w-full rounded-xl bg-base-100 capitalize"
                >
                  <option value="all">All Categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace("-", " ")}
                    </option>
                  ))}
                </select>

                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold">
                  Maximum Price
                </label>

                <span className="font-bold text-primary">
                  ${maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="1500"
                value={maxPrice}
                onChange={handlePriceChange}
                className="range range-primary range-sm"
              />

              <div className="mt-2 flex justify-between text-xs text-base-content/40">
                <span>$10</span>
                <span>$1500</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold">
                <FiSliders className="text-primary" />
                Sort Products
              </label>

              <select
                value={sortOption}
                onChange={handleSortChange}
                className="select select-bordered w-full rounded-xl bg-base-100"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating">
                  Rating: High to Low
                </option>
                <option value="name">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Product Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">
              All Products
            </h2>

            <p className="mt-1 text-sm text-base-content/50">
              Showing {visibleProducts.length} of{" "}
              {filteredProducts.length} products
            </p>
          </div>

          <div className="badge badge-primary badge-lg gap-2 rounded-full px-4 py-4">
            <FiFilter size={15} />
            {filteredProducts.length} Results
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-base-300 bg-base-100 px-6 py-20 text-center shadow-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
              <FiSearch size={26} />
            </div>

            <h2 className="text-2xl font-black">
              No Products Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-base-content/50">
              Try changing your search or filter options to find
              something you like.
            </p>

            <button
              onClick={clearFilters}
              className="btn btn-primary mt-6 rounded-xl px-7"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Products */}
        {!loading && filteredProducts.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.3),
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-14 flex justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    setVisibleCount((previous) => previous + 8)
                  }
                  className="btn btn-primary rounded-2xl px-10 shadow-lg"
                >
                  Load More Products
                </motion.button>
              </div>
            )}
          </>
        )}
      </section>
>>>>>>> 13435bf (products page with filter and load more)
    </main>
  );
};

export default Products;