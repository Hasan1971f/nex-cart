import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import SortFilter from "../components/SortFilter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
    </main>
  );
};

export default Products;